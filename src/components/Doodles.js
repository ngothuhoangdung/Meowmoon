/* Doodles.js — SVG màu sáp trẻ con, nét thô, có tô màu bên trong */

/* Filter dùng chung để tạo nét sáp thô ráp */
const CRAYON_FILTER = (
  <defs>
    <filter id="crayon" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

/* Màu sáp cho từng hình */
const COLORS = {
  flower:  { fill: '#F7B8B8', stroke: '#D96060' },
  leaf:    { fill: '#B8D8A8', stroke: '#5A9448' },
  nonla:   { fill: '#F8E090', stroke: '#C89828' },
  tshirt:  { fill: '#A8C4E8', stroke: '#4870A8' },
  scissors:{ fill: '#D0B0E8', stroke: '#7848A8' },
  star:    { fill: '#F8D060', stroke: '#C89020' },
  spool:   { fill: '#F0B898', stroke: '#B85838' },
  cloud:   { fill: '#B8D8F8', stroke: '#5888C0' },
  needle:  { fill: '#B0D8C0', stroke: '#408860' },
};

const BASE_STROKE = { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2.2' };

/** Hoa 5 cánh */
export function Flower({ size = 60, opacity = 1, style = {} }) {
  const c = COLORS.flower;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <path d="M30,26 C26,20 25,13 30,11 C35,13 34,20 30,26" fill={c.fill} transform="rotate(0,30,30)" />
        <path d="M30,26 C26,20 25,13 30,11 C35,13 34,20 30,26" fill={c.fill} transform="rotate(72,30,30)" />
        <path d="M30,26 C26,20 25,13 30,11 C35,13 34,20 30,26" fill={c.fill} transform="rotate(144,30,30)" />
        <path d="M30,26 C26,20 25,13 30,11 C35,13 34,20 30,26" fill={c.fill} transform="rotate(216,30,30)" />
        <path d="M30,26 C26,20 25,13 30,11 C35,13 34,20 30,26" fill={c.fill} transform="rotate(288,30,30)" />
        <circle cx="30" cy="30" r="5" fill={c.stroke} stroke="none" />
      </g>
    </svg>
  );
}

/** Lá đơn */
export function Leaf({ size = 50, opacity = 1, style = {} }) {
  const c = COLORS.leaf;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <path d="M20,48 C10,40 6,28 10,16 C14,6 26,4 30,14 C34,26 30,40 20,48 Z" fill={c.fill} />
        <path d="M20,46 C20,36 20,24 20,14" fill="none" strokeWidth="1.5" />
        <path d="M20,36 C16,32 14,28 13,24" fill="none" strokeWidth="1.2" />
        <path d="M20,36 C24,32 26,28 27,24" fill="none" strokeWidth="1.2" />
        <path d="M20,26 C17,22 15,19 14,16" fill="none" strokeWidth="1.2" />
        <path d="M20,26 C23,22 25,19 26,16" fill="none" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Nón lá Việt Nam */
export function NonLa({ size = 70, opacity = 1, style = {} }) {
  const c = COLORS.nonla;
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 70 52" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <path d="M35,4 C28,14 14,30 6,44 C18,48 52,48 64,44 C56,30 42,14 35,4 Z" fill={c.fill} />
        <path d="M6,44 C18,50 52,50 64,44" fill="none" />
        <path d="M35,6 C32,14 25,26 18,38" fill="none" strokeWidth="1" stroke={c.stroke} opacity="0.5" />
        <path d="M35,6 C38,14 45,26 52,38" fill="none" strokeWidth="1" stroke={c.stroke} opacity="0.5" />
        <path d="M35,6 C35,16 35,28 35,40" fill="none" strokeWidth="1" stroke={c.stroke} opacity="0.5" />
        <path d="M28,47 C30,50 32,52 35,52 C38,52 40,50 42,47" fill="none" />
      </g>
    </svg>
  );
}

/** Áo phông */
export function TShirt({ size = 60, opacity = 1, style = {} }) {
  const c = COLORS.tshirt;
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 60 54" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        {/* Nền áo đầy màu */}
        <path d="M22,4 C16,4 8,8 6,14 C10,16 16,14 20,12 L20,50 L40,50 L40,12 C44,14 50,16 54,14 C52,8 44,4 38,4 C36,10 24,10 22,4 Z" fill={c.fill} />
        {/* Cổ áo */}
        <path d="M22,4 C24,10 36,10 38,4" fill="none" />
        {/* Tay trái */}
        <path d="M22,4 C16,4 8,8 6,14 C10,16 16,14 20,12" fill="none" />
        {/* Tay phải */}
        <path d="M38,4 C44,4 52,8 54,14 C50,16 44,14 40,12" fill="none" />
        {/* Đáy */}
        <path d="M20,50 C28,52 32,52 40,50" fill="none" />
      </g>
    </svg>
  );
}

/** Kéo */
export function Scissors({ size = 50, opacity = 1, style = {} }) {
  const c = COLORS.scissors;
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 50 60" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <path d="M25,28 C22,22 12,10 8,6" fill="none" />
        <circle cx="10" cy="42" r="8" fill={c.fill} />
        <path d="M16,36 C20,32 25,28" fill="none" />
        <path d="M25,28 C28,22 38,10 42,6" fill="none" />
        <circle cx="40" cy="42" r="8" fill={c.fill} />
        <path d="M34,36 C30,32 25,28" fill="none" />
      </g>
    </svg>
  );
}

/** Ngôi sao vẽ tay */
export function Star({ size = 44, opacity = 1, style = {} }) {
  const c = COLORS.star;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <path
        d="M22,4 L25,16 L38,14 L28,22 L33,35 L22,27 L11,35 L16,22 L6,14 L19,16 Z"
        fill={c.fill} stroke={c.stroke} {...BASE_STROKE}
      />
    </svg>
  );
}

/** Cuộn chỉ */
export function ThreadSpool({ size = 48, opacity = 1, style = {} }) {
  const c = COLORS.spool;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <rect x="10" y="14" width="28" height="20" rx="3" fill={c.fill} />
        <path d="M6,14 C6,10 42,10 42,14" fill={c.fill} />
        <path d="M6,34 C6,38 42,38 42,34" fill={c.fill} />
        <path d="M14,20 C22,24 26,24 34,20" fill="none" strokeWidth="1.2" />
        <path d="M14,24 C22,28 26,28 34,24" fill="none" strokeWidth="1.2" />
        <path d="M14,28 C22,32 26,32 34,28" fill="none" strokeWidth="1.2" />
        <path d="M42,18 C44,14 46,10 44,6" fill="none" />
      </g>
    </svg>
  );
}

/** Mây nhỏ */
export function Cloud({ size = 70, opacity = 1, style = {} }) {
  const c = COLORS.cloud;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <path
        d="M12,32 C6,32 4,26 8,22 C8,14 16,10 24,14 C26,8 34,6 40,10 C44,6 54,8 54,16 C60,16 66,22 62,28 C60,34 52,36 12,32 Z"
        fill={c.fill} stroke={c.stroke} {...BASE_STROKE}
      />
    </svg>
  );
}

/** Vòng tròn sáp */
export function CrayonCircle({ size = "100%", fill = '#D8D4CC', opacity = 1, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" preserveAspectRatio="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <path d="M50,4 C22,5 5,22 4,50 C3,78 22,95 50,96 C78,97 95,78 96,50 C97,22 78,3 50,4 Z" fill={fill} stroke={fill} strokeWidth="2" />
      <path d="M50,6 C26,7 7,26 6,50 C5,74 26,93 50,94 C74,95 93,74 94,50 C95,26 74,5 50,6 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
    </svg>
  );
}

/** Kim may */
export function Needle({ size = 44, opacity = 1, style = {} }) {
  const c = COLORS.needle;
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 18 44" fill="none"
      style={{ opacity, filter: 'url(#crayon)', ...style }}>
      {CRAYON_FILTER}
      <g stroke={c.stroke} {...BASE_STROKE}>
        <path d="M9,4 L9,38" fill="none" />
        <path d="M7,36 C8,42 10,42 11,36" fill={c.fill} />
        <ellipse cx="9" cy="7" rx="2.5" ry="3.5" fill={c.fill} />
        <path d="M9,4 C6,2 2,6 4,12 C6,18 12,16 14,10" fill="none" stroke={c.stroke} strokeWidth="1.5" />
      </g>
    </svg>
  );
}
