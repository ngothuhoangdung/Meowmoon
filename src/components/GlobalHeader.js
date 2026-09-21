'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Production House', path: '/production-house/tao-nhan-vat' },
    { name: 'AI doanh nghiệp', path: '#', disabled: true },
    { name: 'AI cá nhân', path: '#', disabled: true },
    { name: 'Tự học AI', path: '#', disabled: true }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .gh-desktop-nav { display: flex; gap: 15px; pointer-events: auto; }
        .gh-desktop-user { display: flex; gap: 15px; align-items: center; pointer-events: auto; }
        .gh-mobile-btn { display: none; background: transparent; border: none; cursor: pointer; padding: 10px; pointer-events: auto; z-index: 60; }
        .gh-mobile-btn div { width: 25px; height: 3px; background-color: #333; margin: 4px 0; transition: 0.4s; border-radius: 2px; }
        .gh-mobile-btn.open div:nth-child(1) { transform: rotate(-45deg) translate(-5px, 5px); }
        .gh-mobile-btn.open div:nth-child(2) { opacity: 0; }
        .gh-mobile-btn.open div:nth-child(3) { transform: rotate(45deg) translate(-5px, -5px); }
        .gh-lang-icon { display: flex; }
        
        @media (max-width: 768px) {
          .gh-desktop-nav, .gh-desktop-user, .gh-lang-icon { display: none !important; }
          .gh-mobile-btn { display: block !important; }
          .gh-header-container { padding: 0 20px !important; }
        }
      `}} />
      <header className="gh-header-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '84px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 50px',
      zIndex: 50,
      backgroundColor: 'rgba(248, 245, 240, 0.5)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <nav className="gh-desktop-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} onClick={(e) => { if (item.disabled) e.preventDefault(); }} style={{
              padding: '8px 20px',
              borderRadius: '20px',
              backgroundColor: isActive ? '#333' : '#e8e5e0',
              fontSize: '14px',
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#fff' : (item.disabled ? '#aaa' : '#333'),
              textDecoration: 'none',
              cursor: item.disabled ? 'default' : 'pointer',
              opacity: item.disabled ? 0.6 : 1,
              transition: 'all 0.2s ease-in-out'
            }}>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="gh-desktop-user">
        <span style={{ padding: '8px 20px', borderRadius: '20px', backgroundColor: '#e8e5e0', fontSize: '14px', color: '#333' }}>Admin</span>
        <img loading="lazy" src="/images/Avatar.svg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
      
      <button className={`gh-mobile-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      </header>

      {/* GLOBAL TRANSLATE ICON */}
      <div className="gh-lang-icon" style={{
        display: 'none', /* Tạm ẩn theo yêu cầu */
        position: 'fixed',
        top: '84px',
        left: '50%',
        transform: 'translate(calc(-50% + 8.5px), -50%)', /* Đảo lại hướng dịch chuyển sang phải */
        zIndex: 51,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' 
      }}>
        <img loading="lazy" 
          src="/images/language.svg" 
          alt="Language" 
          style={{ width: '60px', height: 'auto' }} 
        />
      </div>
      
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '84px',
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 84px)',
          backgroundColor: 'rgba(248, 245, 240, 0.98)',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 20px',
          gap: '20px',
          alignItems: 'center',
        }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} onClick={(e) => { if (item.disabled) e.preventDefault(); else setIsMobileMenuOpen(false); }} style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#333' : '#e8e5e0',
                fontSize: '18px',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? '#fff' : (item.disabled ? '#aaa' : '#333'),
                textDecoration: 'none',
                textAlign: 'center',
                cursor: item.disabled ? 'default' : 'pointer',
                opacity: item.disabled ? 0.6 : 1
              }}>
                {item.name}
              </Link>
            );
          })}
          
          <div style={{ display: 'none', marginTop: 'auto', marginBottom: '40px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
             <span style={{ fontSize: '14px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase' }}>Ngôn ngữ</span>
             <img loading="lazy" src="/images/language.svg" alt="Language" style={{ width: '60px', height: 'auto' }} />
          </div>
        </div>
      )}
    </>
  );
}
