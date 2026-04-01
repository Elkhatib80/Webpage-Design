export type CountryCode = 'NG' | 'AE' | 'SA';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  phone: string;
  email: string;
  heroSubline: string;
}

export interface ProductPrice {
  [key: string]: number; // CountryCode -> price
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  name: string;
  country: CountryCode;
  rating: number;
  comment: string;
  date: string;
}

export type ProductCategory = 'power-station' | 'solar-panel' | 'accessory';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  capacity?: string;
  wattage?: string;
  price: ProductPrice;
  originalPrice?: ProductPrice;
  badge?: string;
  features: string[];
  specs: ProductSpec[];
  reviews: ProductReview[];
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  countryCode: CountryCode;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
