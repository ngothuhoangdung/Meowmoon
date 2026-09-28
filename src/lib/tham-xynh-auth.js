import { cookies } from 'next/headers';

// Simple password-based auth
// In production, use proper hashing - this is for a single-user local tool
const VALID_PASSWORD = 'thamxynh2026';
const SESSION_TOKEN = 'tx_session_2026_secure';
const COOKIE_NAME = 'tham_xynh_auth';

export function verifyPassword(password) {
  return password === VALID_PASSWORD;
}

export function createSession() {
  return SESSION_TOKEN;
}

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);
    return token?.value === SESSION_TOKEN;
  } catch {
    return false;
  }
}

export function getSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: SESSION_TOKEN,
    httpOnly: true,
    secure: false, // Local dev
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}
