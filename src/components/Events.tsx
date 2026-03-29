const events = [
  {
    day: 'Monday',
    name: 'Open Game Night',
    location: 'Bayshore Town Center',
    time: '6:00 PM',
    icon: '🎲',
    color: '#C41E3A',
    desc: 'Drop in and try something new with fellow gamers. All skill levels welcome.',
  },
  {
    day: 'Tuesday',
    name: 'Lorcana League',
    location: 'Mayfair Mall',
    time: '6:30 PM',
    icon: '✨',
    color: '#FFB800',
    desc: 'Weekly competitive and casual Lorcana play. Beginners welcome!',
  },
  {
    day: 'Wednesday',
    name: 'Strategy Night',
    location: 'Greenfield Place',
    time: '6:00 PM',
    icon: '♟️',
    color: '#C41E3A',
    desc: 'Deep strategy games — from Twilight Imperium to Agricola.',
  },
  {
    day: 'Thursday',
    name: 'RPG Night',
    location: 'Bayshore Town Center',
    time: '6:00 PM',
    icon: '🐉',
    color: '#FFB800',
    desc: 'Dungeons & Dragons, Pathfinder, and other tabletop RPG sessions.',
  },
  {
    day: 'Saturday',
    name: 'Family Game Day',
    location: 'All Locations',
    time: '12:00 PM',
    icon: '👨‍👩‍👧',
    color: '#C41E3A',
    desc: 'Family-friendly games all afternoon. Perfect for kids and new players.',
  },
  {
    day: 'Sunday',
    name: 'Tournament Series',
    location: 'Mayfair Mall',
    time: '1:00 PM',
    icon: '🏆',
    color: '#FFB800',
    desc: 'Monthly tournaments across various game titles. Check calendar for details.',
  },
];

export default function Events() {
  return (
    <section id="events" style={{ backgroundColor: '#111', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(196,30,58,0.15)', border: '1px solid rgba(196,30,58,0.4)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: '#C41E3A', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Weekly Events
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
            Something Happening Every Night
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Our stores are alive with events all week long. Come for the games, stay for the community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 48 }}>
          {events.map(e => (
            <div
              key={e.name}
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 12, padding: 24, display: 'flex', gap: 16, transition: 'all 0.2s' }}
              onMouseEnter={el => { el.currentTarget.style.borderColor = e.color; }}
              onMouseLeave={el => { el.currentTarget.style.borderColor = '#2d2d2d'; }}
            >
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: `${e.color}22`, border: `2px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                  {e.icon}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: e.color, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  {e.day} · {e.time}
                </div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 18, fontFamily: 'Georgia, serif', marginBottom: 4 }}>{e.name}</div>
                <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 6 }}>📍 {e.location}</div>
                <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.4 }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Discord CTA */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 16, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ color: 'white', fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
              💬 Join our Discord Server
            </div>
            <div style={{ color: '#9ca3af', fontSize: 15 }}>
              Connect with the BGB community, find game partners, and stay updated on events.
            </div>
          </div>
          <a
            href="https://www.boardgamebarrister.com/events"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '12px 28px', backgroundColor: '#5865F2', color: 'white', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', flexShrink: 0 }}
          >
            Join Discord →
          </a>
        </div>
      </div>
    </section>
  );
}
