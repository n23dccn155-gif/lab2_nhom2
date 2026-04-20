# Lab 2: RESTful API Quản lý Đơn hàng (Node.js & Express)

**Nhóm:** 2
**Môn học:** Lập trình Web
**Sinh viên thực hiện:** Đặng Văn Hiệp (N23DCCN155)

---

## 🌐 Địa chỉ API Đã Triển Khai (Live App)
API đã được deploy và đang chạy trực tiếp trên Render. Giảng viên có thể sử dụng Postman hoặc Thunder Client để bắn API trực tiếp thông qua đường dẫn sau:

👉 **Base URL:** `https://lab2-nhom2.onrender.com/api/orders`

---

## 🚀 Các Tính Năng Đã Hoàn Thiện

### 1. Chức năng Cơ Bản (Core CRUD)
- **`GET /api/orders`**: Truy xuất toàn bộ danh sách đơn hàng.
- **`GET /api/orders/:id`**: Truy xuất thông tin chi tiết của một đơn hàng cụ thể.
- **`POST /api/orders`**: Khởi tạo đơn hàng mới.
- **`PUT /api/orders/:id`**: Cập nhật trạng thái (`status`) của đơn hàng.
- **`DELETE /api/orders/:id`**: Xóa vĩnh viễn đơn hàng khỏi cơ sở dữ liệu.

### 2. Các Tính Năng Bổ Sung & Thử Thách (Mục V & VI)
Hệ thống đã triển khai thành công 100% các tính năng mở rộng được yêu cầu trong đề môn học:
- ✅ **Validation (Xác thực dữ liệu chặt chẽ)**: Server có khả năng tự động rà soát, tính toán lại tổng tiền các mặt hàng. Nếu biến `totalAmount` bị gửi lên sai lệch, API sẽ đánh rớt và trả về lỗi cảnh báo ngay lập tức.
- ✅ **Chuẩn hóa API Response**: Mọi phản hồi đều theo chuẩn `{ format: boolean, message: string, data: object }`.
- ✅ **Lọc Query (Filter)**: Lọc đơn hàng theo tình trạng (VD: `?status=pending`).
- ✅ **Tìm kiếm Regex (Search)**: Tìm kiếm gần đúng tên khách mua hàng (VD: `?name=Nguyen`).
- ✅ **Sắp xếp (Sort)**: Hỗ trợ tự động sắp thứ tự đơn hàng theo tổng tiền giá trị quy đổi (VD: `?sort=desc`).
- ✅ Lập trình giám sát hệ thống ghi log mọi request bằng `morgan`.

---

## 🛠 Hướng Dẫn Chạy Cục Bộ (Local Development)

*(Dành cho mục đích xem nội bộ source code)*

```bash
# 1. Tải dự án về
git clone https://github.com/n23dccn155-gif/lab2_nhom2.git
cd lab2_nhom2

# 2. Cài đặt các thư viện (Express, Mongoose, Morgan...)
npm install

# 3. Tạo file .env và cấu hình (Sử dụng MongoURI cấp quyền)
PORT=5000
MONGO_URI=mongodb://[username]:[password]@...

# 4. Chạy hệ thống
npm run dev
```
