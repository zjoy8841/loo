// Life OS.ONE — 페르소나 헬퍼
//
// DB Profile의 raw 데이터를 메인 화면·LLM 시스템 프롬프트에 쓰기 좋은
// 사람 친화 형태로 변환합니다. enum keys → emoji + label lookup.

import {
  HEALTH_TAGS,
  SHAPE_GOALS,
  DIET_TAGS,
  LIFESTYLE_TAGS,
  JOBS,
  INTERESTS,
  findItem,
} from "./enums";

export type ProfileLike = {
  shapeKey?: string | null;
  jobKey?: string | null;
  healthTags: string[];
  dietTags: string[];
  allergyTags: string[];
  lifestyleTags: string[];
  interests: string[];
};

export type Chip = { emoji: string; label: string };

// JSON-as-String 컬럼을 안전하게 array로 풀기.
export function parseJsonArray(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

// 메인 화면의 "나의 페르소나" 칩 (최대 N개).
// 우선순위: health(걱정) > shape > diet > lifestyle.
// "healthy"(일단은 멀쩡)는 정보값 낮으므로 제외.
export function getPersonaChips(profile: ProfileLike, max = 4): Chip[] {
  const chips: Chip[] = [];

  for (const k of profile.healthTags) {
    if (k === "healthy") continue;
    const it = findItem(HEALTH_TAGS, k);
    if (it) chips.push({ emoji: it.emoji, label: it.label.replace(/\n/g, " ") });
  }
  if (profile.shapeKey) {
    const it = findItem(SHAPE_GOALS, profile.shapeKey);
    if (it) chips.push({ emoji: it.emoji, label: it.label.replace(/\n/g, " ") });
  }
  for (const k of profile.dietTags) {
    const it = findItem(DIET_TAGS, k);
    if (it) chips.push({ emoji: it.emoji, label: it.label });
  }
  for (const k of profile.lifestyleTags) {
    const it = findItem(LIFESTYLE_TAGS, k);
    if (it) chips.push({ emoji: it.emoji, label: it.label.replace(/\n/g, " ") });
  }

  return chips.slice(0, max);
}

// 메인 화면 메타 라인의 "💼 직장인 · 📈 경제 · 💻 IT · 📚 자기계발"
export function getMetaChips(profile: ProfileLike, maxInterests = 3): Chip[] {
  const out: Chip[] = [];
  if (profile.jobKey) {
    const j = findItem(JOBS, profile.jobKey);
    if (j && j.key !== "etc") out.push({ emoji: j.emoji, label: j.label });
  }
  for (const k of profile.interests.slice(0, maxInterests)) {
    const it = findItem(INTERESTS, k);
    if (it) out.push({ emoji: it.emoji, label: it.label });
  }
  return out;
}

// 시간대별 인사
export function getGreetingForHour(hour: number): { phrase: string; emoji: string } {
  if (hour < 11) return { phrase: "좋은 아침이에요", emoji: "☀️" };
  if (hour < 14) return { phrase: "맛있는 점심 드세요", emoji: "🍱" };
  if (hour < 18) return { phrase: "좋은 오후예요", emoji: "🌤️" };
  if (hour < 22) return { phrase: "좋은 저녁이에요", emoji: "🌆" };
  return { phrase: "오늘 하루 수고하셨어요", emoji: "🌙" };
}

// 이름 → 1글자 아바타 (한글은 첫 글자, 영문은 첫 두 글자 대문자)
export function getAvatarInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const first = trimmed[0];
  // 한글이면 그대로 한 글자, 영문이면 대문자
  return /[가-힣]/.test(first) ? first : first.toUpperCase();
}
