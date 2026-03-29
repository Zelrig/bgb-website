import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products, type Category, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/shop/CartDrawer';
import ProductModal from '../components/shop/ProductModal';

const CATEGORIES: Category[] = ['All', 'Strategy', 'Card Games', 'Party', 'Family', 'RPG & Adventure', 'Kids', 'Puzzles', 'Gifts'];

const SORTS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#FFB800' : '#3d3d3d', fontSize: size }}>★</span>
      ))}
    </span>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const { add, items } = useCart();
  const inCart = items.find(i => i.id === product.id);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (!product.inStock) return;
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C41E3A'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,30,58,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2d2d'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Image */}
      <div style={{ backgroundColor: '#1a1a1a', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
        <img src={product.image} alt={product.name} style={{ maxHeight: 170, maxWidth: '100%', objectFit: 'contain' }} loading="lazy" />
        {product.badge && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            backgroundColor: product.badge === 'New' ? '#16a34a' : product.badge === 'Staff Pick' ? '#C41E3A' : product.badge === 'Best Seller' ? '#d97706' : product.badge === 'Best Value' ? '#0891b2' : '#6b7280',
            color: 'white', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: 0.5
          }}>
            {product.badge}
          </div>
        )}
        {!product.inStock && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ backgroundColor: '#1a1a1a', color: '#FFB800', border: '1px solid #FFB800', borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{product.category}</div>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 6, lineHeight: 1.3, flex: 1 }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ color: '#4b5563', fontSize: 12 }}>({product.reviews})</span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 4, padding: '2px 7px', fontSize: 11, color: '#9ca3af' }}>👥 {product.players}</span>
          <span style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 4, padding: '2px 7px', fontSize: 11, color: '#9ca3af' }}>⏱ {product.time}</span>
          <span style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 4, padding: '2px 7px', fontSize: 11, color: '#9ca3af' }}>🎂 {product.age}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#C41E3A', fontWeight: 800, fontSize: 20 }}>${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            style={{
              padding: '8px 14px',
              backgroundColor: added ? '#16a34a' : product.inStock ? '#C41E3A' : '#2d2d2d',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 13,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {added ? '✓ Added!' : inCart ? `Cart (${inCart.qty})` : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const { count, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category>('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q));
    }
    list = list.filter(p => p.price <= maxPrice);
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case 'reviews': return list.sort((a, b) => b.reviews - a.reviews);
      default: return list;
    }
  }, [category, search, sort, maxPrice]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d' }}>
      {/* Shop Nav */}
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #C41E3A', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#9ca3af', fontSize: 14, flexShrink: 0 }}>
            ← <img src="logo.jpg" alt="BGB" style={{ height: 36, width: 'auto' }} />
          </Link>
          <div style={{ width: 1, height: 32, backgroundColor: '#2d2d2d', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Georgia, serif', color: 'white', fontSize: 18, fontWeight: 'bold', flexShrink: 0 }}>Shop</span>

          {/* Search */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 500 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 16 }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search games, categories, tags..."
              style={{ width: '100%', padding: '9px 12px 9px 36px', backgroundColor: '#111', border: '1px solid #3d3d3d', borderRadius: 8, color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Free shipping badge */}
            <span style={{ color: '#FFB800', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', display: 'none' }} className="shipping-badge">🚚 Free shipping $125+</span>
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              style={{ position: 'relative', padding: '8px 16px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              🛒 Cart
              {count > 0 && (
                <span style={{ backgroundColor: '#FFB800', color: '#1a1a1a', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>
                  {count}
                </span>
              )}
              {total > 0 && <span style={{ fontSize: 13 }}>${total.toFixed(2)}</span>}
            </button>
          </div>
        </div>
        {/* Free shipping banner */}
        <div style={{ backgroundColor: '#FFB80015', borderTop: '1px solid #FFB80025', padding: '6px 24px', textAlign: 'center', fontSize: 13, color: '#FFB800', fontWeight: 600 }}>
          🚚 Free shipping on orders $125+ · In-store pickup available at all 4 Milwaukee locations
        </div>
      </nav>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px', display: 'flex', gap: 28 }}>
        {/* Sidebar */}
        <aside style={{ width: 240, flexShrink: 0, display: 'block' }}>
          <div style={{ backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 12, padding: 20, position: 'sticky', top: 112 }}>
            <div style={{ fontFamily: 'Georgia, serif', color: '#FFB800', fontWeight: 'bold', fontSize: 15, marginBottom: 16, letterSpacing: 0.5 }}>CATEGORIES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: category === cat ? '#C41E3A' : 'transparent',
                    color: category === cat ? 'white' : '#9ca3af',
                    fontWeight: category === cat ? 700 : 400,
                    fontSize: 14,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (category !== cat) e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { if (category !== cat) e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = category === cat ? 'white' : '#9ca3af'; }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #2d2d2d', marginTop: 20, paddingTop: 20 }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#FFB800', fontWeight: 'bold', fontSize: 15, marginBottom: 12 }}>MAX PRICE</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#9ca3af', fontSize: 13 }}>Up to</span>
                <span style={{ color: 'white', fontWeight: 700 }}>${maxPrice}</span>
              </div>
              <input
                type="range"
                min={9}
                max={80}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#C41E3A' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ color: '#4b5563', fontSize: 11 }}>$9</span>
                <span style={{ color: '#4b5563', fontSize: 11 }}>$80</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #2d2d2d', marginTop: 20, paddingTop: 20 }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#FFB800', fontWeight: 'bold', fontSize: 15, marginBottom: 12 }}>SORT BY</div>
              {SORTS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  style={{ display: 'block', width: '100%', padding: '8px 12px', borderRadius: 6, border: 'none', backgroundColor: sort === s.value ? 'rgba(196,30,58,0.15)' : 'transparent', color: sort === s.value ? '#C41E3A' : '#9ca3af', fontWeight: sort === s.value ? 700 : 400, fontSize: 13, cursor: 'pointer', textAlign: 'left', marginBottom: 2 }}
                >
                  {sort === s.value ? '● ' : '○ '}{s.label}
                </button>
              ))}
            </div>

            {(category !== 'All' || search || maxPrice < 80) && (
              <button
                onClick={() => { setCategory('All'); setSearch(''); setMaxPrice(80); setSort('featured'); }}
                style={{ marginTop: 16, width: '100%', padding: '9px', border: '1px solid #3d3d3d', borderRadius: 6, backgroundColor: 'transparent', color: '#6b7280', fontSize: 13, cursor: 'pointer' }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <main style={{ flex: 1 }}>
          {/* Results header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ color: '#9ca3af', fontSize: 14 }}>
              Showing <strong style={{ color: 'white' }}>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}
              {category !== 'All' && <> in <strong style={{ color: '#FFB800' }}>{category}</strong></>}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#4b5563' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#6b7280', marginBottom: 8 }}>No games found</div>
              <div style={{ fontSize: 14 }}>Try adjusting your filters or search term</div>
              <button
                onClick={() => { setCategory('All'); setSearch(''); setMaxPrice(80); }}
                style={{ marginTop: 20, padding: '10px 24px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}

          {/* Footer note */}
          <div style={{ marginTop: 48, padding: '24px', backgroundColor: '#111', borderRadius: 12, border: '1px solid #2d2d2d', textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>
              This is a demo shop. For the full catalog with thousands of products, visit the real store:
            </div>
            <a href="https://store.boardgamebarrister.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFB800', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              store.boardgamebarrister.com →
            </a>
          </div>
        </main>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}
