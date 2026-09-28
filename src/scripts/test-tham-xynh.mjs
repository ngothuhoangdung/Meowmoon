/**
 * E2E Test Script for Thắm Xynh Order Management
 * Run: node src/scripts/test-tham-xynh.mjs
 */

const BASE = 'http://localhost:3000';
let sessionCookie = '';
let results = [];

function log(test, pass, detail = '') {
  const icon = pass ? '✅' : '❌';
  console.log(`${icon} ${test}${detail ? ': ' + detail : ''}`);
  results.push({ test, pass, detail });
}

async function request(path, options = {}) {
  const headers = { ...options.headers };
  if (sessionCookie) headers['Cookie'] = sessionCookie;
  if (options.body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    redirect: 'manual',
  });

  // Capture set-cookie
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) sessionCookie = setCookie.split(';')[0];

  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch {}

  return { status: res.status, json, text };
}

async function runTests() {
  console.log('\n🧪 THẮM XYNH — E2E TEST SUITE\n');
  console.log('='.repeat(50));

  // 1. Login - wrong password
  {
    const res = await request('/api/tham-xynh/auth', {
      method: 'POST', body: { password: 'wrong' }
    });
    log('Auth: reject wrong password', res.status === 401);
  }

  // 2. Login - correct password
  {
    const res = await request('/api/tham-xynh/auth', {
      method: 'POST', body: { password: 'thamxynh2026' }
    });
    log('Auth: accept correct password', res.status === 200 && res.json?.success);
  }

  // 3. Stats API
  {
    const res = await request('/api/tham-xynh/stats');
    log('Stats: returns data', res.status === 200);
    log('Stats: has revenue', typeof res.json?.revenue === 'number', `revenue=${res.json?.revenue}`);
    log('Stats: has orders', res.json?.totalOrders > 0, `total=${res.json?.totalOrders}`);
    log('Stats: has statusCounts', Array.isArray(res.json?.statusCounts));
    log('Stats: has recentOrders', Array.isArray(res.json?.recentOrders));
    log('Stats: has revenueByDate', Array.isArray(res.json?.revenueByDate));
  }

  // 4. Products API
  {
    const res = await request('/api/tham-xynh/products');
    log('Products: returns data', res.status === 200);
    log('Products: 14 products', res.json?.products?.length === 14, `count=${res.json?.products?.length}`);
    log('Products: 14 colors', res.json?.colors?.length === 14, `count=${res.json?.colors?.length}`);
  }

  // 5. Orders - List
  {
    const res = await request('/api/tham-xynh/orders');
    log('Orders: list all', res.status === 200 && Array.isArray(res.json));
    log('Orders: has 25 orders', res.json?.length === 25, `count=${res.json?.length}`);
  }

  // 6. Orders - Filter by status
  {
    const res = await request('/api/tham-xynh/orders?status=Done');
    log('Orders: filter by Done', res.status === 200);
    const allDone = res.json?.every(o => o.status === 'Done');
    log('Orders: all filtered are Done', allDone, `count=${res.json?.length}`);
  }

  // 7. Orders - Search
  {
    const res = await request('/api/tham-xynh/orders?search=Nương');
    log('Orders: search by name', res.status === 200 && res.json?.length > 0, `found=${res.json?.length}`);
  }

  // 8. Orders - Create
  let newOrderId;
  {
    const res = await request('/api/tham-xynh/orders', {
      method: 'POST',
      body: {
        customer_name: 'Test Customer',
        customer_phone: '0999888777',
        customer_address: 'Test Address, phường Test, quận Test',
        items_detail: '5 ốc quế nhỏ — màu 1, 2, 3',
        total_amount: 250000,
        status: 'Chờ tư vấn',
      }
    });
    log('Orders: create new', res.status === 201 && res.json?.id);
    newOrderId = res.json?.id;
    log('Orders: created has correct name', res.json?.customer_name === 'Test Customer');
    log('Orders: created has correct amount', res.json?.total_amount === 250000);
  }

  // 9. Orders - Get by ID
  if (newOrderId) {
    const res = await request(`/api/tham-xynh/orders/${newOrderId}`);
    log('Orders: get by ID', res.status === 200 && res.json?.id === newOrderId);
  }

  // 10. Orders - Update
  if (newOrderId) {
    const res = await request(`/api/tham-xynh/orders/${newOrderId}`, {
      method: 'PUT',
      body: { status: 'Đang vận chuyển', total_amount: 300000 }
    });
    log('Orders: update status', res.json?.status === 'Đang vận chuyển');
    log('Orders: update amount', res.json?.total_amount === 300000);
  }

  // 11. Orders - Delete
  if (newOrderId) {
    const res = await request(`/api/tham-xynh/orders/${newOrderId}`, { method: 'DELETE' });
    log('Orders: delete', res.json?.success === true);
    // Verify deleted
    const verify = await request(`/api/tham-xynh/orders/${newOrderId}`);
    log('Orders: deleted not found', verify.status === 404);
  }

  // 12. Purchases - List
  {
    const res = await request('/api/tham-xynh/purchases');
    log('Purchases: list', res.status === 200 && Array.isArray(res.json));
    log('Purchases: has 15', res.json?.length === 15, `count=${res.json?.length}`);
  }

  // 13. Purchases - Create
  {
    const res = await request('/api/tham-xynh/purchases', {
      method: 'POST',
      body: { purchase_date: '28/09/2026', note: 'Test mua', amount: 100000 }
    });
    log('Purchases: create', res.status === 201 && res.json?.id);
    // Delete the test purchase
    if (res.json?.id) {
      await request(`/api/tham-xynh/purchases?id=${res.json.id}`, { method: 'DELETE' });
    }
  }

  // 14. Operations - List
  {
    const res = await request('/api/tham-xynh/operations');
    log('Operations: list', res.status === 200 && Array.isArray(res.json));
    log('Operations: has 3', res.json?.length === 3, `count=${res.json?.length}`);
  }

  // 15. Operations - Create
  {
    const res = await request('/api/tham-xynh/operations', {
      method: 'POST',
      body: { op_date: '28/09/2026', note: 'Test ops', amount: 50000 }
    });
    log('Operations: create', res.status === 201 && res.json?.id);
    if (res.json?.id) {
      await request(`/api/tham-xynh/operations?id=${res.json.id}`, { method: 'DELETE' });
    }
  }

  // 16. Chat Parser - Vietnamese text with products
  {
    const chatText = `Nguyễn Thị Mai
0912345678
Địa chỉ: 123 đường ABC, phường XYZ, quận 1, TP HCM
10 ốc quế nhỏ - màu 3, 4, 8
20 ốc quế lớn
Tổng 400k, cọc 0, ship 50k`;

    const res = await request('/api/tham-xynh/parse-chat', {
      method: 'POST',
      body: { text: chatText }
    });
    log('ChatParser: returns 200', res.status === 200);
    log('ChatParser: finds name', res.json?.customer_name?.length > 0, `name="${res.json?.customer_name}"`);
    log('ChatParser: finds phone', res.json?.customer_phone === '0912345678', `phone="${res.json?.customer_phone}"`);
    log('ChatParser: finds address', res.json?.customer_address?.includes('phường'), `addr="${res.json?.customer_address?.substring(0, 50)}"`);
    log('ChatParser: finds products', res.json?.items?.length > 0, `items=${res.json?.items?.length}`);
    log('ChatParser: finds total', res.json?.total_amount > 0, `total=${res.json?.total_amount}`);
    log('ChatParser: finds ship', res.json?.shipping_estimate > 0, `ship=${res.json?.shipping_estimate}`);
  }

  // 17. Frontend pages render
  const pages = [
    ['/tham-xynh/login', 'Login page'],
    ['/tham-xynh', 'Dashboard'],
    ['/tham-xynh/don-ban', 'Đơn bán'],
    ['/tham-xynh/don-mua', 'Đơn mua'],
    ['/tham-xynh/nhap-chat', 'Nhập chat'],
    ['/tham-xynh/in-phieu', 'In phiếu'],
  ];

  for (const [path, name] of pages) {
    const res = await request(path);
    log(`Page: ${name}`, res.status === 200);
    // Check that it contains HTML
    log(`Page: ${name} has HTML`, res.text?.includes('<!DOCTYPE html>') || res.text?.includes('<html'));
  }

  // 18. Homepage not broken
  {
    const res = await request('/');
    log('Homepage: still works', res.status === 200);
    log('Homepage: has MeowMoon', res.text?.includes('MEOW') || res.text?.includes('meow'));
  }

  // 19. Logout
  {
    const res = await request('/api/tham-xynh/auth', { method: 'DELETE' });
    log('Auth: logout', res.json?.success === true);
  }

  // 20. Verify auth is required after logout
  {
    sessionCookie = ''; // Clear cookie
    const res = await request('/api/tham-xynh/stats');
    log('Auth: stats blocked after logout', res.status === 401);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed, ${results.length} total`);

  if (failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.filter(r => !r.pass).forEach(r => console.log(`   - ${r.test}: ${r.detail}`));
  } else {
    console.log('\n🎉 ALL TESTS PASSED!');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
