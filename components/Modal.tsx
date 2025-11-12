import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`bg-base-800 rounded-2xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative border border-neutral-700
                    transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-50 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;