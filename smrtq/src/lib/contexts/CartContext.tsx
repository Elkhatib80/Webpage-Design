'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, CartState, Product, CountryCode } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; countryCode: CountryCode }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addItem: (product: Product, countryCode: CountryCode) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { product: action.product, quantity: 1, countryCode: action.countryCode }];
      return recalculate({ ...state, items });
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter((i) => i.product.id !== action.productId);
      return recalculate({ ...state, items });
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const items = state.items.filter((i) => i.product.id !== action.productId);
        return recalculate({ ...state, items });
      }
      const items = state.items.map((i) =>
        i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
      );
      return recalculate({ ...state, items });
    }
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };
    default:
      return state;
  }
}

function recalculate(state: CartState): CartState {
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + (i.product.price[i.countryCode] ?? 0) * i.quantity,
    0
  );
  return { ...state, totalItems, totalPrice };
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (product, countryCode) => dispatch({ type: 'ADD_ITEM', product, countryCode }),
        removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
        updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
