# _compare — 라이언 메인 화면 11 시안 통합 보고 보드

`index.html` 더블클릭만 하면 v6.10 + v7 5개 + v8 5개 = 11 시안이 한 화면에 다 보입니다.

## 사용

1. **`index.html` 더블클릭** → 브라우저 열림
2. 인터넷 연결 필요 (React/Babel/Pretendard/Noto/Spectral CDN 로드 — 첫 로드 5~10초)
3. iframe lazy loading 적용 — 스크롤하며 순차 로드
4. **인터랙션도 작동** — 점심 카드 탭 → 시트, 음성 dock 탭 → 풀스크린 등 (자식 HTML 자체가 React 앱)
5. 각 시안 우하단 "열기 →" 클릭 시 그 시안만 단독으로 새 창

## 만약 file:// 차단되면 (보안 정책 등)

PowerShell 한 줄:
```powershell
npx --yes http-server "C:\Users\USER\documents\workspace\lifeosone\디자인\추가 시안\_compare" -p 8769 -c-1
```
그리고 http://127.0.0.1:8769 열기.

## 파일 구조

```
_compare/
├── README.md         (이 문서)
├── index.html        ⭐ 마스터 — 11 iframe grid (다크 테마)
├── v6_10.html        v6 series best (Stitch · iOS HIG, 11KB self-contained)
├── v7_A~E.html       Claude Design 따뜻 톤 5개 (각 ~71KB · React+Babel inline)
└── v8_A~E.html       Claude Design 정갈 톤 5개 (각 ~85KB · React+Babel inline)
```

자식 HTML들은 모두 self-contained — 외부 의존은 React/Babel/폰트 CDN뿐. 각 시안의 변경은 원본(`메인_iOS_HIG_v6/iterations/v6.10.html`, `메인_ClaudeDesign_v7/extracted/.../variations.jsx`, 동 v8)을 수정한 뒤 재빌드 (PowerShell 스크립트는 세션 노트 참조).

## 의도

도구·방향이 다른 11 시안을 **한 자리에서 비교**하기 위한 보고 자료.

| 그룹 | 도구 | 톤·방향 |
|---|---|---|
| v6.10 | Stitch · iOS HIG | Editorial Blue, 10회 critique iteration의 결실 |
| v7 (5개) | Claude Design | 따뜻 (Soft Stack / Conversation / Orbit / Editorial / Card Fan) |
| v8 (5개) | Claude Design | 정갈 + "음성 메인" 강제 (Quiet / Companion / Single Focus / Editorial / Dark Orb) |

## 관련 세션 노트
- `SESSION-2026-05-15-ios-hig-iteration.md` — v6 10회 iteration
- `SESSION-2026-05-15-claude-design-comparison.md` — v7·v8 + 이 보드
