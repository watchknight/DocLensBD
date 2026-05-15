import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type'], action?: Toast['action']) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

let toastIdCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success', action?: Toast['action']) => {
    const id = ++toastIdCounter;
    setToasts(prev => [...prev, { id, message, type, action }]);

    // Auto-dismiss after 3.5s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const iconMap = {
    success: <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle size={20} className="text-[#FF6B8A] flex-shrink-0" />,
    info: <Info size={20} className="text-[#00C9D6] flex-shrink-0" />,
  };

  const bgMap = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-[#FFE0E8] border-[#FF6B8A]/20',
    info: 'bg-[#e6fafb] border-[#00C9D6]/20',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto toast-enter flex items-center gap-3 px-5 py-4 rounded-xl border shadow-lg max-w-sm ${bgMap[toast.type]}`}
          >
            {iconMap[toast.type]}
            <span className="text-sm font-medium text-[#0A0A3E] flex-1">{toast.message}</span>
            {toast.action && (
              <button
                onClick={() => { toast.action!.onClick(); dismiss(toast.id); }}
                className="text-sm font-bold text-[#00C9D6] hover:underline whitespace-nowrap"
              >
                {toast.action.label}
              </button>
            )}
            <button onClick={() => dismiss(toast.id)} className="text-[#9CA0B8] hover:text-[#0A0A3E] transition-colors flex-shrink-0">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
