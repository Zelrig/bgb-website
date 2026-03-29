import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Games from './components/Games';
import Events from './components/Events';
import Locations from './components/Locations';
import Community from './components/Community';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Shop from './pages/Shop';

function HomePage({ onOpenAuth }: { onOpenAuth: (mode: 'signin' | 'signup') => void }) {
  return (
    <>
      <Navbar onOpenAuth={onOpenAuth} />
      <main>
        <Hero onOpenAuth={onOpenAuth} />
        <Features />
        <Games />
        <Events />
        <Locations />
        <Community onOpenAuth={onOpenAuth} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  return (
    <AuthProvider>
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage onOpenAuth={setAuthMode} />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
        />
      )}
    </CartProvider>
    </AuthProvider>
  );
}
