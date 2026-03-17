import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { billingAPI } from '../api/apiClient';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuthStore } from '../store/authStore';
import './ServiceBillingDashboard.css';

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function normalizeWhatsAppNumber(raw) {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '94' + digits.slice(1);
  if (!digits.startsWith('94')) digits = '94' + digits;
  return '+' + digits;
}

function formatCurrency(val) {
  return 'Rs. ' + parseFloat(val || 0).toFixed(2);
}

function formatDateTime(dateStr) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function getOrderAge(createdAt) {
  const mins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m ago`;
}

// ---------------------------------------------------------------------------
// Printable Invoice component (rendered off-screen, triggered by window.print)
// ---------------------------------------------------------------------------

function PrintableInvoice({ invoice, restaurantName }) {
  const items = Array.isArray(invoice.orderItemsJson) ? invoice.orderItemsJson : [];
  return (
    <div id="printable-invoice" className="printable-invoice">
      <div className="pi-header">
        <div className="pi-restaurant">{restaurantName || 'Restaurant'}</div>
        <div className="pi-title">TAX INVOICE</div>
        <div className="pi-meta">
          <span><strong>Invoice #:</strong> {invoice.invoiceNumber}</span>
          <span><strong>Date:</strong> {formatDateTime(invoice.createdAt)}</span>
        </div>
        {invoice.tableNo && (
          <div className="pi-meta">
            <span><strong>Table:</strong> {invoice.tableNo}</span>
            {invoice.customerName && (
              <span><strong>Customer:</strong> {invoice.customerName}</span>
            )}
          </div>
        )}
      </div>

      <table className="pi-items">
        <thead>
          <tr>
            <th>Item</th>
            <th className="pi-center">Qty</th>
            <th className="pi-right">Unit</th>
            <th className="pi-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.itemName}{item.notes ? <span className="pi-note"> ({item.notes})</span> : ''}</td>
              <td className="pi-center">{item.qty}</td>
              <td className="pi-right">{formatCurrency(item.unitPrice)}</td>
              <td className="pi-right">{formatCurrency(item.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pi-totals">
        <div className="pi-total-row"><span>Subtotal</span><span>{formatCurrency(invoice.subtotal)}</span></div>
        {parseFloat(invoice.taxAmount) > 0 && (
          <div className="pi-total-row"><span>Tax</span><span>{formatCurrency(invoice.taxAmount)}</span></div>
        )}
        {parseFloat(invoice.serviceCharge) > 0 && (
          <div className="pi-total-row"><span>Service Charge</span><span>{formatCurrency(invoice.serviceCharge)}</span></div>
        )}
        {parseFloat(invoice.discountAmount) > 0 && (
          <div className="pi-total-row pi-discount"><span>Discount</span><span>– {formatCurrency(invoice.discountAmount)}</span></div>
        )}
        <div className="pi-total-row pi-grand-total"><span>TOTAL</span><span>{formatCurrency(invoice.totalAmount)}</span></div>
      </div>

      <div className="pi-footer">Thank you for dining with us!</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Invoice Detail Modal
// ---------------------------------------------------------------------------

function InvoiceModal({ invoice, restaurantName, onClose, onMarkServed, onMarkPaid, onWhatsApp }) {
  const printRef = useRef();

  const handlePrint = async () => {
    if (invoice.onBeforePrint) {
      await invoice.onBeforePrint();
    }
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="invoice-modal" onClick={(e) => e.stopPropagation()}>
        <div className="invoice-modal-header">
          <h5>Invoice #{invoice.invoiceNumber}</h5>
          <button className="btn-icon" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="invoice-modal-body" ref={printRef}>
          <PrintableInvoice invoice={invoice} restaurantName={restaurantName} />
        </div>

        <div className="invoice-modal-footer">
          <button className="btn btn-outline-secondary btn-sm" onClick={onClose}>
            Close
          </button>
          {invoice.invoiceStatus === 'PENDING' && (
            <button className="btn btn-success btn-sm" onClick={onMarkPaid}>
              <i className="fas fa-check-circle me-1"></i>Mark Paid
            </button>
          )}
          {onMarkServed && (
            <button className="btn btn-primary btn-sm" onClick={onMarkServed}>
              <i className="fas fa-concierge-bell me-1"></i>Mark Served
            </button>
          )}
          {invoice.whatsappNumber && (
            <button className="btn btn-whatsapp btn-sm" onClick={onWhatsApp}>
              <i className="fab fa-whatsapp me-1"></i>Send via WhatsApp
            </button>
          )}
          <button className="btn btn-dark btn-sm" onClick={handlePrint}>
            <i className="fas fa-print me-1"></i>Print
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Create Invoice Modal (charge extras before printing)
// ---------------------------------------------------------------------------

function CreateInvoiceModal({ order, onConfirm, onClose, loading }) {
  const [taxAmount, setTaxAmount] = useState('0');
  const [serviceCharge, setServiceCharge] = useState('0');
  const [discountAmount, setDiscountAmount] = useState('0');

  const subtotal = parseFloat(order.totalAmount || 0);
  const tax = parseFloat(taxAmount) || 0;
  const charge = parseFloat(serviceCharge) || 0;
  const discount = parseFloat(discountAmount) || 0;
  const total = subtotal + tax + charge - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ orderId: order.orderId, taxAmount: tax, serviceCharge: charge, discountAmount: discount });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="create-invoice-modal" onClick={(e) => e.stopPropagation()}>
        <div className="invoice-modal-header">
          <h5>Create Invoice – Order {order.orderNo}</h5>
          <button className="btn-icon" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="invoice-modal-body">
            <div className="ci-row">
              <label>Subtotal</label>
              <span className="ci-value">{formatCurrency(subtotal)}</span>
            </div>
            <div className="ci-row ci-input-row">
              <label htmlFor="tax">Tax Amount</label>
              <input
                id="tax"
                type="number" min="0" step="0.01"
                className="form-control form-control-sm ci-input"
                value={taxAmount}
                onChange={(e) => setTaxAmount(e.target.value)}
              />
            </div>
            <div className="ci-row ci-input-row">
              <label htmlFor="service">Service Charge</label>
              <input
                id="service"
                type="number" min="0" step="0.01"
                className="form-control form-control-sm ci-input"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(e.target.value)}
              />
            </div>
            <div className="ci-row ci-input-row">
              <label htmlFor="discount">Discount</label>
              <input
                id="discount"
                type="number" min="0" step="0.01"
                className="form-control form-control-sm ci-input"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
              />
            </div>
            <div className="ci-row ci-grand-total">
              <label>Grand Total</label>
              <span className="ci-value ci-total">{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="invoice-modal-footer">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-1"></span>Saving…</>
              ) : (
                <><i className="fas fa-print me-1"></i>Save & Print Invoice</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------------------------

const ServiceBillingDashboard = ({ pageTitle = 'Service & Billing', pageIcon = 'fas fa-file-invoice-dollar' }) => {
  const { user } = useAuthStore();
  const { subscribe, connected } = useWebSocket();
  const isCashierDashboard = user?.role === 'cashier';

  // Ready orders state
  const [readyOrders, setReadyOrders] = useState([]);
  const [loadingReady, setLoadingReady] = useState(true);
  const [readyError, setReadyError] = useState('');

  // Cashier queue state
  const [cashierQueue, setCashierQueue] = useState([]);
  const [loadingCashierQueue, setLoadingCashierQueue] = useState(true);
  const [cashierQueueError, setCashierQueueError] = useState('');

  // Invoice history state
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [invError, setInvError] = useState('');

  // Filter state for invoice history
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterTable, setFilterTable] = useState('');

  // Modal state
  const [createModalOrder, setCreateModalOrder] = useState(null);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);

  // Notification helper
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch READY orders
  const fetchReadyOrders = useCallback(async () => {
    try {
      setReadyError('');
      const res = await billingAPI.getReadyOrders();
      setReadyOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setReadyError(err?.response?.data?.message || 'Failed to load ready orders.');
    } finally {
      setLoadingReady(false);
    }
  }, []);

  const fetchCashierQueue = useCallback(async () => {
    try {
      setCashierQueueError('');
      const res = await billingAPI.getCashierQueue();
      setCashierQueue(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setCashierQueueError(err?.response?.data?.message || 'Failed to load cashier queue.');
    } finally {
      setLoadingCashierQueue(false);
    }
  }, []);

  // Fetch invoice history
  const fetchInvoices = useCallback(async () => {
    try {
      setInvError('');
      const params = {};
      if (filterFrom) params.from = filterFrom;
      if (filterTo) params.to = filterTo;
      if (filterTable) params.tableNo = filterTable;
      const res = await billingAPI.getInvoices(params);
      setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setInvError(err?.response?.data?.message || 'Failed to load invoices.');
    } finally {
      setLoadingInvoices(false);
    }
  }, [filterFrom, filterTo, filterTable]);

  useEffect(() => {
    if (isCashierDashboard) {
      fetchCashierQueue();
      return;
    }

    fetchReadyOrders();
  }, [fetchCashierQueue, fetchReadyOrders, isCashierDashboard]);
  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  // Auto-refresh via WebSocket
  useEffect(() => {
    if (!connected) return;
    const unsubscribers = [
      subscribe('dashboard:refresh', () => {
        if (isCashierDashboard) {
          fetchCashierQueue();
        } else {
          fetchReadyOrders();
        }
        fetchInvoices();
      }),
      subscribe('cashier:queue-update', fetchCashierQueue),
      subscribe('order:status-update', () => {
        if (!isCashierDashboard) {
          fetchReadyOrders();
        }
      }),
      subscribe('order:new', () => {
        if (!isCashierDashboard) {
          fetchReadyOrders();
        }
      }),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [connected, fetchCashierQueue, fetchInvoices, fetchReadyOrders, isCashierDashboard, subscribe]);

  // Polling fallback (30s)
  useEffect(() => {
    const id = setInterval(() => {
      if (isCashierDashboard) {
        fetchCashierQueue();
      } else {
        fetchReadyOrders();
      }
    }, 30000);
    return () => clearInterval(id);
  }, [fetchCashierQueue, fetchReadyOrders, isCashierDashboard]);

  // Create invoice flow
  const handleOpenCreateModal = (order) => setCreateModalOrder(order);

  const handleConfirmCreateInvoice = async (dto) => {
    setCreatingLoading(true);
    try {
      const res = await billingAPI.createInvoice(dto);
      setCreatingLoading(false);
      setCreateModalOrder(null);
      showToast(`Invoice ${res.data.invoiceNumber} saved!`);
      // Remove order from ready list, refresh invoices & open preview
      setReadyOrders((prev) => prev.filter((o) => o.orderId !== dto.orderId));
      setViewInvoice(res.data);
      fetchInvoices();
    } catch (err) {
      setCreatingLoading(false);
      showToast(err?.response?.data?.message || 'Failed to create invoice.', 'error');
    }
  };

  // Mark served
  const handleMarkServed = async (orderId) => {
    try {
      await billingAPI.markServed(orderId);
      setViewInvoice(null);
      showToast('Order marked as served!');
      fetchInvoices();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to mark as served.', 'error');
    }
  };

  // Mark paid
  const handleMarkPaid = async (invoiceId) => {
    try {
      const res = await billingAPI.markInvoicePaid(invoiceId);
      setViewInvoice(res.data);
      fetchCashierQueue();
      fetchInvoices();
      showToast('Invoice marked as paid!');
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed.', 'error');
    }
  };

  const handleCashierPrint = async (invoice) => {
    try {
      if (!invoice.isPrinted) {
        const res = await billingAPI.markInvoicePrinted(invoice.invoiceId);
        const updatedInvoice = res.data;
        setCashierQueue((prev) => prev.map((item) => (
          item.invoiceId === updatedInvoice.invoiceId ? updatedInvoice : item
        )));
        setInvoices((prev) => prev.map((item) => (
          item.invoiceId === updatedInvoice.invoiceId ? updatedInvoice : item
        )));
        setViewInvoice((prev) => (prev?.invoiceId === updatedInvoice.invoiceId ? updatedInvoice : prev));
      }
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to record invoice print.', 'error');
    }
  };

  // WhatsApp bill
  const handleWhatsApp = async (invoice) => {
    const phone = normalizeWhatsAppNumber(invoice.whatsappNumber);
    if (!phone) { showToast('No WhatsApp number on this invoice.', 'error'); return; }
    const items = Array.isArray(invoice.orderItemsJson) ? invoice.orderItemsJson : [];
    const lines = items.map((i) => `  • ${i.itemName} x${i.qty} = ${formatCurrency(i.lineTotal)}`).join('\n');
    const msg = `🧾 *Invoice ${invoice.invoiceNumber}*\nTable: ${invoice.tableNo || '–'}\n\n${lines}\n\n*Total: ${formatCurrency(invoice.totalAmount)}*\n\nThank you! 🙏`;
    window.open(`https://api.whatsapp.com/send?phone=${phone.replace('+', '')}&text=${encodeURIComponent(msg)}`, '_blank');
    // Record the send
    try {
      await billingAPI.markWhatsappSent(invoice.invoiceId);
      fetchInvoices();
    } catch (_) { /* best-effort */ }
  };

  const restaurantName = user?.restaurantName || 'Restaurant';

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="content-title">
                <i className={`${pageIcon} me-2 text-primary`}></i>
                {pageTitle}
              </h1>
              <div className="d-flex align-items-center gap-2">
                <span className={`ws-badge ${connected ? 'ws-connected' : 'ws-disconnected'}`}>
                  <i className={`fas fa-circle me-1 ${connected ? 'text-success' : 'text-danger'}`}></i>
                  {connected ? 'Live' : 'Offline'}
                </span>
                <button className="btn btn-sm btn-outline-primary" onClick={() => { fetchReadyOrders(); fetchInvoices(); }}>
                  <i className="fas fa-sync-alt me-1"></i>Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            {/* ── SECTION 1: Ready to Bill / Cashier Queue ── */}
            <section className="billing-section">
              <div className="section-heading">
                <i className={`${isCashierDashboard ? 'fas fa-cash-register text-primary' : 'fas fa-bell text-warning'} me-2`}></i>
                {isCashierDashboard ? 'Cashier Queue' : 'Ready to Bill'}
                <span className={`badge ${isCashierDashboard ? 'bg-primary' : 'bg-warning text-dark'} ms-2`}>
                  {isCashierDashboard ? cashierQueue.length : readyOrders.length}
                </span>
              </div>

              {(isCashierDashboard ? loadingCashierQueue : loadingReady) ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : (isCashierDashboard ? cashierQueueError : readyError) ? (
                <div className="alert alert-danger">{isCashierDashboard ? cashierQueueError : readyError}</div>
              ) : (isCashierDashboard ? cashierQueue.length === 0 : readyOrders.length === 0) ? (
                <div className="empty-state">
                  <i className={`fas ${isCashierDashboard ? 'fa-inbox text-primary' : 'fa-check-circle text-success'} fa-2x mb-2`}></i>
                  <p className="mb-0">{isCashierDashboard ? 'No payment details waiting for cashier.' : 'No orders waiting to be billed.'}</p>
                </div>
              ) : (
                <div className="ready-orders-grid">
                  {isCashierDashboard
                    ? cashierQueue.map((invoice) => (
                      <CashierQueueCard
                        key={invoice.invoiceId}
                        invoice={invoice}
                        onOpen={() => setViewInvoice(invoice)}
                      />
                    ))
                    : readyOrders.map((order) => (
                      <ReadyOrderCard
                        key={order.orderId}
                        order={order}
                        onBill={() => handleOpenCreateModal(order)}
                        onWhatsApp={() => {
                          const phone = normalizeWhatsAppNumber(order.whatsappNumber);
                          if (!phone) { showToast('No WhatsApp number.', 'error'); return; }
                          const itemLines = (order.orderItems || []).map((i) => `  • ${i.itemName} x${i.qty}`).join('\n');
                          const msg = `🍽️ *Order Ready!*\nOrder: ${order.orderNo}\nTable: ${order.tableNo || '–'}\n\n${itemLines}\n\n*Total: ${formatCurrency(order.totalAmount)}*`;
                          window.open(`https://api.whatsapp.com/send?phone=${phone.replace('+', '')}&text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                      />
                    ))}
                </div>
              )}
            </section>

            {/* ── SECTION 2: Invoice History ── */}
            <section className="billing-section mt-4">
              <div className="section-heading">
                <i className="fas fa-history text-primary me-2"></i>
                Invoice History
              </div>

              {/* Filters */}
              <div className="invoice-filters mb-3">
                <input
                  type="date"
                  className="form-control form-control-sm filter-field"
                  value={filterFrom}
                  onChange={(e) => setFilterFrom(e.target.value)}
                  placeholder="From"
                  title="From date"
                />
                <input
                  type="date"
                  className="form-control form-control-sm filter-field"
                  value={filterTo}
                  onChange={(e) => setFilterTo(e.target.value)}
                  placeholder="To"
                  title="To date"
                />
                <input
                  type="text"
                  className="form-control form-control-sm filter-field"
                  value={filterTable}
                  onChange={(e) => setFilterTable(e.target.value)}
                  placeholder="Table #"
                />
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => { setFilterFrom(''); setFilterTo(''); setFilterTable(''); }}
                >
                  <i className="fas fa-times me-1"></i>Clear
                </button>
              </div>

              {loadingInvoices ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : invError ? (
                <div className="alert alert-danger">{invError}</div>
              ) : invoices.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-file-alt text-muted fa-2x mb-2"></i>
                  <p className="mb-0">No invoices found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover invoice-table">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Table</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>WhatsApp</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv.invoiceId}>
                          <td><code>{inv.invoiceNumber}</code></td>
                          <td>{inv.tableNo || '–'}</td>
                          <td>{inv.customerName || '–'}</td>
                          <td>{formatCurrency(inv.totalAmount)}</td>
                          <td>
                            <span className={`badge ${inv.invoiceStatus === 'PAID' ? 'bg-success' : 'bg-secondary'}`}>
                              {inv.invoiceStatus}
                            </span>
                          </td>
                          <td>
                            {inv.isSentWhatsapp ? (
                              <span className="badge bg-success"><i className="fab fa-whatsapp me-1"></i>Sent</span>
                            ) : (
                              <span className="badge bg-light text-muted">–</span>
                            )}
                          </td>
                          <td className="text-muted small">{formatDateTime(inv.createdAt)}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setViewInvoice(inv)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {createModalOrder && (
        <CreateInvoiceModal
          order={createModalOrder}
          loading={creatingLoading}
          onConfirm={handleConfirmCreateInvoice}
          onClose={() => setCreateModalOrder(null)}
        />
      )}

      {viewInvoice && (
        <InvoiceModal
          invoice={{
            ...viewInvoice,
            onBeforePrint: isCashierDashboard ? () => handleCashierPrint(viewInvoice) : undefined,
          }}
          restaurantName={restaurantName}
          onClose={() => setViewInvoice(null)}
          onMarkServed={
            !isCashierDashboard && viewInvoice.orderId
              ? () => handleMarkServed(viewInvoice.orderId)
              : null
          }
          onMarkPaid={() => handleMarkPaid(viewInvoice.invoiceId)}
          onWhatsApp={() => handleWhatsApp(viewInvoice)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`billing-toast billing-toast-${toast.type}`}>
          <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Ready Order Card sub-component
// ---------------------------------------------------------------------------

function ReadyOrderCard({ order, onBill, onWhatsApp }) {
  const items = order.orderItems || [];
  const age = getOrderAge(order.createdAt);

  return (
    <div className="ready-order-card">
      <div className="roc-header">
        <span className="roc-order-no">{order.orderNo}</span>
        <span className="roc-age text-muted">{age}</span>
        <span className="badge bg-success ms-auto">READY</span>
      </div>
      <div className="roc-meta">
        {order.tableNo && <span><i className="fas fa-chair me-1"></i>Table {order.tableNo}</span>}
        {order.customerName && <span><i className="fas fa-user me-1"></i>{order.customerName}</span>}
      </div>
      <ul className="roc-items">
        {items.slice(0, 4).map((item, i) => (
          <li key={i}>
            <span>{item.itemName}</span>
            <span className="text-muted">&times;{item.qty}</span>
          </li>
        ))}
        {items.length > 4 && <li className="text-muted small">+{items.length - 4} more…</li>}
      </ul>
      <div className="roc-total">{formatCurrency(order.totalAmount)}</div>
      <div className="roc-actions">
        <button className="btn btn-primary btn-sm flex-grow-1" onClick={onBill}>
          <i className="fas fa-print me-1"></i>Print Invoice
        </button>
        {order.whatsappNumber && (
          <button className="btn btn-whatsapp btn-sm" onClick={onWhatsApp} title="Send via WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </button>
        )}
      </div>
    </div>
  );
}

function CashierQueueCard({ invoice, onOpen }) {
  return (
    <div className="ready-order-card">
      <div className="roc-header">
        <span className="roc-order-no">{invoice.invoiceNumber}</span>
        <span className="badge bg-primary ms-auto">CASHIER</span>
      </div>
      <div className="roc-meta">
        {invoice.tableNo && <span><i className="fas fa-chair me-1"></i>Table {invoice.tableNo}</span>}
        {invoice.customerName && <span><i className="fas fa-user me-1"></i>{invoice.customerName}</span>}
      </div>
      <ul className="roc-items">
        {(Array.isArray(invoice.orderItemsJson) ? invoice.orderItemsJson : []).slice(0, 4).map((item, i) => (
          <li key={i}>
            <span>{item.itemName}</span>
            <span className="text-muted">&times;{item.qty}</span>
          </li>
        ))}
      </ul>
      <div className="roc-total">{formatCurrency(invoice.totalAmount)}</div>
      <div className="roc-meta mb-2">
        <span><i className="fas fa-clock me-1"></i>{formatDateTime(invoice.sentToCashierAt || invoice.createdAt)}</span>
      </div>
      <div className="roc-actions">
        <button className="btn btn-primary btn-sm flex-grow-1" onClick={onOpen}>
          <i className="fas fa-print me-1"></i>{invoice.isPrinted ? 'Reprint Bill' : 'Print Bill'}
        </button>
      </div>
    </div>
  );
}

export default ServiceBillingDashboard;
