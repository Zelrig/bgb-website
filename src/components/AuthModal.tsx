import { useState, useEffect } from 'react';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitch: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ mode, onClose, onSwitch }: AuthModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function validate() {
    const errs: Record<string, string> = {};
    if (mode === 'signup' && !name.trim()) errs.name = 'Name is required.';
    if (!email.includes('@')) errs.email = 'Enter a valid email.';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (mode === 'signup' && password !== confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    // In production: POST to your auth API here
    setSuccess(true);
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '11px 14px',
    backgroundColor: '#1a1a1a',
    border: `1px solid ${errors[field] ? '#f87171' : '#3d3d3d'}`,
    borderRadius: 8,
    color: 'white',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
  });

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#111', border: '2px solid #C41E3A', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 440, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#6b7280', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
        >
          ✕
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="logo.jpg" alt="Board Game Barrister" style={{ height: 52, width: 'auto' }} />
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{ color: '#FFB800', fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
              {mode === 'signup' ? 'Welcome to the Barrister!' : 'Welcome back!'}
            </h3>
            <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              {mode === 'signup'
                ? `Thanks for joining, ${name}! Check your email to verify your account.`
                : 'You\'re signed in. Ready to play?'}
            </p>
            <button
              onClick={onClose}
              style={{ padding: '12px 32px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
            >
              Let's Go! 🎲
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 6 }}>
              {mode === 'signup' ? 'Create Your Account' : 'Sign In'}
            </h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 14, marginBottom: 28 }}>
              {mode === 'signup' ? 'Join the Milwaukee board game community.' : 'Welcome back, Barrister member.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mode === 'signup' && (
                <div>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle('name')} />
                  {errors.name && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
                </div>
              )}

              <div>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle('email')} />
                {errors.email && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle('password')} />
                {errors.password && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.password}</div>}
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Confirm Password</label>
                    <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" style={inputStyle('confirm')} />
                    {errors.confirm && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.confirm}</div>}
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#9ca3af', fontSize: 14 }}>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={e => setNewsletter(e.target.checked)}
                      style={{ accentColor: '#C41E3A', width: 16, height: 16 }}
                    />
                    Subscribe to Barrister E-News for deals and event updates
                  </label>
                </>
              )}

              <button
                type="submit"
                style={{ padding: '13px 24px', backgroundColor: '#C41E3A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 4 }}
              >
                {mode === 'signup' ? 'Create Account' : 'Sign In'} →
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, color: '#6b7280', fontSize: 14 }}>
              {mode === 'signup' ? (
                <>Already have an account?{' '}
                  <button onClick={() => onSwitch('signin')} style={{ background: 'none', border: 'none', color: '#FFB800', cursor: 'pointer', fontWeight: 600, fontSize: 14, padding: 0 }}>Sign In</button>
                </>
              ) : (
                <>New to the Barrister?{' '}
                  <button onClick={() => onSwitch('signup')} style={{ background: 'none', border: 'none', color: '#FFB800', cursor: 'pointer', fontWeight: 600, fontSize: 14, padding: 0 }}>Create a free account</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
