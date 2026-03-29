import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Games', href: '#games' },
    { label: 'Events', href: '#events' },
    { label: 'Locations', href: '#locations' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #C41E3A', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="logo.jpg" alt="Board Game Barrister" style={{ height: 48, width: 'auto' }} />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{ color: '#e5e7eb', textDecoration: 'none', fontWeight: 500, fontSize: 15, letterSpacing: 0.5, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFB800')}
              onMouseLeave={e => (e.currentTarget.style.color = '#e5e7eb')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={() => onOpenAuth('signin')}
            style={{ padding: '8px 18px', border: '2px solid #FFB800', borderRadius: 6, background: 'transparent', color: '#FFB800', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
          >
            Sign In
          </button>
          <Link
            to="/shop"
            style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: '#FFB800', color: '#1a1a1a', fontWeight: 700, cursor: 'pointer', fontSize: 14, textDecoration: 'none' }}
          >
            🛒 Shop
          </Link>
          <button
            onClick={() => onOpenAuth('signup')}
            style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: '#C41E3A', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
          >
            Join Free
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 24, marginLeft: 8 }}
            className="hamburger"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#111', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: '#e5e7eb', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
