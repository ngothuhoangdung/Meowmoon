import { createClient } from '@libsql/client';

let db = null;

export function getDb() {
  if (db) return db;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  console.log('[ThamXynh DB] TURSO_DATABASE_URL:', url ? `${url.substring(0, 30)}...` : 'NOT SET');
  console.log('[ThamXynh DB] TURSO_AUTH_TOKEN:', authToken ? 'SET' : 'NOT SET');
  console.log('[ThamXynh DB] NODE_ENV:', process.env.NODE_ENV);
  console.log('[ThamXynh DB] VERCEL:', process.env.VERCEL);

  if (url && url.startsWith('libsql://')) {
    // Turso cloud
    db = createClient({ url, authToken });
    console.log('[ThamXynh DB] Using Turso cloud');
  } else if (process.env.VERCEL) {
    // On Vercel but no Turso URL — error
    throw new Error(
      'TURSO_DATABASE_URL is not configured. ' +
      'Go to Vercel → Settings → Environment Variables and add: ' +
      'TURSO_DATABASE_URL and TURSO_AUTH_TOKEN'
    );
  } else {
    // Local dev: use local file
    db = createClient({ url: 'file:data/tham-xynh.db' });
    console.log('[ThamXynh DB] Using local file');
  }

  return db;
}

// Initialize tables (run once on first deploy)
export async function initTables() {
  const client = getDb();

  const statements = [
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER DEFAULT 0,
      price_note TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS colors (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
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
    )`,
    `CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      purchase_date TEXT,
      note TEXT,
      amount INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )`,
    `CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      op_date TEXT,
      note TEXT,
      amount INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )`,
  ];

  for (const sql of statements) {
    await client.execute(sql);
  }

  // Seed products if empty
  const { rows } = await client.execute('SELECT COUNT(*) as count FROM products');
  if (rows[0].count === 0) {
    await seedData(client);
  }
}

async function seedData(client) {
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

  for (const [name, desc, price, note] of products) {
    await client.execute({
      sql: 'INSERT INTO products (name, description, price, price_note) VALUES (?, ?, ?, ?)',
      args: [name, desc, price, note],
    });
  }

  const colors = [
    [1, 'bi hồng'], [2, 'bi trắng'], [3, 'xanh lá bay'], [4, 'hồng bay'],
    [5, 'trắng bay'], [6, 'tím bay'], [7, 'vàng bay'], [8, 'dương bay'],
    [9, 'ti hồng lỗ'], [10, 'ti trắng lỗ'], [11, 'bi trắng lỗ'],
    [12, 'dương bay lỗ'], [13, 'bi hồng lỗ'], [14, 'ti hồng'],
  ];

  for (const [id, name] of colors) {
    await client.execute({
      sql: 'INSERT INTO colors (id, name) VALUES (?, ?)',
      args: [id, name],
    });
  }
}

// Helper: Get next order number
export async function getNextOrderNumber() {
  const client = getDb();
  const { rows } = await client.execute('SELECT MAX(order_number) as max_num FROM orders');
  return (rows[0].max_num || 0) + 1;
}
