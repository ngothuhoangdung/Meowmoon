# NHẬT KÝ PHÁT TRIỂN (DEV LOG) - DỰ ÁN MEOWMOON WEB

## Bối Cảnh Hiện Tại (Context)
- **Tiến độ:** 
  - Đã hoàn thành xuất sắc Giai đoạn 4: Lột xác hoàn toàn trang Tổng quan `ai-doanh-nghiep`.
  - Đã hoàn thiện và chính thức Live giao diện Trang chủ mới (Home-v2) tại `http://localhost:3000/`.
  - **Mới nhất:** Tối ưu hóa SEO (Metadata, Alt text) và viết lại toàn bộ Content trang Tạo Nhân Vật (Portrait Studio) để tập trung làm rõ lợi ích thực tế cho MUA, KOL, và doanh nghiệp.
- **Thành tựu cốt lõi:**
  1. Loại bỏ icon tĩnh, áp dụng hệ thống Sách Cổ lơ lửng (Organic Breathing).
  2. Kính Lúp Xuyên Thấu lướt trên mặt Chậu Nước Phép Thuật.
  3. Tối ưu hóa cực hạn mặt biển: Xóa sổ SVG Filter gây giật lag, thay bằng CSS Optical Illusion (2 lớp ảnh đè nhau) chạy siêu mượt 60fps không tốn CPU.
  4. Lập trình kịch bản chuyển cảnh điện ảnh: Mây tan biến -> Video khu rừng tự động phát -> La bàn xuất hiện.
  5. Thiết kế hiệu ứng "Gọng kìm nuốt chữ" sử dụng `clip-path: inset()` và đường cong vật lý `cubic-bezier`.

## Bài Học Kinh Nghiệm (Vibe Coding Lessons)

1. **Tránh nhồi lệnh mang tính "khẳng định chắc nịch" nhưng thiếu chi tiết:** 
   - Lời nhắc mang tính chất giải pháp (solution-oriented) chứ không phải mô tả vấn đề (problem-oriented) rất dễ làm AI sửa nhầm, phá hỏng cấu trúc. 
   - **Cách khắc phục:** Nên cung cấp vấn đề và mục tiêu rõ ràng để AI có không gian tự suy luận, hoặc giới hạn rõ phạm vi sửa chữa.

2. **Cẩn trọng khi can thiệp cấu trúc SVG phức tạp (Export từ Tools):** 
   - Việc "vibe code" sửa mã nguồn SVG thủ công rất dễ gặp lỗi phụ (side-effects). Tốt nhất là setup xuất file đúng từ đầu, hoặc dùng các thẻ bọc (wrapper container) xử lý overflow.

3. **Khi giải pháp 1 thất bại, cần "Reset Context" thay vì đắp thêm giải pháp mới:**
   - Việc liên tục chắp vá khiến trạng thái code bị rối loạn. Hãy xóa đi và yêu cầu AI làm lại với logic đơn giản nhất.

4. **Mô tả lỗi UI/Hiển thị hiệu quả nhất là dùng Hình ảnh/Log:**
   - Hãy cung cấp thẳng **ảnh chụp màn hình** hoặc **copy đoạn log báo lỗi** thay vì cố gắng diễn đạt bằng chữ để tránh AI đoán mò.

5. **Đóng gói sớm để tái sử dụng:**
   - Bóc tách component ngay khi chốt thiết kế (như `Skill9Template`) và tạo SOP giúp dễ dàng scale hệ thống.

6. **Sức mạnh của Concept Storytelling (Kể chuyện qua UI):** 
   - Việc thay đổi Concept từ "Doanh nghiệp/Thư mục" sang "Ma thuật/Thư viện cổ" đã mở khóa cảm xúc (Vibe) mãnh liệt. Khách hàng sẽ ghi nhớ lâu hơn.

7. **Bố cục Organic (Hữu Cơ) bẻ gãy rập khuôn của CSS Grid:** 
   - Bằng cách gán `transform: rotate() translate()` lệch nhau cho từng phần tử, kết hợp hiệu ứng lơ lửng, chúng ta tạo ra một cụm vật thể "tụ về tâm" hoàn toàn tự nhiên.

8. **Tà đạo tách nền với mix-blend-mode:** 
   - Khi làm việc với AI Image Generation, hãy sinh ảnh có nền màu sáng (như màu web), sau đó dùng CSS `mix-blend-mode: multiply` (hoặc `darken`). Ảnh sẽ lọc sạch viền và hòa tan hoàn toàn vào nền web.

9. **Thuật toán Parallax Local Tracking (Khuếch đại gia tốc):**
   - **GIẢI PHÁP ĐỈNH CAO:** Gán Event Listener lên TỪNG VẬT THỂ. Dùng tâm vật thể làm mốc, nhân khoảng cách di chuyển chuột với **Hệ số khuếch đại (> 1)**.

10. **Quản trị rủi ro Hiệu năng (Performance) với SVG Filter:**
    - Tuyệt đối hạn chế dùng `feTurbulence` (nhiễu sóng) có thẻ `<animate>` áp lên diện tích DOM toàn màn hình. Dù thông số thấp, nó vẫn ép CPU/GPU tính toán liên tục hàng triệu pixel, gây giật lag nghiêm trọng.
    - **Giải pháp thay thế:** Sử dụng CSS Animation di chuyển/scale 2 lớp ảnh đè nhau. Hiệu ứng thị giác tương đương (Ảo giác quang học) nhưng nhẹ như lông hồng nhờ Hardware Acceleration (`transform: translateZ(0)`).

11. **Xử lý xung đột cơ chế điều khiển UX:**
    - Đừng ép người dùng phải chọn giữa 2 phương thức tương tác nhập nhằng (VD: Vừa cuộn chuột để tua video, vừa đợi tự phát). Tốt nhất là chốt 1 kịch bản liền mạch (Cuộn kịch kim -> Đứng yên thưởng thức Video tự phát).

12. **Cắt xén quang học bằng clip-path:**
    - Để tạo hiệu ứng "nuốt chữ" hoàn hảo khi nền chuyển động, dùng `clip-path: inset()` là chân ái. Cần lưu ý bọc chữ vào một Wrapper có kích thước khớp chính xác với phần nền để thông số % đồng bộ tuyệt đối.

## Bước Tiếp Theo (Next Steps)
1. Xây dựng các nội dung chi tiết cho các đầu mục Sách Phép dựa trên hệ thống Kỹ năng đã đóng gói.
2. Kiểm thử và tinh chỉnh trải nghiệm Responsive trên thiết bị di động.
3. Tạo thêm nhân vật và hình ảnh minh họa chất lượng cao cho trang Tạo Nhân Vật (Portrait Studio).
