
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SystemNotifications from './components/SystemNotifications';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Check for saved contrast preference
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      setIsHighContrast(true);
      document.documentElement.setAttribute('data-contrast', 'high');
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);
  
  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newState = !prev;
      if (newState) {
        document.documentElement.setAttribute('data-contrast', 'high');
        localStorage.setItem('highContrast', 'true');
      } else {
        document.documentElement.removeAttribute('data-contrast');
        localStorage.setItem('highContrast', 'false');
      }
      return newState;
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <div className="bg-base-900 text-neutral-200 font-sans antialiased overflow-x-hidden animate-fade-in">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer isHighContrast={isHighContrast} onToggleContrast={toggleHighContrast} />
      <SystemNotifications />
    </div>
  );
};

export default App;
