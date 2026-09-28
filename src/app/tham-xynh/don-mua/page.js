'use client';
import { useState, useEffect } from 'react';
import styles from '../tham-xynh.module.css';

function formatMoney(amount) {
  if (!amount) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export default function DonMuaPage() {
  const [activeTab, setActiveTab] = useState('purchases');
  const [purchases, setPurchases] = useState([]);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Purchase form
  const [pDate, setPDate] = useState(new Date().toISOString().split('T')[0]);
  const [pNote, setPNote] = useState('');
  const [pAmount, setPAmount] = useState('');

  // Operation form
  const [oDate, setODate] = useState(new Date().toISOString().split('T')[0]);
  const [oNote, setONote] = useState('');
  const [oAmount, setOAmount] = useState('');

  const fetchData = async () => {
    try {
      const [pRes, oRes] = await Promise.all([
        fetch('/api/tham-xynh/purchases'),
        fetch('/api/tham-xynh/operations'),
      ]);
      setPurchases(await pRes.json());
      setOperations(await oRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addPurchase = async () => {
    if (!pNote || !pAmount) return;
    await fetch('/api/tham-xynh/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchase_date: pDate, note: pNote, amount: parseInt(pAmount) }),
    });
    setPNote(''); setPAmount('');
    fetchData();
  };

  const deletePurchase = async (id) => {
    if (!confirm('Xóa mục này?')) return;
    await fetch(`/api/tham-xynh/purchases?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const addOperation = async () => {
    if (!oNote || !oAmount) return;
    await fetch('/api/tham-xynh/operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ op_date: oDate, note: oNote, amount: parseInt(oAmount) }),
    });
    setONote(''); setOAmount('');
    fetchData();
  };

  const deleteOperation = async (id) => {
    if (!confirm('Xóa mục này?')) return;
    await fetch(`/api/tham-xynh/operations?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const totalPurchases = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOperations = operations.reduce((sum, o) => sum + (o.amount || 0), 0);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>🛒 Đơn mua & Chi phí vận hành</h1>
        <p className={styles.pageSubtitle}>Theo dõi chi phí đầu vào và vận hành</p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === 'purchases' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('purchases')}
        >
          🛒 Đơn mua ({purchases.length})
        </button>
        <button
          className={activeTab === 'operations' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('operations')}
        >
          ⚙️ Vận hành ({operations.length})
        </button>
      </div>

      {/* PURCHASES TAB */}
      {activeTab === 'purchases' && (
        <>
          {/* Quick Add Form */}
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#831843', marginBottom: 14 }}>
              ➕ Thêm nhanh đơn mua
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className={styles.formGroup} style={{ margin: 0, flex: '0 0 140px' }}>
                <label className={styles.formLabel}>Ngày mua</label>
                <input type="date" className={styles.formInput} value={pDate} onChange={e => setPDate(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ margin: 0, flex: 1, minWidth: 200 }}>
                <label className={styles.formLabel}>Ghi chú</label>
                <input type="text" className={styles.formInput} placeholder="VD: Mua Vũ Kim Dung" value={pNote} onChange={e => setPNote(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ margin: 0, flex: '0 0 150px' }}>
                <label className={styles.formLabel}>Thành tiền (VNĐ)</label>
                <input type="number" className={styles.formInput} placeholder="0" value={pAmount} onChange={e => setPAmount(e.target.value)} />
              </div>
              <button className={styles.btnPrimary} onClick={addPurchase} style={{ height: 42 }}>
                ➕ Thêm
              </button>
            </div>
          </div>

          {/* Purchases Table */}
          <div className={styles.tableWrap}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>Danh sách đơn mua</div>
              <div className={styles.amountTotal}>Tổng: {formatMoney(totalPurchases)}</div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th style={{ width: 120 }}>Ngày mua</th>
                  <th>Ghi chú</th>
                  <th style={{ width: 150 }}>Thành tiền</th>
                  <th style={{ width: 60 }}></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(5)].map((_, j) => (
                        <td key={j}><div className={styles.skeleton} /></td>
                      ))}
                    </tr>
                  ))
                ) : purchases.length === 0 ? (
                  <tr><td colSpan={5}><div className={styles.emptyState}><div className={styles.emptyText}>Chưa có đơn mua nào</div></div></td></tr>
                ) : (
                  purchases.map((p, i) => (
                    <tr key={p.id}>
                      <td>{purchases.length - i}</td>
                      <td>{p.purchase_date}</td>
                      <td>{p.note}</td>
                      <td><span className={styles.amount}>{formatMoney(p.amount)}</span></td>
                      <td>
                        <button className={styles.btnIcon} onClick={() => deletePurchase(p.id)} title="Xóa">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* OPERATIONS TAB */}
      {activeTab === 'operations' && (
        <>
          {/* Quick Add Form */}
          <div className={styles.card} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#831843', marginBottom: 14 }}>
              ➕ Thêm nhanh chi phí vận hành
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className={styles.formGroup} style={{ margin: 0, flex: '0 0 140px' }}>
                <label className={styles.formLabel}>Ngày chi</label>
                <input type="date" className={styles.formInput} value={oDate} onChange={e => setODate(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ margin: 0, flex: 1, minWidth: 200 }}>
                <label className={styles.formLabel}>Ghi chú</label>
                <input type="text" className={styles.formInput} placeholder="VD: Lương thợ phụ" value={oNote} onChange={e => setONote(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ margin: 0, flex: '0 0 150px' }}>
                <label className={styles.formLabel}>Thành tiền (VNĐ)</label>
                <input type="number" className={styles.formInput} placeholder="0" value={oAmount} onChange={e => setOAmount(e.target.value)} />
              </div>
              <button className={styles.btnPrimary} onClick={addOperation} style={{ height: 42 }}>
                ➕ Thêm
              </button>
            </div>
          </div>

          {/* Operations Table */}
          <div className={styles.tableWrap}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>Danh sách chi phí vận hành</div>
              <div className={styles.amountTotal}>Tổng: {formatMoney(totalOperations)}</div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th style={{ width: 120 }}>Ngày chi</th>
                  <th>Ghi chú</th>
                  <th style={{ width: 150 }}>Thành tiền</th>
                  <th style={{ width: 60 }}></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(5)].map((_, j) => (
                        <td key={j}><div className={styles.skeleton} /></td>
                      ))}
                    </tr>
                  ))
                ) : operations.length === 0 ? (
                  <tr><td colSpan={5}><div className={styles.emptyState}><div className={styles.emptyText}>Chưa có chi phí nào</div></div></td></tr>
                ) : (
                  operations.map((o, i) => (
                    <tr key={o.id}>
                      <td>{operations.length - i}</td>
                      <td>{o.op_date}</td>
                      <td>{o.note}</td>
                      <td><span className={styles.amount}>{formatMoney(o.amount)}</span></td>
                      <td>
                        <button className={styles.btnIcon} onClick={() => deleteOperation(o.id)} title="Xóa">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
