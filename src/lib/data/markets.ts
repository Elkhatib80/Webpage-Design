import { MarketInfo } from '@/types';

export const MARKETS: MarketInfo[] = [
  {
    id: 'canada',
    name: 'Canada',
    color: '#C49A3C',
    flagEmoji: '🍁',
    countries: ['Canada'],
    description:
      'Based in Mississauga, Ontario, we serve contractors, developers, and architects across Canada. All products meet Canadian building codes and standards. We handle HST, customs clearance, and deliver via LTL/FTL trucking to your project site.',
    logistics: 'FOB Shanghai → Vancouver/Toronto port → LTL/FTL trucking to site. Full customs brokerage and HST handling included.',
    ports: 'Vancouver, Toronto, Montreal',
    languages: ['English', 'French'],
    popularProducts: [
      'WPC Decking & Cladding',
      'LVT / SPC Flooring',
      'Kitchen Cabinets',
      'Doors & Windows',
      'Heat Pumps & ERV Systems',
    ],
    whatsappMessage: "Hi smrtCON! I'm a contractor in Canada looking for construction materials.",
  },
  {
    id: 'africa',
    name: 'Africa',
    color: '#8B4A2B',
    flagEmoji: '🌍',
    countries: ['Nigeria', 'Egypt', 'Kenya', 'Ghana'],
    description:
      'We support construction projects across Africa with factory-direct pricing and FOB shipping from Shanghai. Our team understands the unique challenges of African construction — from import regulations to last-mile delivery. We provide project support including spec review, sampling, and on-site coordination.',
    logistics: 'FOB Shanghai → Major African ports. Container shipping with door-to-port or door-to-door options available.',
    ports: 'Lagos (Apapa), Mombasa, Tema, Alexandria',
    languages: ['English', 'French', 'Arabic'],
    popularProducts: [
      'WPC Decking & Cladding',
      'Kitchen Cabinets',
      'Shower Enclosures',
      'Padel Courts',
      'Doors & Windows',
    ],
    whatsappMessage: "Hi smrtCON! I'm interested in sourcing construction materials for an African project.",
  },
  {
    id: 'mideast',
    name: 'Middle East',
    color: '#4A7A6B',
    flagEmoji: '🕌',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Egypt'],
    description:
      'We serve the Gulf and wider Middle East with CIF delivery to Dubai, Jeddah, and Doha. Our product range is tailored to the region — from padel courts and luxury interiors to heat-resistant cladding and HVAC systems. Arabic-speaking support available.',
    logistics: 'CIF Dubai/Jeddah/Doha. Container shipping with customs clearance support. Express air freight available for samples.',
    ports: 'Jebel Ali (Dubai), Jeddah, Hamad (Doha)',
    languages: ['English', 'Arabic'],
    popularProducts: [
      'Padel Courts',
      'Kitchen Cabinets',
      'Shower Enclosures',
      'Custom Lighting',
      'Blinds & Soft Furnishings',
    ],
    whatsappMessage: "Hi smrtCON! I'm interested in construction materials for a Middle East project.",
  },
];

export function getMarketById(id: string): MarketInfo | undefined {
  return MARKETS.find((m) => m.id === id);
}
