'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../tham-xynh.module.css';

const SENDER_NAME = 'Dung';
const SENDER_PHONE = '0349.655.819';

export default function InPhieuPage() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  useEffect(() => {
    // Fetch orders that need shipping labels (not Done, not Canceled)
    fetch('/api/tham-xynh/orders')
      .then(res => res.json())
      .then(data => {
        // Show all orders but pre-select shippable ones
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === orders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(orders.map(o => o.id)));
    }
  };

  const selectShippable = () => {
    const shippable = orders.filter(o =>
      ['Chờ vận chuyển', 'Chưa có hàng', 'Đang vận chuyển'].includes(o.status)
    );
    setSelected(new Set(shippable.map(o => o.id)));
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedOrders = orders.filter(o => selected.has(o.id));

  // Group into pages of 6 labels each (2 columns x 3 rows)
  const pages = [];
  for (let i = 0; i < selectedOrders.length; i += 6) {
    pages.push(selectedOrders.slice(i, i + 6));
  }

  return (
    <div>
      {/* Screen UI (hidden when printing) */}
      <div className="noPrint">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>🖨️ In phiếu gửi hàng</h1>
          <p className={styles.pageSubtitle}>Chọn đơn hàng cần in phiếu, mỗi trang A4 in được 6 phiếu</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <button className={styles.btnSecondary} onClick={selectShippable}>
            📦 Chọn đơn cần gửi
          </button>
          <button className={styles.btnSecondary} onClick={selectAll}>
            {selected.size === orders.length ? '☐ Bỏ chọn tất cả' : '☑️ Chọn tất cả'}
          </button>
          {selected.size > 0 && (
            <button className={styles.btnPrimary} onClick={handlePrint}>
              🖨️ In {selected.size} phiếu
            </button>
          )}
        </div>

        {loading ? (
          <div className={styles.labelGrid}>
            {[1,2,3,4].map(i => (
              <div key={i} className={styles.card}>
                <div className={styles.skeleton} style={{ height: 120 }} />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.card}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <div className={styles.emptyText}>Chưa có đơn hàng nào</div>
            </div>
          </div>
        ) : (
          <div className={styles.labelGrid}>
            {orders.map(order => (
              <div
                key={order.id}
                className={`${styles.labelCard} ${selected.has(order.id) ? styles.labelCardSelected : ''}`}
                onClick={() => toggleSelect(order.id)}
              >
                <div className={`${styles.labelCheck} ${selected.has(order.id) ? styles.labelCheckSelected : ''}`}>
                  {selected.has(order.id) ? '✓' : ''}
                </div>

                <div className={styles.printPreviewTitle}>PHIẾU GỬI HÀNG</div>
                <div className={styles.printPreviewOrderNum}>Đơn #{order.order_number}</div>

                <div className={styles.printPreviewSection}>
                  <div className={styles.printPreviewSectionTitle}>NGƯỜI GỬI</div>
                  <div>{SENDER_NAME} - {SENDER_PHONE}</div>
                </div>

                <div className={styles.printPreviewSection}>
                  <div className={styles.printPreviewSectionTitle}>NGƯỜI NHẬN</div>
                  <div><strong>{order.customer_name}</strong></div>
                  <div>{order.customer_phone}</div>
                </div>

                {order.customer_address && (
                  <div className={styles.printPreviewSection}>
                    <div className={styles.printPreviewSectionTitle}>ĐỊA CHỈ</div>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>{order.customer_address}</div>
                  </div>
                )}

                {order.items_detail && (
                  <div className={styles.printPreviewSection}>
                    <div className={styles.printPreviewSectionTitle}>HÀNG GỬI</div>
                    <ul className={styles.printPreviewItems}>
                      {order.items_detail.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{
                  position: 'absolute', bottom: 8, right: 12, fontSize: 10, color: '#ccc',
                  fontWeight: 600,
                }}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print Layout (only visible when printing) */}
      <div className={styles.printPage} ref={printRef}>
        {pages.map((page, pageIdx) => (
          <div key={pageIdx} className={styles.printGrid}>
            {page.map(order => (
              <div key={order.id} className={styles.printLabel}>
                <div className={styles.printLabelTitle}>PHIẾU GỬI HÀNG</div>
                <div className={styles.printOrderNum}>Đơn #{order.order_number}</div>

                <div className={styles.printSection}>
                  <div className={styles.printSectionTitle}>NGƯỜI GỬI</div>
                  <div className={styles.printSectionContent}>
                    {SENDER_NAME} - {SENDER_PHONE}
                  </div>
                </div>

                <div className={styles.printSection}>
                  <div className={styles.printSectionTitle}>NGƯỜI NHẬN</div>
                  <div className={styles.printSectionContent}>
                    <strong>{order.customer_name}</strong><br />
                    {order.customer_phone}
                  </div>
                </div>

                {order.customer_address && (
                  <div className={styles.printSection}>
                    <div className={styles.printSectionTitle}>ĐỊA CHỈ</div>
                    <div className={styles.printSectionContent}>{order.customer_address}</div>
                  </div>
                )}

                {order.items_detail && (
                  <div className={styles.printSection} style={{ flex: 1 }}>
                    <div className={styles.printSectionTitle}>HÀNG GỬI</div>
                    <ul className={styles.printItemList}>
                      {order.items_detail.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {/* Fill empty cells to maintain grid */}
            {[...Array(Math.max(0, 6 - page.length))].map((_, i) => (
              <div key={`empty-${i}`} style={{ visibility: 'hidden' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
