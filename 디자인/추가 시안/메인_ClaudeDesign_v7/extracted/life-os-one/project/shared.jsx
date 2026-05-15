// shared.jsx — Lion (라이언) Life OS.ONE
// Design tokens, persona, time-tone palettes, voice wave indicator,
// lunch reserve-flow modal, and small atomic pieces shared by every variation.

// ─── Design tokens ─────────────────────────────────────────────
const Lion = {
  font: '"Pretendard", "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  serif: '"Noto Serif KR", "Source Han Serif K", "Nanum Myeongjo", serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
  cream:    '#FAF6EF',
  cream2:   '#F4ECDF',
  paper:    '#FFFCF6',
  ink:      '#2A251F',
  ink2:     '#574F44',
  muted:    '#8A8073',
  hairline: 'rgba(42,37,31,0.08)',
  hairline2:'rgba(42,37,31,0.14)',
  // time tones — shared chroma so they feel cousins
  morning: { tintA: '#FBE8C6', tintB: '#F4D9B0', accent: '#C97A3A', glyph: '#6B4520', label: '아침' },
  lunch:   { tintA: '#F4D9B6', tintB: '#E8B68A', accent: '#B85F2E', glyph: '#5A2B13', label: '점심' },
  evening: { tintA: '#D7CDE5', tintB: '#B9A9D2', accent: '#5E4A8A', glyph: '#2F2657', label: '저녁' },
};

// ─── Persona (used only in copy / reasoning text) ─────────────
const Persona = {
  firstName: '서연',
  greeting: '서연님',
  reasons: {
    breakfast: '어젯밤 수면이 6시간 12분',
    lunch: '글루텐 민감 · 가벼운 단백질 위주',
    evening: '오후 비 70% · 가벼운 회복',
  },
};

// ─── Time-of-day content ───────────────────────────────────────
const TimeData = {
  morning: {
    time: '7:23',
    headline: '오늘 좋은 아침이에요',
    sub: '비 올지 몰라요. 챙겨드릴게요.',
    weather: { temp: '18°', state: '흐림', rain: '오후 70%' },
    outfit: ['얇은 카디건', '접이식 우산', '편한 운동화'],
    schedule: [
      { time: '11:00', what: '클라이언트 미팅', where: '성수' },
      { time: '19:00', what: '한강 러닝', where: '뚝섬' },
    ],
    note: '어젯밤 수면 6h 12m. 오후 졸음 한 번 올 거예요.',
  },
  lunch: {
    time: '11:48',
    headline: '점심 뭐 드실래요?',
    sub: '오늘은 가볍게 챙겨드릴게요.',
    picks: [
      { name: '평창동 그릭볼', tag: '글루텐 free · 480kcal', dist: '12분',
        why: '단백질 28g, 어제보다 가벼움', img: 'photo-grain-bowl' },
      { name: '한남 솥밥집',   tag: '잡곡 솥밥 · 단백질↑', dist: '15분',
        why: '오후 미팅 전 부담 없음', img: 'photo-rice' },
      { name: '도시락 배달',    tag: '15분 내 도착',       dist: '책상',
        why: '미팅 전 시간 절약', img: 'photo-bento' },
    ],
  },
  evening: {
    time: '21:14',
    headline: '오늘 하루, 잘 챙기셨어요',
    sub: '내일은 좀 더 가벼울 거예요.',
    stats: [
      { k: '걸음', v: '8,724' },
      { k: '단백질', v: '64g' },
      { k: '수면 예상', v: '7h+' },
    ],
    recap: '점심을 가볍게 가셨고, 러닝도 잘 다녀오셨네요.',
    tomorrow: '내일 비 예보. 우산 챙길 자리 미리 둘게요.',
  },
};

// ─── Time-of-day background gradient (organic, soft) ───────────
function timeGradient(time) {
  const t = Lion[time];
  return `radial-gradient(120% 90% at 20% 0%, ${t.tintA} 0%, transparent 55%),`
       + `radial-gradient(110% 80% at 100% 100%, ${t.tintB} 0%, transparent 60%),`
       + `linear-gradient(180deg, ${Lion.cream} 0%, ${Lion.cream2} 100%)`;
}

// ─── Photo placeholder — subtle stripes + mono caption ────────
function PhotoSlot({ label = 'photo', height = 120, radius = 18, time = 'lunch' }) {
  const t = Lion[time];
  return (
    <div style={{
      height, borderRadius: radius, overflow: 'hidden', position: 'relative',
      background:
        `repeating-linear-gradient(135deg, ${t.tintA} 0 8px, ${t.tintB} 8px 16px)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(60% 80% at 50% 60%, transparent 0%, ${t.tintA}88 100%)`,
      }} />
      <div style={{
        position: 'absolute', left: 10, bottom: 8,
        fontFamily: Lion.mono, fontSize: 10, color: t.glyph,
        letterSpacing: 0.2, opacity: 0.65,
      }}>{label}</div>
    </div>
  );
}

// ─── Lion mark — placeholder for hand-drawn illustration ──────
function LionMark({ size = 56, time = 'lunch', label = true }) {
  const t = Lion[time];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      position: 'relative', flexShrink: 0,
      background:
        `radial-gradient(60% 60% at 35% 30%, ${t.tintA} 0%, ${t.tintB} 60%, ${t.accent}44 100%)`,
      border: `1px dashed ${t.accent}66`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {label && (
        <span style={{
          fontFamily: Lion.mono, fontSize: Math.max(7, size * 0.13),
          color: t.glyph, opacity: 0.65, textAlign: 'center', lineHeight: 1.1,
        }}>라이언<br/>일러스트</span>
      )}
    </div>
  );
}

// ─── Voice wave (bottom indicator + fullscreen modal) ─────────
// Breathing scale animation via CSS keyframes injected once.
if (typeof document !== 'undefined' && !document.getElementById('lion-anim')) {
  const s = document.createElement('style');
  s.id = 'lion-anim';
  s.textContent = `
    @keyframes lion-breath { 0%,100%{transform:scaleY(.4)} 50%{transform:scaleY(1)} }
    @keyframes lion-pulse  { 0%,100%{opacity:.55} 50%{opacity:1} }
    @keyframes lion-rise   { from{transform:translateY(8px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes lion-fade   { from{opacity:0} to{opacity:1} }
    @keyframes lion-orbit  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    .lion-rise{animation:lion-rise .26s cubic-bezier(.2,.7,.3,1) both}
    .lion-fade{animation:lion-fade .18s both}
    @font-face{font-family:"Pretendard Variable";font-weight:45 920;font-style:normal;
      font-display:swap;src:url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2) format("woff2-variations")}
  `;
  document.head.appendChild(s);
}

function VoiceBars({ time = 'lunch', count = 5, height = 22, w = 3, gap = 4 }) {
  const t = Lion[time];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, height }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{
          width: w, height: '100%', background: t.accent, borderRadius: w,
          display: 'block', transformOrigin: 'center',
          animation: `lion-breath 1.${4 + (i % 3)}s ease-in-out ${i * 0.12}s infinite`,
        }} />
      ))}
    </div>
  );
}

// Bottom-dock voice — present in every variation
function VoiceDock({ time = 'lunch', onOpen, hint = '"라이언아" 하고 불러보세요' }) {
  const t = Lion[time];
  return (
    <div onClick={onOpen} style={{
      position: 'absolute', left: 16, right: 16, bottom: 24, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px 12px 18px',
      borderRadius: 999,
      background: 'rgba(255,253,248,0.78)',
      border: `0.5px solid ${Lion.hairline2}`,
      boxShadow: '0 10px 28px rgba(80,55,30,0.10), 0 1px 0 rgba(255,255,255,0.6) inset',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      cursor: 'pointer',
    }}>
      <VoiceBars time={time} count={4} height={18} w={2.5} gap={3} />
      <div style={{ flex: 1, fontSize: 13, color: Lion.ink2, letterSpacing: -0.2 }}>{hint}</div>
      <div style={{
        width: 36, height: 36, borderRadius: 18,
        background: `radial-gradient(60% 60% at 35% 30%, ${t.tintA}, ${t.accent})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px ${t.accent}55`,
      }}>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <rect x="4" y="1" width="6" height="10" rx="3" fill="#fff"/>
          <path d="M1 9c0 3.3 2.7 6 6 6s6-2.7 6-6M7 15v2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

// Fullscreen voice — appears when user taps dock
function VoiceFullscreen({ time = 'lunch', onClose }) {
  const t = Lion[time];
  const [phase, setPhase] = React.useState('listen'); // listen → think
  React.useEffect(() => {
    const id = setTimeout(() => setPhase('think'), 1800);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="lion-fade" style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: `radial-gradient(80% 60% at 50% 38%, ${t.tintA} 0%, ${t.tintB} 40%, ${Lion.ink} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 130, color: '#fff',
    }}>
      <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: 2, marginBottom: 16 }}>
        라이언이 {phase === 'listen' ? '듣고 있어요' : '생각하고 있어요'}
      </div>
      <div style={{
        width: 220, height: 220, borderRadius: '50%', position: 'relative',
        background: `radial-gradient(50% 50% at 50% 50%, ${t.tintA} 0%, ${t.accent} 70%)`,
        boxShadow: `0 0 80px ${t.accent}88, inset 0 0 40px rgba(255,255,255,0.4)`,
        animation: 'lion-pulse 2.4s ease-in-out infinite',
      }}>
        <div style={{
          position: 'absolute', inset: -12, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          animation: 'lion-orbit 8s linear infinite',
        }} />
      </div>
      <div style={{ marginTop: 40, height: 40 }}>
        <VoiceBars time={time} count={8} height={34} w={4} gap={6} />
      </div>
      <div style={{
        position: 'absolute', bottom: 60, fontSize: 14, opacity: 0.85,
        maxWidth: 280, textAlign: 'center', lineHeight: 1.5,
      }}>
        {phase === 'listen'
          ? '"점심 다른 거 추천해줘"'
          : '글루텐 없는 다른 옵션 찾는 중...'}
      </div>
      <button onClick={onClose} style={{
        position: 'absolute', top: 64, right: 20, width: 36, height: 36,
        borderRadius: 18, border: 'none', cursor: 'pointer',
        background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 18,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      }}>×</button>
    </div>
  );
}

// ─── Lunch reserve flow modal ─────────────────────────────────
// pick → reserving → confirmed.  Wraps the iOS screen with a soft sheet.
function LunchSheet({ open, onClose }) {
  const t = Lion.lunch;
  const [picked, setPicked] = React.useState(null);
  const [phase, setPhase] = React.useState('list'); // list → reserving → confirmed
  React.useEffect(() => {
    if (!open) { setPicked(null); setPhase('list'); }
  }, [open]);
  React.useEffect(() => {
    if (phase === 'reserving') {
      const id = setTimeout(() => setPhase('confirmed'), 1600);
      return () => clearTimeout(id);
    }
  }, [phase]);
  if (!open) return null;

  const picks = TimeData.lunch.picks;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(40,30,20,0.32)', backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="lion-rise" style={{
        width: '100%', maxHeight: '88%', overflowY: 'auto',
        background: Lion.paper,
        borderTopLeftRadius: 32, borderTopRightRadius: 32,
        padding: '14px 0 30px',
        boxShadow: '0 -20px 60px rgba(80,55,30,0.18)',
      }}>
        {/* grabber */}
        <div style={{
          width: 36, height: 4, background: Lion.hairline2,
          borderRadius: 2, margin: '0 auto 18px',
        }} />

        {phase === 'list' && (
          <div style={{ padding: '0 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <LionMark size={36} time="lunch" label={false} />
              <div style={{ fontSize: 13, color: t.accent, letterSpacing: -0.2 }}>라이언</div>
            </div>
            <h2 style={{
              margin: '8px 0 6px', fontSize: 22, fontWeight: 600,
              color: Lion.ink, letterSpacing: -0.4, lineHeight: 1.3,
            }}>가볍게, 글루텐 없는 쪽으로<br/>세 가지 골라뒀어요.</h2>
            <div style={{ fontSize: 13, color: Lion.muted, marginBottom: 18 }}>
              오후에 미팅이 있어서 부담 적은 순.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {picks.map((p, i) => (
                <button key={i} onClick={() => { setPicked(p); setPhase('reserving'); }}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left',
                    padding: 10, borderRadius: 20,
                    background: Lion.cream, border: `0.5px solid ${Lion.hairline}`,
                    cursor: 'pointer', font: 'inherit',
                  }}>
                  <div style={{ width: 64, height: 64, flexShrink: 0 }}>
                    <PhotoSlot label={p.img} height={64} radius={16} time="lunch" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: Lion.ink, letterSpacing: -0.2 }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: Lion.muted, marginTop: 2 }}>{p.tag} · {p.dist}</div>
                    <div style={{ fontSize: 11.5, color: t.accent, marginTop: 3, fontStyle: 'italic' }}>"{p.why}"</div>
                  </div>
                  <div style={{
                    width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                    background: t.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14,
                  }}>→</div>
                </button>
              ))}
            </div>

            <div style={{
              marginTop: 18, padding: 14, borderRadius: 18,
              background: `${t.tintA}55`, border: `0.5px dashed ${t.accent}55`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <VoiceBars time="lunch" count={3} height={14} w={2} gap={2} />
              <div style={{ fontSize: 12.5, color: t.glyph, flex: 1 }}>
                "다른 것도 보여줘" 라고 말하면 더 찾아드려요.
              </div>
            </div>
          </div>
        )}

        {phase === 'reserving' && picked && (
          <div style={{ padding: '20px 22px 10px', textAlign: 'center' }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%', margin: '0 auto 22px',
              background: `radial-gradient(50% 50% at 50% 50%, ${t.tintA}, ${t.accent})`,
              boxShadow: `0 0 32px ${t.accent}55`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: -6, borderRadius: '50%',
                border: `1px dashed ${t.accent}`, animation: 'lion-orbit 4s linear infinite',
              }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: Lion.ink, letterSpacing: -0.3 }}>
              {picked.name}에 자리 잡고 있어요
            </div>
            <div style={{ fontSize: 13, color: Lion.muted, marginTop: 6 }}>
              예약 · 결제까지 한 번에 끝낼게요.
            </div>
            <div style={{ marginTop: 22, marginBottom: 6 }}>
              <VoiceBars time="lunch" count={5} height={20} w={3} gap={4} />
            </div>
          </div>
        )}

        {phase === 'confirmed' && picked && (
          <div style={{ padding: '4px 22px 0' }}>
            <div className="lion-rise" style={{
              borderRadius: 24, overflow: 'hidden',
              background: Lion.cream, border: `0.5px solid ${Lion.hairline}`,
            }}>
              <PhotoSlot label={picked.img} height={150} radius={0} time="lunch" />
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 11, color: t.accent, letterSpacing: 1.6, fontWeight: 600 }}>예약 확정</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: Lion.ink, marginTop: 4, letterSpacing: -0.4 }}>
                  {picked.name}
                </div>
                <div style={{
                  marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${Lion.hairline}`,
                  display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 10, columnGap: 8, fontSize: 13,
                }}>
                  <div style={{ color: Lion.muted }}>도착 시간</div>
                  <div style={{ color: Lion.ink, textAlign: 'right', fontWeight: 500 }}>12:15</div>
                  <div style={{ color: Lion.muted }}>결제</div>
                  <div style={{ color: Lion.ink, textAlign: 'right', fontWeight: 500 }}>14,800원 · 라이언페이</div>
                  <div style={{ color: Lion.muted }}>준비</div>
                  <div style={{ color: Lion.ink, textAlign: 'right', fontWeight: 500 }}>가맹점 확인 중</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: '14px 0', borderRadius: 999, fontSize: 14, fontWeight: 600,
                background: Lion.cream2, color: Lion.ink, border: 'none', cursor: 'pointer',
              }}>가는 길</button>
              <button onClick={onClose} style={{
                flex: 1, padding: '14px 0', borderRadius: 999, fontSize: 14, fontWeight: 600,
                background: t.accent, color: '#fff', border: 'none', cursor: 'pointer',
              }}>확인</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Standard frame wrapper — applies bg gradient + voice dock + lunch sheet.
// iOS frame already renders its own status bar; we just leave room for it.
function LionScreen({ time = 'lunch', children, hideDock = false }) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [voiceOpen, setVoiceOpen] = React.useState(false);

  // Expose openers via context so any inner card can trigger them.
  const api = React.useMemo(() => ({
    openSheet: () => setSheetOpen(true),
    openVoice: () => setVoiceOpen(true),
  }), []);

  // Listen for Tweaks demo events ("open sheet" / "open voice" buttons in
  // the Tweaks panel) — toggle so the same button closes if open.
  React.useEffect(() => {
    const onSheet = () => setSheetOpen((o) => !o);
    const onVoice = () => setVoiceOpen((o) => !o);
    window.addEventListener('lion-demo-sheet', onSheet);
    window.addEventListener('lion-demo-voice', onVoice);
    return () => {
      window.removeEventListener('lion-demo-sheet', onSheet);
      window.removeEventListener('lion-demo-voice', onVoice);
    };
  }, []);

  return (
    <LionCtx.Provider value={api}>
      <div style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
        background: timeGradient(time),
        fontFamily: Lion.font,
        color: Lion.ink,
      }}>
        <div style={{ position: 'relative', height: '100%', paddingTop: 50 }}>
          {children}
        </div>
        {!hideDock && <VoiceDock time={time} onOpen={() => setVoiceOpen(true)} />}
        <LunchSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
        {voiceOpen && <VoiceFullscreen time={time} onClose={() => setVoiceOpen(false)} />}
      </div>
    </LionCtx.Provider>
  );
}

const LionCtx = React.createContext({ openSheet: () => {}, openVoice: () => {} });

Object.assign(window, {
  Lion, Persona, TimeData, timeGradient,
  PhotoSlot, LionMark, VoiceBars, VoiceDock, VoiceFullscreen,
  LunchSheet, LionScreen, LionCtx,
});
