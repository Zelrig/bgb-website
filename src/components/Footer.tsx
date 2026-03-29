export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d0d0d', borderTop: '3px solid #C41E3A', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <img src="logo.jpg" alt="Board Game Barrister" style={{ height: 56, width: 'auto', marginBottom: 16 }} />
            <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
              Connecting people with games since 2005. Milwaukee's premier destination for board games, toys, and puzzles.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 'bold', marginBottom: 16, letterSpacing: 1 }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Online Store', 'https://store.boardgamebarrister.com'],
                ['Used Games', 'https://www.boardgamebarrister.com/used-games/'],
                ['Gift Certificates', 'https://store.boardgamebarrister.com'],
                ['New Arrivals', 'https://store.boardgamebarrister.com'],
              ].map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 'bold', marginBottom: 16, letterSpacing: 1 }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Events Calendar', 'https://www.boardgamebarrister.com/events/'],
                ['Discord Server', 'https://www.boardgamebarrister.com/events/'],
                ['YouTube Channel', 'https://www.youtube.com/@BoardGameBarrister'],
                ['MVP Club', 'https://www.boardgamebarrister.com/contact/'],
              ].map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 'bold', marginBottom: 16, letterSpacing: 1 }}>Help & Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Locations & Hours', 'https://www.boardgamebarrister.com/locations/'],
                ['Contact Us', 'https://www.boardgamebarrister.com/contact/'],
                ['About the Barrister', 'https://www.boardgamebarrister.com/about-the-barrister/'],
                ['Employment', 'https://www.boardgamebarrister.com/contact/'],
              ].map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ color: '#4b5563', fontSize: 13 }}>
            © {new Date().getFullYear()} Board Game Barrister®. All rights reserved. Milwaukee, WI.
          </div>
          <div style={{ color: '#4b5563', fontSize: 13 }}>
            This is a fan-made redesign concept site.
          </div>
        </div>
      </div>
    </footer>
  );
}
