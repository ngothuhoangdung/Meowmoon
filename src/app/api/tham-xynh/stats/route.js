import { NextResponse } from 'next/server';
import { getDb, initTables } from '@/lib/tham-xynh-db';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

let initialized = false;

async function ensureInit() {
  if (!initialized) {
    await initTables();
    initialized = true;
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureInit();
  const db = getDb();

  // Total revenue
  const rev = await db.execute("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'Hủy đơn'");
  const revenue = Number(rev.rows[0].total);

  // Total purchases
  const pur = await db.execute('SELECT COALESCE(SUM(amount), 0) as total FROM purchases');
  const purchases = Number(pur.rows[0].total);

  // Total operations
  const ops = await db.execute('SELECT COALESCE(SUM(amount), 0) as total FROM operations');
  const operations = Number(ops.rows[0].total);

  // Profit
  const profit = revenue - purchases - operations;

  // Order count by status
  const statusResult = await db.execute('SELECT status, COUNT(*) as count FROM orders GROUP BY status');
  const statusCounts = statusResult.rows;

  // Total orders
  const totalResult = await db.execute('SELECT COUNT(*) as count FROM orders');
  const totalOrders = Number(totalResult.rows[0].count);

  // Recent orders
  const recentResult = await db.execute('SELECT * FROM orders ORDER BY id DESC LIMIT 5');
  const recentOrders = recentResult.rows;

  // Revenue by date
  const revByDate = await db.execute(`
    SELECT order_date as date, SUM(total_amount) as total
    FROM orders
    WHERE status != 'Hủy đơn' AND total_amount > 0
    GROUP BY order_date
    ORDER BY order_date DESC
    LIMIT 7
  `);
  const revenueByDate = revByDate.rows.reverse();

  return NextResponse.json({
    revenue,
    purchases,
    operations,
    profit,
    totalOrders,
    statusCounts,
    recentOrders,
    revenueByDate,
  });
}
