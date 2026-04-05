'use client';

import { motion } from 'framer-motion';

export type ProductId = 'q-08' | 'q-12' | 'q-24' | 'q-36';

interface ModelConfig {
  capacity: string;
  wattage: string;
  acPorts: number;
  usbA: number;
  usbC: number;
  hasSolar: boolean;
  hasHandle: boolean;
  isFlagship: boolean;
  batteryPct: number;
  bodyColor: string;
}

const MODELS: Record<ProductId, ModelConfig> = {
  'q-08': {
    capacity: '512Wh',  wattage: '800W',  acPorts: 1, usbA: 2, usbC: 1,
    hasSolar: false, hasHandle: false, isFlagship: false, batteryPct: 80, bodyColor: '#222',
  },
  'q-12': {
    capacity: '1024Wh', wattage: '1200W', acPorts: 2, usbA: 3, usbC: 1,
    hasSolar: true,  hasHandle: true,  isFlagship: false, batteryPct: 65, bodyColor: '#1E1E1E',
  },
  'q-24': {
    capacity: '2048Wh', wattage: '2400W', acPorts: 3, usbA: 3, usbC: 2,
    hasSolar: true,  hasHandle: true,  isFlagship: true,  batteryPct: 90, bodyColor: '#1A1A1A',
  },
  'q-36': {
    capacity: '3840Wh', wattage: '3600W', acPorts: 4, usbA: 4, usbC: 2,
    hasSolar: true,  hasHandle: true,  isFlagship: true,  batteryPct: 72, bodyColor: '#181818',
  },
};

function ACPort({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={22} height={18} rx={3} fill="#111" stroke="#444" strokeWidth={0.8} />
      <circle cx={x + 11} cy={y + 7} r={3.5} fill="none" stroke="#555" strokeWidth={0.8} />
      <rect x={x + 7.5} y={y + 11.5} width={7} height={3} rx={1} fill="#555" />
    </g>
  );
}

function USBPort({ x, y, type }: { x: number; y: number; type: 'A' | 'C' }) {
  return type === 'A' ? (
    <rect x={x} y={y} width={11} height={8} rx={1.5} fill="#111" stroke="#444" strokeWidth={0.7} />
  ) : (
    <rect x={x} y={y} width={10} height={6} rx={3} fill="#111" stroke="#F5A623" strokeWidth={0.7} />
  );
}

function DCPort({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill="#111" stroke="#444" strokeWidth={0.7} />
      <circle cx={x} cy={y} r={2} fill="#F5A623" opacity={0.7} />
    </g>
  );
}

export default function ProductIllustration({
  productId,
  className = '',
}: {
  productId: ProductId;
  className?: string;
}) {
  const cfg = MODELS[productId] ?? MODELS['q-08'];
  const AMBER = '#F5A623';
  const bars = 5;
  const filledBars = Math.round((cfg.batteryPct / 100) * bars);

  // Build port layout
  const ports: Array<{ kind: 'ac' | 'usbA' | 'usbC' | 'dc' }> = [
    ...Array(cfg.acPorts).fill({ kind: 'ac' as const }),
    ...Array(cfg.usbA).fill({ kind: 'usbA' as const }),
    ...Array(cfg.usbC).fill({ kind: 'usbC' as const }),
    ...(cfg.hasSolar ? [{ kind: 'dc' as const }] : []),
  ];

  // Position ports evenly in port strip (x: 35 to 245, y: 133)
  const portAreaWidth = 210;
  const portSpacing = portAreaWidth / (ports.length + 1);

  return (
    <svg
      viewBox="0 0 280 195"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full select-none ${className}`}
      role="img"
      aria-label={`smrtQ ${productId.toUpperCase()} power station illustration`}
    >
      <defs>
        {/* Body gradient */}
        <linearGradient id={`bodyGrad-${productId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2E2E2E" />
          <stop offset="100%" stopColor={cfg.bodyColor} />
        </linearGradient>
        {/* Highlight on top */}
        <linearGradient id={`hlGrad-${productId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Display glow */}
        <radialGradient id={`dispGlow-${productId}`} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.20" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
        {/* Shadow */}
        <radialGradient id={`shadow-${productId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id={`glow-${productId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Drop shadow */}
      <ellipse cx="140" cy="183" rx="88" ry="9" fill={`url(#shadow-${productId})`} />

      {/* Carry handle */}
      {cfg.hasHandle && (
        <rect x="100" y="14" width="80" height="14" rx="7"
          fill="none" stroke="#3A3A3A" strokeWidth="5" strokeLinecap="round" />
      )}

      {/* Main body */}
      <rect x="30" y="25" width="220" height="150" rx="14"
        fill={`url(#bodyGrad-${productId})`} />

      {/* Body highlight */}
      <rect x="30" y="25" width="220" height="55" rx="14"
        fill={`url(#hlGrad-${productId})`} />

      {/* Display glow behind */}
      <rect x="48" y="34" width="184" height="80" rx="8"
        fill={`url(#dispGlow-${productId})`} />

      {/* Display screen */}
      <rect x="50" y="36" width="180" height="76" rx="7" fill="#0C0C0C" />
      <rect x="50" y="36" width="180" height="76" rx="7"
        fill="none" stroke={AMBER} strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Battery icon + bars */}
      <rect x="62" y="50" width="60" height="22" rx="3"
        fill="none" stroke="#444" strokeWidth="1" />
      <rect x="122" y="56" width="4" height="10" rx="1" fill="#444" />
      {Array.from({ length: bars }).map((_, i) => (
        <rect
          key={i}
          x={64 + i * 11}
          y={52}
          width={9}
          height={18}
          rx={1.5}
          fill={i < filledBars ? AMBER : '#2A2A2A'}
          opacity={i < filledBars ? 1 : 0.6}
        />
      ))}
      {/* Battery % text */}
      <text x="132" y="65" fontFamily="monospace" fontSize="11" fill={AMBER} fontWeight="bold">
        {cfg.batteryPct}%
      </text>

      {/* Model text */}
      <text x="62" y="91" fontFamily="'Barlow Condensed', sans-serif" fontSize="18"
        fontWeight="900" fill="#fff" letterSpacing="1">
        smrtQ {productId.toUpperCase()}
      </text>

      {/* Capacity + wattage */}
      <text x="62" y="105" fontFamily="monospace" fontSize="9" fill="#888">
        {cfg.capacity}  ·  {cfg.wattage} AC
      </text>

      {/* Flagship badge on display */}
      {cfg.isFlagship && (
        <g>
          <rect x="180" y="42" width="44" height="14" rx="3" fill={AMBER} />
          <text x="202" y="52" fontFamily="'Barlow', sans-serif" fontSize="7"
            fontWeight="900" fill="#000" textAnchor="middle" letterSpacing="0.5">
            FLAGSHIP
          </text>
        </g>
      )}

      {/* Port strip background */}
      <rect x="30" y="122" width="220" height="53" rx="0"
        fill="#161616" />
      <rect x="30" y="122" width="220" height="2" fill="#333" />

      {/* Port label */}
      <text x="140" y="167" fontFamily="monospace" fontSize="7"
        fill="#555" textAnchor="middle" letterSpacing="1.5">
        OUTPUTS
      </text>

      {/* Ports row */}
      {ports.map((p, i) => {
        const px = 35 + portSpacing * (i + 1);
        const py = 128;
        if (p.kind === 'ac')   return <ACPort   key={i} x={px - 11} y={py} />;
        if (p.kind === 'usbA') return <USBPort  key={i} x={px - 5.5} y={py + 5} type="A" />;
        if (p.kind === 'usbC') return <USBPort  key={i} x={px - 5}   y={py + 6} type="C" />;
        return                        <DCPort   key={i} x={px}       y={py + 9} />;
      })}

      {/* Rounded bottom of body */}
      <rect x="30" y="160" width="220" height="15" rx="14"
        fill={cfg.bodyColor} />
      <rect x="30" y="155" width="220" height="10" fill={cfg.bodyColor} />

      {/* Animated display pulse */}
      <motion.rect
        x="50" y="36" width="180" height="76" rx="7"
        fill="none" stroke={AMBER} strokeWidth="1.5" strokeOpacity="0"
        animate={{ strokeOpacity: [0, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom brand strip */}
      <rect x="30" y="168" width="220" height="7" rx="4" fill="#2A2A2A" />
      <text x="140" y="174" fontFamily="'Barlow Condensed', sans-serif" fontSize="6"
        fill="#555" textAnchor="middle" letterSpacing="3" fontWeight="700">
        SMRTQ SOLUTIONS
      </text>
    </svg>
  );
}
