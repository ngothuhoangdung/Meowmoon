'use client';
import { useState, useEffect } from 'react';
import styles from './tham-xynh.module.css';

const STATUS_COLORS = {
  'Chờ tư vấn': '#f59e0b',
  'Chưa có hàng': '#6366f1',
  'Chờ vận chuyển': '#8b5cf6',
  'Đang vận chuyển': '#3b82f6',
  'Done': '#22c55e',
  'Hoàn hàng': '#ec4899',
  'Hủy đơn': '#ef4444',
};

function formatMoney(amount) {
  if (!amount) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  // Handle various date formats
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    // Return as DD/MM
    return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}`;
  }
  return dateStr;
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tham-xynh/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>📊 Dashboard</h1>
          <p className={styles.pageSubtitle}>Tổng quan kinh doanh Thắm Xynh</p>
        </div>
        <div className={styles.statsGrid}>
          {[1,2,3,4].map(i => (
            <div key={i} className={styles.statCard}>
              <div className={styles.skeleton} style={{ width: 52, height: 52, borderRadius: 14 }} />
              <div className={styles.statInfo}>
                <div className={styles.skeleton} style={{ width: '60%', height: 12, marginBottom: 8 }} />
                <div className={styles.skeleton} style={{ width: '80%', height: 24 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const maxRevenue = Math.max(...(stats.revenueByDate?.map(d => d.total) || [1]));

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>📊 Dashboard</h1>
        <p className={styles.pageSubtitle}>Tổng quan kinh doanh Thắm Xynh</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconRevenue}>💰</div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Doanh thu</div>
            <div className={styles.statValue}>{formatMoney(stats.revenue)}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconPurchase}>🛒</div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Chi phí mua</div>
            <div className={styles.statValue}>{formatMoney(stats.purchases)}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconOps}>⚙️</div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Vận hành</div>
            <div className={styles.statValue}>{formatMoney(stats.operations)}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={stats.profit >= 0 ? styles.statIconProfit : styles.statIconOps}>
            {stats.profit >= 0 ? '📈' : '📉'}
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Lãi ròng</div>
            <div className={stats.profit >= 0 ? styles.statValuePositive : styles.statValueNegative}>
              {formatMoney(stats.profit)}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Revenue Chart */}
        <div className={styles.chartContainer}>
          <div className={styles.chartTitle}>📊 Doanh thu theo ngày</div>
          {stats.revenueByDate && stats.revenueByDate.length > 0 ? (
            <div className={styles.chartBars}>
              {stats.revenueByDate.map((day, i) => (
                <div key={i} className={styles.chartBar}>
                  <div className={styles.chartBarValue}>{formatMoney(day.total)}</div>
                  <div
                    className={styles.chartBarFill}
                    style={{ height: `${Math.max((day.total / maxRevenue) * 100, 5)}%` }}
                  />
                  <div className={styles.chartBarLabel}>{formatDate(day.date)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyText}>Chưa có dữ liệu doanh thu</div>
            </div>
          )}
        </div>

        {/* Status Distribution */}
        <div className={styles.chartContainer}>
          <div className={styles.chartTitle}>📋 Trạng thái đơn ({stats.totalOrders})</div>
          <div className={styles.statusGrid}>
            {stats.statusCounts?.map((item, i) => (
              <div key={i} className={styles.statusItem}>
                <div
                  className={styles.statusDot}
                  style={{ backgroundColor: STATUS_COLORS[item.status] || '#999' }}
                />
                <span className={styles.statusLabel}>{item.status}</span>
                <span className={styles.statusCount}>{item.count}</span>
              </div>
            ))}
            {(!stats.statusCounts || stats.statusCounts.length === 0) && (
              <div className={styles.emptyText}>Chưa có đơn hàng</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>🕐 Đơn hàng gần đây</div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Thành tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders?.map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.order_date}</td>
                <td>
                  <strong>{order.customer_name}</strong>
                  {order.customer_phone && (
                    <div style={{ fontSize: 11, color: '#9d7b6a' }}>{order.customer_phone}</div>
                  )}
                </td>
                <td><span className={styles.amount}>{formatMoney(order.total_amount)}</span></td>
                <td>{getStatusBadge(order.status)}</td>
              </tr>
            ))}
            {(!stats.recentOrders || stats.recentOrders.length === 0) && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  <div className={styles.emptyText}>Chưa có đơn hàng nào</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
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
