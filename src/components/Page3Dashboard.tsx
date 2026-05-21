import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, RefreshCw, UserCheck, LogOut, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';

interface TipItem {
  title: string;
  content: string;
}

interface CategoryTip {
  id: string;
  category: string;
  icon: string;
  tips: TipItem[];
}

interface Page3DashboardProps {
  tipsData: CategoryTip[];
  userEmail: string;
  onSignOut: () => void;
  onLog: (msg: string) => void;
}

export default function Page3Dashboard({ tipsData, userEmail, onSignOut, onLog }: Page3DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openAccordionIdx, setOpenAccordionIdx] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle category button selection
  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setOpenAccordionIdx(null); // Close accordion on category switch
    onLog(`📁 카테고리 [${categoryName}] 필터를 적용하였습니다.`);
  };

  // Toggle accordion drawers
  const toggleAccordion = (idKey: string) => {
    if (openAccordionIdx === idKey) {
      setOpenAccordionIdx(null);
      onLog(`🔼 아코디언 항목 [${idKey.split('-')[1]}] 단락을 접었습니다.`);
    } else {
      setOpenAccordionIdx(idKey);
      onLog(`🔽 아코디언 항목 [${idKey.split('-')[1]}] 단락을 부드럽게 펼쳤습니다.`);
    }
  };

  // Filter tips dynamically based on both Category filter AND search query
  const filteredTips = tipsData.map(cat => {
    // If category is set, keep matching only
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return { ...cat, tips: [] };
    }
    
    // Filter tips based on search queries
    const matchingTips = cat.tips.filter(tip => 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tip.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      ...cat,
      tips: matchingTips
    };
  }).filter(cat => cat.tips.length > 0);

  const totalTipsCount = filteredTips.reduce((sum, cat) => sum + cat.tips.length, 0);

  return (
    <div className="flex-1 p-4 sm:p-8 flex flex-col overflow-hidden max-w-5xl mx-auto w-full animate-fade-in text-gray-900">
      
      {/* Dynamic Header Badge & Student Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4 mb-5 shrink-0 bg-white/50 p-4 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[var(--du-green)]/10 rounded-full flex items-center justify-center text-[var(--du-green)]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">인증 완료 대구대 학우님</p>
            <p className="text-sm font-black text-gray-800">{userEmail}</p>
          </div>
        </div>

        <button
          onClick={() => {
            onLog('🚪 학생 정보 조회를 안전하게 로그아웃하고 이전 단계로 복귀했습니다.');
            onSignOut();
          }}
          className="px-3.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>안전 로그아웃</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-5 shrink-0">
        <span className="absolute left-3.5 top-3.5 text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="가성비, 셔틀버스, 장학금 정보 검색하기..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onLog(`🔍 키워드 [${e.target.value}] 검색을 진행 중입니다.`);
          }}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-[var(--du-green)] focus:ring-1 focus:ring-[var(--du-green)] rounded-xl text-sm transition-all focus:outline-none"
        />
      </div>

      {/* Categories Horizontal Grid - Automated .map Loop for simple scaling */}
      <div className="mb-5 shrink-0">
        <span className="block text-[11px] font-extrabold text-gray-450 uppercase mb-2.5 tracking-wider">
          카테고리 필터링 (자동화 Map 루프 탑재)
        </span>
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={() => handleCategorySelect('all', '전체보기')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 border ${
              selectedCategory === 'all'
                ? 'bg-[var(--du-green)] text-white border-[var(--du-green)] shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">🌟</span>
            <span className="truncate w-full text-center">전체 팁</span>
          </button>

          {tipsData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id, cat.category)}
              className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 border ${
                selectedCategory === cat.id
                  ? 'bg-[var(--du-green)] text-white border-[var(--du-green)] shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="truncate w-full text-center">{cat.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tip Accordion Output Deck */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {totalTipsCount === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200/80 p-8">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-600">검색 조건에 맞는 정보 팁이 존재하지 않습니다.</p>
            <p className="text-xs text-gray-400 mt-1">다른 검색 키워드를 입력하거나 카테고리를 변경해보세요.</p>
          </div>
        ) : (
          filteredTips.map((categoryGroup) => (
            <div key={categoryGroup.id} className="space-y-2">
              <div className="flex items-center gap-1.5 px-1 py-1 shrink-0">
                <span className="text-lg">{categoryGroup.icon}</span>
                <span className="text-xs font-black text-[var(--du-green)] uppercase tracking-wider">
                  {categoryGroup.category} 가이드북
                </span>
                <span className="text-[10px] text-gray-400">({categoryGroup.tips.length}건)</span>
              </div>

              <div className="space-y-2.5">
                {categoryGroup.tips.map((tip, index) => {
                  const itemKey = `${categoryGroup.id}-${index}`;
                  const isOpen = openAccordionIdx === itemKey;

                  return (
                    <div
                      key={itemKey}
                      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-[var(--du-green)] ring-1 ring-[var(--du-green)]/10 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => toggleAccordion(itemKey)}
                        className="w-full px-5 py-4 flex justify-between items-center text-left gap-4 font-semibold text-gray-800 hover:bg-gray-50/50 cursor-pointer text-sm"
                      >
                        <span className="font-bold text-gray-800 leading-snug">{tip.title}</span>
                        <span className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180 text-[var(--du-green)]' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>

                      {/* Accordion Animation Drawer */}
                      <div
                        className={`transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
                          isOpen ? 'max-h-56 border-t border-gray-100 bg-gray-50/60' : 'max-h-0'
                        } overflow-hidden`}
                      >
                        <div className="p-5 text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                          {tip.content}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-gray-200">
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5" />
                              정보 출처: 비공식 DU 선배 경험담
                            </span>
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onLog(`👍 [${tip.title}] 정보 피드백에 공감 버튼을 눌렀습니다.`);
                                }}
                                className="px-2.5 py-1 text-[10px] font-bold bg-white text-gray-500 rounded border border-gray-200 hover:text-[var(--du-green)] hover:border-[var(--du-green)] hover:bg-emerald-50/30 transition-all flex items-center gap-1"
                              >
                                <span>👍 도움됨</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-amber-50 rounded-xl border border-amber-100 p-3.5 shrink-0 mt-4">
        <p className="text-[11px] text-amber-800 leading-normal flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
          <span>
            <b>안내 사항:</b> 2단계에서는 본 <b>tips.json</b> 파일 형식을 직접 브라우저 에뮬레이터에서 신규 등록/수정하는 편집기 편의 기능이 추가될 예정입니다.
          </span>
        </p>
      </div>

    </div>
  );
}
