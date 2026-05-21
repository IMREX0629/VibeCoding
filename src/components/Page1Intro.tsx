import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface Page1IntroProps {
  onStart: () => void;
}

export default function Page1Intro({ onStart }: Page1IntroProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 text-center animate-fade-in">
      <div className="relative mb-8 group">
        {/* Glowing aura using CSS variables */}
        <div className="absolute inset-0 bg-[var(--du-green)] rounded-full blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        
        {/* Custom High-Fidelity Daegu University Crest Concept */}
        <div className="relative w-40 h-40 border-4 border-[var(--du-green)] rounded-full flex flex-col items-center justify-center bg-white shadow-xl p-4 transition-transform group-hover:scale-105 duration-300">
          <div className="w-full h-full border border-dashed border-[var(--du-gold)] rounded-full flex flex-col items-center justify-center p-2">
            {/* Elegant Vector Tree & Book Seal */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[var(--du-green)] mb-1 fill-current">
              {/* Tree crown - symbol of Daegu Univ */}
              <path d="M50 15 C35 15, 25 28, 25 42 C25 48, 28 54, 33 58 L33 68 L67 68 L67 58 C72 54, 75 48, 75 42 C75 28, 65 15, 50 15 Z" className="opacity-90" />
              {/* Trunk */}
              <rect x="46" y="65" width="8" height="15" rx="1" />
              {/* Open book / light lines */}
              <path d="M20 85 Q50 78 80 85" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle cx="50" cy="42" r="6" className="text-[var(--du-gold)] fill-current" />
            </svg>
            <span className="text-xs font-black tracking-widest text-[var(--du-green)]">DAEGU</span>
            <span className="text-[9px] font-bold text-[var(--du-gold)] tracking-wide">UNIVERSITY</span>
          </div>
        </div>

        {/* Floating badge for 1956 founding year */}
        <div className="absolute -bottom-2 -right-2 bg-[var(--du-gold)] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>개교 1956</span>
        </div>
      </div>

      <div className="max-w-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-800 mb-2">
          대구대학교 <span className="text-[var(--du-green)]">학생 꿀팁 포털</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-6 leading-relaxed">
          대구대학교 새내기 및 재학생들을 위한 검증된 대학교 생활 가이드!<br />
          <b>사랑 · 빛 · 자유</b>의 건학 정신과 함께하는 슬기로운 DU 생활비 & 대중교통 꿀팁 모음집.
        </p>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100/80 mb-8 text-left text-xs text-emerald-800 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-[var(--du-green)] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>대구대생 전용 안심 서비스</span>
          </div>
          <p className="leading-relaxed">
            학생 식당 가성비 메뉴, 장학금 신청 일정, 등하교 순환 버스 상시 노선 등 꼭 필요한 정보만 선별하여 제공합니다.
          </p>
        </div>

        <button
          onClick={onStart}
          className="group w-full py-4 bg-[var(--du-green)] text-white font-bold rounded-xl shadow-lg shadow-emerald-950/15 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>안전하게 시작하기</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-[10px] text-gray-400 mt-4">
          본 포털은 안전을 위해 <b>@daegu.ac.kr</b> 학교 웹메일 계정 인증이 적용됩니다.
        </p>
      </div>
    </div>
  );
}
