import React, { useState } from 'react';
import { Mail, ShieldAlert, ArrowLeft, Send, CheckCircle2, Lock, Loader2, Sparkles } from 'lucide-react';

interface Page2AuthProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
  onLog: (msg: string) => void;
}

export default function Page2Auth({ onBack, onSuccess, onLog }: Page2AuthProps) {
  const [emailId, setEmailId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [sentEmailAddress, setSentEmailAddress] = useState('');

  // Auto OTP set for easy evaluation
  const demoOtp = '195656'; // Custom commemorative OTP (incorporating Daegu Univ founding year 1956)

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Scrub email input
    let cleanId = emailId.trim();
    if (!cleanId) {
      setError('❌ 이메일 아이디를 입력해주세요.');
      onLog('⚠️ 이메일 발송 실패: 입력란이 비어있음.');
      return;
    }

    // Smart parsing: if they typed their whole email with a wrong domain, warn them
    if (cleanId.includes('@')) {
      const parts = cleanId.split('@');
      const enteredDomain = parts[1].toLowerCase();
      cleanId = parts[0];

      if (enteredDomain !== 'daegu.ac.kr') {
        setError('❌ 대구대학교 학생 이메일(@daegu.ac.kr)만 인증하실 수 있습니다.');
        onLog(`⚠️ 도메인 불일치 거부됨: @${enteredDomain}`);
        return;
      }
    }

    setIsSending(true);
    onLog(`✉️ 대구대 메일 [${cleanId}@daegu.ac.kr] 주소로 모의 코드 연동 시도 중...`);

    // Simulated short delay
    setTimeout(() => {
      setIsSending(false);
      setHasSent(true);
      setSentEmailAddress(`${cleanId}@daegu.ac.kr`);
      onLog(`👉 [${cleanId}@daegu.ac.kr] 주소로 6자리 인증번호 [${demoOtp}]를 전송 완료하였습니다.`);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      setError('❌ 6자리 인증번호를 입력해주세요.');
      return;
    }

    onLog(`🔐 인증번호 [${cleanOtp}] 검증 진행 중...`);

    if (cleanOtp === demoOtp || cleanOtp === '123456') {
      onLog(`✅ 이메일 소속 인증 완벽 통과! 대시보드로 이동합니다.`);
      onSuccess(sentEmailAddress || `${emailId}@daegu.ac.kr`);
    } else {
      setError('❌ 인증번호가 올바르지 않습니다. (테스트용 간편 코드: 195656 또는 123456)');
      onLog('❌ 인증실패: 올바르지 않은 OTP 번호 입력됨.');
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center max-w-md mx-auto w-full animate-fade-in text-gray-900">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--du-green)] font-bold mb-6 transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>이전 단계로</span>
      </button>

      <div className="mb-6">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--du-gold)] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full inline-block mb-2">
          소속 학적 증명
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          대구대학교 웹메일 인증
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          안전하고 올바른 정보 교류를 위해 웹메일 소속 체크가 적용됩니다.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 text-red-800 border border-red-100 rounded-xl text-xs flex gap-2 items-start shrink-0">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {/* STEP A: Request Email Code */}
      {!hasSent ? (
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              종합정보시스템 아이디 또는 대구대 웹메일 ID
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="아이디 입력 (예: du_student)"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError('');
                }}
                disabled={isSending}
                className="w-full pl-9 pr-28 py-3 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-[var(--du-green)] focus:ring-1 focus:ring-[var(--du-green)] rounded-xl text-sm transition-all focus:outline-none"
              />
              <span className="absolute right-3 text-gray-500 text-xs font-bold font-mono tracking-tight bg-gray-100 border border-gray-200 px-2 py-1 rounded-md select-none shrink-0">
                @daegu.ac.kr
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
              포커스를 해제하거나 아이디만 작성하여도 <u>@daegu.ac.kr</u> 도메인이 기본 세팅됩니다.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 bg-[var(--du-green)] hover:brightness-110 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm transition-all flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>대학 웹 메일 확인 중...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>인증번호 받기</span>
              </>
            )}
          </button>
        </form>
      ) : (
        /* STEP B: Enter OTP received */
        <form onSubmit={handleVerifyOtp} className="space-y-4 animate-scale-up">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs space-y-1 text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold text-[var(--du-green)]">
              <CheckCircle2 className="w-4 h-4" />
              <span>전송 성공!</span>
            </div>
            <p>
              등록된 이메일 <b>{sentEmailAddress}</b>(으)로 6자리 보안 핀번호가 무사히 전달되었습니다.
            </p>
            <div className="inline-block mt-2 px-2.5 py-1 bg-white rounded-md border border-emerald-200 text-[11px] font-mono leading-none">
              대구대 임시핀: <span className="font-bold text-[var(--du-green)] select-all">{demoOtp}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              6자리 인증번호 (OTP)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="핀번호 6자리 정밀 입력"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); // Numbers only, max 6 decimals
                  setError('');
                }}
                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[var(--du-green)] focus:ring-1 focus:ring-[var(--du-green)] rounded-xl text-sm font-mono tracking-widest text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[var(--du-green)] hover:brightness-110 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>인증 완료 및 입장하기</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHasSent(false);
              setOtp('');
              setError('');
              onLog('🔄 사용자가 메일 재작성을 위해 원 주소 입력 탭으로 리턴하였습니다.');
            }}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-250 text-gray-600 font-bold rounded-xl text-xs transition-colors"
          >
            메일 주소 다시 입력하기
          </button>
        </form>
      )}

      {/* Helpful Links */}
      <div className="mt-8 text-center border-t border-gray-100 pt-5">
        <p className="text-[10px] text-gray-400">
          대구대 공식 정보통신서비스 연계 모듈<br />
          웹메일 계정이 없으신 경우 계정 발급 신청이 별도로 권고됩니다.
        </p>
      </div>
    </div>
  );
}
