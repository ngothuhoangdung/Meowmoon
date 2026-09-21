'use client';
import GlobalHeader from '../../../components/GlobalHeader';
import Link from 'next/link';
import {
  Flower, Leaf, NonLa, TShirt, Scissors, Star, ThreadSpool, Cloud, Needle
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

export default function LookbookV2() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', paddingTop: '84px' }}>
      <GlobalHeader />

      <style dangerouslySetInnerHTML={{
        __html: `
        .lb2-section { position: relative; }

        /* Grid spreads */
        .lb2-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .lb2-trio { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .lb2-asymL { display: grid; grid-template-columns: 3fr 2fr; gap: 8px; }
        .lb2-asymR { display: grid; grid-template-columns: 2fr 3fr; gap: 8px; }

        /* Doodle float */
        .doodle-float {
          position: absolute;
          pointer-events: none;
          z-index: 5;
        }

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
        .lb2-body {
          font-family: var(--font-sans);
          font-size: 14px;
          line-height: 1.9;
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
          .lb2-duo, .lb2-trio, .lb2-asymL, .lb2-asymR {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      {/* ========== COVER ========== */}
      <section className="lb2-section" style={{ padding: '60px 64px 0', maxWidth: '1200px', margin: '0 auto' }}>

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

        <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-end', paddingBottom: '48px' }}>
          {/* Title */}
          <div style={{ flex: 1 }}>
            <div className="lb2-label">MeowMoon · AI Visual Studio</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h1 className="lb2-h1" style={{ lineHeight: 1.1, position: 'relative', zIndex: 2 }}>
                Look<br />book
              </h1>
              <span style={{
              position: 'absolute',
              top: '38%',
              left: '62%',
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(90px, 14vw, 200px)',
              color: '#D8D4CC',
              lineHeight: 1,
              zIndex: 1,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}>AI</span>
            </div>
            <p className="lb2-body" style={{ marginTop: '72px', maxWidth: '260px', color: '#444' }}>
              Ứng dụng công nghệ khuếch đại gu thời trang, tối ưu chi phí sản xuất, tăng cơ hội bán hàng.
            </p>
          </div>

          {/* Intro text */}
          <div style={{ flex: 1, paddingBottom: '8px' }}>
            <p className="lb2-body">
              Đến hiện tại, khái niệm Lookbook AI đã quen thuộc với giới thời trang. Chúng ta không còn bàn về lợi ích — chúng ta phát triển hệ thống để AI hoạt động <strong>nhanh hơn, chân thực hơn</strong>.
            </p>
            <p className="lb2-body" style={{ marginTop: '14px', color: '#888', fontStyle: 'italic' }}>
              MeowMoon xin giới thiệu bộ skill Lookbook AI gồm 2 Workflow.
            </p>
          </div>
        </div>

        {/* Hero video — full width */}
        <div style={{ position: 'relative' }}>
          <VideoCell label="AI Lookbook · MeowMoon · Opener" aspect="21/9" src="/images/1/Malik Ousmane AI lookbook Model (2).jpeg" />

          {/* Doodle đè lên cạnh ảnh */}
          <div style={{ position: 'absolute', bottom: -28, left: 40, transform: 'rotate(-10deg)' }}>
            <NonLa size={72} opacity={0.6} />
          </div>
          <div style={{ position: 'absolute', bottom: -24, right: 60, transform: 'rotate(8deg)' }}>
            <Leaf size={48} opacity={0.5} />
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW 1 ========== */}
      <section className="lb2-section" style={{ padding: '80px 64px 60px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Doodle */}
        <div className="doodle-float" style={{ top: 20, right: 30, transform: 'rotate(20deg)' }}>
          <TShirt size={56} opacity={0.18} />
        </div>
        <div className="doodle-float" style={{ top: 60, left: -10, transform: 'rotate(-5deg)' }}>
          <Flower size={40} opacity={0.15} />
        </div>

        {/* Label + mô tả */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '32px' }}>
          <div>
            <div className="lb2-label">Workflow 01</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text-dark)', lineHeight: 1.2, marginBottom: '16px', transform: 'rotate(-15deg)', transformOrigin: 'left center' }}>
              Nhu cầu<br />phổ thông
            </h2>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <div className="lb2-wf-title">Input → SOP → Output</div>
            <p className="lb2-body">
              Nhập hình bộ trang phục — ví dụ flatlay nền trắng từ xưởng may. Hệ thống gợi ý <strong>3–4 phong cách</strong> phù hợp, bạn chọn, AI sản xuất ra người mẫu mặc trang phục đúng vibe — đầy đủ makeup, bối cảnh, tạo dáng.
            </p>
            <p className="lb2-body" style={{ marginTop: '10px', fontStyle: 'italic', color: '#555' }}>
              Nhanh — cả quá trình vài phút. Không cần am hiểu chuyên sâu.
            </p>
          </div>
        </div>

        {/* Spread ảnh Workflow 1 */}
        <div className="lb2-asymL" style={{ gap: '8px' }}>
          <VideoCell label="Flatlay → Model mặc đồ" aspect="4/5" src="/images/2/Nhat Minh AI lookbook Model (1).jpeg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <VideoCell label="Phong cách Elegant" aspect="4/5" src="/images/2/Nhat Minh AI lookbook Model (2).jpeg" />
            <VideoCell label="Phong cách Street" aspect="4/5" src="/images/2/Nhat Minh AI lookbook Model (3).jpeg" />
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
      <div style={{ maxWidth: '1200px', margin: '0 auto 0 64px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ flex: 1, height: '1px', background: '#E8E4DE' }} />
        <div style={{ transform: 'rotate(8deg)' }}><Star size={20} opacity={0.3} /></div>
        <div style={{ flex: 1, height: '1px', background: '#E8E4DE' }} />
      </div>

      {/* ========== WORKFLOW 2 ========== */}
      <section className="lb2-section" style={{ padding: '60px 64px 80px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Doodle */}
        <div className="doodle-float" style={{ top: 30, left: 10, transform: 'rotate(-12deg)' }}>
          <NonLa size={60} opacity={0.2} />
        </div>
        <div className="doodle-float" style={{ top: 10, right: 60, transform: 'rotate(6deg)' }}>
          <ThreadSpool size={44} opacity={0.18} />
        </div>

        {/* Label + mô tả */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '32px' }}>
          <div style={{ paddingTop: '8px' }}>
            <div className="lb2-wf-title">Dành cho nhu cầu chuyên môn cao</div>
            <p className="lb2-body">
              Chủ động tạo nhân vật người mẫu, chọn makeup, kiểu tóc, đặt vào bối cảnh chỉ định. Hệ thống của MeowMoon là <strong>bán tự động</strong> — AI giải quyết kỹ thuật prompt, sáng tạo vẫn là của bạn. Đủ mạnh để sản xuất nhanh, nâng cấp và tái sử dụng liên tục.
            </p>
          </div>
          <div>
            <div className="lb2-label">Workflow 02</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text-dark)', lineHeight: 1.2, textAlign: 'right', transform: 'rotate(15deg)', transformOrigin: 'right center' }}>
              NTK &<br />Stylist
            </h2>
          </div>
        </div>

        {/* Spread ảnh Workflow 2 — full editorial */}
        <div className="lb2-duo" style={{ gap: '8px', marginBottom: '8px' }}>
          <VideoCell label="Nhân vật mặt mộc" aspect="3/4" src="/images/3/Ren Tran AI lookbook Model (2).jpeg" />
          <VideoCell label="Chốt look Coquette" aspect="3/4" src="/images/3/Ren Tran AI lookbook Model (3).jpeg" />
        </div>
        <VideoCell label="Bối cảnh Hội An · Golden Hour" aspect="21/9" src="/images/3/Ren Tran AI lookbook Model (4).jpeg" />
        <div className="lb2-asymR" style={{ gap: '8px', marginTop: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <VideoCell label="Macro chi tiết vải" aspect="1/1" src="/images/3/Ren Tran AI lookbook Model (5).jpeg" />
            <VideoCell label="Candid mood" aspect="1/1" src="/images/3/Ren Tran AI lookbook Model (6).jpeg" />
          </div>
          <VideoCell label="Full context · Outfit focus" aspect="4/5" src="/images/3/Ren Tran AI lookbook Model (7).jpeg" hideLabel={true} />
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
      <section style={{
        borderTop: '1px solid #E8E4DE',
        padding: '80px 64px',
        textAlign: 'center',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="doodle-float" style={{ top: 20, left: 80, transform: 'rotate(-15deg)' }}>
          <Cloud size={90} opacity={0.1} />
        </div>
        <div className="doodle-float" style={{ top: 30, right: 100, transform: 'rotate(10deg)' }}>
          <TShirt size={48} opacity={0.12} />
        </div>

        <div className="lb2-label" style={{ marginBottom: '16px' }}>Kết</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 3vw, 32px)', fontStyle: 'italic', color: '#444', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 32px' }}>
          "Biến ý tưởng thành hình ảnh — nhanh hơn, chân thực hơn."
        </p>
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

        {/* Breadcrumb nhỏ */}
        <div style={{ fontSize: '10px', color: '#888', marginTop: '48px', display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/ai-doanh-nghiep" style={{ color: '#888', textDecoration: 'none' }}>AI Doanh nghiệp</Link>
          <span>›</span>
          <span>Lookbook AI v2</span>
        </div>
      </section>

    </div>
  );
}
