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
    setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== id)); }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const iconMap = {
    success: <CheckCircle size={18} className="text-[#10B981] flex-shrink-0" />,
    error: <AlertCircle size={18} className="text-[#F43F5E] flex-shrink-0" />,
    info: <Info size={18} className="text-[#6366F1] flex-shrink-0" />,
  };

  const bgMap = {
    success: 'bg-white border-[#E2E8F0]',
    error: 'bg-white border-[#E2E8F0]',
    info: 'bg-white border-[#E2E8F0]',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id}
            className={`pointer-events-auto toast-enter flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-lg max-w-sm ${bgMap[toast.type]}`}>
            {iconMap[toast.type]}
            <span className="text-sm font-medium text-[#0F172A] flex-1">{toast.message}</span>
            {toast.action && (
              <button onClick={() => { toast.action!.onClick(); dismiss(toast.id); }}
                className="text-sm font-bold text-[#6366F1] hover:underline whitespace-nowrap">{toast.action.label}</button>
            )}
            <button onClick={() => dismiss(toast.id)} className="text-[#CBD5E1] hover:text-[#0F172A] transition-colors flex-shrink-0">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
