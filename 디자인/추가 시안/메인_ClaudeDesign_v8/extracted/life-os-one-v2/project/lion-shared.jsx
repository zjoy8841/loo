// lion-shared.jsx — design tokens, content, mascots, shared bits.

const T = {
  bg:      '#F4F1EC',
  paper:   '#FAF7F1',
  card:    '#FFFFFF',
  ink:     '#1A1A1C',
  ink2:    '#3A3A3C',
  mute:    '#8A857C',
  line:    'rgba(26,26,28,0.10)',
  line2:   'rgba(26,26,28,0.18)',
  morning: '#C8722A',
  noon:    '#5B7C5A',
  evening: '#A14242',
  serif:   "'Noto Serif KR', ui-serif, Georgia, serif",
  sans:    "'Pretendard', 'Noto Sans KR', -apple-system, system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, Menlo, monospace",
};

// Sample user — close-beta resident
const PERSONA = {
  name: '지원',
  greetingName: '지원님',
  tagShort: '글루텐 줄이는 중 · UX 디자이너 · 식물',
  tags: [
    { group: '식이', value: '글루텐 줄이기' },
    { group: '체형', value: '체지방 -3kg' },
    { group: '직업', value: 'UX 디자이너' },
    { group: '관심사', value: '식물 · 사이클링' },
    { group: '컨디션', value: '수면 부족 회복 중' },
  ],
};

// Content per time-of-day. All Korean, conversational, written as if Lion
// has already gathered it.
const CONTENT = {
  morning: {
    accent: T.morning,
    accentName: '아침',
    label: '아침 브리프',
    greetingFor: (name) => `안녕하세요, ${name}님`,
    line: '오늘은 어제보다 조금 천천히 시작해도 괜찮아요.',
    weather: { city: '서울 망원동', tempHi: 19, tempLo: 12, summary: '흐림 · 오후 소나기' },
    outfit: ['얇은 가디건', '접이식 우산', '도보 운동화'],
    schedule: [
      { time: '11:00', title: '디자인 리뷰', tag: '오늘의 핵심', meta: '시안 3개 준비됨' },
      { time: '15:00', title: '윤정님 1:1', meta: '온라인 · 30분' },
      { time: '19:30', title: '요가', meta: '망원 스튜디오' },
    ],
    sleep: { hours: 6, mins: 12, note: '평소보다 22분 짧음' },
    pulse: '디자인 리뷰 전에 물 한 잔, 산책 10분 정도가 좋겠어요.',
  },
  noon: {
    accent: T.noon,
    accentName: '점심',
    label: '점심 추천',
    greetingFor: (name) => `${name}님, 점심시간이 가까워졌어요`,
    line: '오늘 일정 강도에 맞춰 가볍지만 든든한 쪽으로 골라봤어요.',
    weather: { city: '서울 망원동', tempHi: 19, tempLo: 12, summary: '구름 많음' },
    picks: [
      {
        name: '산촌 정식',
        kind: '한식 · 정식',
        walk: '도보 4분',
        price: '28,000원',
        why: '글루텐 프리 옵션 · 오후 리뷰 전 부담 적음',
        tag: '오늘의 1픽',
        rating: 4.6,
      },
      {
        name: '키친 우녹',
        kind: '지중해식 · 단품',
        walk: '도보 6분',
        price: '22,000원',
        why: '가볍게 · 야채 비중 높음',
        rating: 4.4,
      },
      {
        name: '우드앤브릭',
        kind: '브런치',
        walk: '도보 9분',
        price: '18,000원',
        why: '글루텐 옵션 한정 · 단백질 충분',
        rating: 4.2,
      },
    ],
    flow: ['추천', '대화로 다듬기', '예약', '결제', '확정'],
  },
  evening: {
    accent: T.evening,
    accentName: '저녁',
    label: '저녁 회고',
    greetingFor: (name) => `${name}님, 오늘 하루 어땠어요?`,
    line: '가볍게 짚고 넘어갈게요. 길게 안 끌어요.',
    weather: { city: '서울 망원동', tempHi: 19, tempLo: 12, summary: '맑음' },
    recap: [
      { k: '디자인 리뷰', v: '두 번째 시안 피드백 많음 — 잘 정리됨' },
      { k: '점심', v: '산촌 정식 · 만족도 ★4.5 기록' },
      { k: '걸음수', v: '6,420보 · 평소보다 적음' },
      { k: '물', v: '5컵 · 1컵 부족' },
    ],
    feel: ['좋아요', '평범했어요', '피곤해요', '복잡해요'],
    tomorrow: '내일 09:00 PM 회고 미팅 준비 — 5분이면 충분해요.',
  },
};

const TIMES = ['morning', 'noon', 'evening'];
const TIME_LABEL = { morning: '아침', noon: '점심', evening: '저녁' };
const TIME_SYMBOL = { morning: '◴', noon: '◐', evening: '◖' };

// ─────────────────────────────────────────────────────────────
// Lion mascots — five different abstractions.
// Each accepts { size, accent } and is otherwise flat.
// ─────────────────────────────────────────────────────────────

// 1. Geometric face — circles + minimal features.
function LionFace({ size = 64, accent = T.morning, mood = 'soft' }) {
  const mane = 12;
  const ring = [];
  for (let i = 0; i < mane; i++) {
    const a = (i / mane) * Math.PI * 2;
    ring.push(
      <circle
        key={i}
        cx={50 + 32 * Math.cos(a)}
        cy={50 + 32 * Math.sin(a)}
        r={11}
        fill={accent}
        opacity={mood === 'soft' ? 0.92 : 1}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      {ring}
      <circle cx="50" cy="52" r="24" fill="#F6E7D3" />
      <circle cx="42" cy="50" r="1.8" fill={T.ink} />
      <circle cx="58" cy="50" r="1.8" fill={T.ink} />
      <path d="M48 58 Q50 60 52 58" stroke={T.ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M50 60 Q47 64 44 62" stroke={T.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M50 60 Q53 64 56 62" stroke={T.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 2. Monogram — serif L inside a ring with mane dashes.
function LionMonogram({ size = 64, accent = T.morning }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={50 + 36 * Math.cos(a)}
            y1={50 + 36 * Math.sin(a)}
            x2={50 + 46 * Math.cos(a)}
            y2={50 + 46 * Math.sin(a)}
            stroke={accent}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="50" cy="50" r="32" fill="#FAF7F1" stroke={accent} strokeWidth="1.2" />
      <text
        x="50"
        y="63"
        textAnchor="middle"
        fontFamily="'Noto Serif KR', serif"
        fontSize="40"
        fontWeight="500"
        fill={T.ink}
        fontStyle="italic"
      >L</text>
    </svg>
  );
}

// 3. Orb — gradient circle suggesting glow, no face.
function LionOrb({ size = 120, accent = T.morning }) {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`o1-${id}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF3E0" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={`o2-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="88" fill={`url(#o1-${id})`} />
      <circle cx="100" cy="100" r="88" fill={`url(#o2-${id})`} />
      <circle cx="74" cy="74" r="14" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

// 4. Line-drawn lion silhouette (very simple, single-stroke).
function LionLine({ size = 64, accent = T.morning, stroke = T.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      <circle cx="50" cy="55" r="38" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="2 4" />
      <path
        d="M28 52 Q24 36 36 32 Q34 22 46 24 Q50 18 54 24 Q66 22 64 32 Q76 36 72 52 Q72 70 50 78 Q28 70 28 52 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="42" cy="52" r="1.4" fill={stroke} />
      <circle cx="58" cy="52" r="1.4" fill={stroke} />
      <path d="M48 60 L50 63 L52 60 Z" fill={stroke} />
      <path d="M46 66 Q50 69 54 66" stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 5. Wordmark "라이언" with subtle ornament — typographic only.
function LionWordmark({ size = 1, accent = T.morning, dark = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 6 * size,
      fontFamily: T.serif, color: dark ? '#fff' : T.ink,
      fontSize: 22 * size, fontWeight: 600, letterSpacing: '-0.01em',
    }}>
      <span style={{
        width: 6 * size, height: 6 * size, borderRadius: '50%',
        background: accent, alignSelf: 'center',
      }} />
      <span>라이언</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared UI atoms
// ─────────────────────────────────────────────────────────────

// "라이언아" voice call pill — used in every variation, styled per design.
function VoicePill({ accent, variant = 'pill', dark = false }) {
  const ink = dark ? '#fff' : T.ink;
  const sub = dark ? 'rgba(255,255,255,0.55)' : T.mute;
  if (variant === 'pill') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
        borderRadius: 999, padding: '10px 14px 10px 12px',
        boxShadow: dark ? 'none' : '0 1px 0 rgba(0,0,0,0.04), 0 6px 18px rgba(40,30,15,0.06)',
        border: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${T.line}`,
        fontFamily: T.sans,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="4" y="1" width="4" height="8" rx="2" fill="#fff"/>
            <path d="M1.5 6.5v.5a4.5 4.5 0 009 0v-.5M6 11.5v1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 14.5, color: ink, fontWeight: 500, letterSpacing: '-0.01em' }}>"라이언아"</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: sub, fontFamily: T.mono, letterSpacing: '0.02em' }}>HOLD</div>
      </div>
    );
  }
  if (variant === 'block') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'transparent',
        borderRadius: 0, padding: '14px 0',
        borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`,
        fontFamily: T.sans,
      }}>
        <VoiceWave accent={accent} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: 15, color: ink, fontWeight: 500 }}>"라이언아" 라고 불러보세요</div>
          <div style={{ fontSize: 12, color: sub, fontFamily: T.mono }}>어디서든 호출 가능</div>
        </div>
      </div>
    );
  }
  return null;
}

function VoiceWave({ accent, count = 5 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 3, height: [10, 18, 24, 18, 10][i] || 14,
          background: accent, borderRadius: 4, opacity: 0.85,
        }} />
      ))}
    </div>
  );
}

// Persona chip strip — used by variations that surface tags explicitly.
function PersonaStrip({ persona, accent, dark = false, variant = 'inline' }) {
  const ink = dark ? 'rgba(255,255,255,0.7)' : T.mute;
  if (variant === 'inline') {
    return (
      <div style={{
        fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.06em',
        color: ink, textTransform: 'uppercase',
      }}>
        {persona.tagShort}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {persona.tags.slice(0, 3).map(t => (
        <span key={t.value} style={{
          padding: '4px 9px', borderRadius: 999,
          background: 'rgba(26,26,28,0.04)',
          fontFamily: T.sans, fontSize: 11.5, color: T.ink2,
          border: `1px solid ${T.line}`,
        }}>
          <span style={{ color: accent, marginRight: 6 }}>·</span>{t.value}
        </span>
      ))}
    </div>
  );
}

// Time-of-day toggle (in-app). Three pills.
function TimeToggle({ value, onChange, accent, dark = false, compact = false }) {
  const ink = dark ? '#fff' : T.ink;
  const sub = dark ? 'rgba(255,255,255,0.45)' : T.mute;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: compact ? 2 : 4,
      padding: 3, borderRadius: 999,
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,28,0.04)',
      border: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${T.line}`,
      fontFamily: T.sans,
    }}>
      {TIMES.map(t => {
        const active = t === value;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              border: 0, cursor: 'pointer',
              padding: compact ? '4px 9px' : '6px 11px',
              borderRadius: 999,
              fontFamily: T.sans, fontSize: compact ? 11 : 12.5,
              fontWeight: active ? 600 : 500,
              letterSpacing: '-0.01em',
              background: active ? (dark ? '#fff' : T.ink) : 'transparent',
              color: active ? (dark ? T.ink : '#fff') : sub,
              transition: 'all .15s ease',
            }}
          >{TIME_LABEL[t]}</button>
        );
      })}
    </div>
  );
}

// Bottom tab bar (consistent across variants).
function BottomTabs({ accent, dark = false }) {
  const ink = dark ? 'rgba(255,255,255,0.92)' : T.ink;
  const sub = dark ? 'rgba(255,255,255,0.4)' : T.mute;
  const items = [
    { key: 'home',  label: '홈',     active: true },
    { key: 'map',   label: '맛집 지도' },
    { key: 'chat',  label: '채팅' },
    { key: 'me',    label: '나' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 12px 14px',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : T.line}`,
      background: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      fontFamily: T.sans,
    }}>
      {items.map(i => (
        <div key={i.key} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: i.active ? ink : sub,
          fontSize: 10.5, fontWeight: i.active ? 600 : 500, letterSpacing: '-0.01em',
        }}>
          <TabIcon kind={i.key} active={i.active} accent={accent} dark={dark} />
          <span>{i.label}</span>
        </div>
      ))}
    </div>
  );
}

function TabIcon({ kind, active, accent, dark }) {
  const c = active ? (dark ? '#fff' : T.ink) : (dark ? 'rgba(255,255,255,0.4)' : T.mute);
  if (kind === 'home') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" fill={active ? accent : 'none'} stroke={c} strokeWidth="1.6"/>
      </svg>
    );
  }
  if (kind === 'map') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5l5-2 6 2 5-2v14l-5 2-6-2-5 2V5z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M8 3v14M14 5v14" stroke={c} strokeWidth="1.4"/>
      </svg>
    );
  }
  if (kind === 'chat') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6a3 3 0 013-3h8a3 3 0 013 3v6a3 3 0 01-3 3H9l-4 3v-3a3 3 0 01-1-3V6z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3" stroke={c} strokeWidth="1.4"/>
      <path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// Small "note" with monospace explainer used as placeholder.
function Stripe({ w = '100%', h = 60, label }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 8,
      background:
        'repeating-linear-gradient(45deg, rgba(26,26,28,0.05) 0 6px, rgba(26,26,28,0.02) 6px 12px)',
      border: `1px solid ${T.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.mono, fontSize: 10.5, color: T.mute, letterSpacing: '0.04em',
    }}>{label}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Notification dot for top bar.
// ─────────────────────────────────────────────────────────────
function Bell({ accent, count = 1, dark = false }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,28,0.04)',
      border: dark ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${T.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 12V7a4.5 4.5 0 019 0v5M2.5 12h11M6.5 13.5a1.5 1.5 0 003 0" stroke={dark ? '#fff' : T.ink} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {count > 0 && (
        <div style={{
          position: 'absolute', top: 6, right: 7,
          width: 7, height: 7, borderRadius: '50%',
          background: accent, border: `1.5px solid ${dark ? '#0F0E0D' : '#fff'}`,
        }} />
      )}
    </div>
  );
}

Object.assign(window, {
  T, PERSONA, CONTENT, TIMES, TIME_LABEL, TIME_SYMBOL,
  LionFace, LionMonogram, LionOrb, LionLine, LionWordmark,
  VoicePill, VoiceWave, PersonaStrip, TimeToggle, BottomTabs, TabIcon, Stripe, Bell,
});
