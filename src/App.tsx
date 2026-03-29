import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Games from './components/Games';
import Events from './components/Events';
import Locations from './components/Locations';
import Community from './components/Community';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  return (
    <>
      <Navbar onOpenAuth={setAuthMode} />
      <main>
        <Hero onOpenAuth={setAuthMode} />
        <Features />
        <Games />
        <Events />
        <Locations />
        <Community onOpenAuth={setAuthMode} />
      </main>
      <Footer />
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
        />
      )}
    </>
  );
}
