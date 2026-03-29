import { useState } from 'react';

interface CommunityProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function Community({ onOpenAuth }: CommunityProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    // In production this would POST to a mailing list API (e.g. Mailchimp)
    setSubmitted(true);
    setError('');
  }

  return (
    <section id="community" style={{ backgroundColor: '#1a1a1a', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.4)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: '#FFB800', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            Join the Community
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
            Be Part of the Barrister Family
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Create a free account to track events, get personalized game recs, and connect with Milwaukee's board game community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Create Account card */}
          <div style={{ backgroundColor: '#111', border: '2px solid #C41E3A', borderRadius: 16, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 36, marginBottom: 12 }}>♟️</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                Create Free Account
              </h3>
              <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.6 }}>
                Unlock exclusive member perks:
              </p>
              <ul style={{ color: '#9ca3af', fontSize: 15, lineHeight: 2, paddingLeft: 20, marginTop: 10 }}>
                <li>📅 Save & RSVP to events</li>
                <li>🎲 Personal game recommendations</li>
                <li>🏆 Join the MVP Club</li>
                <li>🔔 Early access to new arrivals</li>
                <li>🎁 Member-only discounts</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              style={{ padding: '14px 24px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#a31830'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C41E3A'; }}
            >
              Create My Account →
            </button>
          </div>

          {/* Newsletter card */}
          <div style={{ backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 16, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                Barrister E-News
              </h3>
              <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.6 }}>
                Get weekly game picks, event announcements, new arrivals, and exclusive deals delivered straight to your inbox.
              </p>
              <ul style={{ color: '#9ca3af', fontSize: 15, lineHeight: 2, paddingLeft: 20, marginTop: 10 }}>
                <li>📰 Weekly newsletter</li>
                <li>🛒 Deals & new arrivals</li>
                <li>🎉 Event announcements</li>
                <li>✌️ No spam, ever</li>
              </ul>
            </div>

            {submitted ? (
              <div style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
                <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>You're on the list!</div>
                <div style={{ color: '#9ca3af', fontSize: 14 }}>Check your inbox for a welcome email from the Barrister.</div>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{ padding: '12px 16px', backgroundColor: '#1a1a1a', border: `1px solid ${error ? '#f87171' : '#3d3d3d'}`, borderRadius: 8, color: 'white', fontSize: 15, outline: 'none' }}
                />
                {error && <div style={{ color: '#f87171', fontSize: 13 }}>{error}</div>}
                <button
                  type="submit"
                  style={{ padding: '13px 24px', backgroundColor: '#FFB800', color: '#1a1a1a', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e6a600'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFB800'; }}
                >
                  Subscribe to Barrister E-News
                </button>
                <p style={{ color: '#4b5563', fontSize: 12, textAlign: 'center' }}>
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Discord/YouTube card */}
          <div style={{ backgroundColor: '#111', border: '1px solid #2d2d2d', borderRadius: 16, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🎮</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                Online Community
              </h3>
              <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.6 }}>
                Connect with thousands of fellow board gamers across our online communities.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="https://www.boardgamebarrister.com/events"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', backgroundColor: '#5865F220', border: '1px solid #5865F240', borderRadius: 8, textDecoration: 'none', color: 'white', fontWeight: 600, fontSize: 15, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5865F230'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#5865F220'; }}
              >
                <span style={{ fontSize: 22 }}>💬</span> Join the Discord Server
              </a>
              <a
                href="https://www.youtube.com/@BoardGameBarrister"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', backgroundColor: '#FF000020', border: '1px solid #FF000040', borderRadius: 8, textDecoration: 'none', color: 'white', fontWeight: 600, fontSize: 15, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FF000030'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FF000020'; }}
              >
                <span style={{ fontSize: 22 }}>▶️</span> Watch on YouTube
              </a>
              <div style={{ padding: '14px 18px', backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: 8 }}>
                <div style={{ color: '#FFB800', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>🎥 Weekly on YouTube:</div>
                <div style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.5 }}>
                  • Tuesday Game Playthroughs<br />
                  • "Discover a Game in 2 Minutes"<br />
                  • Play-Along Tutorials
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
