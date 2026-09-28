import { NextResponse } from 'next/server';
import { getDb } from '@/lib/tham-xynh-db';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const productsResult = await db.execute('SELECT * FROM products ORDER BY id');
  const colorsResult = await db.execute('SELECT * FROM colors ORDER BY id');

  return NextResponse.json({
    products: productsResult.rows,
    colors: colorsResult.rows,
  });
}
