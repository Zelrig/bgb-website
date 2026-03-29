const features = [
  {
    icon: '🎲',
    title: 'Unparalleled Selection',
    desc: 'Thousands of board games, card games, puzzles, toys, and more — from family classics to the latest strategy releases.',
    color: '#C41E3A',
  },
  {
    icon: '🧑‍⚖️',
    title: 'Expert Barristers',
    desc: 'Our knowledgeable staff — the Barristers — are passionate gamers who provide hands-on demos and personalized recommendations.',
    color: '#FFB800',
  },
  {
    icon: '🏆',
    title: 'Weekly Game Events',
    desc: 'From Lorcana League nights to open play sessions, there\'s always something happening at your local Board Game Barrister.',
    color: '#C41E3A',
  },
  {
    icon: '🎁',
    title: 'Gift Certificates',
    desc: 'Not sure what to pick? Gift certificates are available online and in-store — the perfect present for any gamer.',
    color: '#FFB800',
  },
  {
    icon: '🔄',
    title: 'Used Game Trade-ins',
    desc: 'Buy and sell used games at any location. Refresh your collection and find hidden gems at great prices.',
    color: '#C41E3A',
  },
  {
    icon: '🎮',
    title: 'Games for Good',
    desc: 'Through our "Games for a Good Cause" program, we support local charities and community organizations across Milwaukee.',
    color: '#FFB800',
  },
];

export default function Features() {
  return (
    <section style={{ backgroundColor: '#111', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(196,30,58,0.15)', border: '1px solid rgba(196,30,58,0.4)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: '#C41E3A', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Why We're Different
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
            More Than Just a Game Store
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            We believe in the cultural power of the board game — where people of all types gather to share laughter, wit, and skill.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.map(f => (
            <div
              key={f.title}
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 12, padding: 28, transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = f.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d2d2d'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: `${f.color}22`, border: `2px solid ${f.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16 }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 'bold', color: f.color, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: 15 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
