'use client';
import GlobalHeader from '../../../components/GlobalHeader';
import Link from 'next/link';

const portfolioItems = [
  { id: 1, label: 'Workflow 1 — Flatlay → Model mặc đồ', aspect: '3/4' },
  { id: 2, label: 'Workflow 1 — Phong cách Elegant', aspect: '3/4' },
  { id: 3, label: 'Workflow 1 — Phong cách Street', aspect: '3/4' },
  { id: 4, label: 'Workflow 2 — Nhân vật mặt mộc', aspect: '3/4' },
  { id: 5, label: 'Workflow 2 — Chốt look Coquette', aspect: '3/4' },
  { id: 6, label: 'Workflow 2 — Bối cảnh Hội An', aspect: '4/3' },
  { id: 7, label: 'Workflow 2 — Full context shot', aspect: '3/4' },
  { id: 8, label: 'Workflow 2 — Flatlay hoàn chỉnh', aspect: '4/3' },
];

const CREAM = '#F5F1EB';
const SUBTLE = '#E8E2D9';

export default function ThoiTrangPage() {
  return (
    <div className="page-bg">
      <GlobalHeader />

      <style dangerouslySetInnerHTML={{ __html: `
        .page-bg {
          min-height: 100vh;
          padding-top: 84px;
          background-color: ${CREAM};
        }

        .article-outer {
          width: 100%;
          padding: 60px 40px 100px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .article-card {
          width: 100%;
          max-width: 760px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 52px 60px;
          box-sizing: border-box;
          box-shadow: 0 4px 40px rgba(0,0,0,0.06);
        }

        .article-card p,
        .article-card li {
          font-size: 15px;
          line-height: 1.85;
          color: #333;
        }

        .portfolio-section {
          width: 100%;
          max-width: 1200px;
          margin-top: 48px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 24px;
        }

        .portfolio-item {
          background: linear-gradient(135deg, #DDD8D0 0%, #C8C0B5 100%);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          align-items: flex-end;
          padding: 12px;
        }
        .portfolio-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.1);
        }
        .portfolio-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%);
        }
        .portfolio-item-label {
          position: relative;
          z-index: 1;
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .article-card { padding: 36px 32px; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .article-outer { padding: 40px 16px 80px; }
          .article-card { padding: 28px 20px; border-radius: 14px; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}} />

      <div className="article-outer">
        <div className="article-card">

        {/* Breadcrumb */}
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '40px', display: 'flex', gap: '6px' }}>
          <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/ai-doanh-nghiep" style={{ color: '#999', textDecoration: 'none' }}>AI Doanh nghiệp</Link>
          <span>›</span>
          <span style={{ color: '#333' }}>Thời trang & Thương hiệu</span>
        </div>

        {/* Tiêu đề */}
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '8px' }}>
          Lookbook AI
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', fontWeight: 400, color: '#333', marginBottom: '36px', lineHeight: 1.5 }}>
          Ứng dụng công nghệ khuếch đại gu thời trang, tối ưu chi phí sản xuất, tăng cơ hội bán hàng.
        </p>

        {/* Thân bài */}
        <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#333', marginBottom: '20px' }}>
          Đến hiện tại, khái niệm Lookbook AI đã quen thuộc với giới thời trang. Chúng ta không còn bàn về việc nó mang đến lợi ích gì — chúng ta chỉ phát triển các hệ thống để AI hoạt động nhanh chóng và chính xác hơn, cho ra kết quả chân thực hơn.
        </p>

        <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#333', marginBottom: '40px' }}>
          MeowMoon xin giới thiệu bộ skill Lookbook AI của chúng tôi. Hệ thống rất nhỏ gọn và đơn giản, gồm 2 Workflow.
        </p>

        {/* Workflow 1 */}
        <div style={{ borderLeft: '2px solid #111', paddingLeft: '20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
            Workflow 1 — Nhu cầu phổ thông
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', margin: '0 0 10px 0' }}>
            <strong>Input:</strong> Nhập hình bộ trang phục — ví dụ bộ flatlay nền trắng nhận từ xưởng may nước ngoài.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', margin: '0 0 10px 0' }}>
            <strong>SOP:</strong> Hệ thống gợi ý cho bạn 3–4 phong cách phù hợp, bạn chọn, tiến hành sản xuất.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', margin: '0 0 14px 0' }}>
            <strong>Output:</strong> Hình ảnh mẫu mặc trang phục với đầy đủ trang điểm, bối cảnh, tạo dáng phù hợp với phong cách được người dùng chỉ định.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#666', margin: 0, fontStyle: 'italic' }}>
            Nhanh — cả quá trình chỉ mất vài phút. Không cần am hiểu chuyên sâu về thời trang, kết quả vẫn là hình ảnh chân thực và đa dạng, không một màu, đơn điệu. Phù hợp nhu cầu phổ thông mà người dùng không yêu cầu quá cao về việc điều chỉnh từng phần của look.
          </p>
        </div>

        {/* Workflow 2 */}
        <div style={{ borderLeft: '2px solid #111', paddingLeft: '20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
            Workflow 2 — Dành cho nhà thiết kế thời trang & Stylist
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', margin: '0 0 14px 0' }}>
            Người dùng Workflow này có thể chủ động tạo ra nhân vật người mẫu, chọn makeup, kiểu tóc theo phong cách họ muốn, đặt nhân vật vào bối cảnh chỉ định.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', margin: 0 }}>
            Hệ thống của MeowMoon là <strong>bán tự động</strong> — vì trong ngành thời trang, AI chỉ giải quyết vấn đề là biến ý tưởng thành hình ảnh, không làm thay con người. Điểm rối duy nhất là kỹ thuật prompt. Tôi xây một hệ thống đủ mạnh mẽ và bao quát để giúp bạn sản xuất hình ảnh nhanh chóng, nâng cấp và tái sử dụng liên tục.
          </p>
        </div>

        <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#888', fontStyle: 'italic' }}>
          Nếu còn khó hình dung — mời bạn xem những gì chúng tôi làm ở phần Portfolio bên dưới.
        </p>

        </div>{/* end article-card */}

        {/* ===== PORTFOLIO ===== */}
        <div className="portfolio-section">
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>Portfolio</h2>
          <p style={{ fontSize: '13px', color: '#999', marginBottom: 0 }}>Kết quả thực tế từ bộ AI Lookbook — Thời trang</p>

          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item"
                style={{ aspectRatio: item.aspect }}
              >
                <span className="portfolio-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
