import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Download, X } from 'lucide-react';

export default function ReflectionWidget({
  label = 'Reflection',
  pdfPath = 'reflection.pdf',
  onOpenChange
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(/** @type {HTMLButtonElement | null} */ (null));
  const closeRef = useRef(/** @type {HTMLButtonElement | null} */ (null));
  const lastFocusRef = useRef(/** @type {HTMLElement | null} */ (null));

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    lastFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const t = setTimeout(() => closeRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        setTimeout(() => (lastFocusRef.current ?? triggerRef.current)?.focus?.(), 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    return () => onOpenChange?.(false);
  }, [onOpenChange]);

  const href = `/${pdfPath}`;

  const close = () => {
    setOpen(false);
    setTimeout(() => (lastFocusRef.current ?? triggerRef.current)?.focus?.(), 0);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          lastFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          setOpen(true);
        }}
        className="group flex items-center gap-2 bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 text-slate-900 dark:text-slate-200 px-4 py-2 font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="text-xs sm:text-sm">{label}</span>
        <ArrowUpRight
          size={18}
          strokeWidth={3}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-6 bg-black/60 dark:bg-slate-900/80 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <div
            className="w-full max-w-5xl max-h-[calc(100vh-3rem)] sm:max-h-[95vh] my-4 sm:my-0 flex flex-col border-4 border-black dark:border-slate-600 bg-[#fffdf5] dark:bg-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)] relative animate-pop-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-yellow-400 dark:bg-slate-800 border-b-4 border-black dark:border-slate-600 p-4 md:p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter [font-family:var(--font-blocky)]">
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={href}
                  download
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-700 border-4 border-black dark:border-slate-600 px-4 py-2 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
                >
                  <Download size={18} strokeWidth={3} /> Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 p-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:ring-4 hover:ring-black dark:hover:ring-white focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
                  aria-label={`Close ${label}`}
                >
                  <X size={24} strokeWidth={4} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar space-y-4">
              <a
                href={href}
                download
                className="sm:hidden inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 px-6 py-3 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white w-fit"
              >
                <Download size={18} strokeWidth={3} /> Download PDF
              </a>

              <div className="w-full h-[58vh] sm:h-[65vh] overflow-hidden border-4 border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900">
                <iframe src={href} className="w-full h-full" title={`PDF Viewer for ${label}`}>
                  <p className="p-4 text-slate-900 dark:text-slate-200">Browser does not support PDFs.</p>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}

