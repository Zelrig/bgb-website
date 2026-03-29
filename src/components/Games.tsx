const categories = [
  { icon: '🧩', label: 'Strategy', description: 'Chess, Catan, Ticket to Ride and more' },
  { icon: '🃏', label: 'Card Games', description: 'Lorcana, Magic, UNO and beyond' },
  { icon: '🎭', label: 'Party Games', description: 'Codenames, Wavelength, Jackbox' },
  { icon: '👨‍👩‍👧', label: 'Family', description: 'Fun for all ages, all skill levels' },
  { icon: '🐉', label: 'RPG & Adventure', description: 'D&D, Pathfinder, narrative games' },
  { icon: '🧸', label: 'Toys & Puzzles', description: 'Building sets, brain teasers, plush' },
];

const featured = [
  { name: 'Catan', genre: 'Strategy', players: '3–4', time: '60–120 min', emoji: '🏝️', bg: '#2d1515' },
  { name: 'Lorcana', genre: 'Card Game', players: '2', time: '30–60 min', emoji: '✨', bg: '#151a2d' },
  { name: 'Codenames', genre: 'Party', players: '2–8+', time: '15–30 min', emoji: '🕵️', bg: '#15242d' },
  { name: 'Wingspan', genre: 'Strategy', players: '1–5', time: '40–70 min', emoji: '🦅', bg: '#1a2d15' },
];

export default function Games() {
  return (
    <section id="games" style={{ backgroundColor: '#1a1a1a', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.4)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: '#FFB800', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Browse by Category
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
            Find Your Next Favorite Game
          </h2>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 64 }}>
          {categories.map(c => (
            <a
              key={c.label}
              href="https://store.boardgamebarrister.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '18px 24px', backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 12, textDecoration: 'none', minWidth: 130, transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C41E3A'; e.currentTarget.style.backgroundColor = '#1f1010'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2d2d'; e.currentTarget.style.backgroundColor = '#111'; }}
            >
              <span style={{ fontSize: 32 }}>{c.icon}</span>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{c.label}</span>
              <span style={{ color: '#6b7280', fontSize: 12, textAlign: 'center', lineHeight: 1.3 }}>{c.description}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: '#2d2d2d' }} />
          <span style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 'bold', whiteSpace: 'nowrap' }}>Staff Picks</span>
          <div style={{ flex: 1, height: 1, backgroundColor: '#2d2d2d' }} />
        </div>

        {/* Featured games */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {featured.map(g => (
            <a
              key={g.name}
              href="https://store.boardgamebarrister.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: g.bg, border: '1px solid #2d2d2d', borderRadius: 12, padding: 24, textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFB800'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2d2d'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>{g.emoji}</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: 20, fontFamily: 'Georgia, serif', marginBottom: 6 }}>{g.name}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                <span style={{ backgroundColor: 'rgba(196,30,58,0.25)', color: '#f87171', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{g.genre}</span>
              </div>
              <div style={{ color: '#9ca3af', fontSize: 13 }}>
                👥 {g.players} players · ⏱ {g.time}
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a
            href="https://store.boardgamebarrister.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '14px 36px', backgroundColor: '#C41E3A', color: 'white', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
          >
            Browse Full Store →
          </a>
        </div>
      </div>
    </section>
  );
}
