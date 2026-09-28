import { NextResponse } from 'next/server';
import { getDb } from '@/lib/tham-xynh-db';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

export async function GET(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const { id } = await params;
  const { rows } = await db.execute({ sql: 'SELECT * FROM orders WHERE id = ?', args: [Number(id)] });

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

export async function PUT(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const { id } = await params;
    const body = await request.json();

    const fields = [];
    const values = [];

    const allowedFields = [
      'order_number', 'order_date', 'customer_name', 'customer_phone',
      'customer_address', 'items_detail', 'total_amount', 'shipping_support',
      'status', 'notes'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'Không có dữ liệu để cập nhật' }, { status: 400 });
    }

    fields.push("updated_at = datetime('now', 'localtime')");
    values.push(Number(id));

    await db.execute({
      sql: `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`,
      args: values,
    });

    const { rows } = await db.execute({ sql: 'SELECT * FROM orders WHERE id = ?', args: [Number(id)] });
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const { id } = await params;
  await db.execute({ sql: 'DELETE FROM orders WHERE id = ?', args: [Number(id)] });

  return NextResponse.json({ success: true });
}
