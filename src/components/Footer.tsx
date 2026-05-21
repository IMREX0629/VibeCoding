import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[var(--du-green)] border-t border-emerald-950 text-white/80 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-semibold uppercase tracking-widest leading-normal shrink-0">
      <div className="text-center sm:text-left mb-2 sm:mb-0">
        📢 Developed for Daegu University (대구대학교) Students
      </div>
      
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center text-[9px] opacity-90">
        <span>Iteration 01-Skeleton</span>
        <span className="hidden sm:inline-block">|</span>
        <span className="text-[var(--du-gold)]">University Managed Variable Style</span>
        <span className="hidden sm:inline-block">|</span>
        <span>2026.05.21</span>
      </div>
    </footer>
  );
}
