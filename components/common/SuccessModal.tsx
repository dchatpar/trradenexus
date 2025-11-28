
import React from 'react';
import { CheckBadgeIcon } from '../Icons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  actionText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title = "Congratulations", message, actionText = "Ok" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckBadgeIcon className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">{title}</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
