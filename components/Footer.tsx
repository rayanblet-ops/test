
import React from 'react';

const socialLinks = [
  { name: 'GitHub', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Twitter', url: '#' },
];

interface FooterProps {
    isHighContrast: boolean;
    onToggleContrast: () => void;
}

const Footer: React.FC<FooterProps> = ({ isHighContrast, onToggleContrast }) => {
  return (
    <footer className="bg-base-800 border-t border-neutral-50/10 py-8">
      <div className="container mx-auto px-6 text-center text-neutral-500">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
            <p>&copy; {new Date().getFullYear()} Vibecoding. Создано в потоке.</p>
            <div className="flex items-center gap-2">
                <label htmlFor="contrast-toggle" className="text-sm cursor-pointer">Высокий контраст</label>
                <button
                    id="contrast-toggle"
                    role="switch"
                    aria-checked={isHighContrast}
                    onClick={onToggleContrast}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-800 focus:ring-accent ${
                        isHighContrast ? 'bg-accent high-contrast-accent' : 'bg-base-700'
                    }`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        isHighContrast ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
            </div>
        </div>
        <div className="flex justify-center space-x-6">
          {socialLinks.map(link => (
            <div key={link.name} className="relative group">
              <a href={link.url} className="hover:text-accent transition-colors high-contrast-accent-text">
                {link.name}
              </a>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 
                               bg-base-700 text-neutral-50 text-xs font-semibold 
                               px-3 py-1.5 rounded-md shadow-lg
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                               pointer-events-none whitespace-nowrap hidden-in-contrast">
                {link.name}
                <svg className="absolute text-base-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
