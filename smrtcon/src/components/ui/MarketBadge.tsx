import type { Market } from '@/types';

const MARKET_CONFIG: Record<Market, { label: string; color: string; emoji: string }> = {
  canada: { label: 'Canada', color: 'bg-gold/10 text-gold border-gold/20', emoji: '🍁' },
  africa: { label: 'Africa', color: 'bg-rust/10 text-rust border-rust/20', emoji: '🌍' },
  mideast: { label: 'Middle East', color: 'bg-[#4A7A6B]/10 text-[#4A7A6B] border-[#4A7A6B]/20', emoji: '🕌' },
};

export default function MarketBadge({ market }: { market: Market }) {
  const config = MARKET_CONFIG[market];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs ${config.color}`}
    >
      {config.emoji} {config.label}
    </span>
  );
}
