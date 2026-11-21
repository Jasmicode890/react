import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="toast-container" id="toast-notification">
      <div className={`toast ${toast.type || 'info'}`}>
        {toast.type === 'success' ? (
          <CheckCircle2 size={19} color="#059669" />
        ) : (
          <Info size={19} color="#0284c7" />
        )}
        <div style={{ flex: 1, fontSize: '0.9rem', color: '#1e293b' }}>{toast.message}</div>
        <button
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
