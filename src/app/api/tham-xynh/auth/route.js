import { NextResponse } from 'next/server';
import { verifyPassword, getSessionCookie } from '@/lib/tham-xynh-auth';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Sai mật khẩu' }, { status: 401 });
    }

    const cookie = getSessionCookie();
    const response = NextResponse.json({ success: true, message: 'Đăng nhập thành công' });
    response.cookies.set(cookie);

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Đã đăng xuất' });
  response.cookies.set('tham_xynh_auth', '', { maxAge: 0, path: '/' });
  return response;
}
