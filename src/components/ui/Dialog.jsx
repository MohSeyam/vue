import React, { useEffect, useRef } from "react";

export function Dialog({ open, onOpenChange, children }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onOpenChange?.(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => onOpenChange?.(false)}>
      <div
        className="relative w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xl focus:outline-none"
          onClick={() => onOpenChange?.(false)}
          aria-label="إغلاق"
        >
          <i className="i-lucide-x" />
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div>{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold mb-3 text-slate-800 dark:text-slate-100">{children}</h2>;
}
