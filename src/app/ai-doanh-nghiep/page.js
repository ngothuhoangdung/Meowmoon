'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../../components/GlobalHeader';

const folders = [
  { id: 'hr', name: 'MA THUẬT HR' },
  { id: 'kinh-doanh', name: 'BÍ THUẬT KINH DOANH' },
  { id: 'marketing', name: 'MA PHÁP MARKETING' },
  { id: 'ke-toan', name: 'MA THUẬT KẾ TOÁN' },
  { id: 'logistics', name: 'BÍ THUẬT LOGISTICS' },
  { id: 'dau-tu', name: 'MA PHÁP ĐẦU TƯ' }
];

function MarketingPreview() {
  const previewFolders = [
    { id: 'seo', name: 'CHÚ NGỮ SEO' },
    { id: 'aeo', name: 'CHÚ NGỮ AEO' },
    { id: 'geo', name: 'CHÚ NGỮ GEO' },
    { id: 'content', name: 'CONTENT' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '80px',
      color: 'var(--color-text-dark)',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{ width: '80%', maxWidth: '600px', textAlign: 'left' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', marginBottom: '15px' }}>BÍ THUẬT AI MARKETING</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
          Khám phá những quyền năng tối thượng để tối ưu hóa hiện diện thương hiệu độc quyền với trí tuệ nhân tạo. Sự kết hợp giữa ma thuật AI và sáng tạo không giới hạn.
        </p>

        {/* Lưới Icon hoa (Bây giờ là Ký hiệu Ma thuật) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: '10px',
          rowGap: '15px',
          marginTop: '30px',
        }}>
          {previewFolders.map((folder, idx) => {
            const organicOffsets = [
              { mt: '0px', ml: '0px', rot: '-3deg' },
              { mt: '12px', ml: '-8px', rot: '4deg' },
              { mt: '-8px', ml: '8px', rot: '-5deg' },
              { mt: '8px', ml: '-4px', rot: '6deg' }
            ];
            const currentOffset = organicOffsets[idx];
            return (
              <div key={folder.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                marginTop: currentOffset.mt, marginLeft: currentOffset.ml, transform: "rotate(" + currentOffset.rot + ")"
              }}>
                <div style={{ position: 'relative', width: '55px', height: '55px', marginBottom: '8px' }}>
                  {/* Bông hoa giờ đóng vai trò như hạt giống ma thuật nảy mầm từ sách */}
                  <img loading="lazy" src="/images/icon 1.svg" alt="magical seal" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '10px', color: 'var(--color-text-dark)', textAlign: 'center' }}>{folder.name}</span>
              </div>
            )
          })}
        </div>

        {/* Kiến thức gốc -> Chú trận cốt lõi */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>CHÚ TRẬN CỐT LÕI</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#666' }}>• Phân tích hành vi đa nền tảng<br/>• Chiến lược tối ưu hóa từ khóa</p>
        </div>
      </div>
    </div>
  );
}

export default function AIDoanhNghiep() {
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const router = useRouter();

  const handleMouseMove = (e) => {
    // TÍNH TOÁN CỤC BỘ TỪNG ICON SÁCH
    // Chuột chỉ cần di chuyển trong khuôn viên nhỏ của 1 cuốn sách, 
    // vệt sáng sẽ quét một vùng lớn từ 15% đến 85% của mặt nước!
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    
    // Tính % vị trí chuột BÊN TRONG cuốn sách (từ 0 đến 100)
    let rawX = ((e.clientX - rect.left) / rect.width) * 100;
    let rawY = ((e.clientY - rect.top) / rect.height) * 100;
    
    rawX = Math.max(0, Math.min(100, rawX));
    rawY = Math.max(0, Math.min(100, rawY));

    // Ánh xạ thành đường chạy rất dài trên mặt nước
    let maskX = 15 + (rawX * 0.7);
    let maskY = 15 + (rawY * 0.7);

    setMousePos({ x: maskX, y: maskY });
  };

  const styleCSS = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes floatBreathe {
      0% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-8px) scale(1.02); }
      100% { transform: translateY(0px) scale(1); }
    }
    .spellbook-icon {
      animation: floatBreathe 4s ease-in-out infinite;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .folder-item:hover .spellbook-icon {
      /* Hiệu ứng ma thuật: Sách bay lên và phát hào quang màu đồng/cam sáng */
      transform: translateY(-15px) scale(1.08) !important;
      filter: drop-shadow(0 20px 30px rgba(220, 120, 50, 0.4)) contrast(1.1) !important;
      animation-play-state: paused;
    }
  `;

  return (
    <div 
      className="split-screen-container" 
      style={{ display: 'flex', width: '100vw', minHeight: '100vh', position: 'relative', backgroundColor: 'var(--color-cream)', paddingTop: '84px', boxSizing: 'border-box' }}
    >
      {/* SVG Filter cho hiệu ứng nước lăn tăn */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <filter id="water-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" dur="15s" values="0.015 0.015; 0.02 0.02; 0.015 0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <GlobalHeader />

      {/* Mảng Trái (Danh sách Sách Phép) */}
      <div 
        className="pane-left" 
        style={{ flex: 1, position: 'relative', paddingTop: '36px', paddingBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        
        {/* Tiêu đề & Sapo dẫn dắt */}
        <div style={{ width: '80%', maxWidth: '800px', textAlign: 'left', marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: 'var(--color-text-dark)', marginBottom: '15px' }}>
            Thư Viện Phép Thuật AI
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
            Lựa chọn ma đạo thư tương ứng để giải mã những bộ kỹ năng bí ẩn, giúp tự động hóa và bùng nổ hiệu suất cho từng bộ phận trong vương quốc doanh nghiệp của bạn.
          </p>
        </div>

        {/* Lưới Thư Mục (Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          columnGap: '60px',
          rowGap: '40px',
          marginTop: '30px',
          width: '80%',
          maxWidth: '800px'
        }}>
          {folders.map((folder, idx) => {
            // Hiệu ứng "Tụ vào giữa" và lộn xộn tự nhiên:
            // Cột 1 nghiêng phải/dịch phải, Cột 3 nghiêng trái/dịch trái
            const organicTransforms = [
              "translate(20px, 15px) rotate(6deg)",   // Góc trên trái
              "translate(0px, -15px) rotate(-3deg)",  // Trên giữa
              "translate(-20px, 20px) rotate(-5deg)", // Góc trên phải
              "translate(25px, -15px) rotate(4deg)",  // Góc dưới trái
              "translate(0px, 15px) rotate(2deg)",    // Dưới giữa
              "translate(-25px, -20px) rotate(-7deg)" // Góc dưới phải
            ];
            
            return (
              <div 
                key={folder.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: '15px',
                  borderRadius: '15px',
                  transform: organicTransforms[idx] /* Áp dụng xô lệch */
                }}
                onMouseEnter={() => setHoveredFolder(folder.id)}
                onMouseLeave={() => setHoveredFolder(null)}
                onMouseMove={handleMouseMove}
                onClick={() => {
                  if (folder.id === 'marketing') {
                    router.push('/ai-doanh-nghiep/marketing');
                  }
                }}
                className="folder-item"
              >
              <img loading="lazy" 
                src="/images/spellbook.png" 
                alt={folder.name} 
                style={{ 
                  width: '130px', 
                  height: 'auto', 
                  marginBottom: '20px', 
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1)) contrast(1.1)', 
                  mixBlendMode: 'multiply', /* Tách nền cam của ảnh sinh ra hòa vào trang */
                  animationDelay: `${idx * 0.4}s` /* Lệch pha nhịp thở */
                }} 
                className="spellbook-icon"
              />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'var(--color-text-dark)',
                textAlign: 'center',
                letterSpacing: '0.5px'
              }}>
                {folder.name}
              </span>
            </div>
          );
          })}
        </div>
      </div>

      {/* Mảng Phải (Chậu Nước Tiên Tri soi sáng Bí Thuật) */}
      <div 
        className="pane-right" 
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          borderLeft: '2px solid rgba(0,0,0,0.1)' /* Phân tách nhẹ */
        }}
      >
        {/* Lớp Background Nước ảo ảnh (áp dụng filter) */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
          backgroundImage: 'url(/images/scrying_pool.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'url(#water-ripple)',
          zIndex: 1
        }}></div>

        {/* Lớp Nội dung nổi lên mặt nước (Kính Lúp mờ viền nay là Vùng Nước Phát Sáng) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          /* Chỉ hiện vùng nước sáng khi có hover sách, nếu không thì ẩn hoàn toàn để mặt nước tĩnh lặng */
          opacity: hoveredFolder ? 1 : 0,
          /* Mask Image với gradient mượt mà hơn, không có vùng lõi đặc để tránh lộ hình tròn trắng thô cứng */
          maskImage: "radial-gradient(circle 350px at " + mousePos.x + "% " + mousePos.y + "%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle 350px at " + mousePos.x + "% " + mousePos.y + "%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)",
          transition: 'opacity 0.4s ease, mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out',
          
          /* Lớp ánh sáng trắng kem được làm trong hơn một chút để thấy nước hòa quyện */
          backgroundColor: 'rgba(248, 245, 240, 0.85)', 
          
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          {hoveredFolder === 'marketing' ? (
            <MarketingPreview />
          ) : hoveredFolder ? (
            /* Modal Đang Phát Triển cho các thư mục rỗng */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: '60px 80px',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  color: 'var(--color-text-dark)',
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}>
                  CHÚ NGỮ ĐANG ĐƯỢC DỊCH MÃ...
                </span>
                <div className="spinner" style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid rgba(0,0,0,0.05)',
                  borderTop: '4px solid var(--color-text-dark)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: styleCSS}} />
    </div>
  );
}
