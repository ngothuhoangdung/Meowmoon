'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from '../tham-xynh.module.css';

const STATUSES = ['all', 'Chờ tư vấn', 'Chưa có hàng', 'Chờ vận chuyển', 'Đang vận chuyển', 'Done', 'Hoàn hàng', 'Hủy đơn'];
const STATUS_LABELS = { all: 'Tất cả' };

function formatMoney(amount) {
  if (!amount) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function getStatusBadge(status) {
  const map = {
    'Chờ tư vấn': styles.badgeWaiting,
    'Chưa có hàng': styles.badgeNoStock,
    'Chờ vận chuyển': styles.badgeWaitShip,
    'Đang vận chuyển': styles.badgeShipping,
    'Done': styles.badgeDone,
    'Hoàn hàng': styles.badgeReturn,
    'Hủy đơn': styles.badgeCanceled,
  };
  return <span className={map[status] || styles.badge}>{status}</span>;
}

const EMPTY_ORDER = {
  order_number: '',
  order_date: new Date().toISOString().split('T')[0],
  customer_name: '',
  customer_phone: '',
  customer_address: '',
  items_detail: '',
  total_amount: '',
  shipping_support: '',
  status: 'Chờ tư vấn',
  notes: '',
};

export default function DonBanPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState(EMPTY_ORDER);

  const fetchOrders = useCallback(async () => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('status', filter);
    if (search) params.set('search', search);

    try {
      const res = await fetch(`/api/tham-xynh/orders?${params}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Debounce search
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearch = (value) => {
    setSearch(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => fetchOrders(), 300));
  };

  const openCreate = () => {
    setEditingOrder(null);
    setFormData(EMPTY_ORDER);
    setShowModal(true);
  };

  const openEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      order_number: order.order_number || '',
      order_date: order.order_date || '',
      customer_name: order.customer_name || '',
      customer_phone: order.customer_phone || '',
      customer_address: order.customer_address || '',
      items_detail: order.items_detail || '',
      total_amount: order.total_amount || '',
      shipping_support: order.shipping_support || '',
      status: order.status || 'Chờ tư vấn',
      notes: order.notes || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const body = {
      ...formData,
      total_amount: parseInt(formData.total_amount) || 0,
      shipping_support: parseInt(formData.shipping_support) || 0,
      order_number: parseInt(formData.order_number) || undefined,
    };

    try {
      if (editingOrder) {
        await fetch(`/api/tham-xynh/orders/${editingOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/tham-xynh/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }
      setShowModal(false);
      fetchOrders();
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa đơn này?')) return;
    try {
      await fetch(`/api/tham-xynh/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`/api/tham-xynh/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>📦 Đơn bán</h1>
        <p className={styles.pageSubtitle}>Quản lý tất cả đơn hàng bán ra</p>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div className={styles.filterBar}>
          {STATUSES.map(s => (
            <button
              key={s}
              className={filter === s ? styles.filterChipActive : styles.filterChip}
              onClick={() => setFilter(s)}
            >
              {STATUS_LABELS[s] || s}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm tên, SĐT, sản phẩm..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className={styles.btnPrimary} onClick={openCreate}>
            ➕ Tạo đơn
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Chi tiết</th>
              <th>Thành tiền</th>
              <th>Ship</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(8)].map((_, j) => (
                    <td key={j}><div className={styles.skeleton} style={{ height: 16 }} /></td>
                  ))}
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📦</div>
                    <div className={styles.emptyText}>Chưa có đơn hàng nào</div>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.order_number}</strong></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{order.order_date}</td>
                  <td>
                    <strong>{order.customer_name}</strong>
                    {order.customer_phone && (
                      <div style={{ fontSize: 11, color: '#9d7b6a' }}>{order.customer_phone}</div>
                    )}
                    {order.customer_address && (
                      <div style={{ fontSize: 11, color: '#b5a090', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.customer_address}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={styles.itemsPreview}>
                      {order.items_detail || '—'}
                    </div>
                  </td>
                  <td><span className={styles.amount}>{formatMoney(order.total_amount)}</span></td>
                  <td><span className={styles.amount}>{order.shipping_support ? formatMoney(order.shipping_support) : '—'}</span></td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        fontFamily: 'Quicksand, sans-serif', fontSize: 12, fontWeight: 600,
                        padding: '4px 8px', borderRadius: 8,
                      }}
                    >
                      {STATUSES.filter(s => s !== 'all').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className={styles.actionCell}>
                      <button className={styles.btnIcon} onClick={() => openEdit(order)} title="Sửa">✏️</button>
                      <button className={styles.btnIcon} onClick={() => handleDelete(order.id)} title="Xóa">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingOrder ? `✏️ Sửa đơn #${editingOrder.order_number}` : '➕ Tạo đơn mới'}
              </h3>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formRow3}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số đơn</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="Tự động"
                    value={formData.order_number}
                    onChange={e => setFormData({...formData, order_number: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ngày bán</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={formData.order_date}
                    onChange={e => setFormData({...formData, order_date: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Trạng thái</label>
                  <select
                    className={styles.formSelect}
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    {STATUSES.filter(s => s !== 'all').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tên khách hàng</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.customer_name}
                    onChange={e => setFormData({...formData, customer_name: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số điện thoại</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="0xxx xxx xxx"
                    value={formData.customer_phone}
                    onChange={e => setFormData({...formData, customer_phone: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Địa chỉ</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Địa chỉ giao hàng..."
                  value={formData.customer_address}
                  onChange={e => setFormData({...formData, customer_address: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Chi tiết đơn hàng</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="VD: 10 ốc quế nhỏ — màu 3, 4, 8&#10;20 vát 3 bông&#10;10 túi thiệp"
                  value={formData.items_detail}
                  onChange={e => setFormData({...formData, items_detail: e.target.value})}
                  rows={4}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Thành tiền (VNĐ)</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="VD: 400000"
                    value={formData.total_amount}
                    onChange={e => setFormData({...formData, total_amount: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hỗ trợ vận chuyển (VNĐ)</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="0"
                    value={formData.shipping_support}
                    onChange={e => setFormData({...formData, shipping_support: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ghi chú</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="Ghi chú thêm..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowModal(false)}>Hủy</button>
              <button className={styles.btnPrimary} onClick={handleSave}>
                {editingOrder ? '💾 Cập nhật' : '✅ Tạo đơn'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
