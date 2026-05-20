import type { Messages } from "./ko";

// English copy (en). Tone: casual, friendly. Reviewed copy is the source of truth.
const en: Messages = {
  signup: {
    back: "Back",
    progressAria: "Step {step} of {total}",
    progressCounter: "{step} / {total}",
    cta: {
      next: "Next",
      complete: "Done",
      later: "Skip for now",
      laterWarnSr: "Not recommended. Recommendations may be less accurate.",
      loadingSave: "Saving…",
      loadingSubmit: "Signing up…",
    },
    mode: {
      multi: "□ Multiple",
      single: "○ Pick one",
      multiMin3: "□ Multiple",
    },
    error: {
      network: "Network error",
      signupFailed: "Sign up failed",
      autoLogin: "Auto-login failed. Please try again.",
      emailTaken: "This email is already registered",
      retry: "Please try again later",
    },
    step1: {
      heading: "Create your account",
      subheading: "Start with email and password",
      fields: {
        name: "Name",
        namePlaceholder: "Jane Doe",
        email: "Email",
        emailPlaceholder: "you@example.com",
        password: "Password",
        passwordPlaceholder: "8+ characters",
      },
      sns: {
        divider: "Or with SNS",
        kakaoAria: "Sign up with Kakao",
        naverAria: "Sign up with Naver",
        googleAria: "Sign up with Google",
        appleAria: "Sign up with Apple",
        soon: "Coming soon",
      },
      terms: {
        all: "Agree to all",
        service: "[Required] Terms of Service",
        privacy: "[Required] Privacy Policy",
        marketing: "[Optional] Marketing communications",
        view: "View",
        invalid: "Please agree to the required terms",
        srLabel: "Terms of agreement",
      },
      password: {
        labels: {
          empty: "Enter password",
          veryWeak: "Very weak",
          weak: "Weak",
          fair: "Fair",
          strong: "Strong",
        },
        hint: "Mix letters, numbers, and symbols for safety",
      },
    },
    step2: {
      heading: "How's your health?",
      description: "Select all that apply for better recommendations.",
    },
    step3: {
      heading: "Body goal?",
      description: "Pick one. We'll tune menu suggestions to fit.",
    },
    step4: {
      heading: "How about food?",
      description: "Select all that apply",
      section: {
        diet: "Diet style",
        allergy: "Allergies / off-limits",
      },
      skipDialog: {
        title: "Skip without allergy info?",
        description:
          "We may not filter risky menus. It's safer to enter now.",
        cancel: "Go back",
        confirm: "Yes, skip",
      },
    },
    step5: {
      heading: "Daily life?",
      description: "Just two steps left. Select all that apply.",
      banner: "Two steps left!",
    },
    step6: {
      heading: "What do you do?",
      description: "Pick one. We'll show relevant insights on home.",
    },
    step7: {
      heading: "What interests you?",
      description: "Select your topics. We'll feed them into your home.",
      counterEmpty: "3+ recommended · 0 selected",
      counterSome: "3+ recommended · {count} selected",
      banner: "All set! Your life OS starts now.",
    },
  },
};

export default en;
