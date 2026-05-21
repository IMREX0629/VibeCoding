import React from 'react';
import { Sparkles, Compass, Milestone } from 'lucide-react';

interface HeaderProps {
  currentPage: number;
  setPage: (page: number) => void;
  onLog: (msg: string) => void;
}

export default function Header({ currentPage, setPage, onLog }: HeaderProps) {
  const handleNav = (num: number, label: string) => {
    setPage(num);
    onLog(`🧭 상단 헤더 메뉴를 통해 [${label}] 페이지로 수동 이동하였습니다.`);
  };

  return (
    <header className="bg-white border-b border-gray-200/80 px-4 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm relative z-10 shrink-0">
      <div className="flex items-center gap-4">
        {/* Dynamic DU Logo block */}
        <div 
          onClick={() => handleNav(1, '메인 인트로')}
          className="w-12 h-12 bg-[var(--du-green)] hover:scale-105 active:scale-95 text-white font-bold text-xl rounded-md flex items-center justify-center cursor-pointer shadow-md shadow-emerald-900/10 transition-all border border-emerald-800"
        >
          DU
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--du-green)]">대구대학교 정보 포털</h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-bold">비공식 가이드</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
            <Milestone className="w-3 h-3 text-[var(--du-gold)]" />
            <span>Iteration 1: Core Skeleton & Layout Draft</span>
          </p>
        </div>
      </div>

      {/* Navigation Controls to easily jump between steps per iteration requirements */}
      <div className="flex items-center gap-3">
        <nav className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
          <button
            onClick={() => handleNav(1, '메인 인트로')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              currentPage === 1
                ? 'bg-white text-[var(--du-green)] shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Page 1: 메인
          </button>
          <button
            onClick={() => handleNav(2, '소속 인증')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              currentPage === 2
                ? 'bg-white text-[var(--du-green)] shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Page 2: 인증
          </button>
          <button
            onClick={() => handleNav(3, '팁 대시보드')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              currentPage === 3
                ? 'bg-white text-[var(--du-green)] shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Page 3: 대시보드
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="px-2.5 py-1 bg-emerald-100 text-[var(--du-green)] rounded-full text-[10px] font-bold uppercase tracking-wider">
            Prototype v0.1
          </div>
          <div className="text-right">
            <p className="text-[9px] font-medium text-gray-400 italic">Managed by CSS</p>
            <div className="flex gap-1 mt-1 justify-end">
              <div className="w-3.5 h-3.5 rounded-sm bg-[var(--du-green)] border border-white/20 shadow-sm" title="대학 메인 칼라 (초록)"></div>
              <div className="w-3.5 h-3.5 rounded-sm bg-[var(--du-gold)] border border-white/20 shadow-sm" title="대학 서브 칼라 (골드)"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
