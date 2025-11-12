
import React from 'react';
import Logo from './Logo';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-900 text-center p-6">
        <div className="mb-8">
            <Logo />
        </div>
        <h1 className="text-6xl md:text-9xl font-extrabold text-accent high-contrast-accent-text">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mt-4 mb-6">Страница не найдена</h2>
        <p className="text-lg text-neutral-400 max-w-md mb-8">
            Кажется, вы свернули не туда в цифровом потоке. Но не волнуйтесь, путь домой близко.
        </p>
        <a 
            href="/"
            className="bg-accent text-base-900 font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 high-contrast-accent"
        >
            Вернуться на главную
        </a>
    </div>
  );
};

export default NotFound;
