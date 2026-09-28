'use client';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../tham-xynh.module.css';

const NAV_ITEMS = [
  { href: '/tham-xynh', icon: '📊', label: 'Dashboard' },
  { href: '/tham-xynh/don-ban', icon: '📦', label: 'Đơn bán' },
  { href: '/tham-xynh/don-mua', icon: '🛒', label: 'Đơn mua & Vận hành' },
  { href: '/tham-xynh/nhap-chat', icon: '💬', label: 'Nhập chat → Đơn' },
  { href: '/tham-xynh/in-phieu', icon: '🖨️', label: 'In phiếu gửi hàng' },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/tham-xynh/auth', { method: 'DELETE' });
    router.push('/tham-xynh/login');
  };

  const isActive = (href) => {
    if (href === '/tham-xynh') return pathname === '/tham-xynh';
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99 }}
          onClick={onClose}
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoIcon}>🌸</span>
            Thắm Xynh
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              className={`${styles.sidebarLink} ${isActive(item.href) ? styles.sidebarLinkActive : ''}`}
              onClick={() => {
                router.push(item.href);
                onClose?.();
              }}
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.sidebarIcon}>🚪</span>
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
}
