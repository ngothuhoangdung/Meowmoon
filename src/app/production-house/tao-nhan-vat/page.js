'use client';
import { useState, useEffect } from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import Link from 'next/link';
import {
  Flower, Leaf, NonLa, TShirt, Scissors, Star, ThreadSpool, Cloud, Needle, CrayonCircle
} from '../../../components/Doodles';

/* Placeholder video cell */
function VideoCell({ label, aspect = '3/4', style = {}, src, hideLabel }) {
  return (
    <div style={{
      aspectRatio: aspect,
      background: 'linear-gradient(135deg, #EDE8E2 0%, #D8D0C8 100%)',
      borderRadius: '4px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '14px',
      ...style
    }}>
      {src ? (
        <img loading="lazy" src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt={label} />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{ fontSize: '20px', opacity: 0.25 }}>▶</div>
          <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#AAA', textTransform: 'uppercase' }}>Video / GIF</div>
        </div>
      )}
      {(!hideLabel && !src) && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
          padding: '12px', fontSize: '10px', color: 'rgba(0,0,0,0.45)',
          fontStyle: 'italic',
          zIndex: 1
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

const contextAlbums = [
  {
    id: 'malik', avatar: '/images/models/malik-ousmane/malik ousmane ai lookbook model.webp',
    images: [
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 4.jpeg',
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 5.jpeg',
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 6.jpeg',
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 7.jpeg',
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 8.jpeg',
      '/images/models/malik-ousmane/malik ousmane ai lookbook model 9.jpeg'
    ]
  },
  {
    id: 'minh', avatar: '/images/models/nhat-minh/nhat minh ai lookbook model.webp',
    images: [
      '/images/models/nhat-minh/nhat minh ai lookbook model 2.jpeg',
      '/images/models/nhat-minh/nhat minh ai lookbook model 3.jpeg',
      '/images/models/nhat-minh/nhat minh ai lookbook model 4.jpeg',
      '/images/models/nhat-minh/nhat minh ai lookbook model 12.jpeg',
      '/images/models/nhat-minh/nhat minh ai lookbook model 13.jpeg',
      '/images/models/nhat-minh/nhat minh ai lookbook model 15.jpeg'
    ]
  },
  {
    id: 'ren', avatar: '/images/models/ren-tran/ren tran ai lookbook model.webp',
    images: [
      '/images/models/ren-tran/ren tran ai lookbook model 3.jpeg',
      '/images/models/ren-tran/ren tran ai lookbook model 4.jpeg',
      '/images/models/ren-tran/ren tran ai lookbook model 5.jpeg',
      '/images/models/ren-tran/ren tran ai lookbook model 6.jpeg',
      '/images/models/ren-tran/ren tran ai lookbook model 7.jpeg',
      '/images/models/ren-tran/ren tran ai lookbook model 8.jpeg'
    ]
  },
  {
    id: 'ha', avatar: '/images/models/tu-ha/casst.jpeg',
    images: [
      '/images/models/tu-ha/1.jpeg',
      '/images/models/tu-ha/2.jpeg',
      '/images/models/tu-ha/3.jpeg',
      '/images/models/tu-ha/4.jpeg',
      '/images/models/tu-ha/5.jpeg',
      '/images/models/tu-ha/5a.jpeg',
      '/images/models/tu-ha/6.jpeg',
      '/images/models/tu-ha/7.jpeg',
      '/images/models/tu-ha/8.jpeg',
      '/images/models/tu-ha/9.jpeg'
    ]
  },
  {
    id: 'kaia', avatar: '/images/models/kaia-nguyen/casting.jpeg',
    images: [
      '/images/models/kaia-nguyen/1.jpeg',
      '/images/models/kaia-nguyen/2.jpeg',
      '/images/models/kaia-nguyen/3.jpeg',
      '/images/models/kaia-nguyen/4.jpeg',
      '/images/models/kaia-nguyen/5.jpeg',
      '/images/models/kaia-nguyen/6.jpeg',
      '/images/models/kaia-nguyen/7.jpeg'
    ]
  },
  {
    id: 'mina', avatar: '/images/models/park-mina/casting.jpeg',
    images: [
      '/images/models/park-mina/1.jpeg',
      '/images/models/park-mina/2.jpeg',
      '/images/models/park-mina/3.jpeg',
      '/images/models/park-mina/4.jpeg',
      '/images/models/park-mina/5.jpeg'
    ]
  },
  {
    id: 'amara', avatar: '/images/models/amara-diop/casting.jpeg',
    images: [
      '/images/models/amara-diop/1.jpeg',
      '/images/models/amara-diop/2.jpeg',
      '/images/models/amara-diop/3.jpeg',
      '/images/models/amara-diop/4.jpeg',
      '/images/models/amara-diop/5.jpeg',
      '/images/models/amara-diop/6.jpeg'
    ]
  },
  {
    id: 'gaspard', avatar: '/images/models/gaspard-laurent/cast.jpeg',
    images: [
      '/images/models/gaspard-laurent/1.jpeg',
      '/images/models/gaspard-laurent/2.jpeg',
      '/images/models/gaspard-laurent/4.jpeg',
      '/images/models/gaspard-laurent/5.jpeg',
      '/images/models/gaspard-laurent/6.jpeg',
      '/images/models/gaspard-laurent/7.jpeg',
      '/images/models/gaspard-laurent/8.jpeg',
      '/images/models/gaspard-laurent/9.jpeg',
      '/images/models/gaspard-laurent/10.jpeg'
    ]
  }
];
const fullContextAlbums = [...contextAlbums];

export default function PortraitStudio() {
  const coverImages = [
    '/images/models/tu-ha/casst.jpeg',
    '/images/models/kaia-nguyen/casting.jpeg',
    '/images/models/park-mina/casting.jpeg',
    '/images/models/amara-diop/casting.jpeg',
    '/images/models/malik-ousmane/malik ousmane ai lookbook model.webp',
    '/images/models/nhat-minh/nhat minh ai lookbook model.webp',
    '/images/models/ren-tran/ren tran ai lookbook model.webp',
    '/images/models/gaspard-laurent/cast.jpeg',
  ];
  const [activeCover, setActiveCover] = useState(coverImages[0]);

  const makeupImages = [
    '/images/models/tu-ha/makeup.jpeg',
    '/images/models/tu-ha/makeup 2.jpeg',
    '/images/models/tu-ha/makeup 3.jpeg',
    '/images/models/kaia-nguyen/makeup.jpeg',
    '/images/models/kaia-nguyen/makeup 2.jpeg',
    '/images/models/park-mina/makeup.jpeg',
    '/images/models/park-mina/makeup 2.jpeg',
    '/images/models/amara-diop/makeup.jpeg',
    '/images/models/amara-diop/makeup 2.jpeg',
    '/images/models/amara-diop/makeup 3.jpeg',
    '/images/models/tu-ha/makeup.jpeg',
    '/images/models/amara-diop/makeup.jpeg',
  ];
  const [activeMakeup, setActiveMakeup] = useState(makeupImages[0]);
  const [activeContextIdx, setActiveContextIdx] = useState(0);
  const activeContext = fullContextAlbums[activeContextIdx];
  const getImage = (idx) => activeContext.images[idx % activeContext.images.length];

  // Lightbox State
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    let interval;
    if (lightbox.isOpen && isAutoPlay) {
      interval = setInterval(() => {
        setLightbox(prev => ({
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.images.length
        }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [lightbox.isOpen, isAutoPlay, lightbox.images?.length]);

  const openLightbox = (images, index) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setLightbox({ isOpen: true, images, currentIndex: index });
      setIsAutoPlay(false);
    }
  };
  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    setIsAutoPlay(false);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  };
  const toggleAutoPlay = (e) => {
    e.stopPropagation();
    setIsAutoPlay(prev => !prev);
  };

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', paddingTop: '84px', overflowX: 'hidden' }}>
      <GlobalHeader />

      <style dangerouslySetInnerHTML={{
        __html: `
        .lb2-section { position: relative; }

        /* Grid spreads */
        .lb2-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .lb2-trio { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .lb2-asymL { display: grid; grid-template-columns: 3fr 2fr; gap: 8px; }
        .lb2-asymR { display: grid; grid-template-columns: 2fr 3fr; gap: 8px; }
        .lb2-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }

        .section-cover { padding: 32px 64px 0; max-width: 1200px; margin: 0 auto; }
        .section-wf1 { padding: 80px 64px 60px; max-width: 1200px; margin: 0 auto; }
        .section-wf2 { padding: 60px 64px 80px; max-width: 1200px; margin: 0 auto; }
        .section-closing { border-top: 1px solid #E8E4DE; padding: 80px 64px; text-align: center; position: relative; max-width: 1200px; margin: 0 auto; }
        .divider-container { max-width: 1200px; margin: 0 auto 0 64px; display: flex; align-items: center; gap: 24px; }
        
        .avatar-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 16px; margin-bottom: 40px; }
        .cover-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        /* Doodle float */
        .doodle-float {
          position: absolute;
          pointer-events: none;
          z-index: 5;
        }

        .lb2-step-header { display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: start; margin-bottom: 32px; position: relative; }
        .lb2-step-header-wf2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; margin-bottom: 32px; position: relative; }
        .wf2-title-container { text-align: right; }
        .wf2-title-h2 { text-align: right; transform: rotate(15deg); transform-origin: right center; }

        /* Highlight FX */
        .shop-highlight-bg { position: absolute; top: 0; bottom: 0; background-color: #e6e3db; animation: bgClamp 4s cubic-bezier(0.65, 0, 0.35, 1) infinite; z-index: 0; }
        .shop-highlight-text-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 2; animation: textClip 4s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .shop-highlight-left { position: absolute; top: 0; left: 0px; height: 100%; width: 4px; background-color: #555; animation: clampLeft 4s cubic-bezier(0.65, 0, 0.35, 1) infinite; z-index: 10; }
        .shop-highlight-right { position: absolute; top: 0; right: 0px; height: 100%; width: 4px; background-color: #555; animation: clampRight 4s cubic-bezier(0.65, 0, 0.35, 1) infinite; z-index: 10; }
        .shop-dot-top-left { position: absolute; width: 16px; height: 16px; background-color: #555; border-radius: 50%; top: -8px; left: -6px; }
        .shop-dot-bottom-right { position: absolute; width: 16px; height: 16px; background-color: #555; border-radius: 50%; bottom: -8px; right: -6px; }
        @keyframes bgClamp { 0%, 15%, 100% { left: 0px; right: 0px; } 50%, 65% { left: calc(50% - 2px); right: calc(50% - 2px); } }
        @keyframes textClip { 0%, 15%, 100% { clip-path: inset(0% 0% 0% 0%); } 50%, 65% { clip-path: inset(0% 50% 0% 50%); } }
        @keyframes clampLeft { 0%, 15%, 100% { left: 0px; } 50%, 65% { left: calc(50% - 2px); } }
        @keyframes clampRight { 0%, 15%, 100% { right: 0px; } 50%, 65% { right: calc(50% - 2px); } }

        /* Text */
        .lb2-label {
          font-family: var(--font-sans);
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #777;
          margin-bottom: 10px;
        }
        .lb2-h1 {
          font-family: var(--font-serif);
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 400;
          color: var(--color-text-dark);
          line-height: 1.05;
          letter-spacing: -1px;
        }
        .lb2-h1-ai {
          position: absolute;
          top: 38%;
          left: 62%;
          font-family: var(--font-script);
          font-size: clamp(90px, 14vw, 200px);
          color: #D8D4CC;
          line-height: 1;
          z-index: 1;
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
        }
        .lb2-body {
          font-family: var(--font-sans);
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        .lb2-wf-title {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-dark);
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .lb2-h1 { font-size: 72px !important; }
          .lb2-h1-ai { font-size: 180px !important; }
          .lb2-duo, .lb2-trio, .lb2-asymL, .lb2-asymR, .lb2-gallery, .lb2-step-header, .lb2-step-header-wf2 {
            grid-template-columns: 1fr;
          }
          .lb2-gallery { gap: 32px; }
          .lb2-step-header, .lb2-step-header-wf2 { gap: 32px; }
          .section-cover { padding: 24px 20px 0; }
          .section-wf1 { padding: 40px 20px; }
          .section-wf2 { padding: 40px 20px; }
          .section-closing { padding: 40px 20px; }
          .divider-container { margin: 0 20px; }
          .avatar-grid { grid-template-columns: repeat(4, 1fr); gap: 12px; }
          .cover-grid { gap: 8px; }
          .wf2-text { order: 2; }
          .wf2-title-container { order: 1; text-align: left; }
          .wf2-title-h2 { text-align: left; transform-origin: left center; }
          .mobile-zoom-cursor { cursor: zoom-in !important; }
        }
      `}} />

      {/* ========== COVER ========== */}
      <section className="lb2-section section-cover">

        {/* Breadcrumb */}
        <div style={{
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--color-text-dark)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '20px',
          opacity: 0.8
        }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>&gt;</span>
          <Link href="/ai-doanh-nghiep" style={{ color: 'inherit', textDecoration: 'none' }}>AI Doanh nghiệp</Link>
          <span>&gt;</span>
          <span style={{ fontWeight: 'bold', opacity: 1 }}>Portrait Studio</span>
        </div>

        {/* Doodle rải đầu trang */}
        <div className="doodle-float" style={{ top: 30, right: 80, transform: 'rotate(12deg)' }}>
          <Flower size={52} opacity={0.18} />
        </div>
        <div className="doodle-float" style={{ top: 10, left: 20, transform: 'rotate(-8deg)' }}>
          <Cloud size={80} opacity={0.12} />
        </div>
        <div className="doodle-float" style={{ top: 80, right: 200, transform: 'rotate(-15deg)' }}>
          <Star size={28} opacity={0.2} />
        </div>

        <div style={{ minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '80px', textAlign: 'center' }}>
          {/* Title */}
          <div>
            <h1 style={{ position: 'relative', display: 'inline-block', textAlign: 'left', margin: 0, fontWeight: 'normal', transform: 'translateY(-20px)' }}>
              <span className="lb2-h1" style={{ display: 'block', lineHeight: 1.1, position: 'relative', zIndex: 2 }}>
                Portrait<br />Studio
              </span>
              <span className="lb2-h1-ai">AI</span>
            </h1>
            <p className="lb2-body" style={{ marginTop: '32px', maxWidth: '500px', margin: '32px auto 0', color: '#444' }}>
              Giải pháp tạo người mẫu ảo đáp ứng đa dạng nhu cầu từ cá nhân đến doanh nghiệp. Tùy chỉnh chi tiết gương mặt, phong cách trang điểm và bối cảnh để tạo ra những bộ ảnh chân dung sắc nét, chân thực.
            </p>
          </div>
        </div>

        {/* CASTING & Interactive Cover */}
        <div style={{ width: '100%' }}>
          <div className="lb2-gallery" style={{ position: 'relative' }}>
            {/* Cột trái: Text CASTING + 8 hình nhỏ (4 cột x 2 hàng) */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              {/* Intro text */}
              <div style={{ paddingBottom: '32px', textAlign: 'left', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-40px', left: '-20px', width: 'clamp(100px, 12vw, 150px)', height: 'clamp(100px, 12vw, 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
                  <CrayonCircle fill="#D8D4CC" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }} />
                  <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(67.5px, 10.5vw, 150px)', color: '#FFF', lineHeight: 1 }}>1</span>
                </div>
                <h2 style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text-dark)', lineHeight: 1.2, marginBottom: '24px', transform: 'rotate(-15deg)', transformOrigin: 'left center' }}>
                  CASTING
                </h2>
                <p className="lb2-body" style={{ position: 'relative', zIndex: 1 }}>
                  Thiết kế gương mặt độc quyền, đáp ứng linh hoạt nhiều mục đích sử dụng. Nhân vật tạo ra có thể đảm nhận vai trò diễn viên cho phim ảnh, làm KOL/KOC cho các buổi phát trực tiếp (livestream), hoặc làm người mẫu đại diện trên các biển bảng, ấn phẩm quảng cáo.
                </p>
              </div>

              <div className="cover-grid">
                {coverImages.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setActiveCover(src); openLightbox(coverImages, idx); }}
                    style={{
                      cursor: 'pointer',
                      opacity: activeCover === src ? 1 : 0.4,
                      transition: 'opacity 0.25s ease',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      aspectRatio: '3/4',
                      background: '#EDE8E2'
                    }}
                  >
                    <img loading="lazy" src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Casting người mẫu ảo ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Hình lớn */}
            <div
              onClick={() => openLightbox(coverImages, coverImages.indexOf(activeCover) === -1 ? 0 : coverImages.indexOf(activeCover))}
              className="mobile-zoom-cursor"
              style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '3/4', background: '#EDE8E2' }}>
              <img loading="lazy" src={activeCover} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Casting tạo người mẫu ảo cho quảng cáo và phim ảnh" />
              {/* Hình lớn không có doodle */}
            </div>
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW 1 ========== */}
      <section className="lb2-section section-wf1">

        {/* Doodle */}
        <div className="doodle-float" style={{ top: 20, right: 30, transform: 'rotate(20deg)' }}>
          <TShirt size={56} opacity={0.18} />
        </div>
        <div className="doodle-float" style={{ top: 60, left: -10, transform: 'rotate(-5deg)' }}>
          <Flower size={40} opacity={0.15} />
        </div>

        {/* Label + mô tả */}
        <div className="lb2-step-header">
          <div style={{ position: 'absolute', top: '-40px', left: '-20px', width: 'clamp(100px, 12vw, 150px)', height: 'clamp(100px, 12vw, 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
            <CrayonCircle fill="#D8D4CC" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }} />
            <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(67.5px, 10.5vw, 150px)', color: '#FFF', lineHeight: 1 }}>2</span>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text-dark)', lineHeight: 1.2, marginBottom: '16px', transform: 'rotate(-15deg)', transformOrigin: 'left center' }}>
              Makeup<br />and Hair
            </h2>
          </div>
          <div style={{ paddingTop: '8px', position: 'relative', zIndex: 1 }}>
            <p className="lb2-body">
              Môi trường thử nghiệm trực quan cho ngành làm đẹp. Các chuyên gia trang điểm (MUA) và tạo mẫu tóc có thể dễ dàng kiểm tra các phong cách mới. Cá nhân cũng có thể ứng dụng để tự tạo những bộ ảnh chân dung chất lượng cao mang đậm dấu ấn riêng.
            </p>
          </div>
        </div>

        {/* Spread ảnh Workflow 1 */}
        <div className="lb2-asymL" style={{ gap: '64px' }}>
          {/* Cột trái: Hình lớn stretch theo chiều cao cột phải */}
          <div
            onClick={() => openLightbox(makeupImages, makeupImages.indexOf(activeMakeup) === -1 ? 0 : makeupImages.indexOf(activeMakeup))}
            className="mobile-zoom-cursor"
            style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', height: '100%', minHeight: '600px', background: '#EDE8E2' }}>
            <img loading="lazy" src={activeMakeup} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Ứng dụng AI thử nghiệm trang điểm và ảnh chân dung cá nhân" />
          </div>
          {/* Cột phải: Grid 3x5 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {makeupImages.map((src, idx) => (
              <div
                key={idx}
                onClick={() => { setActiveMakeup(src); openLightbox(makeupImages, idx); }}
                style={{
                  cursor: 'pointer',
                  opacity: activeMakeup === src ? 1 : 0.4,
                  transition: 'opacity 0.25s ease',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  background: '#EDE8E2'
                }}
              >
                <img loading="lazy" src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Thử nghiệm trang điểm AI ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Doodle dưới spread */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-20px', marginRight: '20px' }}>
          <div style={{ transform: 'rotate(15deg)' }}>
            <Scissors size={44} opacity={0.22} />
          </div>
        </div>
      </section>

      {/* ========== DIVIDER ========== */}
      <div className="divider-container">
        <div style={{ flex: 1, height: '1px', background: '#E8E4DE' }} />
        <div style={{ transform: 'rotate(8deg)' }}><Star size={20} opacity={0.3} /></div>
        <div style={{ flex: 1, height: '1px', background: '#E8E4DE' }} />
      </div>

      {/* ========== WORKFLOW 2 ========== */}
      <section className="lb2-section section-wf2">

        {/* Doodle */}
        <div className="doodle-float" style={{ top: 30, left: 10, transform: 'rotate(-12deg)' }}>
          <NonLa size={60} opacity={0.2} />
        </div>
        <div className="doodle-float" style={{ top: 10, right: 60, transform: 'rotate(6deg)' }}>
          <ThreadSpool size={44} opacity={0.18} />
        </div>

        {/* Label + mô tả */}
        <div className="lb2-step-header-wf2">
          <div style={{ position: 'absolute', top: '-40px', right: '-20px', width: 'clamp(100px, 12vw, 150px)', height: 'clamp(100px, 12vw, 150px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
            <CrayonCircle fill="#D8D4CC" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }} />
            <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(67.5px, 10.5vw, 150px)', color: '#FFF', lineHeight: 1 }}>3</span>
          </div>
          <div className="wf2-text" style={{ paddingTop: '8px', position: 'relative', zIndex: 1 }}>
            <div className="lb2-wf-title">Đưa vào bối cảnh thực tế</div>
            <p className="lb2-body">
              Đặt nhân vật vào các bối cảnh cụ thể để truyền tải trọn vẹn thông điệp. Hình ảnh tạo ra rất phù hợp để làm ảnh minh họa bài viết, xây dựng bối cảnh chụp sản phẩm, hoặc tạo lập các tình huống giao tiếp chân thực trên mạng xã hội.
            </p>
          </div>
          <div className="wf2-title-container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="lb2-label">Bước 03</div>
            <h2 className="wf2-title-h2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text-dark)', lineHeight: 1.2 }}>
              Diễn xuất<br />& Context
            </h2>
          </div>
        </div>

        {/* Thanh chọn 8 avatar */}
        <div className="avatar-grid">
          {fullContextAlbums.map((album, idx) => (
            <div
              key={idx}
              onClick={() => setActiveContextIdx(idx)}
              style={{
                cursor: 'pointer',
                aspectRatio: '1/1',
                borderRadius: '50%',
                overflow: 'hidden',
                border: activeContextIdx === idx ? '3px solid var(--color-text-dark)' : '3px solid transparent',
                opacity: activeContextIdx === idx ? 1 : 0.4,
                transition: 'all 0.3s ease',
                padding: '2px'
              }}
            >
              <img loading="lazy" src={album.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} alt="Nhân vật ảo KOL trong các bối cảnh đời thực" />
            </div>
          ))}
        </div>

        {/* Layout bất đối xứng (11 hình đan xen) */}
        <div className="lb2-trio" style={{ gap: '8px', marginBottom: '8px' }}>
          <VideoCell label="Mood 1" aspect="3/4" src={getImage(0)} hideLabel={true} />
          <VideoCell label="Mood 2" aspect="3/4" src={getImage(1)} hideLabel={true} />
          <VideoCell label="Mood 3" aspect="3/4" src={getImage(2)} hideLabel={true} />
        </div>

        <div className="lb2-asymL" style={{ gap: '8px', marginBottom: '8px' }}>
          <VideoCell label="Key Look L" aspect="3/4" src={getImage(3)} hideLabel={true} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <VideoCell aspect="1/1" src={getImage(4)} hideLabel={true} />
            <VideoCell aspect="1/1" src={getImage(5)} hideLabel={true} />
          </div>
        </div>

        <div className="lb2-duo" style={{ gap: '8px', marginBottom: '8px' }}>
          <VideoCell label="Detail 1" aspect="4/5" src={getImage(6)} hideLabel={true} />
          <VideoCell label="Detail 2" aspect="4/5" src={getImage(7)} hideLabel={true} />
        </div>

        <div className="lb2-asymR" style={{ gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <VideoCell aspect="1/1" src={getImage(8)} hideLabel={true} />
            <VideoCell aspect="1/1" src={getImage(9)} hideLabel={true} />
          </div>
          <VideoCell label="Key Look R" aspect="3/4" src={getImage(10)} hideLabel={true} />
        </div>

        {/* Doodle rải dưới */}
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '40px', alignItems: 'flex-end' }}>
          <div style={{ transform: 'rotate(-8deg) translateY(8px)' }}><Leaf size={36} opacity={0.3} /></div>
          <div style={{ transform: 'rotate(5deg)' }}><Flower size={44} opacity={0.25} /></div>
          <div style={{ transform: 'rotate(14deg) translateY(6px)' }}><Needle size={40} opacity={0.25} /></div>
          <div style={{ transform: 'rotate(-6deg)' }}><Flower size={32} opacity={0.2} /></div>
          <div style={{ transform: 'rotate(10deg) translateY(4px)' }}><Leaf size={40} opacity={0.28} /></div>
        </div>
      </section>

      {/* ========== CLOSING ========== */}
      <section className="section-closing">
        <div className="doodle-float" style={{ top: 20, left: 80, transform: 'rotate(-15deg)' }}>
          <Cloud size={90} opacity={0.1} />
        </div>
        <div className="doodle-float" style={{ top: 30, right: 100, transform: 'rotate(10deg)' }}>
          <TShirt size={48} opacity={0.12} />
        </div>


        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#777', letterSpacing: '2px', marginBottom: '20px' }}>— MeowMoon AI Visual Studio</div>
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/ai-doanh-nghiep" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}>
            Tất cả dịch vụ
          </Link>
          <span style={{ color: '#ddd' }}>·</span>
          <Link href="/ai-doanh-nghiep/thoi-trang" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}>
            Đọc bài viết
          </Link>
        </div>


      </section>

      {/* ========== LIGHTBOX ========== */}
      {lightbox.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }} onClick={closeLightbox}>
          {/* Header (Close + Auto) */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '16px', zIndex: 10000, alignItems: 'center' }}>
            <button onClick={toggleAutoPlay} style={{
              background: isAutoPlay ? '#fff' : 'rgba(0,0,0,0.5)', color: isAutoPlay ? '#000' : '#fff',
              border: isAutoPlay ? '1px solid #fff' : '1px solid rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '1px', transition: '0.3s', backdropFilter: 'blur(4px)'
            }}>
              {isAutoPlay ? 'STOP AUTO' : 'AUTO PLAY (2s)'}
            </button>
            <button onClick={closeLightbox} style={{
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '28px', cursor: 'pointer',
              width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', backdropFilter: 'blur(4px)'
            }}>&times;</button>
          </div>

          {/* Prev Button */}
          <button onClick={prevImage} style={{
            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '40px', cursor: 'pointer',
            width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, transition: '0.3s', backdropFilter: 'blur(4px)'
          }}>&#8249;</button>

          {/* Next Button */}
          <button onClick={nextImage} style={{
            position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '40px', cursor: 'pointer',
            width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, transition: '0.3s', backdropFilter: 'blur(4px)'
          }}>&#8250;</button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', display: 'flex', justifyContent: 'center' }}>
            <img loading="lazy"
              src={lightbox.images[lightbox.currentIndex]}
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              alt="Ảnh phóng to"
            />
          </div>

          {/* Counter */}
          <div style={{ position: 'absolute', bottom: '20px', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '14px', letterSpacing: '2px' }}>
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
        </div>
      )}

    </div>
  );
}
