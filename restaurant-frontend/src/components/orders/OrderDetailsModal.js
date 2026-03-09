import React from 'react';
import './OrderDetailsModal.css';

/**
 * OrderDetailsModal - Production Ready Print System
 * 
 * Features:
 * ✅ Thermal printer support (80mm layout)
 * ✅ Auto-print with render delay (200ms)
 * ✅ Auto-close modal after print (500ms)
 * ✅ Restaurant name header on ticket
 * 
 * Future Enhancement:
 * 🔧 ESC/POS Cash Drawer Integration
 *    - Add backend endpoint: POST /api/orders/:id/print-receipt
 *    - Send ESC/POS commands directly to thermal printer IP
 *    - Auto-open cash drawer command: \x10\x14\x01\x00\x05
 *    - Requires: node-thermal-printer or escpos npm package
 */

const OrderDetailsModal = ({ order, onClose, onStatusUpdate }) => {
  const orderStatuses = ['PENDING', 'PREPARING', 'READY', 'SERVED'];
  
  // Get restaurant name (can be configured via env variable or fetched from backend)
  // For production: Add REACT_APP_RESTAURANT_NAME to .env file
  const restaurantName = process.env.REACT_APP_RESTAURANT_NAME || 'Restaurant Name';

  const formatCurrency = (amount) => {
    return `Rs. ${parseFloat(amount).toFixed(2)}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      PENDING: 'badge-warning',
      PREPARING: 'badge-info',
      READY: 'badge-primary',
      SERVED: 'badge-success',
      CANCELLED: 'badge-danger'
    };
    return statusClasses[status] || 'badge-secondary';
  };

  const calculateLineTotal = (item) => {
    return item.quantity * item.unitPrice;
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop-custom')) {
      onClose();
    }
  };

  const handlePrint = () => {
    // Small delay to ensure modal content is fully rendered
    setTimeout(() => {
      window.print();
      
      // Auto close modal after print dialog (better UX for kitchen staff)
      setTimeout(() => {
        onClose();
      }, 500);
    }, 200);
  };

  return (
    <div className="modal-backdrop-custom" onClick={handleBackdropClick}>
      <div className="order-details-modal">
        <div className="modal-header-custom">
          <h3>
            <i className="fas fa-receipt me-2"></i>
            Order Details
          </h3>
          <button className="btn-close-custom" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body-custom">
          {/* Print Area - Thermal Printer Layout */}
          <div className="print-area">
            {/* Restaurant Header */}
            <h4 className="text-center" style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px', textTransform: 'uppercase' }}>
              {restaurantName}
            </h4>
            <p className="text-center" style={{ fontSize: '13px', margin: '0 0 10px 0', color: '#666' }}>Order Ticket</p>
            <hr style={{ borderTop: '2px solid #000', margin: '10px 0' }} />

            {/* Order Information */}
            <h5 className="text-center" style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>ORDER DETAILS</h5>
            <p style={{ margin: '5px 0' }}><strong>Order:</strong> {order.orderNo}</p>
            <p style={{ margin: '5px 0' }}><strong>Table:</strong> {order.tableNo}</p>
            <p style={{ margin: '5px 0' }}><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p style={{ margin: '5px 0' }}><strong>Status:</strong> {order.status}</p>
            <hr style={{ borderTop: '2px dashed #000', margin: '10px 0' }} />

            {/* Items */}
            {order.orderItems && order.orderItems.map((item, index) => (
              <div key={item.orderItemId} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{item.foodItem?.name || 'Unknown Item'} x {item.quantity}</span>
                  <span>Rs. {calculateLineTotal(item).toFixed(2)}</span>
                </div>
                {item.specialInstructions && (
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '3px', fontStyle: 'italic' }}>
                    Note: {item.specialInstructions}
                  </div>
                )}
              </div>
            ))}

            <hr style={{ borderTop: '2px dashed #000', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
              <strong>TOTAL:</strong>
              <strong>Rs. {parseFloat(order.totalAmount).toFixed(2)}</strong>
            </div>

            {order.specialInstructions && (
              <div style={{ marginTop: '15px', padding: '8px', border: '1px dashed #000' }}>
                <strong>Special Instructions:</strong>
                <div style={{ fontSize: '11px', marginTop: '5px' }}>{order.specialInstructions}</div>
              </div>
            )}

            <p className="text-center" style={{ marginTop: '20px', fontWeight: 'bold' }}>Thank You!</p>
          </div>

          {/* Order Header Information */}
          <div className="order-header-info">
            <div className="row">
              <div className="col-md-6">
                <div className="info-group">
                  <label>Order Number:</label>
                  <span className="info-value">{order.orderNo}</span>
                </div>
                <div className="info-group">
                  <label>Table Number:</label>
                  <span className="info-value">{order.tableNo}</span>
                </div>
                <div className="info-group">
                  <label>Status:</label>
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-group">
                  <label>Created At:</label>
                  <span className="info-value">{formatDateTime(order.createdAt)}</span>
                </div>
                <div className="info-group">
                  <label>Total Amount:</label>
                  <span className="info-value total-amount">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {order.specialInstructions && (
              <div className="info-group mt-3">
                <label>Special Instructions:</label>
                <div className="special-instructions">
                  {order.specialInstructions}
                </div>
              </div>
            )}
          </div>

          {/* Order Items Table */}
          <div className="order-items-section">
            <h5 className="section-title">
              <i className="fas fa-utensils me-2"></i>
              Order Items
            </h5>
            <div className="table-responsive">
              <table className="table order-items-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item, index) => (
                      <tr key={item.orderItemId}>
                        <td>{index + 1}</td>
                        <td>
                          <strong>{item.foodItem?.name || 'Unknown Item'}</strong>
                          {item.specialInstructions && (
                            <div className="item-notes">
                              <i className="fas fa-comment-dots me-1"></i>
                              {item.specialInstructions}
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="quantity-badge">{item.quantity}</span>
                        </td>
                        <td>{formatCurrency(item.unitPrice)}</td>
                        <td>
                          <strong>{formatCurrency(calculateLineTotal(item))}</strong>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan="4" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong className="total-amount">{formatCurrency(order.totalAmount)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Quick Status Update */}
          {order.status !== 'CANCELLED' && order.status !== 'SERVED' && (
            <div className="status-update-section">
              <h5 className="section-title">
                <i className="fas fa-sync-alt me-2"></i>
                Quick Status Update
              </h5>
              <div className="status-buttons">
                {orderStatuses.map(status => (
                  status !== order.status && (
                    <button
                      key={status}
                      className={`btn btn-sm btn-outline-${
                        status === 'PENDING' ? 'warning' :
                        status === 'PREPARING' ? 'info' :
                        status === 'READY' ? 'primary' :
                        'success'
                      }`}
                      onClick={() => onStatusUpdate(order.orderId, status)}
                    >
                      Update to {status}
                    </button>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer-custom">
          <button className="btn btn-dark" onClick={handlePrint}>
            <i className="fas fa-print me-2"></i>
            Print Ticket
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            <i className="fas fa-times me-1"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
