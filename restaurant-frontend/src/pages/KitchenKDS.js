import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Swal from 'sweetalert2';
import apiClient from '../api/apiClient';
import './KitchenKDS.css';

const KitchenKDS = () => {
  const [orders, setOrders] = useState({
    NEW: [],
    ACCEPTED: [],
    COOKING: [],
    READY: [],
  });
  const [loading, setLoading] = useState(true);
  const [newlyArrivedOrders, setNewlyArrivedOrders] = useState(new Set());
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const previousNewOrderIdsRef = useRef(new Set());

  // Play notification sound for new orders
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, []);

  const fetchAllOrders = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch orders for each status
      const [newOrders, acceptedOrders, cookingOrders, readyOrders] = await Promise.all([
        apiClient.get('/orders', { params: { status: 'NEW' } }),
        apiClient.get('/orders', { params: { status: 'ACCEPTED' } }),
        apiClient.get('/orders', { params: { status: 'COOKING' } }),
        apiClient.get('/orders', { params: { status: 'READY' } }),
      ]);

      // Detect newly arrived orders using ref instead of state
      const currentNewOrderIds = new Set(newOrders.data.map(order => order.orderId));
      const newArrivals = [];
      
      currentNewOrderIds.forEach(orderId => {
        if (!previousNewOrderIdsRef.current.has(orderId)) {
          newArrivals.push(orderId);
        }
      });

      // If there are new arrivals, play sound and highlight them
      if (newArrivals.length > 0 && previousNewOrderIdsRef.current.size > 0) {
        playNotificationSound();
        
        // Add new arrivals to the highlight set
        setNewlyArrivedOrders(prev => {
          const updated = new Set(prev);
          newArrivals.forEach(id => updated.add(id));
          return updated;
        });

        // Remove highlight after 10 seconds
        newArrivals.forEach(orderId => {
          setTimeout(() => {
            setNewlyArrivedOrders(prev => {
              const updated = new Set(prev);
              updated.delete(orderId);
              return updated;
            });
          }, 10000);
        });
      }

      // Update ref with current NEW order IDs
      previousNewOrderIdsRef.current = currentNewOrderIds;

      setOrders({
        NEW: newOrders.data,
        ACCEPTED: acceptedOrders.data,
        COOKING: cookingOrders.data,
        READY: readyOrders.data,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load orders',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [playNotificationSound]); // Only depends on playNotificationSound

  useEffect(() => {
    fetchAllOrders();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchAllOrders();
    }, 10000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount, fetchAllOrders is stable

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiClient.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      // Show success toast
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Order moved to ${newStatus}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });

      // Refresh all orders
      await fetchAllOrders();
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update order status',
      });
      return false;
    }
  };

  const handleStatusChange = (order, currentStatus) => {
    let nextStatus;
    let actionText;

    switch (currentStatus) {
      case 'NEW':
        nextStatus = 'ACCEPTED';
        actionText = 'Accept Order';
        break;
      case 'ACCEPTED':
        nextStatus = 'COOKING';
        actionText = 'Start Cooking';
        break;
      case 'COOKING':
        nextStatus = 'READY';
        actionText = 'Mark as Ready';
        break;
      case 'READY':
        nextStatus = 'SERVED';
        actionText = 'Mark as Served';
        break;
      default:
        return;
    }

    Swal.fire({
      title: actionText,
      text:
        currentStatus === 'READY' && order.whatsappNumber
          ? `Are you sure you want to ${actionText.toLowerCase()}? After that, you can send the bill on WhatsApp.`
          : `Are you sure you want to ${actionText.toLowerCase()}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, proceed',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updated = await updateOrderStatus(order.orderId, nextStatus);

        if (updated && currentStatus === 'READY' && order.whatsappNumber) {
          const sendBillResult = await Swal.fire({
            icon: 'success',
            title: 'Order marked as served',
            text: 'Do you want to open WhatsApp and send the bill now?',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Send Bill',
            cancelButtonText: 'Later',
          });

          if (sendBillResult.isConfirmed) {
            sendWhatsAppBill({ ...order, status: 'SERVED' });
          }
        }
      }
    });
  };

  const handleCancelOrder = (orderId, orderNo) => {
    Swal.fire({
      title: 'Cancel Order',
      text: `Are you sure you want to cancel order ${orderNo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it',
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(orderId, 'CANCELLED');
      }
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getTimeClass = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffMinutes > 15) return 'time-critical';
    if (diffMinutes > 10) return 'time-warning';
    return 'time-normal';
  };

  const handleOrderClick = (order, status) => {
    setSelectedOrder({ ...order, currentStatus: status });
    setShowDetailsModal(true);
  };

  const canSendWhatsAppBill = (status) => status === 'READY' || status === 'SERVED';

  const normalizeWhatsAppNumber = (phone) => {
    if (!phone) return '';

    let cleaned = String(phone).trim().replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
    cleaned = cleaned.replace(/\D/g, '');

    if (cleaned.startsWith('00')) cleaned = cleaned.slice(2);
    if (!cleaned) return '';
    if (cleaned.startsWith('94')) return cleaned;
    if (cleaned.startsWith('0')) return `94${cleaned.slice(1)}`;
    if (cleaned.length === 9) return `94${cleaned}`;

    return cleaned;
  };

  const sendWhatsAppBill = (order) => {
    const normalizedWhatsapp = normalizeWhatsAppNumber(order.whatsappNumber);

    if (!normalizedWhatsapp) {
      Swal.fire('Error', 'No WhatsApp number found for this customer.', 'error');
      return;
    }

    const itemsList = (order.orderItems || [])
      .map((item) => {
        const name = item.itemName || item.foodItem?.itemName || 'Item';
        const qty = item.qty || 1;
        const total = item.lineTotal || qty * Number(item.unitPrice || 0);
        return `${name} x${qty} - Rs. ${parseFloat(total).toFixed(2)}`;
      })
      .join('\n');

    const message =
      `Hello ${order.customerName || ''} 👋\n` +
      `Here is your bill for order #${order.orderNo}.\n\n` +
      `Order ID: #${order.orderNo}\n` +
      `Table: ${order.tableNo || '-'}\n\n` +
      `Items:\n${itemsList}\n\n` +
      `Total: Rs. ${parseFloat(order.totalAmount).toFixed(2)}\n\n` +
      `Thank you for ordering with us 🍔`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${normalizedWhatsapp}&text=${encodedMessage}`;
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!popup) {
      Swal.fire({
        icon: 'warning',
        title: 'Popup blocked',
        text: 'Allow popups for this site and try again.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'WhatsApp opened',
      text: 'Bill message is ready. Tap Send in WhatsApp.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2200,
    });
  };

  const OrderCard = ({ order, status }) => {
    const isNewlyArrived = status === 'NEW' && newlyArrivedOrders.has(order.orderId);
    
    const getStatusButton = () => {
      switch (status) {
        case 'NEW':
          return {
            text: 'Accept Order',
            icon: 'fa-check',
            color: 'success',
          };
        case 'ACCEPTED':
          return {
            text: 'Start Cooking',
            icon: 'fa-fire',
            color: 'warning',
          };
        case 'COOKING':
          return {
            text: 'Mark Ready',
            icon: 'fa-bell',
            color: 'info',
          };
        case 'READY':
          return {
            text: 'Mark Served',
            icon: 'fa-utensils',
            color: 'success',
          };
        default:
          return null;
      }
    };

    const statusButton = getStatusButton();

    return (
      <div 
        className={`order-card card mb-3 ${isNewlyArrived ? 'new-order' : ''}`}
        onClick={() => handleOrderClick(order, status)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <strong className="order-number">{order.orderNo}</strong>
            {order.tableNo && (
              <span className="badge bg-primary ms-2">
                <i className="fas fa-table me-1"></i>
                {order.tableNo}
              </span>
            )}
          </div>
          <span className={`time-badge ${getTimeClass(order.createdAt)}`}>
            <i className="far fa-clock me-1"></i>
            {formatTime(order.createdAt)}
          </span>
        </div>
        <div className="card-body">
          {(order.customerName || order.whatsappNumber) && (
            <div className="customer-info-box mb-2">
              {order.customerName && (
                <div>
                  <i className="fas fa-user me-2 text-secondary"></i>
                  <strong>{order.customerName}</strong>
                </div>
              )}
              {order.whatsappNumber && (
                <div>
                  <i className="fa-brands fa-whatsapp me-2 text-success"></i>
                  <span>{order.whatsappNumber}</span>
                </div>
              )}
            </div>
          )}

          {order.notes && (
            <div className="alert alert-info py-2 mb-2">
              <i className="fas fa-info-circle me-2"></i>
              <small>{order.notes}</small>
            </div>
          )}
          
          <div className="order-items">
            <h6 className="mb-2">
              <i className="fas fa-list me-2"></i>
              Items:
            </h6>
            <ul className="list-unstyled mb-2">
              {order.orderItems.map((item) => (
                <li key={item.orderItemId} className="mb-1">
                  <strong>{item.qty}x</strong> {item.itemName}
                  {item.notes && (
                    <div className="item-notes">
                      <i className="fas fa-sticky-note me-1"></i>
                      <small className="text-muted">{item.notes}</small>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-total mt-2 pt-2 border-top">
            <strong>Total: ${parseFloat(order.totalAmount).toFixed(2)}</strong>
          </div>
        </div>
        <div className="card-footer kds-card-footer">
          {statusButton && (
            <button
              className={`btn btn-${statusButton.color} btn-sm kds-action-btn`}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(order, status);
              }}
            >
              <i className={`fas ${statusButton.icon} me-1`}></i>
              {statusButton.text}
            </button>
          )}

          {canSendWhatsAppBill(status) && order.whatsappNumber && (
            <button
              className="btn btn-sm kds-action-btn btn-whatsapp-send"
              onClick={(e) => {
                e.stopPropagation();
                sendWhatsAppBill(order);
              }}
              title="Send bill via WhatsApp"
            >
              <i className="fa-brands fa-whatsapp me-2"></i>
              Send Bill
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm kds-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCancelOrder(order.orderId, order.orderNo);
            }}
            title="Cancel Order"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'NEW': return 'fa-plus-circle';
      case 'ACCEPTED': return 'fa-check-circle';
      case 'COOKING': return 'fa-fire';
      case 'READY': return 'fa-bell';
      default: return 'fa-circle';
    }
  };

  const StatusColumn = ({ title, status, orders, bgClass }) => (
    <div className="col-md-3">
      <div className={`status-column ${bgClass}`}>
        <h5 className="status-header">
          <i className={`fas ${getStatusIcon(status)} me-2`}></i>
          {title}
          <span className="badge bg-dark ms-2">{orders.length}</span>
        </h5>
        <div className="orders-container">
          {orders.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="fas fa-inbox fa-3x mb-2"></i>
              <p>No orders</p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard key={order.orderId} order={order} status={status} />
            ))
          )}
        </div>
      </div>
    </div>
  );

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    const getNextStatusButton = () => {
      switch (selectedOrder.currentStatus) {
        case 'NEW':
          return { text: 'Accept Order', icon: 'fa-check', color: 'success', nextStatus: 'ACCEPTED' };
        case 'ACCEPTED':
          return { text: 'Start Cooking', icon: 'fa-fire', color: 'warning', nextStatus: 'COOKING' };
        case 'COOKING':
          return { text: 'Mark Ready', icon: 'fa-bell', color: 'info', nextStatus: 'READY' };
        case 'READY':
          return { text: 'Mark Served', icon: 'fa-utensils', color: 'success', nextStatus: 'SERVED' };
        default:
          return null;
      }
    };

    const nextStatusButton = getNextStatusButton();

    const handleModalStatusUpdate = () => {
      if (nextStatusButton) {
        setShowDetailsModal(false);
        handleStatusChange(selectedOrder, selectedOrder.currentStatus);
      }
    };

    const handleModalCancel = () => {
      setShowDetailsModal(false);
      handleCancelOrder(selectedOrder.orderId, selectedOrder.orderNo);
    };

    return (
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-receipt me-2"></i>
            Order Details - {selectedOrder.orderNo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="info-card">
                <label className="text-muted small mb-1">Order Number</label>
                <div className="h5 mb-0">{selectedOrder.orderNo}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <label className="text-muted small mb-1">Table Number</label>
                <div className="h5 mb-0">
                  {selectedOrder.tableNo ? (
                    <>
                      <i className="fas fa-table me-2 text-primary"></i>
                      {selectedOrder.tableNo}
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <label className="text-muted small mb-1">Status</label>
                <div className="h5 mb-0">
                  <span className={`badge bg-${getStatusBadgeColor(selectedOrder.currentStatus)}`}>
                    {selectedOrder.currentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="info-card">
                <label className="text-muted small mb-1">Order Time</label>
                <div>
                  <i className="far fa-clock me-2"></i>
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-card">
                <label className="text-muted small mb-1">Time Elapsed</label>
                <div className={`badge ${getTimeClass(selectedOrder.createdAt)}`}>
                  {formatTime(selectedOrder.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {selectedOrder.notes && (
            <div className="alert alert-info mb-3">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Notes:</strong> {selectedOrder.notes}
            </div>
          )}

          {(selectedOrder.customerName || selectedOrder.whatsappNumber) && (
            <div className="alert alert-light border mb-3">
              {selectedOrder.customerName && (
                <div className="mb-1">
                  <i className="fas fa-user me-2 text-secondary"></i>
                  <strong>Customer:</strong> {selectedOrder.customerName}
                </div>
              )}
              {selectedOrder.whatsappNumber && (
                <div>
                  <i className="fa-brands fa-whatsapp me-2 text-success"></i>
                  <strong>WhatsApp:</strong> {selectedOrder.whatsappNumber}
                </div>
              )}
            </div>
          )}

          <div className="order-items-section">
            <h6 className="mb-3">
              <i className="fas fa-list me-2"></i>
              Order Items
            </h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Unit Price</th>
                    <th className="text-end">Total</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderItems.map((item) => (
                    <tr key={item.orderItemId}>
                      <td>
                        <strong>{item.itemName}</strong>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary">{item.qty}</span>
                      </td>
                      <td className="text-end">${parseFloat(item.unitPrice).toFixed(2)}</td>
                      <td className="text-end">
                        <strong>${parseFloat(item.lineTotal).toFixed(2)}</strong>
                      </td>
                      <td>
                        {item.notes ? (
                          <small className="text-muted">
                            <i className="fas fa-sticky-note me-1"></i>
                            {item.notes}
                          </small>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Grand Total:</strong>
                    </td>
                    <td className="text-end">
                      <strong className="text-primary h5 mb-0">
                        ${parseFloat(selectedOrder.totalAmount).toFixed(2)}
                      </strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button 
            variant="outline-danger" 
            onClick={handleModalCancel}
          >
            <i className="fas fa-times me-2"></i>
            Cancel Order
          </Button>
          <div>
            {canSendWhatsAppBill(selectedOrder.currentStatus) && selectedOrder.whatsappNumber && (
              <Button
                variant="success"
                onClick={() => sendWhatsAppBill(selectedOrder)}
                className="me-2 btn-whatsapp-send"
              >
                <i className="fa-brands fa-whatsapp me-2"></i>
                Send Bill
              </Button>
            )}
            <Button 
              variant="secondary" 
              onClick={() => setShowDetailsModal(false)}
              className="me-2"
            >
              Close
            </Button>
            {nextStatusButton && (
              <Button 
                variant={nextStatusButton.color}
                onClick={handleModalStatusUpdate}
              >
                <i className={`fas ${nextStatusButton.icon} me-2`}></i>
                {nextStatusButton.text}
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'NEW': return 'primary';
      case 'ACCEPTED': return 'warning';
      case 'COOKING': return 'danger';
      case 'READY': return 'success';
      case 'SERVED': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="kds-header">
                  <h2>
                    <i className="fas fa-chart-line me-2"></i>
                    Kitchen Display System
                  </h2>
                  <div className="header-actions">
                    <button 
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={fetchAllOrders}
                      disabled={loading}
                    >
                      <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''} me-1`}></i>
                      Refresh
                    </button>
                    <span className="badge bg-secondary">
                      <i className="far fa-clock me-1"></i>
                      Auto-refresh: 10s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Columns */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading orders...</p>
              </div>
            ) : (
              <div className="row g-3">
                <StatusColumn
                  title="New Orders"
                  status="NEW"
                  orders={orders.NEW}
                  bgClass="bg-new"
                />
                <StatusColumn
                  title="Accepted"
                  status="ACCEPTED"
                  orders={orders.ACCEPTED}
                  bgClass="bg-accepted"
                />
                <StatusColumn
                  title="Cooking"
                  status="COOKING"
                  orders={orders.COOKING}
                  bgClass="bg-cooking"
                />
                <StatusColumn
                  title="Ready"
                  status="READY"
                  orders={orders.READY}
                  bgClass="bg-ready"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal />
    </div>
  );
};

export default KitchenKDS;
