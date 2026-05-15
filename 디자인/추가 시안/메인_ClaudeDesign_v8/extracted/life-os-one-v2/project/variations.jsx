// variations.jsx — 5 main-home directions for Lion.
// Each one renders the *inside* of an IOSDevice (status bar + home indicator
// handled by IOSDevice). Width 402 × height 874.

// Status bar already takes ~62px from top — content starts there.
const SAFE_TOP = 62;
const SAFE_BOTTOM = 36;

// ─────────────────────────────────────────────────────────────
// V1 — Quiet Brief (conservative, editorial minimal)
// ─────────────────────────────────────────────────────────────
function V1Quiet({ time, persona }) {
  const c = CONTENT[time];
  const accent = c.accent;
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg,
      display: 'flex', flexDirection: 'column',
      paddingTop: SAFE_TOP, fontFamily: T.sans, color: T.ink,
    }}>
      {/* Header row */}
      <div style={{ padding: '14px 22px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LionWordmark accent={accent} />
        <Bell accent={accent} />
      </div>

      {/* Greeting */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10.5, color: T.mute,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {timestampLabel(time)} · {c.weather.city}
        </div>
        <div style={{
          fontFamily: T.serif, fontSize: 30, lineHeight: 1.2, marginTop: 10,
          fontWeight: 500, letterSpacing: '-0.02em', textWrap: 'pretty',
        }}>
          {c.greetingFor(persona.name)}<span style={{ color: accent }}>.</span>
        </div>
        <div style={{
          fontSize: 14, color: T.ink2, marginTop: 8, lineHeight: 1.55, textWrap: 'pretty',
        }}>{c.line}</div>
      </div>

      {/* Main card — content by time */}
      <div style={{ padding: '20px 16px 8px', flex: 1, overflow: 'hidden' }}>
        <V1Card time={time} c={c} />
      </div>

      {/* Default box */}
      <div style={{ padding: '0 22px 8px' }}>
        <VoicePill accent={accent} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <PersonaStrip persona={persona} accent={accent} variant="inline" />
          <a style={{ fontSize: 11.5, color: T.mute, fontFamily: T.mono, letterSpacing: '0.04em' }}>맛집 지도 →</a>
        </div>
      </div>

      <div style={{ paddingBottom: SAFE_BOTTOM }}>
        <BottomTabs accent={accent} />
      </div>
    </div>
  );
}

function V1Card({ time, c }) {
  const wrap = {
    background: T.card, borderRadius: 18, padding: '18px 18px 16px',
    border: `1px solid ${T.line}`, boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 8px 28px rgba(40,30,15,0.06)',
    height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden',
  };
  if (time === 'morning') {
    return (
      <div style={wrap}>
        <CardHeader label={c.label} accent={c.accent} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
          <div style={{ fontFamily: T.serif, fontSize: 44, fontWeight: 500, color: T.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {c.weather.tempHi}<span style={{ fontSize: 22, color: T.mute }}>°</span>
          </div>
          <div style={{ fontSize: 13, color: T.ink2 }}>{c.weather.summary}</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute }}>↑{c.weather.tempHi}° ↓{c.weather.tempLo}°</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {c.outfit.map(o => (
            <span key={o} style={{
              padding: '5px 10px', borderRadius: 999,
              background: 'rgba(200,114,42,0.08)', color: c.accent,
              fontSize: 12, fontWeight: 500,
            }}>{o}</span>
          ))}
        </div>

        <div style={{ height: 1, background: T.line, margin: '16px 0 14px' }} />

        <div style={{ fontSize: 11, color: T.mute, fontFamily: T.mono, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          오늘 일정 · 3건
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.schedule.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink2, width: 42, paddingTop: 1 }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: s.tag ? 600 : 500 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: T.mute, marginTop: 2 }}>{s.meta}</div>
              </div>
              {s.tag && (
                <span style={{ fontSize: 10.5, color: c.accent, fontWeight: 600, marginTop: 2,
                  background: 'rgba(200,114,42,0.10)', padding: '3px 7px', borderRadius: 4 }}>
                  {s.tag}
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <div style={{
          marginTop: 14, padding: '10px 12px', borderRadius: 12,
          background: T.paper, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(91,124,90,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke={T.noon} strokeWidth="1.2"/>
              <path d="M7 4v3l2 1" stroke={T.noon} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.45, flex: 1 }}>
            수면 {c.sleep.hours}시간 {c.sleep.mins}분 · {c.sleep.note}
          </div>
        </div>
      </div>
    );
  }
  if (time === 'noon') {
    const top = c.picks[0];
    return (
      <div style={wrap}>
        <CardHeader label={c.label} accent={c.accent} />
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Stripe w={66} h={66} label="dish" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10.5, color: c.accent, fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', fontFamily: T.mono }}>{top.tag}</span>
                <span style={{ fontSize: 11, color: T.mute }}>★ {top.rating}</span>
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, marginTop: 2, letterSpacing: '-0.01em' }}>
                {top.name}
              </div>
              <div style={{ fontSize: 12, color: T.mute, marginTop: 2 }}>
                {top.kind} · {top.walk} · {top.price}
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 12, padding: '10px 12px', borderRadius: 10,
            background: 'rgba(91,124,90,0.06)', fontSize: 12.5, color: T.ink2, lineHeight: 1.5,
          }}>
            "{top.why}" — 라이언이 골랐어요.
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button style={{
              flex: 1, padding: '12px 0', border: 0, borderRadius: 12,
              background: c.accent, color: '#fff', fontFamily: T.sans, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '-0.01em',
            }}>예약하고 결제</button>
            <button style={{
              padding: '12px 14px', borderRadius: 12,
              background: 'transparent', color: T.ink, fontFamily: T.sans, fontSize: 14, fontWeight: 500,
              border: `1px solid ${T.line2}`,
            }}>다른 옵션</button>
          </div>
        </div>

        <div style={{ height: 1, background: T.line, margin: '16px 0 12px' }} />

        <div style={{ fontSize: 11, color: T.mute, fontFamily: T.mono, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          다른 옵션
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.picks.slice(1).map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Stripe w={36} h={36} label="" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: T.mute }}>{p.walk} · {p.price} · ★ {p.rating}</div>
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.mute }}>{'›'}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginTop: 12, display: 'flex', gap: 4, alignItems: 'center', fontFamily: T.mono, fontSize: 10.5, color: T.mute }}>
          {c.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span style={{ color: i === 0 ? c.accent : T.mute, fontWeight: i === 0 ? 600 : 400 }}>{step}</span>
              {i < c.flow.length - 1 && <span style={{ opacity: 0.4 }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  // evening
  return (
    <div style={wrap}>
      <CardHeader label={c.label} accent={c.accent} />
      <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 12, color: T.ink2, lineHeight: 1.5, fontStyle: 'italic' }}>
        {c.line}
      </div>
      <div style={{ height: 1, background: T.line, margin: '14px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {c.recap.map(r => (
          <div key={r.k} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 74, fontSize: 11, color: T.mute, fontFamily: T.mono, paddingTop: 2,
              letterSpacing: '0.04em', textTransform: 'uppercase' }}>{r.k}</div>
            <div style={{ flex: 1, fontSize: 13.5, color: T.ink2, lineHeight: 1.45 }}>{r.v}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: T.line, margin: '14px 0 12px' }} />
      <div style={{ fontSize: 12, color: T.mute, marginBottom: 8 }}>오늘 한 줄로 정리하면?</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {c.feel.map((f, i) => (
          <span key={f} style={{
            padding: '7px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
            background: i === 0 ? 'rgba(161,66,66,0.10)' : 'rgba(26,26,28,0.04)',
            color: i === 0 ? c.accent : T.ink2,
            border: i === 0 ? `1px solid ${c.accent}` : `1px solid ${T.line}`,
          }}>{f}</span>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        marginTop: 14, padding: '10px 12px', borderRadius: 12,
        background: T.paper, fontSize: 12, color: T.mute, lineHeight: 1.45,
      }}>
        <span style={{ color: c.accent, fontFamily: T.mono, marginRight: 6 }}>내일</span>
        {c.tomorrow}
      </div>
    </div>
  );
}

function CardHeader({ label, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
      <span style={{ fontFamily: T.mono, fontSize: 11, color: accent, fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function timestampLabel(time) {
  return { morning: 'TUE · 06:42', noon: 'TUE · 12:08', evening: 'TUE · 21:36' }[time];
}

// ─────────────────────────────────────────────────────────────
// V2 — Companion (lion as character, conversational, warm paper)
// ─────────────────────────────────────────────────────────────
function V2Companion({ time, persona }) {
  const c = CONTENT[time];
  const accent = c.accent;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `radial-gradient(120% 50% at 50% 0%, rgba(${hexToRgb(accent)},0.10), transparent 65%) ${T.paper}`,
      display: 'flex', flexDirection: 'column',
      paddingTop: SAFE_TOP, fontFamily: T.sans, color: T.ink,
    }}>
      <div style={{ padding: '6px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {timestampLabel(time)}
        </div>
        <Bell accent={accent} />
      </div>

      <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LionFace size={84} accent={accent} />
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.mute, marginTop: 8, letterSpacing: '0.12em' }}>
          LION · 라이언
        </div>
      </div>

      {/* Speech bubble */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 18, padding: '14px 16px',
          boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 10px 30px rgba(40,30,15,0.06)',
          border: `1px solid ${T.line}`, position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
            width: 14, height: 14, background: '#fff',
            borderTop: `1px solid ${T.line}`, borderLeft: `1px solid ${T.line}` }} />
          <div style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
            {c.greetingFor(persona.name)}<span style={{ color: accent }}>.</span>
          </div>
          <div style={{ fontSize: 13.5, color: T.ink2, marginTop: 6, lineHeight: 1.55 }}>{c.line}</div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 8px', flex: 1, overflow: 'hidden' }}>
        <V2Card time={time} c={c} />
      </div>

      <div style={{ padding: '0 20px 10px' }}>
        <VoicePill accent={accent} />
      </div>
      <div style={{ paddingBottom: SAFE_BOTTOM }}>
        <BottomTabs accent={accent} />
      </div>
    </div>
  );
}

function V2Card({ time, c }) {
  const wrap = {
    background: '#fff', borderRadius: 22, padding: 16,
    border: `1px solid ${T.line}`, boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 12px 30px rgba(40,30,15,0.06)',
    height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden',
  };
  if (time === 'morning') {
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CardHeader label={c.label} accent={c.accent} />
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute }}>{c.weather.summary}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 10 }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 500, color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {c.weather.tempHi}°
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute, marginTop: 4 }}>↓ {c.weather.tempLo}°</div>
          </div>
          <div style={{ flex: 1, fontSize: 13.5, color: T.ink2, lineHeight: 1.5 }}>
            가볍게 입고 우산 챙기세요.<br/>
            <span style={{ color: T.mute }}>오후엔 비가 조금 와요.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {c.outfit.map(o => (
            <span key={o} style={{
              padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: 'rgba(200,114,42,0.10)', color: c.accent,
            }}>{o}</span>
          ))}
        </div>

        <div style={{ height: 1, background: T.line, margin: '14px 0 12px' }} />
        <div style={{ fontSize: 11, color: T.mute, fontFamily: T.mono, letterSpacing: '0.08em', textTransform: 'uppercase' }}>오늘의 핵심</div>
        <div style={{ marginTop: 6, fontFamily: T.serif, fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>
          {c.schedule[0].time} · {c.schedule[0].title}
        </div>
        <div style={{ fontSize: 12.5, color: T.mute, marginTop: 2 }}>{c.schedule[0].meta}</div>

        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12,
          padding: '10px 12px', borderRadius: 12, background: T.paper }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 8c2-4 4 0 6-2s4 2 4 2" stroke={c.accent} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          </svg>
          <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.4, flex: 1 }}>{c.pulse}</div>
        </div>
      </div>
    );
  }
  if (time === 'noon') {
    const top = c.picks[0];
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CardHeader label={c.label} accent={c.accent} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 10 }}>
          <Stripe w={70} h={70} label="dish" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{top.name}</div>
            <div style={{ fontSize: 12, color: T.mute, marginTop: 3 }}>{top.kind} · {top.walk} · {top.price}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: c.accent, fontFamily: T.mono, fontWeight: 600 }}>{top.tag}</span>
              <span style={{ fontSize: 11, color: T.mute }}>★ {top.rating}</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: T.ink2, lineHeight: 1.55,
          padding: '12px', background: 'rgba(91,124,90,0.06)', borderRadius: 12 }}>
          <span style={{ fontFamily: T.serif, fontStyle: 'italic', color: c.accent }}>"</span>
          {top.why}<span style={{ fontFamily: T.serif, fontStyle: 'italic', color: c.accent }}>"</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button style={{
            flex: 1, padding: '12px 0', border: 0, borderRadius: 14,
            background: c.accent, color: '#fff', fontFamily: T.sans, fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>예약 · 결제</button>
          <button style={{
            padding: '12px 14px', borderRadius: 14,
            background: 'transparent', color: T.ink, fontFamily: T.sans, fontSize: 13.5, fontWeight: 500,
            border: `1px solid ${T.line2}`,
          }}>대화로 바꾸기</button>
        </div>
        <div style={{ height: 1, background: T.line, margin: '14px 0 10px' }} />
        <div style={{ fontSize: 11, color: T.mute, fontFamily: T.mono, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          다른 두 곳
        </div>
        {c.picks.slice(1).map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, opacity: 0.4 }} />
            <div style={{ fontSize: 13, color: T.ink2 }}>{p.name}</div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 11.5, color: T.mute }}>{p.walk} · {p.price}</div>
          </div>
        ))}
      </div>
    );
  }
  // evening
  return (
    <div style={wrap}>
      <CardHeader label={c.label} accent={c.accent} />
      <div style={{ marginTop: 12, fontFamily: T.serif, fontSize: 19, lineHeight: 1.4, color: T.ink, fontWeight: 500 }}>
        오늘 디자인 리뷰가<br/>잘 마무리됐어요.
      </div>
      <div style={{ fontSize: 13, color: T.ink2, marginTop: 8, lineHeight: 1.55 }}>
        두 번째 시안에 대한 피드백이 많았는데, 잘 정리되었어요. 길게 끌지 않을게요.
      </div>
      <div style={{ height: 1, background: T.line, margin: '14px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {c.recap.slice(0, 3).map(r => (
          <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 60, fontSize: 10.5, color: T.mute, fontFamily: T.mono,
              letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r.k}</div>
            <div style={{ fontSize: 13, color: T.ink2, flex: 1 }}>{r.v}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ marginTop: 14, fontSize: 12, color: T.mute }}>지금 기분은?</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {c.feel.map((f, i) => (
          <span key={f} style={{
            padding: '7px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
            background: i === 0 ? c.accent : 'rgba(26,26,28,0.04)',
            color: i === 0 ? '#fff' : T.ink2,
            border: i === 0 ? 'none' : `1px solid ${T.line}`,
          }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V3 — Single Focus (one big poster card)
// ─────────────────────────────────────────────────────────────
function V3Focus({ time, persona }) {
  const c = CONTENT[time];
  const accent = c.accent;
  const bgTint = {
    morning: 'linear-gradient(180deg, #F6E8D2 0%, #EFE3CC 100%)',
    noon:    'linear-gradient(180deg, #E5EBDD 0%, #DCE3D2 100%)',
    evening: 'linear-gradient(180deg, #EAD9D9 0%, #DCC7C7 100%)',
  }[time];
  return (
    <div style={{
      width: '100%', height: '100%', background: bgTint,
      display: 'flex', flexDirection: 'column',
      paddingTop: SAFE_TOP, fontFamily: T.sans, color: T.ink,
    }}>
      <div style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LionMonogram size={36} accent={accent} />
        <div style={{ fontFamily: T.mono, fontSize: 10.5, color: 'rgba(26,26,28,0.55)',
          letterSpacing: '0.12em', textTransform: 'uppercase' }}>{timestampLabel(time)}</div>
        <Bell accent={accent} />
      </div>

      <div style={{ padding: '24px 28px 0' }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: 'rgba(26,26,28,0.6)',
          letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          {persona.name.toUpperCase()} · {c.accentName} · NO. 142
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 56, fontWeight: 500, lineHeight: 0.98,
          letterSpacing: '-0.035em', marginTop: 12, color: T.ink, textWrap: 'balance', whiteSpace: 'pre-line' }}>
          {{ morning: '오늘은\n조금 천천히.', noon: '가볍게,\n그리고 충분히.', evening: '오늘 하루,\n잘 닫아볼게요.' }[time]}
        </div>
      </div>

      <div style={{ padding: '20px 16px 12px', flex: 1, overflow: 'hidden' }}>
        <V3Card time={time} c={c} />
      </div>

      <div style={{ padding: '0 20px 8px' }}>
        <VoicePill accent={accent} />
      </div>
      <div style={{ paddingBottom: SAFE_BOTTOM }}>
        <BottomTabs accent={accent} />
      </div>
    </div>
  );
}

function V3Card({ time, c }) {
  const wrap = {
    background: 'rgba(255,255,255,0.7)', borderRadius: 24, padding: '18px 20px',
    border: `1px solid rgba(255,255,255,0.6)`,
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 10px 40px rgba(40,30,15,0.08)',
    height: '100%', display: 'flex', flexDirection: 'column',
  };
  if (time === 'morning') {
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 500, lineHeight: 1, color: T.ink }}>{c.weather.tempHi}°</span>
          <span style={{ fontSize: 13, color: T.ink2 }}>{c.weather.summary}</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
          <span style={{ color: c.accent, fontFamily: T.mono, fontSize: 11, letterSpacing: '0.06em',
            textTransform: 'uppercase', marginRight: 6 }}>입을 것</span>
          {c.outfit.join(' · ')}
        </div>

        <div style={{ height: 1, background: 'rgba(26,26,28,0.08)', margin: '14px 0' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: c.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            11:00
          </span>
          <span style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 500 }}>{c.schedule[0].title}</span>
        </div>
        <div style={{ fontSize: 12.5, color: T.mute, marginTop: 3 }}>{c.schedule[0].meta} · 오늘의 핵심</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          {c.schedule.slice(1).map(s => (
            <div key={s.title} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, width: 42 }}>{s.time}</span>
              <span style={{ fontSize: 13, color: T.ink2 }}>{s.title}</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: T.mute }}>{s.meta}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginTop: 14, fontSize: 12, color: T.ink2, fontFamily: T.serif,
          fontStyle: 'italic', lineHeight: 1.5 }}>
          — {c.pulse}
        </div>
      </div>
    );
  }
  if (time === 'noon') {
    const top = c.picks[0];
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <Stripe w={72} h={72} label="dish" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10.5, color: c.accent, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>{top.tag}</div>
            <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, marginTop: 2 }}>{top.name}</div>
            <div style={{ fontSize: 12, color: T.mute, marginTop: 2 }}>{top.kind} · {top.walk}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 500, color: T.ink }}>{top.price}</div>
            <div style={{ fontSize: 11, color: T.mute }}>★ {top.rating}</div>
          </div>
        </div>
        <div style={{ marginTop: 14, fontFamily: T.serif, fontSize: 15, color: T.ink2, lineHeight: 1.55,
          fontStyle: 'italic' }}>
          "{top.why}"
        </div>
        <div style={{ height: 1, background: 'rgba(26,26,28,0.08)', margin: '14px 0 12px' }} />
        <button style={{
          width: '100%', padding: '14px 0', border: 0, borderRadius: 14,
          background: c.accent, color: '#fff', fontFamily: T.sans, fontSize: 15, fontWeight: 600,
          letterSpacing: '-0.01em', cursor: 'pointer',
        }}>예약하고 결제 →</button>
        <button style={{
          width: '100%', padding: '10px 0', marginTop: 6, border: 0, background: 'transparent',
          color: T.ink2, fontFamily: T.sans, fontSize: 13, fontWeight: 500,
        }}>다른 옵션 보기 ({c.picks.length - 1})</button>
        <div style={{ flex: 1 }} />
        <div style={{ marginTop: 8, display: 'flex', gap: 4, fontFamily: T.mono, fontSize: 10.5, color: T.mute }}>
          {c.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span style={{ color: i === 0 ? c.accent : T.mute, fontWeight: i === 0 ? 600 : 400 }}>{step}</span>
              {i < c.flow.length - 1 && <span style={{ opacity: 0.4 }}>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={wrap}>
      <div style={{ fontFamily: T.serif, fontSize: 17, color: T.ink2, lineHeight: 1.6, fontStyle: 'italic' }}>
        "{c.line}"
      </div>
      <div style={{ height: 1, background: 'rgba(26,26,28,0.08)', margin: '14px 0' }} />
      {c.recap.map(r => (
        <div key={r.k} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '5px 0' }}>
          <div style={{ width: 68, fontFamily: T.mono, fontSize: 10.5, color: T.mute,
            letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r.k}</div>
          <div style={{ flex: 1, fontSize: 13, color: T.ink2 }}>{r.v}</div>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ marginTop: 12, fontSize: 12, color: T.mute, marginBottom: 8 }}>한 단어로 오늘은?</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {c.feel.map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500,
            background: i === 0 ? c.accent : 'rgba(255,255,255,0.5)',
            color: i === 0 ? '#fff' : T.ink2,
            border: i === 0 ? 'none' : `1px solid rgba(26,26,28,0.10)`,
          }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V4 — Editorial Magazine (newspaper-y)
// ─────────────────────────────────────────────────────────────
function V4Editorial({ time, persona }) {
  const c = CONTENT[time];
  const accent = c.accent;
  return (
    <div style={{
      width: '100%', height: '100%', background: T.paper,
      display: 'flex', flexDirection: 'column',
      paddingTop: SAFE_TOP, fontFamily: T.sans, color: T.ink,
    }}>
      {/* Masthead */}
      <div style={{ padding: '4px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${T.ink}`, paddingBottom: 8 }}>
        <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.ink2, letterSpacing: '0.18em' }}>
          서울 · TUE
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.ink2, letterSpacing: '0.18em' }}>
          VOL. 142 · {persona.name.toUpperCase()}
        </span>
      </div>
      <div style={{ padding: '6px 18px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        borderBottom: `3px double ${T.ink}` }}>
        <span style={{ fontFamily: T.serif, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
          라이언
        </span>
        <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.mute }}>
          오늘의 브리프
        </span>
      </div>
      <div style={{ padding: '6px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: T.mono, fontSize: 9.5, color: accent, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {c.accentName} 에디션
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, letterSpacing: '0.16em' }}>
          {timestampLabel(time)}
        </span>
      </div>

      <div style={{ padding: '14px 18px 8px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <V4Card time={time} c={c} />
      </div>

      <div style={{ padding: '4px 18px 8px', borderTop: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LionLine size={36} accent={accent} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              "라이언아"로 호출
            </div>
            <div style={{ fontSize: 12, color: T.ink2 }}>지금 부르면 풀스크린 음성 모드</div>
          </div>
          <VoiceWave accent={accent} />
        </div>
      </div>
      <div style={{ paddingBottom: SAFE_BOTTOM }}>
        <BottomTabs accent={accent} />
      </div>
    </div>
  );
}

function V4Card({ time, c }) {
  if (time === 'morning') {
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em',
              textTransform: 'uppercase', borderTop: `1px solid ${T.ink}`, paddingTop: 6 }}>리드 — 날씨</div>
            <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 500, lineHeight: 1.15, marginTop: 6, letterSpacing: '-0.02em' }}>
              19도, 흐림.<br/>오후엔 우산.
            </div>
            <div style={{ fontSize: 12, color: T.ink2, marginTop: 6, lineHeight: 1.5 }}>
              체감은 어제와 비슷. 얇은 가디건 한 장이면 충분하고, 도보 이동이 많은 오후에 우산을 챙기는 게 좋겠습니다.
            </div>
          </div>
          <div>
            <Stripe w="100%" h={110} label="weather chart" />
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, marginTop: 4 }}>
              ↑ {c.weather.tempHi}° ↓ {c.weather.tempLo}°
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: T.line, margin: '14px 0 10px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>일정</div>
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.schedule.map((s, i) => (
                <div key={s.title}>
                  <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute }}>{s.time}</div>
                  <div style={{ fontFamily: T.serif, fontSize: 14.5, fontWeight: i === 0 ? 600 : 500, lineHeight: 1.3 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 11, color: T.mute }}>{s.meta}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>옷·소지품</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {c.outfit.map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 4, height: 4, background: c.accent }} />
                  <span style={{ fontSize: 12.5, color: T.ink2 }}>{o}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 8, background: 'rgba(26,26,28,0.04)',
              border: `1px solid ${T.line}` }}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, letterSpacing: '0.14em' }}>SLEEP</div>
              <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 500 }}>{c.sleep.hours}h {c.sleep.mins}m</div>
              <div style={{ fontSize: 10.5, color: T.mute }}>{c.sleep.note}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (time === 'noon') {
    const top = c.picks[0];
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 14 }}>
          <Stripe w="100%" h={140} label="dish photo" />
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em',
              textTransform: 'uppercase', borderTop: `1px solid ${T.ink}`, paddingTop: 6 }}>리드 — 오늘의 점심</div>
            <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.02em' }}>
              {top.name}
            </div>
            <div style={{ fontSize: 11.5, color: T.mute, marginTop: 4 }}>{top.kind} · {top.walk} · {top.price}</div>
            <div style={{ fontSize: 12, color: T.ink2, marginTop: 8, lineHeight: 1.5, fontFamily: T.serif, fontStyle: 'italic' }}>
              "{top.why}"
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: T.line, margin: '12px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {c.picks.slice(1).map(p => (
            <div key={p.name}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, letterSpacing: '0.14em', textTransform: 'uppercase' }}>대안</div>
              <div style={{ fontFamily: T.serif, fontSize: 14.5, fontWeight: 500, marginTop: 4 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: T.mute }}>{p.walk} · {p.price} · ★ {p.rating}</div>
              <div style={{ fontSize: 11.5, color: T.ink2, marginTop: 4, lineHeight: 1.4 }}>{p.why}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <button style={{
          marginTop: 10, padding: '13px 0', border: 0, borderRadius: 4,
          background: T.ink, color: '#fff', fontFamily: T.sans, fontSize: 14, fontWeight: 600,
        }}>예약 → 결제 → 확정</button>
      </>
    );
  }
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em',
            textTransform: 'uppercase', borderTop: `1px solid ${T.ink}`, paddingTop: 6 }}>리드 — 회고</div>
          <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, lineHeight: 1.2, marginTop: 6, letterSpacing: '-0.02em' }}>
            오늘 리뷰는<br/>잘 마무리됨.
          </div>
          <div style={{ fontSize: 11.5, color: T.ink2, marginTop: 8, lineHeight: 1.55, fontFamily: T.serif, fontStyle: 'italic' }}>
            "두 번째 시안 피드백 잘 정리됨. 길게 끌지 않을게요."
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>지표</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            {c.recap.map(r => (
              <div key={r.k} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                borderBottom: `1px dotted ${T.line2}`, paddingBottom: 4 }}>
                <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.k}</span>
                <span style={{ fontSize: 11, color: T.ink2, textAlign: 'right', maxWidth: 110 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: T.line, margin: '12px 0' }} />
      <div style={{ fontFamily: T.mono, fontSize: 9.5, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>오늘 한 단어로</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {c.feel.map((f, i) => (
          <span key={f} style={{
            padding: '6px 11px', borderRadius: 0, fontSize: 12.5, fontWeight: 500,
            background: i === 0 ? T.ink : 'transparent',
            color: i === 0 ? '#fff' : T.ink2,
            border: i === 0 ? 'none' : `1px solid ${T.ink}`,
          }}>{f}</span>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ marginTop: 8, fontFamily: T.serif, fontSize: 12, color: T.mute, fontStyle: 'italic' }}>
        {c.tomorrow}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// V5 — Orb (dark, experimental, lion as presence)
// ─────────────────────────────────────────────────────────────
function V5Orb({ time, persona }) {
  const c = CONTENT[time];
  const accent = c.accent;
  const bgs = {
    morning: 'radial-gradient(140% 80% at 50% 0%, #2A1E14 0%, #14100C 60%, #0B0907 100%)',
    noon:    'radial-gradient(140% 80% at 50% 0%, #1B2418 0%, #11140F 60%, #0A0C09 100%)',
    evening: 'radial-gradient(140% 80% at 50% 0%, #2A1414 0%, #16100F 60%, #0B0808 100%)',
  };
  return (
    <div style={{
      width: '100%', height: '100%', background: bgs[time],
      display: 'flex', flexDirection: 'column',
      paddingTop: SAFE_TOP, fontFamily: T.sans, color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ padding: '6px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LionWordmark accent={accent} dark />
        <Bell accent={accent} dark />
      </div>

      {/* The orb — lion as presence */}
      <div style={{ position: 'relative', height: 220, marginTop: 14 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LionOrb size={200} accent={accent} />
        </div>
        {/* orbiting labels */}
        <div style={{ position: 'absolute', top: 18, left: 24, fontFamily: T.mono, fontSize: 9.5,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>
          • {c.weather.summary.toUpperCase()} {c.weather.tempHi}°
        </div>
        <div style={{ position: 'absolute', top: 80, right: 24, fontFamily: T.mono, fontSize: 9.5,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textAlign: 'right' }}>
          • {time === 'morning' ? '6H 12M SLEEP' : time === 'noon' ? '4 MIN WALK' : '6420 STEPS'}
        </div>
        <div style={{ position: 'absolute', bottom: 8, left: 30, fontFamily: T.mono, fontSize: 9.5,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>
          • {persona.tags[0].value.toUpperCase()}
        </div>
      </div>

      {/* Headline + content */}
      <div style={{ padding: '6px 24px 0' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          {c.label}
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 500, color: '#fff', marginTop: 8,
          lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {c.greetingFor(persona.name)}<span style={{ color: accent }}>.</span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }}>
          {c.line}
        </div>
      </div>

      <div style={{ padding: '16px 16px 8px', flex: 1, overflow: 'hidden' }}>
        <V5Card time={time} c={c} />
      </div>

      <div style={{ padding: '0 22px 10px' }}>
        <VoicePill accent={accent} dark />
      </div>
      <div style={{ paddingBottom: SAFE_BOTTOM }}>
        <BottomTabs accent={accent} dark />
      </div>
    </div>
  );
}

function V5Card({ time, c }) {
  const wrap = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 18, padding: 14,
    height: '100%', display: 'flex', flexDirection: 'column',
    backdropFilter: 'blur(10px)',
  };
  const ink = 'rgba(255,255,255,0.92)';
  const sub = 'rgba(255,255,255,0.55)';
  if (time === 'morning') {
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            11:00 · 오늘의 핵심
          </span>
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 19, color: ink, marginTop: 6, fontWeight: 500 }}>
          {c.schedule[0].title} — {c.schedule[0].meta}
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '10px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {c.outfit.map(o => (
            <div key={o} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 4, height: 4, background: c.accent, borderRadius: '50%' }} />
              <span style={{ fontSize: 12, color: ink }}>{o}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginTop: 10, fontSize: 11.5, color: sub, lineHeight: 1.5,
          fontStyle: 'italic', fontFamily: T.serif }}>
          — {c.pulse}
        </div>
      </div>
    );
  }
  if (time === 'noon') {
    const top = c.picks[0];
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: c.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {top.tag} · ★ {top.rating}
          </span>
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 22, color: ink, fontWeight: 500, marginTop: 4 }}>
          {top.name}
        </div>
        <div style={{ fontSize: 12, color: sub, marginTop: 2 }}>{top.kind} · {top.walk} · {top.price}</div>
        <div style={{ marginTop: 10, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: ink, lineHeight: 1.5 }}>
          "{top.why}"
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button style={{
            flex: 1, padding: '12px 0', border: 0, borderRadius: 12,
            background: c.accent, color: '#fff', fontFamily: T.sans, fontSize: 13.5, fontWeight: 600,
          }}>예약 · 결제</button>
          <button style={{
            padding: '12px 14px', borderRadius: 12,
            background: 'transparent', color: ink, fontFamily: T.sans, fontSize: 13, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>대화로</button>
        </div>
      </div>
    );
  }
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {c.recap.slice(0, 3).map(r => (
          <div key={r.k} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ width: 64, fontFamily: T.mono, fontSize: 9.5, color: sub,
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.k}</span>
            <span style={{ fontSize: 12.5, color: ink, flex: 1 }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, color: sub, marginTop: 12, marginBottom: 6 }}>오늘은?</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {c.feel.map((f, i) => (
          <span key={f} style={{
            padding: '6px 11px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            background: i === 0 ? c.accent : 'rgba(255,255,255,0.06)',
            color: i === 0 ? '#fff' : ink,
            border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.10)',
          }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
}

Object.assign(window, {
  V1Quiet, V2Companion, V3Focus, V4Editorial, V5Orb,
});
