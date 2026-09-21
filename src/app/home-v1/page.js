'use client';
import { useState, useEffect } from 'react';
import GlobalHeader from '../../components/GlobalHeader';

export default function HomeV1() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const localStyles = `
    @keyframes boatDrift {
      0% { transform: translateY(0px) rotate(-10deg); }
      50% { transform: translateY(-12px) rotate(-7deg); }
      100% { transform: translateY(0px) rotate(-10deg); }
    }
    .drifting-boat {
      animation: boatDrift 6s ease-in-out infinite;
    }
  `;

  return (
    <div className="split-screen-container" style={{ display: 'flex', width: '100vw', minHeight: '100vh', position: 'relative', backgroundColor: 'var(--color-cream)', paddingTop: '84px', boxSizing: 'border-box' }}>
      <style dangerouslySetInnerHTML={{ __html: localStyles }} />
      {/* SVG Filter cho nền biển */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <filter id="sea-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" dur="20s" values="0.01 0.015; 0.015 0.02; 0.01 0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* (Đã gỡ bỏ lớp Nền Đen cố định - chuyển vào từng Section bên phải) */}


      {/* GLOBAL FIXED HEADER */}
      <GlobalHeader />

      {/* Mảng Sáng (Trái) */}
      <div className="pane-left" style={{ flex: 1, position: 'relative' }}>
        {/* SECTION 1: MEOW MOON */}
        <section style={{ paddingTop: '150px', paddingBottom: '50px', paddingLeft: '50px', paddingRight: '50px', minHeight: '130vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h1 style={{ fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: '0.85', marginBottom: '20px', letterSpacing: '8px', color: 'var(--color-text-dark)' }}>
            MEOW <br /> MOON
          </h1>
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img loading="lazy"
              src="/images/giấy xé.png"
              alt="Giấy xé"
              style={{ width: '100%', height: 'auto', zIndex: 0, opacity: 0.95, display: 'block' }}
            />
            <div style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(16px, 2.5vw, 28px)',
              color: '#444',
              zIndex: 1,
              position: 'absolute',
              top: '48%',
              left: '40%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              textAlign: 'left',
              lineHeight: '1.15', /* Giảm khoảng cách dòng */
              paddingLeft: '10px'
            }}>
              "Hãy học và ứng dụng AI đến mức thấy được giới hạn của AI. Giới hạn đó chính là nơi bạn bắt đầu hành trình của chính mình."
            </div>
          </div>
        </section>

        {/* SECTION 2: HASHTAGS & CỬA TIỆM KỲ CỤC */}
        <section style={{ padding: '50px', minHeight: 'calc(100vh - 84px)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', marginBottom: '20px' }}>
            #AI_HÌNH_ẢNH <br /> _SẢN PHẨM
          </div>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', alignSelf: 'flex-end', marginRight: '20%', marginBottom: '30px' }}>
            #AI_SEO_AEO_GEO
          </div>

          <div style={{ position: 'relative', marginBottom: '40px', alignSelf: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-sans)', color: 'var(--color-text-dark)', lineHeight: '1.3', textAlign: 'center' }}>
              CHÀO MỪNG BẠN ĐẾN VỚI <br />
              <span style={{
                backgroundColor: '#e6e3db', /* Màu nền highlight xám nhẹ */
                borderLeft: '4px solid #555', /* Chỉ có line trái dày gấp 4 */
                borderRight: '4px solid #555', /* Chỉ có line phải dày gấp 4 */
                padding: '4px 15px',
                display: 'inline-block',
                position: 'relative',
                color: 'var(--color-text-dark)'
              }}>
                CỬA TIỆM
                {/* Nốt tròn to gấp đôi ở góc TRÊN - TRÁI */}
                <div style={{ position: 'absolute', width: '20px', height: '20px', backgroundColor: '#555', borderRadius: '50%', top: '-10px', left: '-12px' }}></div>
                {/* Nốt tròn to gấp đôi ở góc DƯỚI - PHẢI */}
                <div style={{ position: 'absolute', width: '20px', height: '20px', backgroundColor: '#555', borderRadius: '50%', bottom: '-10px', right: '-12px' }}></div>
              </span> CỦA TÔI
            </h2>
          </div>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', marginBottom: '30px' }}>
            #AI_PHÁT_TRIỂN_BẢN_THÂN
          </div>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333', alignSelf: 'flex-end', marginRight: '10%', marginBottom: '30px' }}>
            #AI_THỜI_TRANG
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#333' }}>
              #AI_ĂN_VÀ_ĂN
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: '#222', marginRight: '20%' }}>
              -Hey boy, gì thế <br />
              -Chơi một chút thôi
            </div>
          </div>
        </section>
      </div>

      {/* Mảng Tối (Phải) - Cuộn chung với trái */}
      <div className="pane-right" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-dark-bg)'
      }}>

        {/* SECTION 1: Biển */}
        <section style={{
          width: '100%',
          minHeight: '130vh',
          padding: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Wrapper ẩn viền tràn của ảnh biển (chống tràn sang mảng trái) */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            overflow: 'hidden', zIndex: 1, pointerEvents: 'none'
          }}>
            <img loading="lazy" src="/images/sea.svg" alt="Biển" style={{
              position: 'absolute',
              top: '-5%',
              left: '-5%',
              width: '110%',
              height: '110%',
              objectFit: 'cover',
              filter: 'url(#sea-ripple)'
            }} />
          </div>
          {/* Wrapper chứa hiệu ứng Parallax đẩy lên trên khi cuộn */}
          <div style={{
            width: '25%',
            zIndex: 2,
            transform: `translateY(-${scrollY * 0.25}px)`,
            transition: 'transform 0.1s ease-out'
          }}>
            {/* Ảnh Thuyền có hiệu ứng trôi nhè nhẹ (Drift Animation) */}
            <img loading="lazy" src="/images/boar.svg" alt="Thuyền" className="drifting-boat" style={{
              width: '100%',
              opacity: 0.9,
              display: 'block'
            }} />
          </div>

          {/* Mây che ranh giới */}
          <img loading="lazy" src="/images/cloud 2.svg" alt="Mây che ranh giới" style={{
            position: 'absolute',
            bottom: '-100px', /* Nằm đè lên ranh giới giữa 2 section */
            left: '-5%',
            width: '110%',
            transform: `translateY(-${scrollY * 0.25}px)`, /* Thêm hiệu ứng trôi nhanh để cảm nhận chuyển động */
            transition: 'transform 0.1s ease-out',
            zIndex: 3,
            pointerEvents: 'none'
          }} />

          {/* Đám mây chuyển cảnh mọc từ dưới lên che mờ ranh giới */}
          <img loading="lazy" src="/images/cloud.svg" alt="Mây" style={{
            position: 'absolute',
            bottom: '-250px', /* Bắt đầu sâu hơn để không che mất la bàn quá sớm */
            left: '-10%',
            width: '120%',
            opacity: 0.9,
            transform: `translateY(-${scrollY * 0.1}px)`, /* Cuộn rất chậm để không bị văng khỏi ranh giới */
            transition: 'transform 0.1s ease-out',
            zIndex: 4,
            pointerEvents: 'none'
          }} />
        </section>

        {/* SECTION 2: Rừng & La Bàn */}
        <section style={{
          width: '100%',
          minHeight: 'calc(100vh - 84px)',
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          {/* Nền Rừng */}
          <img loading="lazy" src="/images/nen%202.png" alt="Rừng" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px', alignSelf: 'flex-end', marginRight: '15%' }}>
            {/* La bàn */}
            <a href="#" style={{ display: 'block', textDecoration: 'none' }}>
              <img loading="lazy" src="/images/la bàn.svg" alt="La bàn" className="compass-interactive" style={{ width: '250px', opacity: 0.9 }} />
            </a>
          </div>
          <div style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-script)', fontSize: '32px', color: '#fff', marginTop: '-40px', textAlign: 'left', width: '350px', alignSelf: 'flex-start', marginLeft: '10%' }}>
            -Tôi chưa biết nên bắt đầu từ đâu <br />
            -Dùng la bàn
          </div>
        </section>
      </div>
    </div>
  );
}
