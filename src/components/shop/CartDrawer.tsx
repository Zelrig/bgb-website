import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, remove, updateQty, total, count } = useCart();
  const freeShippingLeft = Math.max(0, 125 - total);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 200 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 400,
        maxWidth: '95vw',
        backgroundColor: '#111',
        borderLeft: '2px solid #C41E3A',
        zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #2d2d2d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            🛒 Your Cart {count > 0 && <span style={{ color: '#C41E3A', fontSize: 16 }}>({count})</span>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Free shipping banner */}
        {freeShippingLeft > 0 ? (
          <div style={{ backgroundColor: 'rgba(255,184,0,0.1)', borderBottom: '1px solid rgba(255,184,0,0.2)', padding: '10px 24px', fontSize: 13, color: '#FFB800', textAlign: 'center' }}>
            Add <strong>${freeShippingLeft.toFixed(2)}</strong> more for free shipping!
          </div>
        ) : total > 0 ? (
          <div style={{ backgroundColor: 'rgba(34,197,94,0.1)', borderBottom: '1px solid rgba(34,197,94,0.2)', padding: '10px 24px', fontSize: 13, color: '#4ade80', textAlign: 'center' }}>
            ✓ You qualify for free shipping!
          </div>
        ) : null}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#4b5563' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎲</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#6b7280', marginBottom: 8 }}>Your cart is empty</div>
              <div style={{ fontSize: 14, color: '#4b5563' }}>Add some games and let the fun begin!</div>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 14, backgroundColor: '#1a1a1a', borderRadius: 10, padding: 12, border: '1px solid #2d2d2d' }}>
              <img src={item.image} alt={item.name} style={{ width: 64, height: 84, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ color: '#C41E3A', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>${(item.price * item.qty).toFixed(2)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, border: '1px solid #3d3d3d', background: '#111', color: 'white', borderRadius: 4, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ color: 'white', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, border: '1px solid #3d3d3d', background: '#111', color: 'white', borderRadius: 4, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  <button onClick={() => remove(item.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: 13 }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #2d2d2d', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: '#9ca3af', fontSize: 15 }}>Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ color: '#4b5563', fontSize: 12, marginBottom: 16 }}>Shipping calculated at checkout</div>
            <button
              style={{ width: '100%', padding: '14px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 10 }}
              onClick={() => alert('This is a demo site. Visit store.boardgamebarrister.com to complete your purchase!')}
            >
              Checkout → ${total.toFixed(2)}
            </button>
            <a
              href="https://store.boardgamebarrister.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', color: '#FFB800', fontSize: 13, textDecoration: 'none' }}
            >
              Shop the real store →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
