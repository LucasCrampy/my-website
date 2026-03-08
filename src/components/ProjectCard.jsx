import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group relative z-0 hover:z-10 cursor-pointer border-4 border-black dark:border-slate-600 bg-white dark:bg-slate-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:-rotate-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 ${className}`}
    >
      {children}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-500 group-hover:delay-1000 group-hover:opacity-100 text-slate-400 dark:text-slate-500 hidden sm:block" aria-hidden="true">
        <ArrowUpRight size={28} strokeWidth={2} />
      </div>
    </button>
  );
}
