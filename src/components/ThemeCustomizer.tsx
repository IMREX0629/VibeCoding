import React, { useState, useEffect } from 'react';
import { Palette, RefreshCw, Sparkles, Check, Info } from 'lucide-react';

interface ThemeCustomizerProps {
  onLog: (message: string) => void;
}

export default function ThemeCustomizer({ onLog }: ThemeCustomizerProps) {
  const [green, setGreen] = useState('#00542E');
  const [gold, setGold] = useState('#C5A059');
  const [bg, setBg] = useState('#F3F4F6');

  // Apply CSS Variables to the document root dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--du-green', green);
    document.documentElement.style.setProperty('--du-gold', gold);
    document.documentElement.style.setProperty('--du-bg', bg);
  }, [green, gold, bg]);

  const resetTheme = () => {
    const defaultGreen = '#00542E';
    const defaultGold = '#C5A059';
    const defaultBg = '#F3F4F6';
    setGreen(defaultGreen);
    setGold(defaultGold);
    setBg(defaultBg);
    onLog('🎨 대구대학교 상징색 테마를 원래 상태로 초기화했습니다.');
  };

  const setPreset = (name: string, g: string, gd: string, b: string) => {
    setGreen(g);
    setGold(gd);
    setBg(b);
    onLog(`🎨 프리셋 [${name}]을 적용하였습니다. 실시간 테마 변경 완료!`);
  };

  return (
    <div id="theme-customizer" class="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 text-gray-900">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-green-50 rounded-lg text-emerald-700">
          <Palette className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-bold text-gray-800">실시간 테마 커스터마이저</h4>
      </div>

      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        이 프로토타입은 <b>CSS 변수(--du-green, --du-gold)</b>를 사용하여 설계되었습니다. 색상 선택기를 가동하면 전체 UI의 조판색이 실시간 변경됩니다.
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <label className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1">
            <span>🟢 메인 대학색 (초록)</span>
            <span className="font-mono text-[10px] text-gray-400 uppercase">{green}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={green}
              onChange={(e) => {
                setGreen(e.target.value);
                onLog(`🎨 메인 색상을 ${e.target.value}로 수정하였습니다.`);
              }}
              className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0 bg-transparent block"
            />
            <input
              type="text"
              value={green}
              onChange={(e) => {
                setGreen(e.target.value);
              }}
              className="flex-1 px-2.5 py-1 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--du-green)]"
            />
          </div>
        </div>

        <div>
          <label className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1">
            <span>🟡 서브 포인트색 (골드)</span>
            <span className="font-mono text-[10px] text-gray-400 uppercase">{gold}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={gold}
              onChange={(e) => {
                setGold(e.target.value);
                onLog(`🎨 서브 색상을 ${e.target.value}로 수정하였습니다.`);
              }}
              className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0 bg-transparent block"
            />
            <input
              type="text"
              value={gold}
              onChange={(e) => {
                setGold(e.target.value);
              }}
              className="flex-1 px-2.5 py-1 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--du-green)]"
            />
          </div>
        </div>

        <div>
          <label className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1">
            <span>⚪ 앱 배경색 (실크 그레이)</span>
            <span className="font-mono text-[10px] text-gray-400 uppercase">{bg}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={bg}
              onChange={(e) => {
                setBg(e.target.value);
                onLog(`🎨 배경 색상을 ${e.target.value}로 수정하였습니다.`);
              }}
              className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0 bg-transparent block"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => {
                setBg(e.target.value);
              }}
              className="flex-1 px-2.5 py-1 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--du-green)]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-gray-100 mb-4">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">상징색 프리셋 테마</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setPreset('대구대 (기본)', '#00542E', '#C5A059', '#F3F4F6')}
            className="px-2 py-1.5 text-left rounded-lg text-[10px] bg-gray-50 border border-gray-200/60 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-medium text-gray-700">DU 대구대 오리지널</span>
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded bg-[#00542E]"></span>
              <span className="w-2.5 h-2.5 rounded bg-[#C5A059]"></span>
            </div>
          </button>
          <button
            onClick={() => setPreset('포레스트 에디션', '#2C6146', '#D4AF37', '#EDF4F0')}
            className="px-2 py-1.5 text-left rounded-lg text-[10px] bg-gray-50 border border-gray-200/60 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-medium text-gray-700">차분한 고풍 숲색</span>
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded bg-[#2C6146]"></span>
              <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]"></span>
            </div>
          </button>
          <button
            onClick={() => setPreset('모던 마린 오션', '#0D3B66', '#F4D35E', '#F4F9FC')}
            className="px-2 py-1.5 text-left rounded-lg text-[10px] bg-gray-50 border border-gray-200/60 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-medium text-gray-700">시원한 바다 블루</span>
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded bg-[#0D3B66]"></span>
              <span className="w-2.5 h-2.5 rounded bg-[#F4D35E]"></span>
            </div>
          </button>
          <button
            onClick={() => setPreset('체리 블러썸', '#8A1C14', '#E0A899', '#FFF5F5')}
            className="px-2 py-1.5 text-left rounded-lg text-[10px] bg-gray-50 border border-gray-200/60 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <span className="font-medium text-gray-700">봄날 벚꽃 캠퍼스</span>
            <div className="flex gap-0.5">
              <span className="w-2.5 h-2.5 rounded bg-[#8A1C14]"></span>
              <span className="w-2.5 h-2.5 rounded bg-[#E0A899]"></span>
            </div>
          </button>
        </div>
      </div>

      <button
        onClick={resetTheme}
        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        원래 대구대 상징색으로 복구
      </button>

      <div className="mt-3 p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100 flex gap-2">
        <Info className="w-3.5 h-3.5 text-[var(--du-green)] shrink-0 mt-0.5" />
        <p className="text-[10px] text-emerald-800 leading-normal">
          <b>개발자 팁:</b> 이 도구는 실제 대구대 교정의 로고 및 UI 요소에 즉각 연계되어, 브랜드 이미지 제고와 디자인 시합 피드백 수렴에 매우 유용합니다.
        </p>
      </div>
    </div>
  );
}
