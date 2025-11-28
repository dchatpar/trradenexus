
import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { XMarkIcon, ShieldCheckIcon } from '../Icons';

const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-slide-in ${
            n.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-100' :
            n.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-100' :
            n.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100' :
            'bg-blue-500/20 border-blue-500/50 text-blue-100'
          }`}
        >
          {n.type === 'success' && <ShieldCheckIcon className="h-5 w-5 text-green-400" />}
          <p className="text-sm font-medium">{n.message}</p>
          <button onClick={() => removeNotification(n.id)} className="ml-2 hover:opacity-75">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
