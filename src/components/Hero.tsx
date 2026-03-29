interface HeroProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section id="home" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
      {/* Checkered background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'repeating-conic-gradient(#F0D9B5 0% 25%, #B58863 0% 50%)', backgroundSize: '80px 80px' }} />

      {/* Red gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(196,30,58,0.25) 0%, transparent 60%)' }} />

      {/* Top stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #C41E3A, #FFB800, #C41E3A)' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 900 }}>
        {/* Logo */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
          <img
            src="logo.jpg"
            alt="Board Game Barrister"
            style={{ width: '100%', maxWidth: 520, height: 'auto', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.8))' }}
          />
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 'bold', color: 'white', marginBottom: 16, lineHeight: 1.2, textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
          Milwaukee's Home for{' '}
          <span style={{ color: '#FFB800' }}>Board Games,</span>
          <br />
          <span style={{ color: '#C41E3A' }}>Toys & Puzzles</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#d1d5db', marginBottom: 40, lineHeight: 1.6, fontStyle: 'italic' }}>
          Connecting people with games since 2005 — where laughter, wit, and skill bring everyone together.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://store.boardgamebarrister.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '14px 32px', background: '#C41E3A', color: 'white', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none', border: '2px solid #C41E3A', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#a31830'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C41E3A'; }}
          >
            🎲 Shop Online
          </a>
          <button
            onClick={() => onOpenAuth('signup')}
            style={{ padding: '14px 32px', background: 'transparent', color: '#FFB800', borderRadius: 8, fontWeight: 700, fontSize: 16, border: '2px solid #FFB800', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,184,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            ♟️ Join the Community
          </button>
          <a
            href="#events"
            style={{ padding: '14px 32px', background: 'transparent', color: '#e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 16, border: '2px solid #4b5563', textDecoration: 'none', transition: 'all 0.2s' }}
          >
            📅 See Events
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
          {[
            { value: '20+', label: 'Years in Business' },
            { value: '4', label: 'Milwaukee Locations' },
            { value: '1000s', label: 'Games in Stock' },
            { value: 'Weekly', label: 'Game Events' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: '#FFB800', fontFamily: 'Georgia, serif' }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #1a1a1a)' }} />
    </section>
  );
}
