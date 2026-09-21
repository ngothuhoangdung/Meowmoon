'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import GlobalHeader from '../components/GlobalHeader';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(1000);
  const [isCompassVisible, setIsCompassVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isScrollModalOpen, setIsScrollModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Đảm bảo loading screen biến mất sau tối đa 2s dù ảnh có lỗi
    const timer = setTimeout(() => setIsBgLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      setIsCompassVisible(progress >= 0.98);
    }
  };

  useEffect(() => {
    setVh(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setVh(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Tự động phát video khi người dùng cuộn tới Section 3
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi video vào tầm nhìn (trên 50%), tự động phát
            videoRef.current?.play().catch(e => console.log("Autoplay error:", e));
          } else {
            // Tạm dừng khi cuộn đi chỗ khác
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const localStyles = `
    .highlight-hashtag { display: inline-block; background-color: #3c3228; color: #e6e3db !important; padding: 6px 14px; border-radius: 6px; font-weight: bold; animation: pulse-hashtag 2s infinite; transition: all 0.3s ease; letter-spacing: 2px; }
    .highlight-hashtag:hover { background-color: #111; transform: scale(1.05); }
    @keyframes pulse-hashtag { 0% { box-shadow: 0 0 0 0 rgba(60, 50, 40, 0.6); } 70% { box-shadow: 0 0 0 12px rgba(60, 50, 40, 0); } 100% { box-shadow: 0 0 0 0 rgba(60, 50, 40, 0); } }
    .boat-container { transform: translateY(calc(var(--scroll-y, 0px) * -0.8)); transition: transform 0.1s ease-out; }
    .scroll-interactive-container { transform: translateY(calc(var(--scroll-y, 0px) * -0.8)); transition: transform 0.1s ease-out; }
    .h1-title { transform: translateY(calc(var(--scroll-y, 0px) * -0.15)); transition: transform 0.1s ease-out; }
    @keyframes pulse-glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes bgClamp {
      0%, 15%, 100% { left: 0px; right: 0px; }
      50%, 65% { left: calc(50% - 2px); right: calc(50% - 2px); }
    }
    @keyframes textClip {
      0%, 15%, 100% { clip-path: inset(0% 0% 0% 0%); }
      50%, 65% { clip-path: inset(0% 50% 0% 50%); }
    }
    @keyframes clampLeft {
      0%, 15%, 100% { left: 0px; }
      50%, 65% { left: calc(50% - 2px); }
    }
    @keyframes clampRight {
      0%, 15%, 100% { right: 0px; }
      50%, 65% { right: calc(50% - 2px); }
    }
    .shop-highlight-bg {
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: #e6e3db;
      animation: bgClamp 4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      z-index: 0;
    }
    .shop-highlight-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      animation: textClip 4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }
    .shop-highlight-left {
      position: absolute;
      top: 0;
      left: 0px;
      height: 100%;
      width: 4px;
      background-color: #555;
      animation: clampLeft 4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      z-index: 10;
    }
    .shop-highlight-right {
      position: absolute;
      top: 0;
      right: 0px;
      height: 100%;
      width: 4px;
      background-color: #555;
      animation: clampRight 4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      z-index: 10;
    }
    .shop-dot-top-left {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #555;
      border-radius: 50%;
      top: -10px;
      left: -8px;
    }
    .shop-dot-bottom-right {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #555;
      border-radius: 50%;
      bottom: -10px;
      right: -8px;
    }
    @keyframes boatDrift {
      0% { transform: scale(0.98); }
      50% { transform: scale(1.02); }
      100% { transform: scale(0.98); }
    }
    .drifting-boat {
      animation: boatDrift 4s ease-in-out infinite;
    }
    .scroll-interactive-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      cursor: pointer;
    }
    .cloud-cover-left {
      position: absolute;
      top: 50%;
      left: 0%;
      width: 80%;
      transform: translateY(-50%);
      transition: all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 2;
      pointer-events: none;
      opacity: 0.95;
    }
    .cloud-cover-right {
      position: absolute;
      top: 50%;
      right: 0%;
      width: 80%;
      transform: translateY(-50%) scaleX(-1);
      transition: all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 2;
      pointer-events: none;
      opacity: 0.95;
    }
    .scroll-interactive-container:hover .cloud-cover-left {
      transform: translate(-30%, -50%) scale(1.1);
      opacity: 0;
      filter: blur(8px);
    }
    .scroll-interactive-container:hover .cloud-cover-right {
      transform: translate(30%, -50%) scaleX(-1) scale(1.1);
      opacity: 0;
      filter: blur(8px);
    }
    @keyframes cloudDrift1 {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(15px, -5px); }
      100% { transform: translate(0px, 0px); }
    }
    @keyframes cloudDrift2 {
      0% { transform: scaleX(-1) translate(0px, 0px); }
      50% { transform: scaleX(-1) translate(-15px, 8px); }
      100% { transform: scaleX(-1) translate(0px, 0px); }
    }
    @keyframes cloudWrapperDrift1 {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(-10px, 5px); }
      100% { transform: translate(0px, 0px); }
    }
    @keyframes cloudWrapperDrift2 {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(12px, -6px); }
      100% { transform: translate(0px, 0px); }
    }
    .cloud-bg-left {
      animation: cloudDrift1 12s ease-in-out infinite;
    }
    .cloud-bg-right {
      animation: cloudDrift2 15s ease-in-out infinite;
    }
    .floating-paper-1 {
      filter: drop-shadow(20px 30px 40px rgba(0,0,0,0.5));
    }
    .floating-paper-2 {
      filter: drop-shadow(-10px 25px 35px rgba(0,0,0,0.4));
    }
    @media (max-width: 768px) {
      .section-1 { min-height: 100vh !important; }
      .section-1-content { flex-direction: column !important; padding: 84px 10px 20px !important; min-height: 100vh !important; display: block !important; }
      .section-1-content .pane-left { padding: 0 !important; width: 100%; height: calc(100vh - 104px) !important; display: flex !important; flex-direction: column; justify-content: space-between; align-items: center; }
      .h1-title { font-size: clamp(60px, 18vw, 120px) !important; text-align: center !important; left: 0 !important; margin: 0 !important; top: 0 !important; transform: translateY(calc(var(--scroll-y, 0px) * -0.05)) !important; }
      .scroll-interactive-container { max-width: 60% !important; margin: 0 auto 110px auto !important; top: -20px !important; transform: translateY(calc(var(--scroll-y, 0px) * -0.15)) !important; }
      .cloud-bg-right { width: 250% !important; right: -75% !important; bottom: -60% !important; opacity: 0.8 !important; }
      .cloud-cover-left { width: 250% !important; left: -75% !important; opacity: 0.9 !important; }
      .cloud-cover-right { width: 250% !important; right: -75% !important; opacity: 0.9 !important; top: 60% !important; }
      .scroll-text-overlay { display: none !important; }
      .transition-cloud-wrapper { bottom: 150px !important; }
      .section-1-content .pane-right { position: absolute !important; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; padding: 0 !important; min-height: auto !important; display: block !important; }
      .boat-container { position: absolute !important; top: 50% !important; right: 10% !important; transform: translateY(calc(-50% + var(--scroll-y, 0px) * -0.15)) !important; width: 130px !important; z-index: 2; }
      .cloud-bg-left { display: block !important; position: absolute !important; top: 5% !important; left: -10% !important; width: 600px !important; opacity: 0.4 !important; z-index: 2 !important; }
      
      .section-2 { padding: 60px 20px !important; }
      .shop-hashtag { font-size: 18px !important; align-self: center !important; margin: 0 0 20px 0 !important; text-align: center; }
      .shop-h2 { font-size: 24px !important; }
      .shop-footer-tags { flex-direction: column; align-items: center !important; gap: 20px; text-align: center; }
      .shop-footer-tags > div { margin-right: 0 !important; font-size: 18px !important; }

      .section-3-content { flex-direction: column !important; }
      .compass-pane { padding: 20px !important; justify-content: center !important; }
      .compass-wrapper { align-self: center !important; margin-right: 0 !important; left: 0 !important; top: 0 !important; transform: translateY(-20px) !important; }
      .compass-interactive { width: 180px !important; }
      .forest-video { object-position: 85% center !important; }
    }
  `;

  return (
    <div className="page-container" style={{ position: 'relative', zIndex: 1, '--scroll-y': `${scrollY}px`, width: '100vw', minHeight: '100vh', boxSizing: 'border-box', overflowX: 'clip' }}>
      <style dangerouslySetInnerHTML={{ __html: localStyles }} />
      
      {/* Loading Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: isBgLoaded ? 'transparent' : '#e6e3db',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: isBgLoaded ? 'none' : 'all',
        transition: 'background-color 2.5s ease-in-out, visibility 6s',
        visibility: isBgLoaded ? 'hidden' : 'visible',
        overflow: 'hidden'
      }}>
        {/* Lớp mây trôi tán loạn khi load xong */}
        <img loading="lazy" src="/images/cloud 3.png" alt="Cloud" style={{
            position: 'absolute', top: '-20%', left: '-20%', width: '100%', minWidth: '800px',
            transform: isBgLoaded ? 'translate(-10%, -10%) scale(1.15)' : 'translate(0, 0) scale(1)',
            opacity: isBgLoaded ? 0 : 0.8,
            transition: 'all 4.5s ease-in-out',
            pointerEvents: 'none'
        }} />
        <img loading="lazy" src="/images/cloud 2.png" alt="Cloud" style={{
            position: 'absolute', top: '30%', left: '-10%', width: '120%', minWidth: '1000px',
            transform: isBgLoaded ? 'translateX(-15%) scale(1.15)' : 'translateX(0) scale(1)',
            opacity: isBgLoaded ? 0 : 0.6,
            transition: 'all 4.5s ease-in-out',
            pointerEvents: 'none'
        }} />
        <img loading="lazy" src="/images/cloud.png" alt="Cloud" style={{
            position: 'absolute', bottom: '-20%', right: '-20%', width: '120%', minWidth: '1000px',
            transform: isBgLoaded ? 'translate(10%, 10%) scale(1.15)' : 'translate(0, 0) scale(1)',
            opacity: isBgLoaded ? 0 : 0.9,
            transition: 'all 4.5s ease-in-out',
            pointerEvents: 'none'
        }} />

        <div style={{ 
            position: 'relative', zIndex: 10, fontFamily: 'monospace', fontSize: '28px', color: '#555', 
            animation: 'pulse 1.5s infinite', textShadow: '0 2px 10px rgba(255,255,255,0.8)',
            opacity: isBgLoaded ? 0 : 1, transition: 'opacity 0.1s ease-out'
        }}>
          Loading|
        </div>
      </div>

      {/* Modal Đọc Thư Cổ */}
      {isScrollModalOpen && (
        <div 
          onClick={() => setIsScrollModalOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            backgroundColor: 'transparent', backdropFilter: 'none',
            zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              backgroundColor: '#e6e3db',
              border: '4px solid #3c3228',
              borderRadius: '4px',
              padding: '40px 30px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 15px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(100,80,60,0.2)',
              position: 'relative',
              cursor: 'default',
            }}
          >
            <button 
              onClick={() => setIsScrollModalOpen(false)}
              style={{
                position: 'absolute', top: '5px', right: '15px',
                background: 'transparent', border: 'none',
                fontSize: '32px', color: '#3c3228', cursor: 'pointer',
                fontWeight: 'normal', fontFamily: 'sans-serif'
              }}
            >
              ×
            </button>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(22px, 6vw, 28px)', color: '#3c3228', lineHeight: '1.6', textAlign: 'center' }}>
              "Hãy học và ứng dụng AI đến mức thấy được giới hạn của AI. Giới hạn đó chính là nơi bạn bắt đầu hành trình của chính mình."
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#666', fontFamily: 'var(--font-sans)', letterSpacing: '3px', fontWeight: 'bold' }}>
              - LỜI NHẮN TỪ NHÀ PHÁT TRIỂN -
            </div>
          </div>
        </div>
      )}

      {/* SVG Filter cho nền biển (Phiên bản được tối ưu cực nhẹ) */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <filter id="sea-ripple-v2">
          {/* Giảm tính toán: tần số thấp hơn, numOctaves = 1 */}
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.003" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" dur="60s" values="0.001 0.003; 0.002 0.005; 0.001 0.003" repeatCount="indefinite" />
          </feTurbulence>
          {/* Sóng mờ nhạt nhất có thể (chỉ như vệt nước xao động) */}
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 20 }}>
        <GlobalHeader />
      </div>

      {/* ROW 1: BIỂN & MÂY (Z-index cao nhất để mây có thể tràn xuống các section dưới) */}
      <section className="section-1" style={{ position: 'relative', width: '100%', minHeight: '130vh', zIndex: 5 }}>
        
        {/* Background (Biển) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          {/* Nền biển bị cắt viền */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            <img loading="lazy" src="/images/sea.png" alt="Biển" onLoad={() => setIsBgLoaded(true)} style={{
              position: 'absolute', bottom: '0', left: '-5%', width: '110%', height: '110%', objectFit: 'cover', objectPosition: 'bottom center',
              filter: 'none', /* Đã tắt SVG Filter */
              willChange: 'transform',
              transform: 'translateZ(0)'
            }} />
          </div>
        </div>

        {/* Foreground (Nội dung) */}
        <div className="section-1-content" style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', minHeight: '130vh', paddingTop: '84px' }}>
          {/* Trái */}
          <div className="pane-left" style={{ flex: 1, position: 'relative', backgroundColor: 'transparent', padding: '50px', paddingTop: '66px' }}>
            <h1 className="h1-title" style={{ position: 'relative', top: '30px', left: '15px', fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: '0.85', marginBottom: '40px', letterSpacing: '8px', color: 'rgba(255, 255, 255, 0.2)', textShadow: '0 5px 15px rgba(0,0,0,0.3)', mixBlendMode: 'overlay' }}>
              MEOW <br /> MOON
            </h1>
            <div className="scroll-interactive-container" onClick={() => setIsScrollModalOpen(true)} style={{ top: '-10px' }}>
              {/* Mây lót dưới đáy cuộn giấy */}
              <img loading="lazy" src="/images/cloud 3.png" alt="Mây lót phải" className="cloud-bg-right" style={{ position: 'absolute', bottom: '-30%', right: '-50%', width: '110%', zIndex: -1, opacity: 0.6, pointerEvents: 'none' }} />

              <div className="floating-paper-1" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img loading="lazy" src="/images/Thư cổ.png" alt="Thư cổ" style={{ width: '100%', height: 'auto', zIndex: 0, opacity: 0.95, display: 'block' }} />
                <div className="scroll-text-overlay" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(16px, 2.5vw, 28px)', color: '#444', zIndex: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, calc(-50% - 10px)) rotate(-1deg)', width: '65%', textAlign: 'center', lineHeight: '1.25' }}>
                  "Hãy học và ứng dụng AI đến mức thấy được giới hạn của AI. Giới hạn đó chính là nơi bạn bắt đầu hành trình của chính mình."
                </div>
                {/* Hai cụm mây che chở cuộn giấy */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'cloudWrapperDrift1 9s ease-in-out infinite', pointerEvents: 'none', zIndex: 2 }}>
                  <img loading="lazy" src="/images/cloud 3.png" alt="Mây che trái" className="cloud-cover-left" />
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'cloudWrapperDrift2 11s ease-in-out infinite', pointerEvents: 'none', zIndex: 2 }}>
                  <img loading="lazy" src="/images/cloud 2.png" alt="Mây che phải" className="cloud-cover-right" />
                </div>
              </div>
            </div>
          </div>
          {/* Phải */}
          <div className="pane-right" style={{ flex: 1, position: 'relative', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Mây trôi góc trên phải Section 1 */}
            <img loading="lazy" src="/images/cloud 3.png" alt="Mây trên phải" className="cloud-bg-left" style={{ position: 'absolute', top: '10%', right: '-15%', width: '70%', zIndex: 1, opacity: 0.5, pointerEvents: 'none', transform: 'scaleX(-1)' }} />
            
            <div className="boat-container" style={{ width: '30%', zIndex: 2 }}>
              <img loading="lazy" src="/images/boar.svg" alt="Thuyền" className="drifting-boat" style={{ width: '100%', opacity: 0.9, display: 'block' }} />
            </div>
          </div>
        </div>

        {/* Mây tràn lề (Layer cao nhất để che phủ thuyền và viền section) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
          {/* Mây đơn tạo hiệu ứng chuyển động (Parallax) */}
          <img loading="lazy" src="/images/cloud 3.png" alt="Mây chuyển động" style={{ position: 'absolute', bottom: '-300px', left: '10%', width: '80%', minWidth: '800px', opacity: 1, transform: `translateY(-${scrollY * 0.5}px)`, transition: 'transform 0.1s ease-out', zIndex: 4 }} />
        </div>
      </section>

      {/* ROW 2: SECTION TRẮNG (Cửa tiệm) */}
      <section className="section-2" style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#fff', padding: '100px 50px', zIndex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
          
          <div className="shop-hashtag" style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', marginBottom: '20px' }}>
            #AI_HÌNH_ẢNH <br /> _SẢN PHẨM
          </div>

          <div className="shop-hashtag" style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', alignSelf: 'flex-end', marginRight: '20%', marginBottom: '30px' }}>
            #AI_SEO_AEO_GEO
          </div>

          <div style={{ position: 'relative', marginBottom: '40px', alignSelf: 'center' }}>
            <h2 className="shop-h2" style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-sans)', color: 'var(--color-text-dark)', lineHeight: '1.3', textAlign: 'center' }}>
              CHÀO MỪNG BẠN ĐẾN VỚI <br />
              <span style={{
                display: 'inline-block',
                position: 'relative',
                color: 'var(--color-text-dark)',
                overflow: 'visible',
                zIndex: 1
              }}>
                {/* Ẩn chữ thật đi để giữ đúng kích thước (bao gồm padding) cho khung */}
                <span style={{ padding: '4px 15px', visibility: 'hidden' }}>CỬA TIỆM</span>

                {/* Lớp nền co giãn theo gọng kìm */}
                <div className="shop-highlight-bg"></div>

                {/* Wrapper chứa chữ hiển thị, kích thước bằng đúng khung, cắt gọt đồng bộ tuyệt đối */}
                <div className="shop-highlight-text-wrapper">
                  <span>CỬA TIỆM</span>
                </div>

                {/* Thanh dọc trái + chấm */}
                <div className="shop-highlight-left">
                  <div className="shop-dot-top-left"></div>
                </div>
                {/* Thanh dọc phải + chấm */}
                <div className="shop-highlight-right">
                  <div className="shop-dot-bottom-right"></div>
                </div>
              </span> CỦA TÔI
            </h2>
          </div>

          <div className="shop-hashtag" style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', marginBottom: '30px', marginLeft: '5%' }}>
            <div className="highlight-hashtag" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/production-house/tao-nhan-vat'}>
              #MODEL_AI
            </div>
          </div>

          <div className="shop-hashtag" style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', marginBottom: '30px' }}>
            #AI_PHÁT_TRIỂN_BẢN_THÂN
          </div>

          <div className="shop-hashtag" style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', alignSelf: 'flex-end', marginRight: '10%', marginBottom: '30px' }}>
            #AI_THỜI_TRANG
          </div>

          <div className="shop-footer-tags" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333' }}>
              #AI_ĂN_VÀ_ĂN
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#222', marginRight: '20%' }}>
              -Hey boy, gì thế <br />
              -Chơi một chút thôi
            </div>
          </div>

        </div>

        {/* Mây chuyển tiếp xuống Tầng 3 (Rừng) - Sẽ tan đi khi video phát */}
        <div className="transition-cloud-wrapper" style={{ 
          position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10, 
          opacity: isVideoPlaying ? 0 : 1, 
          transition: 'opacity 2.5s ease-in-out', 
          pointerEvents: 'none' 
        }}>
          {/* Lớp mây sau */}
          <img loading="lazy" src="/images/cloud 2.svg" alt="Mây" style={{ position: 'absolute', bottom: '-150px', left: '-5%', width: '60%', opacity: 0.9, zIndex: 3 }} />
          <img loading="lazy" src="/images/cloud 2.svg" alt="Mây" style={{ position: 'absolute', bottom: '-150px', right: '-5%', width: '60%', opacity: 0.9, transform: 'scaleX(-1)', zIndex: 3 }} />
          
          {/* Lớp mây trước */}
          <img loading="lazy" src="/images/cloud.svg" alt="Mây" style={{ position: 'absolute', bottom: '-250px', left: '-10%', width: '65%', opacity: 1, transform: 'scaleX(-1)', zIndex: 4 }} />
          <img loading="lazy" src="/images/cloud.svg" alt="Mây" style={{ position: 'absolute', bottom: '-250px', right: '-10%', width: '65%', opacity: 1, zIndex: 4 }} />
        </div>
      </section>

      {/* ROW 3: RỪNG & LA BÀN */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', zIndex: 3, backgroundColor: '#000', overflow: 'hidden' }}>
        
        <video 
          ref={videoRef}
          className="forest-video"
          src="/images/Top-down_camera_drop_forest_scene_20260918222613.mp4"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        ></video>

        {/* Foreground (Split) */}
        <div className="section-3-content" style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', height: '100vh' }}>
          {/* Trái (Trống) */}
          <div className="pane-left" style={{ flex: 1, backgroundColor: 'transparent' }}></div>
          {/* Phải (La bàn) - Chỉ bật lớp tương tác khi video kết thúc (để đè lên la bàn trong video) */}
          <div className="pane-right compass-pane" style={{ flex: 1, backgroundColor: 'transparent', padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="compass-wrapper" style={{ 
              position: 'relative', zIndex: 2, marginBottom: '20px', alignSelf: 'flex-end', marginRight: '15%',
              left: '19px', // Dịch sang phải 19px
              top: '-5px', // Nâng lên cao 5px
              // Chỉ hiển thị La bàn khi video đã chạy đến cuối
              opacity: isCompassVisible ? 1 : 0,
              pointerEvents: isCompassVisible ? 'auto' : 'none',
              transition: 'opacity 0.2s ease-in-out'
            }}>
              <a href="#" style={{ display: 'block', textDecoration: 'none' }}>
                <img loading="lazy" src="/images/la bàn.svg" alt="La bàn" className="compass-interactive" style={{ width: '250px' }} />
              </a>
            </div>
            <div style={{ 
              display: 'none', // Tạm ẩn text theo yêu cầu
              position: 'relative', zIndex: 2, fontFamily: 'var(--font-script)', fontSize: '32px', color: '#fff', marginTop: '-40px', textAlign: 'left', width: '350px', alignSelf: 'flex-start', marginLeft: '10%'
            }}>
              -Tôi chưa biết nên bắt đầu từ đâu <br />
              -Dùng la bàn
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
