import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';

interface CartItem extends Product {
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(product: Product) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function remove(id: number) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id: number, qty: number) {
    if (qty <= 0) { remove(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
