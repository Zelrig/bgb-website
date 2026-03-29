const locations = [
  {
    name: 'Mayfair Mall',
    address: 'Upstairs, next to Macy\'s',
    city: 'Wauwatosa, WI',
    phone: '(414) 475-1234',
    hours: 'Mon–Sat 10am–9pm · Sun 11am–6pm',
    emoji: '🏬',
    url: 'https://www.boardgamebarrister.com/locations/mayfair-mall/',
  },
  {
    name: 'Bayshore Town Center',
    address: 'Just outside the Rotunda',
    city: 'Glendale, WI',
    phone: '(414) 906-1234',
    hours: 'Mon–Sat 10am–9pm · Sun 11am–6pm',
    emoji: '🏪',
    url: 'https://www.boardgamebarrister.com/locations/bayshore/',
  },
  {
    name: 'Greenfield Place',
    address: 'Near Half Price Books',
    city: 'Greenfield, WI',
    phone: '(414) 423-1234',
    hours: 'Mon–Sat 10am–8pm · Sun 11am–6pm',
    emoji: '🌳',
    url: 'https://www.boardgamebarrister.com/locations/greenfield/',
  },
  {
    name: 'South Milwaukee',
    address: 'Warehouse & Clearance Center',
    city: 'South Milwaukee, WI',
    phone: '(414) 762-1234',
    hours: 'Wed–Fri 12pm–6pm · Sat–Sun 10am–5pm',
    emoji: '📦',
    url: 'https://www.boardgamebarrister.com/locations/south-milwaukee/',
    note: 'Great for order pickup & clearance deals!',
  },
];

export default function Locations() {
  return (
    <section id="locations" style={{ backgroundColor: '#C41E3A', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Checkered overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-conic-gradient(#F0D9B5 0% 25%, #B58863 0% 50%)', backgroundSize: '80px 80px' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: '#FFB800', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Visit Us In Person
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', color: '#FFB800', marginBottom: 16 }}>
            4 Milwaukee-Area Locations
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Stop in, try before you buy, and get a personal recommendation from one of our Barristers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {locations.map(loc => (
            <a
              key={loc.name}
              href={loc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)', border: '2px solid rgba(255,184,0,0.3)', borderRadius: 12, padding: 24, textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFB800'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,184,0,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{loc.emoji}</div>
              <div style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>{loc.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 2 }}>{loc.address}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 12 }}>{loc.city}</div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 12 }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 4 }}>⏰ {loc.hours}</div>
              </div>
              {loc.note && (
                <div style={{ marginTop: 10, backgroundColor: 'rgba(255,184,0,0.15)', borderRadius: 6, padding: '6px 10px', fontSize: 13, color: '#FFB800' }}>
                  ⭐ {loc.note}
                </div>
              )}
              <div style={{ marginTop: 12, color: '#FFB800', fontSize: 13, fontWeight: 600 }}>View Details →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
