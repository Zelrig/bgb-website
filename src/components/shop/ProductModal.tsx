import { useEffect } from 'react';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
  onClose: () => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#FFB800' : '#3d3d3d', fontSize: 16 }}>★</span>
      ))}
    </span>
  );
}

export default function ProductModal({ product, onClose }: Props) {
  const { add, items } = useCart();
  const inCart = items.find(i => i.id === product.id);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#111', border: '2px solid #2d2d2d', borderRadius: 16, width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>✕</button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Product image */}
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '14px 14px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, minHeight: 280 }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: 280, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }} />
          </div>

          <div style={{ padding: 32 }}>
            {/* Badge */}
            {product.badge && (
              <div style={{ display: 'inline-block', backgroundColor: product.badge === 'New' ? 'rgba(34,197,94,0.15)' : 'rgba(196,30,58,0.15)', border: `1px solid ${product.badge === 'New' ? 'rgba(34,197,94,0.4)' : 'rgba(196,30,58,0.4)'}`, borderRadius: 12, padding: '3px 12px', fontSize: 12, color: product.badge === 'New' ? '#4ade80' : '#f87171', fontWeight: 600, marginBottom: 12 }}>
                {product.badge}
              </div>
            )}

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>{product.name}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Stars rating={product.rating} />
              <span style={{ color: '#6b7280', fontSize: 14 }}>{product.reviews} reviews</span>
            </div>

            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#C41E3A', marginBottom: 20 }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Specs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { icon: '👥', label: 'Players', value: product.players },
                { icon: '🎂', label: 'Age', value: product.age },
                { icon: '⏱', label: 'Time', value: product.time },
                { icon: '📂', label: 'Category', value: product.category },
              ].map(spec => (
                <div key={spec.label} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 8, padding: '10px 14px', textAlign: 'center', minWidth: 90 }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{spec.icon}</div>
                  <div style={{ color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{spec.label}</div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{product.description}</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {product.tags.map(tag => (
                <span key={tag} style={{ backgroundColor: '#1a1a1a', border: '1px solid #3d3d3d', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#9ca3af' }}>{tag}</span>
              ))}
            </div>

            {/* Actions */}
            {product.inStock ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => add(product)}
                  style={{ flex: 1, padding: '14px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                >
                  {inCart ? `Add Another (${inCart.qty} in cart)` : '🛒 Add to Cart'}
                </button>
                <a
                  href={`https://store.boardgamebarrister.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: '14px 20px', border: '2px solid #FFB800', borderRadius: 8, color: '#FFB800', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Buy on Real Store →
                </a>
              </div>
            ) : (
              <div style={{ backgroundColor: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.3)', borderRadius: 8, padding: '14px 20px', textAlign: 'center', color: '#FFB800', fontWeight: 600 }}>
                Currently Out of Stock — Check back soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
