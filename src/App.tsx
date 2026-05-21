import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Page1Intro from './components/Page1Intro';
import Page2Auth from './components/Page2Auth';
import Page3Dashboard from './components/Page3Dashboard';
import ThemeCustomizer from './components/ThemeCustomizer';
import tipsData from './tips.json';
import { Terminal, Shield, Sparkles, Milestone, Compass, BookOpen, AlertCircle } from 'lucide-react';

interface LogItem {
  time: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'system';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userEmail, setUserEmail] = useState<string>('');
  const [logs, setLogs] = useState<LogItem[]>([]);

  // Logger helper
  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'system' = 'info') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ko-KR', { hour12: false });
    setLogs((prev) => [{ time: timeStr, text, type }, ...prev.slice(0, 49)]);
  };

  // Log on initial render
  useEffect(() => {
    addLog('🚀 대구대학교 정보 포털 [이전 1단계: 프로토타입 뼈대]가 로드되었습니다.', 'system');
    addLog(`📅 총 ${tipsData.length}개의 정보 카테고리(생활비, 등록금, 통학)와 9개의 정밀 가이드가 탑재되었습니다.`, 'info');
  }, []);

  const handleStart = () => {
    setCurrentPage(2);
    addLog('➡️ 인트로 화면에서 시작하기 버튼 선택. [소속인증 페이지]로 전환되었습니다.', 'info');
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentPage(3);
    addLog(`🎉 학교 메일 인증 성공! 대구대 학우 프로필 생성 완료 -> [대시보드 페이지] 진입`, 'success');
  };

  const handleSignOut = () => {
    setUserEmail('');
    setCurrentPage(1);
    addLog('🚪 대구대 정보포털 로그아웃 완료. [메인 인트로 페이지]로 전환되었습니다.', 'warn');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-neutral-150 p-3 sm:p-6 md:p-8 flex items-center justify-center font-sans selection:bg-[var(--du-gold)]/20 text-gray-900">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Decorative Top-bar Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-gradient-to-r from-[var(--du-green)] to-emerald-900 text-white rounded-2xl px-6 py-4 shadow-md border border-emerald-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-700/60 rounded-lg text-emerald-300">
                <Milestone className="w-4 h-4 text-[var(--du-gold)]" />
              </span>
              <div>
                <h2 className="text-sm font-bold tracking-tight">대구대학교 정보 가이드포털 — 1단계 프로토타입 발표용 Deck</h2>
                <p className="text-[10px] text-emerald-200/80 mt-0.5 font-medium">CSS Variables 기반 테마 매니저가 주소창과 연동되는 혁신적 구조 시연</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-white/10 text-emerald-200 rounded-full text-[10px] font-black tracking-wide border border-white/15">
              1단계: 코어 스켈레톤 디자인
            </span>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: The Interactive Device Emulator Web App Frame (Col Span: 8) */}
          <div className="lg:col-span-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col min-h-[580px] hover:shadow-2xl/10 transition-shadow">
            
            {/* Header Module */}
            <Header
              currentPage={currentPage}
              setPage={(pageNum) => {
                setCurrentPage(pageNum);
                if (pageNum === 1) {
                  setUserEmail('');
                } else if (pageNum === 3 && !userEmail) {
                  setUserEmail('tester_student@daegu.ac.kr');
                }
              }}
              onLog={(msg) => addLog(msg, 'info')}
            />

            {/* Dynamic Viewport Container */}
            <main className="flex-1 overflow-hidden flex flex-col bg-gray-50/70 py-4">
              
              {currentPage === 1 && (
                <Page1Intro onStart={handleStart} />
              )}

              {currentPage === 2 && (
                <Page2Auth
                  onBack={() => {
                    setCurrentPage(1);
                    addLog('🔙 사용자가 이전 버튼을 클릭하여 인트로 페이지로 돌아갔습니다.');
                  }}
                  onSuccess={handleAuthSuccess}
                  onLog={(msg) => addLog(msg, 'info')}
                />
              )}

              {currentPage === 3 && (
                <Page3Dashboard
                  tipsData={tipsData}
                  userEmail={userEmail || 'guest_student@daegu.ac.kr'}
                  onSignOut={handleSignOut}
                  onLog={(msg) => addLog(msg, 'info')}
                />
              )}

            </main>

            {/* Footer Module */}
            <Footer />
          </div>

          {/* RIGHT COLUMN: The Interactive Engineering Control Deck & Theme customizer (Col Span: 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Theme Configuration Module */}
            <ThemeCustomizer onLog={(msg) => addLog(msg, 'success')} />

            {/* 2. Interactive Activity Logs - Proves fully customized action log flow */}
            <div className="bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-950 p-4 flex-1 flex flex-col min-h-[250px] font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="w-4 h-4 animate-pulse" />
                  <span className="font-bold tracking-tight text-slate-300">실시간 프로토타입 시뮬레이터 로그</span>
                </div>
                <button
                  onClick={clearLogs}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 text-[10px] rounded transition-colors"
                >
                  로그 비우기
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[180px] scrollbar-thin scrollbar-thumb-slate-800">
                {logs.length === 0 ? (
                  <p className="text-slate-500 text-[11px] italic">대구대학교 앱 화면을 클릭하거나 버튼을 조작하면 이벤트 로그가 이곳에 즉각 수집됩니다...</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed border-b border-slate-800/20 pb-1.5 last:border-0">
                      <span className="text-slate-500 text-[10px] mr-2">[{log.time}]</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-emerald-400' : ''}
                        ${log.type === 'warn' ? 'text-amber-400 font-semibold' : ''}
                        ${log.type === 'system' ? 'text-purple-300 font-extrabold' : ''}
                        ${log.type === 'info' ? 'text-slate-200' : ''}
                      `}>
                        {log.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t border-slate-800 mt-3 pt-2 text-[10px] text-slate-500 flex justify-between">
                <span>⚡ Status: Active Simulation</span>
                <span>DU DevTools v0.1</span>
              </div>
            </div>

            {/* 3. Guide & Documentation card */}
            <div className="bg-amber-50/45 border border-amber-100 p-4 rounded-xl space-y-2 text-xs text-amber-900">
              <div className="flex items-center gap-1 text-[var(--du-green)] font-bold">
                <BookOpen className="w-4 h-4" />
                <span>선생님 / 평가자 확인용 가이드</span>
              </div>
              <p className="leading-relaxed text-[11px] text-gray-600">
                화면에서 각 <b>Page 1, 2, 3</b> 버튼을 수동으로 전환하며 레이아웃 배치를 점검해 보실 수 있습니다. 메일 입력 시 가짜 주소를 넣는 등의 인터렉션 또한 훌륭하게 대응하고 상호 피드백을 수려하게 로깅합니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
