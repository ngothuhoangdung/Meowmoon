/**
 * Seed script to import existing data from Excel into SQLite
 * Run: node src/scripts/seed-tham-xynh.mjs
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_DIR = path.join(__dirname, '..', '..', 'data');
const DB_PATH = path.join(DB_DIR, 'tham-xynh.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER DEFAULT 0,
    price_note TEXT
  );
  CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number INTEGER,
    order_date TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    items_detail TEXT,
    total_amount INTEGER DEFAULT 0,
    shipping_support INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Chờ tư vấn',
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_date TEXT,
    note TEXT,
    amount INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
  CREATE TABLE IF NOT EXISTS operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    op_date TEXT,
    note TEXT,
    amount INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
`);

// Clear existing data
db.exec('DELETE FROM products; DELETE FROM colors; DELETE FROM orders; DELETE FROM purchases; DELETE FROM operations;');

// Seed products
const insertProduct = db.prepare('INSERT INTO products (name, description, price, price_note) VALUES (?, ?, ?, ?)');
const products = [
  ['Ốc quế nhỏ', '10 cốt ốc quế nhỏ', 80000, '100000 do cận ngày'],
  ['Ốc quế lớn', '10 cốt ốc quế lớn', 400000, null],
  ['Combo lớn', '6 thành phẩm ốc quế lớn', 750000, '790000 do cận ngày'],
  ['Bộ phụ kiện làm cốt ốc quế lớn', 'Giấy, cốt, nơ, keo nến', 280000, null],
  ['Bộ phụ kiện làm cốt ốc quế lớn tùy chọn', 'Giấy, cốt, nơ, keo nến nhưng được chọn màu giấy', 300000, null],
  ['Thùng ốc nhỏ', '9 thành phẩm ốc quế nhỏ', 495000, null],
  ['Thùng cốc 15', '20 bộ cốc full túi thiệp', 300000, null],
  ['Thành phẩm ốc quế nhỏ', null, 55000, '50000 nếu tổng đơn trên 2 triệu'],
  ['Thành phẩm ốc quế lớn', null, 135000, '165000 do cận ngày'],
  ['Set túi thiệp', '1 túi mặt kính, 1 thiệp', 5000, null],
  ['Túi vát', 'Túi vát', 8000, null],
  ['Cốt 3 bông', 'Cốt vát truyền thống 3 bông', 8000, '12000 bán lẻ'],
  ['Cốt 10 bông', 'Cốt vát truyền thống 10 bông sáp 7 lớp', 35000, '45000 bán lẻ'],
  ['Cốt 10 bông lùn', 'Cốt vát truyền thống 10 bông sáp 3 lớp', 25000, '30000 bán lẻ'],
];
for (const p of products) insertProduct.run(...p);

// Seed colors
const insertColor = db.prepare('INSERT INTO colors (id, name) VALUES (?, ?)');
const colors = [
  [1, 'bi hồng'], [2, 'bi trắng'], [3, 'xanh lá bay'], [4, 'hồng bay'],
  [5, 'trắng bay'], [6, 'tím bay'], [7, 'vàng bay'], [8, 'dương bay'],
  [9, 'ti hồng lỗ'], [10, 'ti trắng lỗ'], [11, 'bi trắng lỗ'],
  [12, 'dương bay lỗ'], [13, 'bi hồng lỗ'], [14, 'ti hồng'],
];
for (const c of colors) insertColor.run(...c);

// Seed orders from Excel data
const insertOrder = db.prepare(`
  INSERT INTO orders (order_number, order_date, customer_name, customer_phone, customer_address, items_detail, total_amount, shipping_support, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const orders = [
  [1, '09/9/2026', 'Nguyên liệu Bảo Trâm', '', '', '', 0, 0, 'Done'],
  [2, '22/09/2026', 'Nguyên liệu Mii Luu', '', '', '', 0, 0, 'Done'],
  [3, '24/09/2026', 'Nguyễn Thị Thanh Nhã', '', '', '1 gardent hồng giấy xé - 290k\n3 vat nhỏ - 120k', 430000, 16000, 'Done'],
  [4, '24/09/2026', 'Nương Huỳnh', '0392722203', 'Block C chung cư nhà ở xã hội An Phú Thịnh, phường Nhơn Bình, TP Quy Nhơn, Bình Định', '10 ốc quế nhỏ — màu 3, 4, 8, 9, 12\n20 vát 3 bông — không lấy màu tím\n10 túi mặt kính\n10 thiệp — 5 trắng, 5 hồng', 290000, 0, 'Chờ vận chuyển'],
  [5, '24/09/2026', 'Thảo Nguyễn', '', '', '10 ốc quế lớn — màu 11, 13 (bi hồng lót lỗ)', 400000, 0, 'Đang vận chuyển'],
  [6, '24/09/2026', 'Minh Thi', '0917291324', 'Ấp Tân Thanh, xã Minh Tân, Dầu Tiếng, Bình Dương', '15 thành phẩm ốc nhỏ — màu 8, 11, 13\n15 túi thiệp', 900000, 0, 'Chờ vận chuyển'],
  [7, '24/09/2026', 'Ngọc Thảo', '', '', '20 ốc quế nhỏ — màu lộn xộn, ít xanh vs trắng', 160000, 0, 'Chờ tư vấn'],
  [8, '24/09/2026', 'Bánh kem Bé Hết', '0985476397', 'Thôn Điền, xã Cư Pui, Krông Bông, Đắk Lắk', '10 ốc quế lớn — màu 13', 400000, 0, 'Chưa có hàng'],
  [9, '24/09/2026', 'Nguyễn Phan', '0968339552', 'Xóm Mới, Gành Dầu, Phú Quốc, An Giang', '40 ốc quế lớn — màu 9, 10, 11, 12', 1600000, 0, 'Chưa có hàng'],
  [10, '24/09/2026', 'Đặng Châm', '0347281968', 'Thôn Bắc Sơn, xã Sơn Đông, huyện Lập Thạch, tỉnh Vĩnh Phúc', '20 ốc quế lớn — màu 15 hồng lộn xộn, 5 xanh, màu 9, 10, 11, 12', 800000, 0, 'Chưa có hàng'],
  [11, '24/09/2026', 'Thanh Nga', '', '', '30 ốc quế nhỏ — màu 1, 4, 5\n5 ốc lớn', 0, 0, 'Hủy đơn'],
  [12, '24/09/2026', 'Nguyễn Ngọc Vẹn', '', '', '10 ốc lớn — màu 11, 12, 13', 400000, 0, 'Đang vận chuyển'],
  [13, '24/09/2026', 'Nguyễn Mai', '', '', '30 ốc nhỏ — màu lộn xộn, 2 nơ', 0, 0, 'Chờ tư vấn'],
  [14, '24/09/2026', 'Quỳnh Như', '', '', '', 290000, 0, 'Done'],
  [15, '25/09/2026', 'Mỹ Hà', '0358573643', 'Hẻm 59, ấp Dinh Phước, xã Định Hiệp, huyện Dầu Tiếng, tỉnh Bình Dương', '10 ốc lớn — màu lộn xộn', 550000, 0, 'Chưa có hàng'],
  [16, '26/09/2026', 'Linh Ngô', '', '', '1 Bộ phụ kiện làm cốt ốc quế lớn tùy chọn — màu 7, 9, 10, 11', 300000, 0, 'Đang vận chuyển'],
  [17, '26/09/2026', 'Quyên Kim', '0343821704', 'Ấp Tiếp Nhựt, xã Viên An, huyện Trần Đề, tỉnh Sóc Trăng', '1 Bộ phụ kiện làm cốt ốc quế lớn tùy chọn — màu 10, 11', 0, 0, 'Hoàn hàng'],
  [18, '26/09/2026', 'Quyên Kim', '0343821704', 'Ấp Tiếp Nhựt, xã Viên An, huyện Trần Đề, tỉnh Sóc Trăng', '20 ốc quế nhỏ\n20 túi thiệp', 300000, 0, 'Chưa có hàng'],
  [19, '27/09/2026', 'Song Linh', '', '648/16 đường Kha Vạn Cân, phường Linh Đông cũ, TP Thủ Đức', '', 1596000, 0, 'Done'],
  [20, '27/09/2026', 'Âu Mỹ Tâm', '', '', '20 Ốc quế nhỏ — màu 14 (full Kitty hồng), nơ như bó lớn', 160000, 0, 'Done'],
  [21, '27/09/2026', 'Lô Thị Vân', '0396910996', 'Gửi xe Phong Phú: 163 Bãi Sậy, phường Bình Tiên, quận 6 — Giao về: Vĩnh Cửu, Đồng Nai', '1 combo lớn', 750000, 0, 'Chưa có hàng'],
  [22, '27/09/2026', 'Linh Linh', '0522579256', '', '5 Bộ phụ kiện làm cốt ốc quế lớn', 0, 0, 'Chờ tư vấn'],
  [23, '27/09/2026', 'KS Thái Bình Ba', '', '', '1 combo lớn', 750000, 0, 'Chờ tư vấn'],
  [24, '28/09/2026', 'Ngọc Vương', '0971758293', 'Thôn Phố Thầu, xã Si Ma Cai, tỉnh Lào Cai', '1 thùng ốc nhỏ\n9 set túi thiệp', 555000, 0, 'Chưa có hàng'],
  [25, '28/09/2026', 'Kaa Innie', '', '', '1 combo lớn — 790k', 0, 0, 'Chờ tư vấn'],
];

const insertOrders = db.transaction(() => {
  for (const o of orders) insertOrder.run(...o);
});
insertOrders();

// Seed purchases
const insertPurchase = db.prepare('INSERT INTO purchases (purchase_date, note, amount) VALUES (?, ?, ?)');
const purchaseData = [
  ['09/9/2026', 'Mua ren lẻ', 85000],
  ['12/09/2026', 'Mua So Ciu', 1600000],
  ['12/09/2026', 'Mua Vũ Kim Dung', 170000],
  ['12/09/2026', 'Mua Vũ Kim Dung', 1580000],
  ['21/09/2026', 'Mua Vũ Dung', 1660000],
  ['21/09/2026', 'Mua Phan Luyen', 3805000],
  ['21/09/2026', 'Mua chợ lẻ', 150000],
  ['21/09/2026', 'Băng keo và keo nến', 197000],
  ['21/09/2026', 'Giấy mỹ thuật', 82000],
  ['24/9/2026', 'Đi chợ HTK', 130000],
  ['24/9/2026', 'Mua túi giấy', 470000],
  ['24/9/2026', 'Mua Minh Tuyền', 701000],
  ['24/9/2026', 'Mua Phan Luyen', 1005000],
  ['26/09/2026', 'Mua chợ lẻ', 750000],
  ['26/09/2026', 'Mua Quang Ngân', 779000],
];
for (const p of purchaseData) insertPurchase.run(...p);

// Seed operations
const insertOp = db.prepare('INSERT INTO operations (op_date, note, amount) VALUES (?, ?, ?)');
const opsData = [
  ['27/09/2026', 'Lương thợ phụ', 450000],
  ['27/09/2026', 'Trà sữa', 150000],
  ['27/09/2026', 'Bún đậu', 120000],
];
for (const o of opsData) insertOp.run(...o);

console.log('✅ Seed completed!');
console.log(`   Products: ${products.length}`);
console.log(`   Colors: ${colors.length}`);
console.log(`   Orders: ${orders.length}`);
console.log(`   Purchases: ${purchaseData.length}`);
console.log(`   Operations: ${opsData.length}`);

db.close();
