'use client';
import GlobalHeader from '../../../components/GlobalHeader';
import Link from 'next/link';

const skills = [
  {
    id: 'product-studio',
    name: 'PRODUCT STUDIO',
    tagline: 'Ảnh trắng nền chuẩn TMĐT',
    input: '1 ảnh chụp điện thoại bất kỳ (nền nhà, tay cầm, nhiều sản phẩm...)\n+ tùy chọn: logo / số điện thoại để watermark',
    output: 'Ảnh nền trắng #FFFFFF, tỷ lệ 1:1. Màu sản phẩm giữ nguyên 100%. Bóng đổ mềm. Tự QC: phát hiện đổi màu → tự regenerate.',
    note: 'Ví dụ đặc biệt: Chai thủy tinh trong suốt có bóng cửa sổ phản chiếu → hệ thống nhận diện, xóa bóng rác, giữ nguyên nước trong vắt bên trong.'
  },
  {
    id: 'ecom-ux-director',
    name: 'ECOM UX DIRECTOR',
    tagline: 'Chiến lược 6-Slot tối ưu chuyển đổi',
    input: 'Phỏng vấn 4 bước: Sản phẩm & USP + Ngành hàng + Nền tảng + Yêu cầu Slot\n(Khuyên kèm 1 ảnh chụp thô để nhận diện vật liệu)',
    output: 'Concept Board 6 Prompt (6-Slot Framework):\nSlot 1 Hero · Slot 2 Secondary · Slot 3 Lifestyle · Slot 4 Detail · Slot 5 Scale · Slot 6 Packaging — tự inject Visual Hook theo ngành hàng.',
    note: null
  },
];

const portfolioItems = [
  { id: 1, label: 'Product Studio — Nền trắng', aspect: '1/1' },
  { id: 2, label: 'Product Studio — Bóng đổ mềm', aspect: '1/1' },
  { id: 3, label: 'Ecom UX — Slot 1: Hero', aspect: '1/1' },
  { id: 4, label: 'Ecom UX — Slot 3: Lifestyle', aspect: '4/3' },
  { id: 5, label: 'Ecom UX — Slot 4: Detail macro', aspect: '1/1' },
  { id: 6, label: 'Ecom UX — Slot 6: Packaging', aspect: '4/3' },
];

const CREAM = '#F5F1EB';
const SUBTLE = '#E8E2D9';

export default function TMDTPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: CREAM }}>
      <GlobalHeader />

      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-layout-tmdt {
          display: flex;
          width: 100%;
          flex: 1;
          padding-top: 84px;
          min-height: 100vh;
        }
        .left-pane-tmdt {
          width: 50%;
          flex-shrink: 0;
          position: sticky;
          top: 84px;
          height: calc(100vh - 84px);
          overflow-y: auto;
          padding: 52px 52px 52px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          border-right: 1px solid ${SUBTLE};
        }
        .right-pane-tmdt {
          flex: 1;
          padding: 40px 40px 80px 40px;
          overflow-y: auto;
          box-sizing: border-box;
        }
        .io-row-tmdt {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }
        .io-box-tmdt {
          background: white;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 13px;
          line-height: 1.65;
          color: #555;
          white-space: pre-line;
        }
        .io-label-tmdt {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
          color: #888;
        }
        .portfolio-grid-tmdt {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .portfolio-placeholder-tmdt {
          background: linear-gradient(135deg, #D0D8E0 0%, #B8C5D0 100%);
          border-radius: 12px;
          display: flex;
          align-items: flex-end;
          padding: 14px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .portfolio-placeholder-tmdt:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .portfolio-placeholder-tmdt::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%);
          border-radius: 12px;
        }
        .portfolio-label-tmdt {
          position: relative;
          z-index: 1;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.9);
        }
        @media (max-width: 768px) {
          .portfolio-layout-tmdt { flex-direction: column; padding-top: 84px; }
          .left-pane-tmdt {
            width: 100%; position: relative; top: 0; height: auto;
            padding: 36px 24px;
            border-right: none;
            border-bottom: 1px solid ${SUBTLE};
          }
          .right-pane-tmdt { padding: 28px 20px 60px; }
          .io-row-tmdt { grid-template-columns: 1fr; }
          .portfolio-grid-tmdt { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="portfolio-layout-tmdt">

        {/* =================== CỘT TRÁI =================== */}
        <div className="left-pane-tmdt">

          <div style={{ fontSize: '11px', color: '#999', marginBottom: '32px', display: 'flex', gap: '6px' }}>
            <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/ai-doanh-nghiep" style={{ color: '#999', textDecoration: 'none' }}>AI Doanh nghiệp</Link>
            <span>›</span>
            <span style={{ color: '#333' }}>Bán hàng sàn TMĐT</span>
          </div>

          <h1 style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 800, lineHeight: 1.2, color: '#111', marginBottom: '4px' }}>
            Ảnh sản phẩm AI
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 400, color: '#333', marginBottom: '24px', lineHeight: 1.4 }}>
            chuẩn studio, tối ưu chuyển đổi
          </p>

          {/* Giới thiệu */}
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#333', marginBottom: '18px' }}>
            Hệ thống AI chuyên biệt cho nhà bán hàng trên Shopee, TikTok Shop và Lazada. Từ một ảnh chụp điện thoại bất kỳ, hệ thống tạo ra ảnh sản phẩm chuẩn sàn và xây chiến lược hình ảnh bán hàng hoàn chỉnh.
          </p>

          {/* Bài toán tổng quan */}
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#333', marginBottom: '28px' }}>
            Bài toán không chỉ là ảnh xấu hay đẹp. AI tự ý <strong>đổi màu sản phẩm, thêm vật thể không có thật</strong> gây khiếu nại và hoàn hàng. Còn ngay cả khi ảnh đẹp, <strong>chỉ đăng 1 ảnh hero</strong> mà không có hệ thống 6 slot thì tỷ lệ chốt đơn vẫn thấp — vì khách Việt cần bằng chứng cụ thể trước khi tin.
          </p>

          {/* Model 1 */}
          <div style={{ borderLeft: '2px solid #222', paddingLeft: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>Model 1 — Tạo ảnh nền trắng chuẩn sàn</div>
            <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#444', margin: 0 }}>
              Nhận vào 1 ảnh chụp điện thoại bất kỳ — dù nền nhà, tay cầm hay nhiều sản phẩm chồng lên nhau. Hệ thống xử lý ra ảnh nền trắng tỷ lệ 1:1, <strong>giữ nguyên màu sản phẩm 100%</strong>, có bóng đổ mềm tự nhiên và tự QC để phát hiện lỗi đổi màu trước khi trả kết quả.
            </p>
          </div>

          {/* Model 2 */}
          <div style={{ borderLeft: '2px solid #222', paddingLeft: '16px', marginBottom: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>Model 2 — Chiến lược 6-Slot tối ưu chuyển đổi</div>
            <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#444', margin: 0 }}>
              Không chỉ tạo ảnh — hệ thống phỏng vấn bạn về sản phẩm, USP và nền tảng bán, sau đó đưa ra concept board đủ 6 slot ảnh: từ Hero kéo click, Secondary angle, Lifestyle bối cảnh thực tế, Detail macro chất liệu, Scale tỷ lệ thật, đến Packaging. Mỗi slot được inject Visual Hook đúng tâm lý khách hàng theo từng ngành hàng.
            </p>
          </div>
        </div>

        {/* =================== CỘT PHẢI =================== */}
        <div className="right-pane-tmdt">

          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>Portfolio</h2>
            <p style={{ fontSize: '13px', color: '#888' }}>Kết quả thực tế từ bộ AI Visual Studio — TMĐT</p>
          </div>

          <div className="portfolio-grid-tmdt">
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-placeholder-tmdt" style={{ aspectRatio: item.aspect }}>
                <span className="portfolio-label-tmdt">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Chi tiết từng skill */}
          <div style={{ marginTop: '56px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#999', textTransform: 'uppercase', marginBottom: '24px' }}>Chi tiết từng Skill</h3>
            {skills.map((s) => (
              <div key={s.id} style={{ marginBottom: '28px', padding: '24px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', color: '#888', marginBottom: '4px' }}>{s.name}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>{s.tagline}</div>
                </div>
                <div className="io-row-tmdt">
                  <div className="io-box-tmdt">
                    <div className="io-label-tmdt">Input</div>
                    {s.input}
                  </div>
                  <div className="io-box-tmdt">
                    <div className="io-label-tmdt">Output</div>
                    {s.output}
                  </div>
                </div>
                {s.note && (
                  <div style={{ marginTop: '12px', fontSize: '12px', color: '#888', fontStyle: 'italic', padding: '10px 14px', backgroundColor: '#FAFAFA', borderRadius: '8px', borderLeft: '3px solid #E0D8D0' }}>
                    {s.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8px', padding: '28px 32px', backgroundColor: '#111', borderRadius: '20px', color: '#F5F1EB' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Kết quả</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
              Từ <strong>1 ảnh điện thoại</strong> → ra <strong>bộ ảnh sản phẩm chuẩn studio</strong> + chiến lược hình ảnh giải quyết đúng rào cản tâm lý khách hàng Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
