// 회원가입 Profile → 메인 화면 추천 분기 (v0.1 시연용).
// LLM 없이 정적 규칙만으로 "내 정보가 반영됐다" 느낌을 만든다.
//
// 우선순위:
//   1) allergyTags 포함 메뉴 제외 (안전성)
//   2) dietTags 호환 메뉴 선별 (제약)
//   3) healthTags 매칭 수로 정렬 (선호)

import {
  HEALTH_TAGS,
  DIET_TAGS,
  SHAPE_GOALS,
  type AllergyTagKey,
  type DietTagKey,
  type HealthTagKey,
} from "@/lib/enums";
import { MENUS, type MenuMock } from "./menus";

export type RecommendationProfile = {
  healthTags: string[];
  dietTags: string[];
  allergyTags: string[];
  shapeKey: string | null;
};

// 같은 user는 항상 같은 메뉴를 보도록(시연 일관성), 같은 점수 메뉴 중
// user별로 다른 winner가 나오도록 deterministic hash.
function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function pickMenu(
  profile: RecommendationProfile,
  seed?: string,
): MenuMock {
  const { healthTags, dietTags, allergyTags } = profile;

  const safe = MENUS.filter(
    (m) => !m.allergens.some((a) => allergyTags.includes(a)),
  );

  const dietCompatible =
    dietTags.length > 0
      ? safe.filter((m) =>
          dietTags.some((d) => m.diets.includes(d as DietTagKey)),
        )
      : safe;

  const pool = dietCompatible.length > 0 ? dietCompatible : safe;

  const scored = pool.map((m) => ({
    menu: m,
    score: m.healthFit.filter((h) => healthTags.includes(h)).length,
  }));

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (seed) return hashCode(seed + a.menu.id) - hashCode(seed + b.menu.id);
    return 0;
  });

  return scored[0]?.menu ?? MENUS[0];
}

function oneLineLabel(label: string): string {
  return label.replace(/\n/g, " ");
}

// healthTags 우선, 부족하면 dietTags·shapeKey로 보강. 최대 3개.
export function buildPersonaChips(profile: RecommendationProfile): string[] {
  const chips: string[] = [];

  for (const tag of profile.healthTags.slice(0, 2)) {
    const item = HEALTH_TAGS.find((x) => x.key === (tag as HealthTagKey));
    if (item && item.key !== "healthy") chips.push(oneLineLabel(item.label));
  }

  if (chips.length < 2 && profile.dietTags.length > 0) {
    const item = DIET_TAGS.find((x) => x.key === (profile.dietTags[0] as DietTagKey));
    if (item && item.key !== "omnivore") chips.push(oneLineLabel(item.label));
  }

  if (chips.length < 1 && profile.shapeKey) {
    const item = SHAPE_GOALS.find((x) => x.key === profile.shapeKey);
    if (item && item.key !== "maintain") chips.push(oneLineLabel(item.label));
  }

  if (chips.length === 0) chips.push("당신을 알아가는 중");

  return chips.slice(0, 3);
}

// 시점 기반 인사이트 한 줄 (점심 generic). LLM·캘린더 연결은 v0.2.
export function buildInsight(now: Date = new Date()): string {
  const h = now.getHours();
  if (h < 10) return "오늘 일과까지 약 1시간";
  if (h < 14) return "오후 일과까지 충분한 시간";
  if (h < 18) return "퇴근까지 남은 오후";
  return "오늘 하루 마무리";
}

export type { MenuMock } from "./menus";

export type AllergyKey = AllergyTagKey;
