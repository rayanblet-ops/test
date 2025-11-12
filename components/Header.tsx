
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { id: 'philosophy', label: 'Философия' },
    { id: 'projects', label: 'Проекты' },
    { id: 'blog', label: 'Блог' },
    { id: 'contact', label: 'Контакты' },
  ];
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // If mobile menu is open, close it and immediately re-enable scrolling.
    // This is crucial because scrollIntoView doesn't work if body overflow is hidden.
    if (isMenuOpen) {
      document.body.style.overflow = 'unset';
      setIsMenuOpen(false);
    }

    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-black/50 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="transition-opacity hover:opacity-80" onClick={(e) => handleLinkClick(e, 'hero')}>
            <Logo />
          </a>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="text-lg text-neutral-200 hover:text-accent transition-colors duration-300 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-50 focus:outline-none z-50 relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-base-900/95 backdrop-blur-lg transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-3xl font-bold text-neutral-200 hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;