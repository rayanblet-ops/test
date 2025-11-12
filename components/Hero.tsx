
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden p-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-base-800 via-base-900 to-black"></div>
        <div 
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ 
            animationDelay: '0s',
            transform: `translateY(${offsetY * 0.2}px)`
          }}
        ></div>
        <div 
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ 
            animationDelay: '2s',
            transform: `translateY(${offsetY * 0.3}px)`
          }}
        ></div>
      </div>
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-neutral-50 mb-4 leading-tight">
          <span className="animated-gradient-text">Код как Искусство.</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto">
          Мы не просто пишем код. Мы создаем цифровые полотна, где каждая строка — мазок кисти, а каждая функция — эмоция.
        </p>
      </div>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animated-gradient-text {
          background: linear-gradient(90deg, #ff8c42, #ffffff, #42aaff, #ff8c42);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation 6s ease-in-out infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;