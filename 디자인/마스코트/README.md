# 마스코트 — 라이언

프로젝트 마스코트(라이언)의 디자인·애니메이션 자료.

## 현재 상태 (v1)

| 종류 | 파일 | 비고 |
|---|---|---|
| 캐릭터 디자인 | `디자인/ryan_v1_d.svg` | Recraft V4.1 Vector → Figma 보정 (양쪽 귀, 9 path) |
| 애니메이션 | `애니메이션/ryan_v1_f.riv` | Rive Cadet, 4 동작, 배경 투명 |

## 동작 4종 (v1)

| Timeline | Loop | 용도 |
|---|---|---|
| `blink` | One-shot | 눈 깜빡임 — 코드에서 ~3.5s 주기 트리거 |
| `breathe` | Loop | 호흡 — 자동 무한 |
| `bounce` | One-shot | 점프 — 축하·성공 트리거 |
| `tilt` | One-shot | 머리 기울임 — AI 처리중·생각중 |

## 도구

- 디자인: Recraft (Basic, $10/월)
- 애니메이션: Rive (Cadet, $9/월)

## 웹앱 사용법

런타임: `@rive-app/react-canvas`. 컴포넌트는 `web/src/components/RyanMascot.tsx`.

```tsx
"use client";
import { useRef } from "react";
import RyanMascot, { type RyanMascotHandle } from "@/components/RyanMascot";

const mascotRef = useRef<RyanMascotHandle>(null);

<RyanMascot ref={mascotRef} size={160} />

mascotRef.current?.bounce();  // 축하 순간
mascotRef.current?.tilt();    // 생각 중
```

- idle (breathe + blink)는 자동
- bounce·tilt는 ref로 트리거

## 현재 배치된 화면

- `web/src/app/user/signup/account/page.tsx` — 회원가입 첫 단계 Hero (160px, 가입 성공 시 bounce)
- `web/src/app/mascot-test/page.tsx` — 동작 검증용 테스트 페이지

## 파일 정책

활성 버전만 추적. v2 작업 시작 시 v1 파일은 git 히스토리로 보존하고 `_v1` suffix 폴더로 archive.

## 참고

- 마스코트 도구 결정 배경은 자동 메모리 `project_mascot_recraft_rive.md` 참조.
- 기존 라이언 시안 HTML(`디자인/라이언 디자인 시안_v.*.html`)은 메인 화면 디자인 시안으로, 이 폴더의 마스코트 캐릭터 에셋과는 별개다.
