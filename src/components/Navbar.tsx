import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

function ProfileMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(196,30,58,0.15)', border: '2px solid #C41E3A', borderRadius: 40, padding: '5px 14px 5px 6px', cursor: 'pointer' }}
      >
        {/* Avatar circle */}
        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'white', flexShrink: 0 }}>
          {initials}
        </div>
        <span style={{ color: 'white', fontWeight: 600, fontSize: 14, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.name}
        </span>
        <span style={{ color: '#9ca3af', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 12, padding: 8, minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 200 }}>
          {/* User info */}
          <div style={{ padding: '10px 14px 12px', borderBottom: '1px solid #2d2d2d', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: 'white', flexShrink: 0 }}>
                {initials}
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{user.name}</div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>{user.email}</div>
                <div style={{ color: '#FFB800', fontSize: 11, fontWeight: 600, marginTop: 2 }}>⭐ MVP Club Member</div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          {[
            { icon: '🎲', label: 'My Game Library' },
            { icon: '📅', label: 'Saved Events' },
            { icon: '🛒', label: 'Order History' },
            { icon: '⚙️', label: 'Account Settings' },
          ].map(item => (
            <button
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: 'none', border: 'none', borderRadius: 8, color: '#d1d5db', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
              onClick={() => setOpen(false)}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}

          <div style={{ borderTop: '1px solid #2d2d2d', marginTop: 8, paddingTop: 8 }}>
            <button
              onClick={() => { signOut(); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: 'none', border: 'none', borderRadius: 8, color: '#f87171', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user } = useAuth();
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

        {/* Right side */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link
            to="/shop"
            style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: '#FFB800', color: '#1a1a1a', fontWeight: 700, cursor: 'pointer', fontSize: 14, textDecoration: 'none' }}
          >
            🛒 Shop
          </Link>

          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('signin')}
                style={{ padding: '8px 18px', border: '2px solid #FFB800', borderRadius: 6, background: 'transparent', color: '#FFB800', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: '#C41E3A', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
              >
                Join Free
              </button>
            </>
          )}

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
