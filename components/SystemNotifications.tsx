
import React, { useState, useEffect } from 'react';

const SystemNotifications: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000); // Show offline longer
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-lg text-neutral-50 transition-all duration-300
                  ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}
                  ${isOnline ? 'bg-green-600/90' : 'bg-red-600/90'}`}
    >
      {isOnline ? 'Соединение восстановлено!' : 'Вы оффлайн. Функциональность может быть ограничена.'}
    </div>
  );
};

export default SystemNotifications;
