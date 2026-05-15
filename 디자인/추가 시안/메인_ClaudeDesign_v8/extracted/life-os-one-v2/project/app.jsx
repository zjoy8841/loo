// app.jsx — Mounts the design canvas with 5 Lion home-screen variations,
// plus a Tweaks panel for time-of-day, persona name, and a focused-artboard
// override.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "time": "morning",
  "personaName": "지원",
  "accent": "default",
  "v2Mood": "warm",
  "v5Dark": "dusk"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Persona derived from tweaks
  const persona = React.useMemo(() => ({
    ...PERSONA,
    name: tweaks.personaName || PERSONA.name,
    greetingName: (tweaks.personaName || PERSONA.name) + '님',
  }), [tweaks.personaName]);

  const time = tweaks.time || 'morning';

  // Common framing: each variation wraps inside an IOSDevice.
  const cards = [
    {
      id: 'v1', label: 'A · Quiet Brief',
      desc: '미니멀 에디토리얼. 한 장의 카드, 부드러운 톤, 명확한 위계.',
      render: () => <V1Quiet time={time} persona={persona} />,
    },
    {
      id: 'v2', label: 'B · Companion',
      desc: '사자가 캐릭터로. 인사말이 말풍선으로 등장. 따뜻한 종이 톤.',
      render: () => <V2Companion time={time} persona={persona} />,
    },
    {
      id: 'v3', label: 'C · Single Focus',
      desc: '한 장의 포스터처럼. 세리프 헤드라인 + 글래스 카드 하나.',
      render: () => <V3Focus time={time} persona={persona} />,
    },
    {
      id: 'v4', label: 'D · Editorial',
      desc: '신문 편집. 마스트헤드 + 컬럼 + 활자 위주. 글자가 화면을 끈다.',
      render: () => <V4Editorial time={time} persona={persona} />,
    },
    {
      id: 'v5', label: 'E · Presence (Dark)',
      desc: '라이언이 빛나는 오브로 존재. 다크 모드, 실험적, 음성-중심.',
      render: () => <V5Orb time={time} persona={persona} />,
    },
  ];

  const AW = 432, AH = 940; // artboard size

  return (
    <>
      <DesignCanvas>
        <DCSection
          id="intro"
          title="라이언 — 메인 화면 (U-03)"
          subtitle="컨벤셔널 → 실험적 순서. 시점·페르소나는 우측 Tweaks 패널에서 바꿔보세요."
        >
          {cards.map(card => (
            <DCArtboard key={card.id} id={card.id} label={card.label} width={AW} height={AH}>
              <ArtboardShell desc={card.desc}>
                <IOSDevice width={402} height={874}>
                  {card.render()}
                </IOSDevice>
              </ArtboardShell>
            </DCArtboard>
          ))}
        </DCSection>

        <DCSection
          id="system"
          title="시스템"
          subtitle="다섯 안에 공통으로 쓰인 토큰 · 사자 표현 · 호출 인터랙션."
        >
          <DCArtboard id="palette" label="Tokens" width={520} height={520}>
            <TokensBoard />
          </DCArtboard>
          <DCArtboard id="mascots" label="Lion · 5 expressions" width={520} height={520}>
            <MascotBoard />
          </DCArtboard>
          <DCArtboard id="voice" label="음성 호출" width={520} height={520}>
            <VoiceBoard />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="시점">
          <TweakRadio
            label="시점"
            value={tweaks.time}
            options={[
              { value: 'morning', label: '아침' },
              { value: 'noon',    label: '점심' },
              { value: 'evening', label: '저녁' },
            ]}
            onChange={v => setTweak('time', v)}
          />
        </TweakSection>

        <TweakSection label="페르소나">
          <TweakText
            label="이름"
            value={tweaks.personaName}
            placeholder="지원"
            onChange={v => setTweak('personaName', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function ArtboardShell({ desc, children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#E8E4DC',
      display: 'flex', flexDirection: 'column',
      padding: 14,
      fontFamily: T.sans,
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </div>
      <div style={{
        marginTop: 12, fontSize: 11.5, color: T.mute, lineHeight: 1.5,
        fontFamily: T.mono, letterSpacing: '0.02em', textAlign: 'center',
        padding: '0 12px',
      }}>
        {desc}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tokens / Mascots / Voice boards
// ─────────────────────────────────────────────────────────────
function TokensBoard() {
  const swatch = (name, hex, label) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: hex, border: '1px solid rgba(0,0,0,0.05)' }} />
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{name}</div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute }}>{hex} · {label}</div>
      </div>
    </div>
  );
  return (
    <div style={{ width: '100%', height: '100%', padding: 28, background: T.bg, fontFamily: T.sans, color: T.ink }}>
      <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>
        라이언 · 토큰
      </div>
      <div style={{ fontSize: 12.5, color: T.mute, marginTop: 4 }}>
        Off-white 베이스 + 시점별 단색 액센트.
      </div>

      <div style={{ marginTop: 22, fontFamily: T.mono, fontSize: 10.5, color: T.mute,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>SURFACE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {swatch('Bg',    T.bg,    'warm off-white')}
        {swatch('Paper', T.paper, 'card · paper')}
        {swatch('Ink',   T.ink,   'primary text')}
        {swatch('Mute',  T.mute,  'secondary text')}
      </div>

      <div style={{ marginTop: 22, fontFamily: T.mono, fontSize: 10.5, color: T.mute,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>ACCENT — TIME OF DAY</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {swatch('Morning', T.morning, '아침')}
        {swatch('Noon',    T.noon,    '점심')}
        {swatch('Evening', T.evening, '저녁')}
      </div>

      <div style={{ marginTop: 22, fontFamily: T.mono, fontSize: 10.5, color: T.mute,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>TYPE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>
          오늘의 라이언
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 14 }}>
          본문은 Pretendard. 안정적이고 가독성 좋음.
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, letterSpacing: '0.04em' }}>
          MONO · timestamp · taxonomy
        </div>
      </div>
    </div>
  );
}

function MascotBoard() {
  const items = [
    { node: <LionFace size={92} accent={T.morning} />,    label: 'A · Geometric face',     desc: 'V2 Companion에서 사용' },
    { node: <LionMonogram size={92} accent={T.noon} />,    label: 'B · Monogram',          desc: 'V3 Single Focus에서 사용' },
    { node: <LionOrb size={120} accent={T.evening} />,     label: 'C · Orb (presence)',    desc: 'V5 Dark에서 사용' },
    { node: <LionLine size={92} accent={T.morning} />,     label: 'D · Line drawn',        desc: 'V4 Editorial에서 사용' },
    { node: <LionWordmark size={1.2} accent={T.evening} />,label: 'E · Wordmark',          desc: 'V1 Quiet에서 사용' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', padding: 28, background: T.bg, fontFamily: T.sans, color: T.ink, overflow: 'auto' }}>
      <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em' }}>
        라이언 · 다섯 가지 표현
      </div>
      <div style={{ fontSize: 12.5, color: T.mute, marginTop: 4 }}>
        한 캐릭터를 각 안의 톤에 맞춰 다른 추상도로 그렸어요.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
        {items.map(it => (
          <div key={it.label} style={{
            background: '#fff', borderRadius: 14, padding: 14,
            border: `1px solid ${T.line}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            minHeight: 160,
          }}>
            <div style={{ height: 110, display: 'flex', alignItems: 'center' }}>{it.node}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.ink2, letterSpacing: '0.06em' }}>{it.label}</div>
            <div style={{ fontSize: 11, color: T.mute, textAlign: 'center' }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceBoard() {
  return (
    <div style={{ width: '100%', height: '100%', padding: 28, background: T.bg, fontFamily: T.sans, color: T.ink, overflow: 'auto' }}>
      <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em' }}>
        "라이언아" — 음성 호출
      </div>
      <div style={{ fontSize: 12.5, color: T.mute, marginTop: 4 }}>
        모든 화면 하단에 존재. 호출하면 풀스크린 음성 모드로 전환.
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          기본 (Pill)
        </div>
        <VoicePill accent={T.morning} />

        <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
          블록 (Editorial)
        </div>
        <VoicePill accent={T.noon} variant="block" />

        <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.mute, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
          다크 (Presence)
        </div>
        <div style={{ background: '#14100C', padding: 16, borderRadius: 14 }}>
          <VoicePill accent={T.evening} dark />
        </div>
      </div>

      <div style={{ marginTop: 22, padding: '12px 14px', background: '#fff', borderRadius: 12,
        border: `1px solid ${T.line}`, fontSize: 12.5, color: T.ink2, lineHeight: 1.55 }}>
        <span style={{ color: T.morning, fontWeight: 600 }}>호출 흐름:</span> "라이언아" → 풀스크린 음성 → 라이언이 듣고 답변 → 필요한 카드를 메인으로 끌어옴.
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
