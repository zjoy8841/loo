// v0.1 시연용 점심 메뉴 mock 풀.
// 각 메뉴는 (a) 호환 dietTags (b) 포함된 allergyTags (c) 적합한 healthTags 메타로
// 회원가입 입력값에 따라 분기 추천된다.

import type {
  AllergyTagKey,
  DietTagKey,
  HealthTagKey,
} from "@/lib/enums";

export type MenuMock = {
  id: string;
  name: string;
  merchant: string;
  walkMin: number;
  price: number;
  kcal: number;
  proteinG: number;
  diets: readonly DietTagKey[];
  allergens: readonly AllergyTagKey[];
  healthFit: readonly HealthTagKey[];
};

export const MENUS: readonly MenuMock[] = [
  {
    id: "m-chicken-salad",
    name: "닭가슴살 샐러드",
    merchant: "B카페 · 강남점",
    walkMin: 3,
    price: 9800,
    kcal: 420,
    proteinG: 32,
    diets: ["pesco", "omnivore"],
    allergens: [],
    healthFit: ["cholesterol", "blood-sugar", "fatigue"],
  },
  {
    id: "m-tofu-bibim",
    name: "두부 비빔밥",
    merchant: "한끼 · 강남점",
    walkMin: 5,
    price: 8500,
    kcal: 480,
    proteinG: 22,
    diets: ["vegetarian", "vegan", "pesco", "halal", "omnivore"],
    allergens: [],
    healthFit: ["cholesterol", "blood-sugar", "healthy"],
  },
  {
    id: "m-salmon-poke",
    name: "연어 포케",
    merchant: "포케하우스 · 역삼점",
    walkMin: 4,
    price: 11500,
    kcal: 520,
    proteinG: 28,
    diets: ["pesco", "omnivore"],
    allergens: [],
    healthFit: ["cholesterol", "hypertension", "fatigue"],
  },
  {
    id: "m-veg-curry",
    name: "야채 카레",
    merchant: "커리하우스 · 강남점",
    walkMin: 6,
    price: 9000,
    kcal: 560,
    proteinG: 14,
    diets: ["vegetarian", "vegan", "halal", "omnivore"],
    allergens: [],
    healthFit: ["healthy", "joints"],
  },
  {
    id: "m-shrimp-pad",
    name: "쉬림프 팟타이",
    merchant: "타이키친 · 선릉점",
    walkMin: 7,
    price: 12000,
    kcal: 640,
    proteinG: 24,
    diets: ["pesco", "omnivore"],
    allergens: ["shellfish"],
    healthFit: ["fatigue"],
  },
  {
    id: "m-beef-bulgogi",
    name: "소불고기 정식",
    merchant: "한식다움 · 강남점",
    walkMin: 5,
    price: 13500,
    kcal: 720,
    proteinG: 36,
    diets: ["omnivore", "halal"],
    allergens: [],
    healthFit: ["fatigue", "joints"],
  },
  {
    id: "m-acai-bowl",
    name: "아사이 너트 볼",
    merchant: "그릭브런치 · 압구정",
    walkMin: 8,
    price: 11800,
    kcal: 380,
    proteinG: 12,
    diets: ["vegetarian", "vegan", "pesco", "omnivore"],
    allergens: ["nuts"],
    healthFit: ["healthy", "blood-sugar"],
  },
  {
    id: "m-yogurt-bowl",
    name: "그릭요거트 볼",
    merchant: "그릭브런치 · 압구정",
    walkMin: 8,
    price: 8500,
    kcal: 320,
    proteinG: 18,
    diets: ["vegetarian", "pesco", "omnivore"],
    allergens: ["lactose"],
    healthFit: ["blood-sugar", "healthy"],
  },
] as const;

export function findMenuById(id: string): MenuMock | undefined {
  return MENUS.find((m) => m.id === id);
}
