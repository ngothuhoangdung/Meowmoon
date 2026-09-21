'use client';
import Skill9Template from '../../../components/Skill9Template';

const subFolders = [
  { id: 'seo', name: 'SEO' },
  { id: 'aeo', name: 'AEO' },
  { id: 'geo', name: 'GEO' },
  { id: 'content', name: 'TỰ ĐỘNG HÓA' },
  { id: 'competitor', name: 'ĐỐI THỦ' },
  { id: 'keyword', name: 'TỪ KHÓA' }
];

const contentMap = {
  seo: { 
    title: 'TỐI ƯU HÓA SEO', 
    desc: 'Sử dụng AI để phân tích và tối ưu hóa thứ hạng tìm kiếm tự nhiên của website trên Google, Bing.',
    articles: [
      { title: 'Bí kíp leo Top 1 Google không cần backlink nhờ AI', link: '#' },
      { title: 'Tối ưu On-page SEO bằng Prompt tự động', link: '#' },
      { title: 'Phân tích Intent tìm kiếm của người dùng với Gemini', link: '#' }
    ]
  },
  aeo: { 
    title: 'TỐI ƯU HÓA AEO', 
    desc: 'Answer Engine Optimization - Tối ưu hóa nội dung để xuất hiện trên các công cụ trả lời tự động và trợ lý ảo (ChatGPT, Siri).',
    articles: [
      { title: 'AEO là gì? Tại sao SEO truyền thống đang mất dần vị thế?', link: '#' },
      { title: 'Cách cấu trúc dữ liệu để AI dễ dàng trích xuất câu trả lời', link: '#' }
    ]
  },
  geo: { 
    title: 'TỐI ƯU HÓA GEO', 
    desc: 'Generative Engine Optimization - Chiến lược SEO thế hệ mới nhắm vào các công cụ tìm kiếm sử dụng Generative AI.',
    articles: [
      { title: 'Hướng dẫn đưa thương hiệu lên ChatGPT và Perplexity', link: '#' },
      { title: 'Đo lường hiệu quả GEO: Những chỉ số nào quan trọng?', link: '#' },
      { title: 'Case Study: Tăng 300% traffic nhờ xuất hiện trên AI Overview', link: '#' }
    ]
  },
  content: { 
    title: 'TỰ ĐỘNG HÓA CONTENT', 
    desc: 'Quy trình sản xuất hàng ngàn bài viết chuẩn SEO/AEO/GEO mỗi ngày chỉ với một click chuột.',
    articles: [
      { title: 'Quy trình sản xuất 1000 bài viết/ngày không cần nhân sự', link: '#' },
      { title: 'Tự động lên lịch đăng bài đa nền tảng', link: '#' }
    ]
  },
  competitor: { 
    title: 'PHÂN TÍCH ĐỐI THỦ', 
    desc: 'AI tự động quét và phân tích điểm mạnh, điểm yếu trong chiến lược Content và Backlink của đối thủ.',
    articles: [
      { title: 'Dùng AI bóc tách chiến lược Content của đối thủ cạnh tranh', link: '#' },
      { title: 'Xác định khoảng trống từ khóa mà đối thủ đã bỏ lỡ', link: '#' }
    ]
  },
  keyword: { 
    title: 'NGHIÊN CỨU TỪ KHÓA', 
    desc: 'Khám phá các ngách từ khóa đuôi dài (long-tail keywords) có độ cạnh tranh thấp nhưng tỷ lệ chuyển đổi cực cao.',
    articles: [
      { title: 'Tìm kiếm ngách từ khóa đại dương xanh với AI', link: '#' },
      { title: 'Phân nhóm từ khóa tự động theo hành trình khách hàng', link: '#' }
    ]
  }
};

export default function AIMarketing() {
  return (
    <Skill9Template 
      pageTitle="Bộ Kỹ Năng AI Marketing"
      breadcrumbParent="AI doanh nghiệp"
      breadcrumbParentLink="/ai-doanh-nghiep"
      breadcrumbCurrent="AI Marketing"
      sapo="Khai phóng sức mạnh của Trí tuệ Nhân tạo để tối ưu hóa toàn diện chiến lược tiếp thị của bạn. Bộ công cụ AI Marketing được thiết kế để tự động hóa quy trình, phân tích dữ liệu chuyên sâu và gia tăng tỷ lệ chuyển đổi một cách đột phá, giúp doanh nghiệp luôn đi trước đối thủ một bước."
      bgRight="/images/nen 2.png"
      subFolders={subFolders}
      contentMap={contentMap}
    />
  );
}
