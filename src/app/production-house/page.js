'use client';
import GlobalHeader from '../../components/GlobalHeader';

export default function ProductionHouse() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e6e3db', color: '#333' }}>
      <GlobalHeader />
      <div style={{ paddingTop: '120px', paddingLeft: '50px', paddingRight: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontFamily: 'var(--font-sans)', marginBottom: '20px' }}>
          Production House
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          Chào mừng đến với không gian sáng tạo Production House.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="/production-house/tao-nhan-vat" style={{
            padding: '12px 24px',
            backgroundColor: '#3c3228',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}>
            Vào Trang Tạo Nhân Vật
          </a>
        </div>
      </div>
    </div>
  );
}
