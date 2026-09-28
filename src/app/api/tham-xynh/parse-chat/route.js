import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/tham-xynh-auth';

// Vietnamese address keywords
const ADDRESS_KEYWORDS = [
  'đường', 'phường', 'quận', 'huyện', 'xã', 'thị xã', 'tỉnh', 'thành phố',
  'tp', 'block', 'chung cư', 'ấp', 'thôn', 'khu phố', 'kp', 'số nhà',
  'ngõ', 'ngách', 'hẻm', 'khu', 'lô', 'khu đô thị', 'tổ', 'thị trấn',
  'khu vực', 'đội', 'xóm'
];

// Product keywords for matching
const PRODUCT_KEYWORDS = [
  { pattern: /(\d+)\s*(thành phẩm|tp)\s*(ốc\s*quế?\s*nhỏ|ốc\s*nhỏ)/gi, name: 'Thành phẩm ốc quế nhỏ' },
  { pattern: /(\d+)\s*(thành phẩm|tp)\s*(ốc\s*quế?\s*lớn|ốc\s*lớn)/gi, name: 'Thành phẩm ốc quế lớn' },
  { pattern: /(\d+)\s*ốc\s*quế?\s*nhỏ/gi, name: 'Ốc quế nhỏ' },
  { pattern: /(\d+)\s*ốc\s*quế?\s*lớn/gi, name: 'Ốc quế lớn' },
  { pattern: /(\d+)\s*ốc\s*nhỏ/gi, name: 'Ốc quế nhỏ' },
  { pattern: /(\d+)\s*ốc\s*lớn/gi, name: 'Ốc quế lớn' },
  { pattern: /(\d+)\s*combo\s*lớn/gi, name: 'Combo lớn' },
  { pattern: /(\d+)\s*thùng\s*ốc\s*nhỏ/gi, name: 'Thùng ốc nhỏ' },
  { pattern: /(\d+)\s*bộ\s*phụ\s*kiện[^,\n]*(tùy\s*chọn)/gi, name: 'Bộ phụ kiện làm cốt ốc quế lớn tùy chọn' },
  { pattern: /(\d+)\s*bộ\s*phụ\s*kiện/gi, name: 'Bộ phụ kiện làm cốt ốc quế lớn' },
  { pattern: /(\d+)\s*(set\s*)?túi\s*thiệp/gi, name: 'Set túi thiệp' },
  { pattern: /(\d+)\s*túi\s*vát/gi, name: 'Túi vát' },
  { pattern: /(\d+)\s*vát\s*(\d+)\s*bông/gi, name: 'Cốt 3 bông' },
  { pattern: /(\d+)\s*cốt\s*(\d+)\s*bông/gi, name: 'Cốt $2 bông' },
];

function parseChat(text) {
  const result = {
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    items: [],
    total_amount: 0,
    shipping_estimate: 0,
    deposit: 0,
    raw_text: text,
  };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // 1. Extract phone numbers
  const phoneRegex = /0\d{2,3}[\.\s-]?\d{3,4}[\.\s-]?\d{3,4}/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    result.customer_phone = phones[0].replace(/[\.\s-]/g, '');
  }

  // 2. Extract customer name
  // Look for patterns like "tên: X", "gửi cho X", "người nhận: X", or name near phone
  const namePatterns = [
    /(?:tên|người nhận|gửi cho|ship cho|giao cho|khách)[:\s]+([^\n,\d]{2,30})/i,
    /^([A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỹ][a-zà-ỹ]+){0,4})\s*$/m,
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.customer_name = match[1].trim();
      break;
    }
  }

  // If no name found, try the line before/after the phone number
  if (!result.customer_name && phones) {
    const phoneIndex = text.indexOf(phones[0]);
    const beforePhone = text.substring(0, phoneIndex).trim().split('\n').pop();
    if (beforePhone && beforePhone.length > 1 && beforePhone.length < 30 && !/\d{5,}/.test(beforePhone)) {
      result.customer_name = beforePhone.trim();
    }
  }

  // 3. Extract address
  const addressLines = [];
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (ADDRESS_KEYWORDS.some(kw => lowerLine.includes(kw))) {
      addressLines.push(line);
    }
  }
  if (addressLines.length > 0) {
    result.customer_address = addressLines.join(', ');
  }

  // Also try "địa chỉ:" pattern
  const addressMatch = text.match(/(?:địa chỉ|dc|đ\/c)[:\s]+([^\n]+(?:\n[^\n]+)?)/i);
  if (addressMatch) {
    result.customer_address = addressMatch[1].trim();
  }

  // 4. Extract products
  for (const prod of PRODUCT_KEYWORDS) {
    // Reset regex
    prod.pattern.lastIndex = 0;
    let match;
    while ((match = prod.pattern.exec(text)) !== null) {
      const quantity = parseInt(match[1]);
      if (quantity > 0 && quantity < 1000) {
        // Look for color info after the match
        const afterMatch = text.substring(match.index + match[0].length, match.index + match[0].length + 100);
        const colorMatch = afterMatch.match(/(?:màu|mau)\s+([\d\s,]+)/i);
        const colors = colorMatch ? colorMatch[1].trim() : '';

        result.items.push({
          product: prod.name,
          quantity,
          colors,
          raw: match[0],
        });
      }
    }
  }

  // 5. Extract total amount
  const totalPatterns = [
    /(?:tổng|total)[:\s]*(\d[\d.,]*)\s*k/i,
    /(?:tổng|total)[:\s]*(\d[\d.,]*)\s*(?:đ|dong|vnđ|vnd)/i,
    /(?:tổng|total)[:\s]*(\d[\d.,]*)/i,
    /COD[:\s]*(?:tiền hàng)?[:\s]*(\d[\d.,]*)\s*k/i,
  ];

  for (const pattern of totalPatterns) {
    const match = text.match(pattern);
    if (match) {
      let amount = parseFloat(match[1].replace(/[.,]/g, ''));
      // If the number seems like it's in "k" (thousands)
      if (match[0].toLowerCase().includes('k') && amount < 100000) {
        amount *= 1000;
      }
      result.total_amount = amount;
      break;
    }
  }

  // 6. Extract shipping
  const shipPatterns = [
    /ship[:\s]*(?:dự tính)?[:\s]*(\d[\d.,]*)\s*k/i,
    /(?:phí ship|phí vận chuyển|cước)[:\s]*(\d[\d.,]*)/i,
  ];

  for (const pattern of shipPatterns) {
    const match = text.match(pattern);
    if (match) {
      let amount = parseFloat(match[1].replace(/[.,]/g, ''));
      if (match[0].toLowerCase().includes('k') && amount < 10000) {
        amount *= 1000;
      }
      result.shipping_estimate = amount;
      break;
    }
  }

  // 7. Extract deposit
  const depositPatterns = [
    /(?:cọc|đặt cọc)[:\s]*(\d[\d.,]*)\s*k/i,
    /(?:cọc|đặt cọc)[:\s]*(\d[\d.,]*)/i,
  ];

  for (const pattern of depositPatterns) {
    const match = text.match(pattern);
    if (match) {
      let amount = parseFloat(match[1].replace(/[.,]/g, ''));
      if (match[0].toLowerCase().includes('k') && amount < 100000) {
        amount *= 1000;
      }
      result.deposit = amount;
      break;
    }
  }

  // Build items_detail string
  result.items_detail = result.items.map(item => {
    let line = `${item.quantity} ${item.product}`;
    if (item.colors) line += ` — màu ${item.colors}`;
    return line;
  }).join('\n');

  return result;
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Vui lòng nhập nội dung chat' }, { status: 400 });
    }

    const parsed = parseChat(text);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
