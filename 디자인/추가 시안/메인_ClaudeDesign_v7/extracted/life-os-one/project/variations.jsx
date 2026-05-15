// variations.jsx — Five Lion home-screen designs.
// Each takes { time } and renders inside <LionScreen time>.

// ─────────────────────────────────────────────────────────────
// V1 · SOFT STACK — familiar pattern. One hero card at top with the
// active-moment content. Below: smaller secondary cards. Voice dock at
// the bottom. The familiar baseline.
// ─────────────────────────────────────────────────────────────
function V1_SoftStack({ time }) {
  const t = Lion[time];
  const d = TimeData[time];
  const { openSheet } = React.useContext(LionCtx);

  return (
    <div style={{ height: '100%', padding: '8px 18px 110px', overflowY: 'auto' }}>
      {/* greeting row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 4px 14px' }}>
        <LionMark size={42} time={time} />
        <div>
          <div style={{ fontSize: 12, color: Lion.muted, letterSpacing: -0.2 }}>
            {time === 'morning' ? '아침' : time === 'lunch' ? '점심' : '저녁'} · {d.time}
          </div>
          <div style={{ fontSize: 16, color: Lion.ink, fontWeight: 600, letterSpacing: -0.3 }}>
            {Persona.greeting}, {d.headline}
          </div>
        </div>
      </div>

      {/* hero card — the moment */}
      <div onClick={time === 'lunch' ? openSheet : undefined} style={{
        borderRadius: 28, padding: 18, marginBottom: 12, cursor: time === 'lunch' ? 'pointer' : 'default',
        background: Lion.paper,
        border: `0.5px solid ${Lion.hairline}`,
        boxShadow: '0 8px 24px rgba(80,55,30,0.06)',
      }}>
        {time === 'morning' && <MorningHero d={d} t={t} />}
        {time === 'lunch' && <LunchHero d={d} t={t} />}
        {time === 'evening' && <EveningHero d={d} t={t} />}
      </div>

      {/* secondary cards row — 2 up */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <SecondaryCard label="맛집 지도" value="2.3km 안" caption="라이언 추천 12곳" time={time} kind="map" />
        <SecondaryCard label="알림" value="2" caption="가맹점 응답 대기" time={time} kind="bell" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <SecondaryCard label="컨디션" value="보통" caption="수면 6h 12m" time={time} kind="heart" />
        <SecondaryCard label="오늘 일정" value="2건" caption="11시 미팅" time={time} kind="cal" />
      </div>
    </div>
  );
}

function SecondaryCard({ label, value, caption, time, kind }) {
  const t = Lion[time];
  const ico = {
    map: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.4 3.5 5.8c0 3.4 4.5 8.7 4.5 8.7s4.5-5.3 4.5-8.7C12.5 3.4 10.5 1.5 8 1.5z" stroke={t.accent} strokeWidth="1.2"/><circle cx="8" cy="5.8" r="1.6" fill={t.accent}/></svg>,
    bell: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v1M4 7v2l-1 2h10l-1-2V7a4 4 0 10-8 0zM6.5 13a1.5 1.5 0 003 0" stroke={t.accent} strokeWidth="1.2" strokeLinecap="round"/></svg>,
    heart:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 13.5s-5-3-5-7a3 3 0 015-2 3 3 0 015 2c0 4-5 7-5 7z" stroke={t.accent} strokeWidth="1.2" strokeLinejoin="round"/></svg>,
    cal:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3.5" width="11" height="10" rx="2" stroke={t.accent} strokeWidth="1.2"/><path d="M2.5 6.5h11M6 2v3M10 2v3" stroke={t.accent} strokeWidth="1.2" strokeLinecap="round"/></svg>,
  }[kind];
  return (
    <div style={{
      padding: 14, borderRadius: 22, background: Lion.paper,
      border: `0.5px solid ${Lion.hairline}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {ico}
        <span style={{ fontSize: 11.5, color: Lion.muted, letterSpacing: -0.2 }}>{label}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: Lion.ink, marginTop: 8, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 11, color: Lion.muted, marginTop: 2 }}>{caption}</div>
    </div>
  );
}

function MorningHero({ d, t }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 38, fontWeight: 600, color: t.accent, letterSpacing: -1, lineHeight: 1 }}>{d.weather.temp}</span>
        <span style={{ fontSize: 13, color: Lion.muted }}>{d.weather.state} · {d.weather.rain}</span>
      </div>
      <div style={{ fontSize: 14, color: Lion.ink2, lineHeight: 1.55, marginBottom: 12 }}>
        오후에 비가 와요. <strong style={{ color: Lion.ink }}>접이식 우산</strong>이랑
        얇은 카디건만 챙기면 충분해요.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {d.outfit.map((o) => (
          <span key={o} style={{
            fontSize: 11.5, padding: '5px 10px', borderRadius: 999,
            background: `${t.tintA}88`, color: t.glyph, letterSpacing: -0.2,
            whiteSpace: 'nowrap',
          }}>{o}</span>
        ))}
      </div>
      <div style={{
        marginTop: 14, paddingTop: 12, borderTop: `0.5px solid ${Lion.hairline}`,
        fontSize: 12, color: Lion.muted, lineHeight: 1.5,
      }}>{d.note}</div>
    </div>
  );
}

function LunchHero({ d, t }) {
  const top = d.picks[0];
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: 1.6, marginBottom: 6 }}>
        오늘의 점심 · 라이언 추천
      </div>
      <PhotoSlot label={top.img} height={132} radius={20} time="lunch" />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 14 }}>
        <div style={{ fontSize: 19, fontWeight: 600, color: Lion.ink, letterSpacing: -0.4 }}>{top.name}</div>
        <div style={{ fontSize: 11.5, color: Lion.muted }}>{top.dist}</div>
      </div>
      <div style={{ fontSize: 12.5, color: Lion.muted, marginTop: 3 }}>{top.tag}</div>
      <div style={{
        marginTop: 10, padding: '10px 12px', borderRadius: 14,
        background: `${t.tintA}55`, fontSize: 12.5, color: t.glyph, lineHeight: 1.5,
      }}>
        "{top.why}" — {Persona.reasons.lunch}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <span style={{ flex: 1, padding: '12px 0', borderRadius: 999, background: t.accent,
          color: '#fff', fontSize: 13.5, fontWeight: 600, textAlign: 'center' }}>
          예약 · 결제 →
        </span>
        <span style={{ padding: '12px 16px', borderRadius: 999, background: Lion.cream2,
          color: Lion.ink, fontSize: 13.5, fontWeight: 500 }}>
          다른 옵션
        </span>
      </div>
    </div>
  );
}

function EveningHero({ d, t }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: 1.6, marginBottom: 8 }}>
        하루 회고
      </div>
      <div style={{ fontSize: 16, color: Lion.ink, lineHeight: 1.55, marginBottom: 14 }}>
        {d.recap}
      </div>
      <div style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: `0.5px solid ${Lion.hairline}` }}>
        {d.stats.map((s) => (
          <div key={s.k} style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: Lion.muted, letterSpacing: -0.2 }}>{s.k}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: Lion.ink, marginTop: 2, letterSpacing: -0.3 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 12.5, color: t.glyph, lineHeight: 1.5,
        padding: '10px 12px', borderRadius: 14, background: `${t.tintA}55` }}>
        내일 · {d.tomorrow}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 · CONVERSATION TIMELINE — Lion has left notes through the day.
// Past entries shrink upward, current moment expands as the active one.
// ─────────────────────────────────────────────────────────────
function V2_Conversation({ time }) {
  const t = Lion[time];
  const d = TimeData[time];
  const { openSheet } = React.useContext(LionCtx);

  // Build a small timeline relative to "now"
  const past = {
    morning: [],
    lunch:   [{ time: '7:23', text: '오늘 비 예보. 우산 챙기시는 거 잊지 마세요.', tag: '아침 브리핑' }],
    evening: [
      { time: '7:23', text: '아침 브리핑 · 오후 비 70%', tag: '아침 브리핑' },
      { time: '12:15', text: '평창동 그릭볼 예약 완료. 14,800원.', tag: '점심 확정' },
      { time: '17:30', text: '러닝 컨디션 좋아요. 페이스 살짝 올려도 OK.', tag: '오후 체크' },
    ],
  }[time];

  return (
    <div style={{ height: '100%', padding: '8px 18px 110px', overflowY: 'auto' }}>
      {/* header */}
      <div style={{ padding: '4px 4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11.5, color: Lion.muted, letterSpacing: -0.2 }}>5월 15일 · {d.time}</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: Lion.ink, letterSpacing: -0.5, marginTop: 2 }}>
            {Persona.greeting} 하루
          </div>
        </div>
        <LionMark size={40} time={time} />
      </div>

      {/* past entries — small */}
      {past.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 4px', opacity: 0.62 }}>
          <div style={{
            width: 8, height: 8, borderRadius: 4, background: Lion.hairline2,
            marginTop: 7, flexShrink: 0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: Lion.muted, letterSpacing: -0.2 }}>{p.time} · {p.tag}</div>
            <div style={{ fontSize: 13, color: Lion.ink2, lineHeight: 1.5, marginTop: 1 }}>{p.text}</div>
          </div>
        </div>
      ))}

      {/* connector */}
      {past.length > 0 && (
        <div style={{ marginLeft: 8, height: 14, borderLeft: `1px dashed ${Lion.hairline2}`, marginBottom: 4 }} />
      )}

      {/* current entry — large, active card */}
      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
        <div style={{
          width: 10, height: 10, borderRadius: 5, background: t.accent,
          marginTop: 14, flexShrink: 0, boxShadow: `0 0 0 4px ${t.accent}22`,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: t.accent, letterSpacing: 1.4, fontWeight: 600, marginBottom: 4 }}>
            지금 · {time === 'morning' ? '아침 브리핑' : time === 'lunch' ? '점심 추천' : '하루 마무리'}
          </div>
          <div onClick={time === 'lunch' ? openSheet : undefined} style={{
            background: Lion.paper, borderRadius: 24, padding: 16,
            border: `0.5px solid ${Lion.hairline}`,
            boxShadow: '0 8px 24px rgba(80,55,30,0.06)',
            cursor: time === 'lunch' ? 'pointer' : 'default',
          }}>
            {time === 'morning' && <ConvoMorning d={d} t={t} />}
            {time === 'lunch' && <ConvoLunch d={d} t={t} />}
            {time === 'evening' && <ConvoEvening d={d} t={t} />}
          </div>

          {/* reply chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {(time === 'morning'
              ? ['일정 더 보기', '우산 위치', '오늘 옷 다시']
              : time === 'lunch'
              ? ['다른 옵션', '예약 확정', '나중에']
              : ['내일 일정', '메모 추가', '잠자기']
            ).map((c) => (
              <span key={c} style={{
                fontSize: 11.5, padding: '7px 12px', borderRadius: 999,
                background: 'rgba(255,253,248,0.7)', color: Lion.ink2,
                border: `0.5px solid ${Lion.hairline2}`,
                whiteSpace: 'nowrap',
              }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConvoMorning({ d, t }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 600, color: t.accent, letterSpacing: -0.8 }}>{d.weather.temp}</span>
        <span style={{ fontSize: 12.5, color: Lion.muted }}>{d.weather.state} · {d.weather.rain}</span>
      </div>
      <div style={{ fontSize: 14, color: Lion.ink2, lineHeight: 1.55, marginTop: 8 }}>
        비 와요. 카디건이랑 우산 챙겨드릴게요. 11시 미팅까지 1시간 40분 남았어요.
      </div>
      <div style={{
        marginTop: 12, padding: '10px 12px', borderRadius: 14,
        background: `${t.tintA}55`, fontSize: 12, color: t.glyph,
      }}>
        {d.schedule[0].time} {d.schedule[0].what} · {d.schedule[0].where}
      </div>
    </div>
  );
}

function ConvoLunch({ d, t }) {
  return (
    <div>
      <div style={{ fontSize: 15, color: Lion.ink, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.4 }}>
        가볍게 갈 만한 곳 세 군데 골랐어요.
      </div>
      <div style={{ fontSize: 12.5, color: Lion.muted, marginTop: 4 }}>
        {Persona.reasons.lunch}
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {d.picks.slice(0, 3).map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 14,
            background: i === 0 ? `${t.tintA}66` : Lion.cream,
            border: i === 0 ? `0.5px solid ${t.accent}55` : `0.5px solid ${Lion.hairline}`,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 11, flexShrink: 0,
              background: i === 0 ? t.accent : Lion.cream2, color: i === 0 ? '#fff' : Lion.muted,
              fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600,
            }}>{i + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: Lion.ink, fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: Lion.muted, marginTop: 1 }}>{p.tag}</div>
            </div>
            <div style={{ fontSize: 11, color: Lion.muted }}>{p.dist}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvoEvening({ d, t }) {
  return (
    <div>
      <div style={{ fontSize: 15, color: Lion.ink, lineHeight: 1.55, fontWeight: 500 }}>
        {d.recap}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 12, borderTop: `0.5px solid ${Lion.hairline}` }}>
        {d.stats.map((s) => (
          <div key={s.k} style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, color: Lion.muted }}>{s.k}</div>
            <div style={{ fontSize: 17, fontWeight: 600, color: Lion.ink, marginTop: 2 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V3 · ORBIT FOCUS — one big circular hero with satellite chips.
// Novel layout: the moment is literally the center of the screen.
// ─────────────────────────────────────────────────────────────
function V3_Orbit({ time }) {
  const t = Lion[time];
  const d = TimeData[time];
  const { openSheet } = React.useContext(LionCtx);

  const satellites = {
    morning: [
      { top: '20%', left: '6%',  label: '날씨', value: '18°' },
      { top: '14%', right: '8%', label: '일정', value: '2건' },
      { bottom: '32%', left: '4%', label: '수면', value: '6h12' },
      { bottom: '28%', right: '6%', label: '컨디션', value: '보통' },
    ],
    lunch: [
      { top: '20%', left: '6%',  label: '거리', value: '12분' },
      { top: '14%', right: '8%', label: '예산', value: '14,800' },
      { bottom: '32%', left: '4%', label: '단백질', value: '28g' },
      { bottom: '28%', right: '6%', label: '미팅', value: '15시' },
    ],
    evening: [
      { top: '20%', left: '6%',  label: '걸음', value: '8,724' },
      { top: '14%', right: '8%', label: '단백질', value: '64g' },
      { bottom: '32%', left: '4%', label: '내일', value: '비' },
      { bottom: '28%', right: '6%', label: '취침', value: '22:30' },
    ],
  }[time];

  return (
    <div style={{ height: '100%', padding: '8px 18px 110px', position: 'relative' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 0' }}>
        <div>
          <div style={{ fontSize: 11.5, color: Lion.muted, letterSpacing: -0.2 }}>
            {time === 'morning' ? '아침' : time === 'lunch' ? '점심' : '저녁'} · {d.time}
          </div>
          <div style={{ fontSize: 14, color: Lion.ink, fontWeight: 600, marginTop: 2 }}>
            {Persona.greeting}, 라이언이 챙겨뒀어요
          </div>
        </div>
      </div>

      {/* orbit area */}
      <div style={{ position: 'relative', height: 460, marginTop: 12 }}>
        {/* concentric orbit guides */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 320, height: 320, borderRadius: '50%',
          border: `1px dashed ${t.accent}33`,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 380, height: 380, borderRadius: '50%',
          border: `1px dashed ${t.accent}22`,
        }} />

        {/* satellite chips */}
        {satellites.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', ...s,
            padding: '10px 12px', borderRadius: 18,
            background: 'rgba(255,253,248,0.75)',
            border: `0.5px solid ${Lion.hairline2}`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 6px 16px rgba(80,55,30,0.06)',
          }}>
            <div style={{ fontSize: 10, color: Lion.muted, letterSpacing: -0.1 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: Lion.ink, letterSpacing: -0.3, marginTop: 1 }}>{s.value}</div>
          </div>
        ))}

        {/* hero — big circle */}
        <div onClick={time === 'lunch' ? openSheet : undefined} style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 250, height: 250, borderRadius: '50%',
          background: `radial-gradient(60% 60% at 35% 30%, ${t.tintA}, ${t.tintB} 80%)`,
          border: `1px solid ${t.accent}44`,
          boxShadow: `0 20px 40px ${t.accent}33, inset 0 0 30px rgba(255,255,255,0.5)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: 24,
          cursor: time === 'lunch' ? 'pointer' : 'default',
        }}>
          {time === 'morning' && (
            <>
              <div style={{ fontSize: 11, color: t.glyph, letterSpacing: 2 }}>아침 브리핑</div>
              <div style={{ fontSize: 54, fontWeight: 600, color: t.accent, letterSpacing: -2, lineHeight: 1, margin: '4px 0' }}>18°</div>
              <div style={{ fontSize: 13, color: t.glyph, lineHeight: 1.4 }}>
                흐림 · 오후 비<br/>우산 챙겨드릴게요
              </div>
            </>
          )}
          {time === 'lunch' && (
            <>
              <div style={{ fontSize: 11, color: t.glyph, letterSpacing: 2 }}>오늘의 점심</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: Lion.ink, letterSpacing: -0.4, marginTop: 6, lineHeight: 1.2 }}>
                평창동<br/>그릭볼
              </div>
              <div style={{ fontSize: 12, color: t.glyph, lineHeight: 1.4, marginTop: 6 }}>
                글루텐 free · 480kcal
              </div>
              <div style={{
                marginTop: 12, padding: '8px 16px', borderRadius: 999,
                background: t.accent, color: '#fff', fontSize: 12, fontWeight: 600,
              }}>예약 → 결제</div>
            </>
          )}
          {time === 'evening' && (
            <>
              <div style={{ fontSize: 11, color: t.glyph, letterSpacing: 2 }}>하루 마무리</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: t.accent, letterSpacing: -0.6, marginTop: 4 }}>잘 챙기셨어요</div>
              <div style={{ fontSize: 12, color: t.glyph, lineHeight: 1.4, marginTop: 6, maxWidth: 180 }}>
                점심 가볍게, 러닝까지<br/>완주
              </div>
            </>
          )}
        </div>

        {/* lion mark — floats top-center over orbit */}
        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)' }}>
          <LionMark size={48} time={time} label={false} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V4 · EDITORIAL LETTER — Lion as a magazine letter to you.
// Serif headline, hero image, body type. Persona shows up in the salutation.
// ─────────────────────────────────────────────────────────────
function V4_Editorial({ time }) {
  const t = Lion[time];
  const d = TimeData[time];
  const { openSheet } = React.useContext(LionCtx);

  const headline = {
    morning: '오늘 비가 와요.\n우산만 챙기면\n괜찮아요.',
    lunch:   '점심은 가볍게,\n그릭볼\n어떠세요.',
    evening: '오늘도 잘\n챙기셨어요.\n충분해요.',
  }[time];

  return (
    <div style={{ height: '100%', padding: '8px 22px 110px', overflowY: 'auto' }}>
      {/* masthead */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 8, borderBottom: `0.5px solid ${Lion.hairline2}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LionMark size={26} time={time} label={false} />
          <span style={{
            fontFamily: Lion.serif, fontSize: 16, fontWeight: 600,
            color: Lion.ink, letterSpacing: 0.4,
          }}>라이언</span>
        </div>
        <div style={{ fontSize: 10.5, color: Lion.muted, letterSpacing: 1.5 }}>
          NO.{time === 'morning' ? '0541' : time === 'lunch' ? '0542' : '0543'} · {d.time}
        </div>
      </div>

      {/* dateline */}
      <div style={{ fontSize: 11, color: t.accent, letterSpacing: 2, marginTop: 22, fontWeight: 600 }}>
        {Persona.greeting}께
      </div>

      {/* serif headline */}
      <h1 style={{
        fontFamily: Lion.serif, fontSize: 36, fontWeight: 600,
        color: Lion.ink, letterSpacing: -1, lineHeight: 1.18,
        margin: '8px 0 16px', whiteSpace: 'pre-line', textWrap: 'pretty',
      }}>{headline}</h1>

      {/* hero image */}
      <PhotoSlot
        label={time === 'morning' ? 'cloud-soft' : time === 'lunch' ? 'photo-grain-bowl' : 'lamp-window'}
        height={180} radius={4} time={time}
      />

      {/* body */}
      <div style={{
        fontSize: 14, color: Lion.ink2, lineHeight: 1.7,
        marginTop: 18, letterSpacing: -0.1, textWrap: 'pretty',
      }}>
        {time === 'morning' && (
          <>
            오늘은 흐리고 <span style={{ color: t.accent, fontWeight: 600 }}>오후 비 70%</span>.
            얇은 카디건과 접이식 우산이면 충분해요.
            <br/><br/>
            11시 성수 미팅, 19시 한강 러닝까지 두 건만 챙기시면 돼요.
            저녁 운동은 비 그친 이후로 알람 옮겨둘게요.
          </>
        )}
        {time === 'lunch' && (
          <>
            오후 미팅이 있어서 부담 적은 걸로 골랐어요.
            <span style={{ color: t.accent, fontWeight: 600 }}> 글루텐 없는 그릭볼,</span>
            12분 거리, 단백질 28g.
            <br/><br/>
            "예약 → 결제"까지 한 번에 끝내드릴게요.
            다른 게 끌리면 음성으로 "다른 것도 보여줘" 라고만 해주세요.
          </>
        )}
        {time === 'evening' && (
          <>
            <span style={{ color: t.accent, fontWeight: 600 }}>오늘 8,724걸음.</span>
            점심 가볍게, 러닝까지 완주.
            <br/><br/>
            내일 9시 회의 전 비가 와요. 우산 자리 미리 둘게요.
            오늘은 평소보다 30분 일찍 자는 쪽으로 알람 옮겨둘게요.
          </>
        )}
      </div>

      {/* CTA — only at lunch */}
      {time === 'lunch' && (
        <div onClick={openSheet} style={{
          marginTop: 22, padding: '14px 18px', borderRadius: 999,
          background: Lion.ink, color: Lion.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: -0.2 }}>이걸로 예약</span>
          <span style={{
            width: 28, height: 28, borderRadius: 14, background: t.accent,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>→</span>
        </div>
      )}

      {/* signoff */}
      <div style={{
        marginTop: 24, paddingTop: 16, borderTop: `0.5px solid ${Lion.hairline2}`,
        fontFamily: Lion.serif, fontSize: 13, color: Lion.muted, fontStyle: 'italic',
      }}>
        — 라이언 드림
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V5 · CARD FAN — Lion shows you a fan of cards. Tap one to focus.
// The center card is the active moment; outer cards are nearby moments.
// ─────────────────────────────────────────────────────────────
function V5_Fan({ time }) {
  const t = Lion[time];
  const d = TimeData[time];
  const { openSheet } = React.useContext(LionCtx);
  const [focusIdx, setFocusIdx] = React.useState(1); // 0 left, 1 center, 2 right

  const fanCards = time === 'lunch'
    ? d.picks.map((p) => ({ kind: 'pick', p }))
    : [
        { kind: 'note', title: time === 'morning' ? '날씨' : '오늘 요약', body: time === 'morning' ? '18° 흐림' : d.stats[0].v + ' 걸음' },
        { kind: 'hero' },
        { kind: 'note', title: '다음', body: time === 'morning' ? '11시 미팅' : '내일 9시 회의' },
      ];

  return (
    <div style={{ height: '100%', padding: '8px 0 110px', overflow: 'hidden' }}>
      {/* greeting */}
      <div style={{ padding: '4px 22px 0', textAlign: 'center' }}>
        <LionMark size={48} time={time} label={false} />
        <div style={{ marginTop: 10, fontSize: 12, color: Lion.muted }}>{d.time} · {Persona.greeting}</div>
        <div style={{ fontSize: 19, fontWeight: 600, color: Lion.ink, marginTop: 6, letterSpacing: -0.3 }}>
          {time === 'lunch' ? '세 개 골라뒀어요' : d.headline}
        </div>
        <div style={{ fontSize: 12.5, color: Lion.muted, marginTop: 4 }}>
          {time === 'lunch' ? '카드를 좌우로 넘겨보세요' : d.sub}
        </div>
      </div>

      {/* fan stage */}
      <div style={{ position: 'relative', height: 380, marginTop: 24 }}>
        {fanCards.map((c, i) => {
          const offset = i - focusIdx;
          const isCenter = offset === 0;
          const angle = offset * 8;
          const x = offset * 22;
          const y = Math.abs(offset) * 8;
          const z = isCenter ? 3 : 2 - Math.abs(offset);
          return (
            <div
              key={i}
              onClick={() => isCenter && time === 'lunch' ? openSheet() : setFocusIdx(i)}
              style={{
                position: 'absolute', left: '50%', top: y,
                transform: `translateX(calc(-50% + ${x}px)) rotate(${angle}deg) scale(${isCenter ? 1 : 0.94})`,
                transformOrigin: 'bottom center',
                width: 240, height: 340,
                borderRadius: 28, padding: 18,
                background: Lion.paper, border: `0.5px solid ${Lion.hairline}`,
                boxShadow: isCenter
                  ? `0 18px 40px rgba(80,55,30,0.18), 0 0 0 1px ${t.accent}22`
                  : '0 6px 18px rgba(80,55,30,0.08)',
                zIndex: z,
                transition: 'all .3s cubic-bezier(.2,.7,.3,1)',
                cursor: 'pointer', overflow: 'hidden',
              }}>
              {c.kind === 'pick' && <FanPick p={c.p} t={t} active={isCenter} />}
              {c.kind === 'hero' && <FanHero d={d} t={t} time={time} />}
              {c.kind === 'note' && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 11, color: Lion.muted, letterSpacing: 1.4 }}>{c.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: Lion.ink, letterSpacing: -0.5, lineHeight: 1.1 }}>
                    {c.body}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
        {fanCards.map((_, i) => (
          <span key={i} style={{
            width: i === focusIdx ? 18 : 6, height: 6, borderRadius: 3,
            background: i === focusIdx ? t.accent : Lion.hairline2,
            transition: 'width .25s',
          }} />
        ))}
      </div>
    </div>
  );
}

function FanPick({ p, t, active }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PhotoSlot label={p.img} height={140} radius={18} time="lunch" />
      <div style={{ flex: 1, paddingTop: 14, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: t.accent, letterSpacing: 1.6, fontWeight: 600 }}>{p.tag.split(' · ')[0]}</div>
        <div style={{ fontSize: 19, fontWeight: 600, color: Lion.ink, marginTop: 4, letterSpacing: -0.3, lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ fontSize: 11.5, color: Lion.muted, marginTop: 4 }}>{p.dist} · {p.tag.split(' · ')[1] || ''}</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11.5, color: t.glyph, fontStyle: 'italic', lineHeight: 1.4, marginBottom: active ? 10 : 0 }}>
          "{p.why}"
        </div>
        {active && (
          <div style={{
            padding: '10px 14px', borderRadius: 999, background: t.accent,
            color: '#fff', fontSize: 12.5, fontWeight: 600, textAlign: 'center',
          }}>예약 · 결제 →</div>
        )}
      </div>
    </div>
  );
}

function FanHero({ d, t, time }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: t.accent, letterSpacing: 1.6, fontWeight: 600 }}>
        {time === 'morning' ? '오늘 아침' : '하루 회고'}
      </div>
      {time === 'morning' && (
        <>
          <div style={{ fontSize: 64, fontWeight: 600, color: t.accent, letterSpacing: -2, marginTop: 22, lineHeight: 1 }}>18°</div>
          <div style={{ fontSize: 13, color: Lion.ink2, marginTop: 6 }}>{d.weather.state} · {d.weather.rain}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {d.outfit.map((o) => (
              <span key={o} style={{ fontSize: 10.5, padding: '4px 8px', borderRadius: 999,
                background: `${t.tintA}88`, color: t.glyph, whiteSpace: 'nowrap' }}>{o}</span>
            ))}
          </div>
        </>
      )}
      {time === 'evening' && (
        <>
          <div style={{ fontSize: 14.5, fontWeight: 500, color: Lion.ink, lineHeight: 1.5, marginTop: 14 }}>{d.recap}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {d.stats.map((s) => (
              <div key={s.k} style={{ flex: 1 }}>
                <div style={{ fontSize: 9.5, color: Lion.muted }}>{s.k}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: Lion.ink }}>{s.v}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, { V1_SoftStack, V2_Conversation, V3_Orbit, V4_Editorial, V5_Fan });
