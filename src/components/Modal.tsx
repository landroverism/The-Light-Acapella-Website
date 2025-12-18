import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="modal-close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
