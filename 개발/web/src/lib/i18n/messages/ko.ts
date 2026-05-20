// 회원가입 도메인 메시지 — ko (기준 언어)
// description §9: 카피 길이 변동 시 카드 라벨 1줄 강제 (6단계만 sublabel 2줄).

const ko = {
  signup: {
    back: "이전",
    progressAria: "{step}단계 / {total}단계",
    progressCounter: "{step} / {total}",
    cta: {
      next: "다음",
      complete: "완료",
      later: "건너뛰기",
      laterWarnSr: "권장하지 않습니다. 정확도가 떨어질 수 있어요.",
      loadingSave: "저장 중…",
      loadingSubmit: "가입 중…",
    },
    mode: {
      multi: "□ 복수 선택 가능",
      single: "○ 1개만 선택",
      multiMin3: "□ 복수 선택",
    },
    error: {
      network: "네트워크 오류가 발생했어요",
      signupFailed: "가입에 실패했어요",
      autoLogin: "자동 로그인에 실패했어요. 다시 시도해주세요.",
      emailTaken: "이미 가입된 이메일이에요",
      retry: "잠시 후 다시 시도해주세요",
    },
    step1: {
      heading: "계정을 만들어요",
      subheading: "이메일과 비밀번호로 시작하세요",
      fields: {
        name: "이름",
        namePlaceholder: "홍길동",
        email: "이메일",
        emailPlaceholder: "you@example.com",
        password: "비밀번호",
        passwordPlaceholder: "8자 이상",
      },
      sns: {
        divider: "또는 SNS로",
        kakaoAria: "카카오로 가입",
        naverAria: "네이버로 가입",
        googleAria: "구글로 가입",
        appleAria: "Apple로 가입",
        soon: "곧 지원 예정이에요",
      },
      terms: {
        all: "전체 동의",
        service: "[필수] 서비스 이용약관",
        privacy: "[필수] 개인정보 처리방침",
        marketing: "[선택] 마케팅 정보 수신",
        view: "보기",
        invalid: "필수 약관에 동의해주세요",
        srLabel: "약관 동의",
      },
      password: {
        labels: {
          empty: "비밀번호 입력",
          veryWeak: "매우 약함",
          weak: "약함",
          fair: "보통",
          strong: "강함",
        },
        hint: "영문·숫자·특수문자 섞으면 더 안전해요",
      },
    },
    step2: {
      heading: "몸 상태는 어떠세요?",
      description: "해당되는 것 모두 골라주세요. 추천이 더 정확해져요.",
    },
    step3: {
      heading: "요즘 체형 목표는요?",
      description: "하나만 골라주세요. 메뉴 추천에 활용돼요.",
    },
    step4: {
      heading: "음식은 어떠세요?",
      description: "해당되는 것 모두 골라주세요",
      section: {
        diet: "식이 성향",
        allergy: "알레르기 / 못 먹는 것",
      },
      skipDialog: {
        title: "알레르기 정보 없이 건너뛸까요?",
        description:
          "추천에서 알레르기 메뉴가 걸러지지 않을 수 있어요. 지금 입력하면 더 안전해요.",
        cancel: "다시 입력",
        confirm: "네, 건너뛸게요",
      },
    },
    step5: {
      heading: "평소 라이프는요?",
      description: "이제 두 단계 남았어요. 모두 골라주세요.",
      banner: "두 단계 남았어요!",
    },
    step6: {
      heading: "어떻게 일하세요?",
      description: "하나만 골라주세요. 직업에 맞는 인사이트와 뉴스를 메인에 보여드려요.",
    },
    step7: {
      heading: "어떤 소식이 궁금하세요?",
      description:
        "관심 있는 분야 모두 골라주세요. 메인 화면의 헤드라인에 반영돼요.",
      counterEmpty: "최소 3개 권장 · 선택 0개",
      counterSome: "최소 3개 권장 · 선택 {count}개",
      banner: "완료! 이제 나만의 라이프 OS가 시작돼요.",
    },
  },
};

export type Messages = typeof ko;
export default ko;
