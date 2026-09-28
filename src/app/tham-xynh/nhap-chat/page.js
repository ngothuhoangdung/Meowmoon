'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../tham-xynh.module.css';

export default function NhapChatPage() {
  const [chatText, setChatText] = useState('');
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState(null);
  const router = useRouter();

  const handleParse = async () => {
    if (!chatText.trim()) return;
    setLoading(true);
    setParsed(null);

    try {
      const res = await fetch('/api/tham-xynh/parse-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chatText }),
      });
      const data = await res.json();
      setParsed(data);
      setEditData({
        customer_name: data.customer_name || '',
        customer_phone: data.customer_phone || '',
        customer_address: data.customer_address || '',
        items_detail: data.items_detail || '',
        total_amount: data.total_amount || '',
        status: 'Chờ tư vấn',
        notes: chatText.substring(0, 500),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrder = async () => {
    if (!editData) return;
    setSaving(true);

    try {
      const body = {
        ...editData,
        total_amount: parseInt(editData.total_amount) || 0,
        order_date: new Date().toISOString().split('T')[0],
      };

      const res = await fetch('/api/tham-xynh/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert('✅ Đã tạo đơn hàng thành công!');
        setChatText('');
        setParsed(null);
        setEditData(null);
        router.push('/tham-xynh/don-ban');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Lỗi khi tạo đơn hàng');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>💬 Nhập chat → Tạo đơn</h1>
        <p className={styles.pageSubtitle}>Paste đoạn chat/note vào ô bên trái, hệ thống sẽ tự trích xuất thông tin</p>
      </div>

      <div className={styles.chatContainer}>
        {/* Left: Chat Input */}
        <div className={styles.chatInput}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#831843' }}>📋 Dán nội dung chat</span>
            {chatText && (
              <button
                className={`${styles.btnSecondary} ${styles.btnSmall}`}
                onClick={() => { setChatText(''); setParsed(null); setEditData(null); }}
              >
                🗑️ Xóa
              </button>
            )}
          </div>
          <textarea
            className={styles.chatTextarea}
            placeholder={"Paste đoạn chat vào đây...\n\nVí dụ:\nNguyễn Thị A\n0912345678\nĐịa chỉ: 123 đường ABC, phường XYZ, quận 1, TP HCM\n10 ốc quế nhỏ - màu 3, 4, 8\n20 vát 3 bông\nTổng 400k, cọc 0, ship 50k"}
            value={chatText}
            onChange={e => setChatText(e.target.value)}
          />
          <button
            className={styles.btnPrimary}
            onClick={handleParse}
            disabled={loading || !chatText.trim()}
            style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
          >
            {loading ? '⏳ Đang phân tích...' : '🔍 Phân tích'}
          </button>
        </div>

        {/* Right: Preview & Edit */}
        <div className={styles.chatPreview}>
          <div className={styles.chatPreviewTitle}>
            📝 Kết quả trích xuất
            {parsed && !parsed.customer_name && !parsed.customer_phone && (
              <span style={{ fontSize: 12, fontWeight: 500, color: '#f59e0b', marginLeft: 8 }}>
                ⚠️ Không nhận diện được nhiều thông tin
              </span>
            )}
          </div>

          {!parsed && !loading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <div className={styles.emptyText}>Paste nội dung chat và nhấn "Phân tích"</div>
            </div>
          )}

          {loading && (
            <div style={{ padding: 20 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div className={styles.skeleton} style={{ width: '30%', height: 12, marginBottom: 6 }} />
                  <div className={styles.skeleton} style={{ width: '80%', height: 20 }} />
                </div>
              ))}
            </div>
          )}

          {parsed && editData && (
            <div>
              <div className={styles.chatField}>
                <div className={styles.chatFieldLabel}>Tên khách hàng</div>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editData.customer_name}
                  onChange={e => setEditData({...editData, customer_name: e.target.value})}
                  placeholder="Nhập tên khách..."
                />
              </div>

              <div className={styles.chatField}>
                <div className={styles.chatFieldLabel}>Số điện thoại</div>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editData.customer_phone}
                  onChange={e => setEditData({...editData, customer_phone: e.target.value})}
                  placeholder="0xxx xxx xxx"
                />
              </div>

              <div className={styles.chatField}>
                <div className={styles.chatFieldLabel}>Địa chỉ</div>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editData.customer_address}
                  onChange={e => setEditData({...editData, customer_address: e.target.value})}
                  placeholder="Nhập địa chỉ..."
                />
              </div>

              <div className={styles.chatField}>
                <div className={styles.chatFieldLabel}>Chi tiết đơn hàng</div>
                <textarea
                  className={styles.formTextarea}
                  value={editData.items_detail}
                  onChange={e => setEditData({...editData, items_detail: e.target.value})}
                  placeholder="Chi tiết sản phẩm..."
                  rows={4}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className={styles.chatField}>
                  <div className={styles.chatFieldLabel}>Thành tiền (VNĐ)</div>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={editData.total_amount}
                    onChange={e => setEditData({...editData, total_amount: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div className={styles.chatField}>
                  <div className={styles.chatFieldLabel}>Trạng thái</div>
                  <select
                    className={styles.formSelect}
                    value={editData.status}
                    onChange={e => setEditData({...editData, status: e.target.value})}
                  >
                    <option value="Chờ tư vấn">Chờ tư vấn</option>
                    <option value="Chưa có hàng">Chưa có hàng</option>
                    <option value="Chờ vận chuyển">Chờ vận chuyển</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                  </select>
                </div>
              </div>

              {parsed.items && parsed.items.length > 0 && (
                <div className={styles.chatField}>
                  <div className={styles.chatFieldLabel}>Sản phẩm nhận diện được</div>
                  <div className={styles.chatFieldValue}>
                    {parsed.items.map((item, i) => (
                      <div key={i} style={{ padding: '4px 0' }}>
                        • {item.quantity} {item.product}
                        {item.colors && <span style={{ color: '#9d7b6a' }}> — màu {item.colors}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className={styles.btnPrimary}
                onClick={handleSaveOrder}
                disabled={saving}
                style={{ width: '100%', justifyContent: 'center', marginTop: 16, padding: 14 }}
              >
                {saving ? '⏳ Đang lưu...' : '✅ Tạo đơn hàng'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
