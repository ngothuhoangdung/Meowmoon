'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../tham-xynh.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/tham-xynh/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/tham-xynh');
      } else {
        setError(data.error || 'Sai mật khẩu');
      }
    } catch {
      setError('Không thể kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <div className={styles.loginLogo}>🌸</div>
        <h1 className={styles.loginTitle}>Thắm Xynh</h1>
        <p className={styles.loginSubtitle}>Hệ thống quản lý đơn hàng</p>

        {error && <div className={styles.loginError}>{error}</div>}

        <input
          type="password"
          className={styles.loginInput}
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          id="login-password"
        />

        <button
          type="submit"
          className={styles.loginBtn}
          disabled={loading}
          id="login-submit"
        >
          {loading ? '⏳ Đang đăng nhập...' : '🔓 Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
