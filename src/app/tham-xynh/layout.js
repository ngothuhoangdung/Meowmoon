'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';
import styles from './tham-xynh.module.css';

export default function ThamXynhLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(null); // null = loading
  const router = useRouter();
  const pathname = usePathname();

  // Check auth on mount
  useEffect(() => {
    if (pathname === '/tham-xynh/login') {
      setIsAuthed(false);
      return;
    }

    // Quick auth check by calling stats API
    fetch('/api/tham-xynh/stats')
      .then(res => {
        if (res.status === 401) {
          setIsAuthed(false);
          router.push('/tham-xynh/login');
        } else {
          setIsAuthed(true);
        }
      })
      .catch(() => {
        setIsAuthed(false);
        router.push('/tham-xynh/login');
      });
  }, [pathname, router]);

  // Login page — no sidebar
  if (pathname === '/tham-xynh/login') {
    return <>{children}</>;
  }

  // Loading state
  if (isAuthed === null) {
    return (
      <div className={styles.loginContainer}>
        <div style={{ textAlign: 'center', color: '#831843' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }}>🌸</div>
          <div style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 600 }}>Đang tải...</div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthed) {
    return null;
  }

  return (
    <div className={styles.appContainer}>
      <button
        className={styles.mobileMenuBtn}
        onClick={() => setSidebarOpen(true)}
        aria-label="Menu"
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
