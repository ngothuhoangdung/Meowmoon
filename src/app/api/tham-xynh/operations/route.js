import { NextResponse } from 'next/server';
import { getDb } from '@/lib/tham-xynh-db';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const { rows } = await db.execute('SELECT * FROM operations ORDER BY id DESC');
  return NextResponse.json(rows);
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const body = await request.json();

    const result = await db.execute({
      sql: 'INSERT INTO operations (op_date, note, amount) VALUES (?, ?, ?)',
      args: [
        body.op_date || new Date().toISOString().split('T')[0],
        body.note || '',
        body.amount || 0,
      ],
    });

    const { rows } = await db.execute({
      sql: 'SELECT * FROM operations WHERE id = ?',
      args: [Number(result.lastInsertRowid)],
    });
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const db = getDb();
  await db.execute({ sql: 'DELETE FROM operations WHERE id = ?', args: [Number(id)] });
  return NextResponse.json({ success: true });
}
