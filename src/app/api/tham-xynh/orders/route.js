import { NextResponse } from 'next/server';
import { getDb, getNextOrderNumber, initTables } from '@/lib/tham-xynh-db';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

let initialized = false;

async function ensureInit() {
  if (!initialized) {
    await initTables();
    initialized = true;
  }
}

export async function GET(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureInit();
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let query = 'SELECT * FROM orders';
  const conditions = [];
  const params = [];

  if (status && status !== 'all') {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(customer_name LIKE ? OR customer_phone LIKE ? OR items_detail LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY id DESC';

  const { rows } = await db.execute({ sql: query, args: params });
  return NextResponse.json(rows);
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureInit();
    const db = getDb();
    const body = await request.json();
    const orderNumber = body.order_number || await getNextOrderNumber();

    const result = await db.execute({
      sql: `INSERT INTO orders (order_number, order_date, customer_name, customer_phone, customer_address, items_detail, total_amount, shipping_support, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        orderNumber,
        body.order_date || new Date().toISOString().split('T')[0],
        body.customer_name || '',
        body.customer_phone || '',
        body.customer_address || '',
        body.items_detail || '',
        body.total_amount || 0,
        body.shipping_support || 0,
        body.status || 'Chờ tư vấn',
        body.notes || '',
      ],
    });

    const { rows } = await db.execute({
      sql: 'SELECT * FROM orders WHERE id = ?',
      args: [Number(result.lastInsertRowid)],
    });

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
