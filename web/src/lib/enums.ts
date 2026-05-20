// Life OS.ONE — 공통 enum 키 정의
//
// 회원가입 7단계 mock UI · Prisma Profile 컬럼 · LLM 시스템 프롬프트가
// 모두 이 파일을 단일 진실 공급원으로 참조합니다.
//
// 라벨·iconKey는 사용자 UI 표시용. key는 DB·LLM 컨텍스트에 저장되는 stable identifier.
// 라벨을 바꾸면 UI만 영향, key를 바꾸면 마이그레이션 필요.
//
// iconKey: lucide-react 아이콘 컴포넌트 이름 (EnumIcon이 lookup).
// emoji 필드는 회원가입 외 화면(home/lunch 등 mock)에서 일시적으로 사용. 해당 화면 작업
// 진입 시 line icon으로 일괄 교체 예정.

export type EnumItem<K extends string> = {
  key: K;
  label: string;
  emoji: string;
  iconKey: string;
  description?: string;
};

// ============================================================
// 2단계: 건강 상태 (다중 선택)
// ============================================================
export const HEALTH_TAGS = [
  { key: "cholesterol",  label: "콜레스테롤\n걱정중", emoji: "🥚", iconKey: "Activity" },
  { key: "hypertension", label: "고혈압\n투약중",     emoji: "💧", iconKey: "HeartPulse" },
  { key: "blood-sugar",  label: "혈당\n관리중",        emoji: "🍬", iconKey: "Droplet" },
  { key: "fatigue",      label: "만성\n피곤러",        emoji: "😮‍💨", iconKey: "BatteryLow" },
  { key: "joints",       label: "관절이\n좀…",         emoji: "🦴", iconKey: "Bone" },
  { key: "healthy",      label: "일단은\n멀쩡",         emoji: "💚", iconKey: "Heart" },
] as const satisfies readonly EnumItem<string>[];

export type HealthTagKey = (typeof HEALTH_TAGS)[number]["key"];

// ============================================================
// 3단계: 체형 목표 (단일 선택)
// ============================================================
export const SHAPE_GOALS = [
  { key: "gain",                label: "살찌고\n싶어요",         emoji: "🚩", iconKey: "TrendingUp" },
  { key: "diet",                label: "다이어트\n중",            emoji: "🏃‍♀️", iconKey: "TrendingDown" },
  { key: "bulk",                label: "벌크업\n중",              emoji: "💪", iconKey: "Dumbbell" },
  { key: "never-ending-dieter", label: "네버엔딩\n다이어터",      emoji: "♾️", iconKey: "Infinity" },
  { key: "maintain",            label: "그냥 유지만 할래요",       emoji: "🧘", iconKey: "Equal" },
] as const satisfies readonly EnumItem<string>[];

export type ShapeKey = (typeof SHAPE_GOALS)[number]["key"];

// ============================================================
// 4단계: 식이 성향 (다중 선택)
// ============================================================
export const DIET_TAGS = [
  { key: "vegetarian", label: "채식",        emoji: "🥗", iconKey: "Leaf" },
  { key: "vegan",      label: "비건",        emoji: "🌱", iconKey: "Sprout" },
  { key: "pesco",      label: "페스코",       emoji: "🐟", iconKey: "Fish" },
  { key: "halal",      label: "할랄",        emoji: "☪️", iconKey: "MoonStar" },
  { key: "omnivore",   label: "다 먹어요",    emoji: "🍖", iconKey: "UtensilsCrossed" },
] as const satisfies readonly EnumItem<string>[];

export type DietTagKey = (typeof DIET_TAGS)[number]["key"];

// ============================================================
// 4단계: 알레르기 (다중 선택)
// ============================================================
export const ALLERGY_TAGS = [
  { key: "nuts",      label: "견과류\n알레르기",  emoji: "🥜", iconKey: "Nut" },
  { key: "shellfish", label: "갑각류\n알레르기",  emoji: "🦐", iconKey: "Shell" },
  { key: "lactose",   label: "유당 못 견딤",       emoji: "🥛", iconKey: "MilkOff" },
] as const satisfies readonly EnumItem<string>[];

export type AllergyTagKey = (typeof ALLERGY_TAGS)[number]["key"];

// ============================================================
// 5단계: 라이프스타일 (다중 선택)
// ============================================================
export const LIFESTYLE_TAGS = [
  { key: "caffeine",   label: "카페인\n의존",    emoji: "☕", iconKey: "Coffee" },
  { key: "alcohol",    label: "술 좀\n마셔요",   emoji: "🍺", iconKey: "Wine" },
  { key: "night-owl",  label: "야행성",          emoji: "🌙", iconKey: "Moon" },
  { key: "early-bird", label: "새벽형",          emoji: "🌅", iconKey: "Sunrise" },
] as const satisfies readonly EnumItem<string>[];

export type LifestyleTagKey = (typeof LIFESTYLE_TAGS)[number]["key"];

// ============================================================
// 6단계: 직업 (단일 선택)
// ============================================================
export const JOBS = [
  { key: "student",    label: "학생",       emoji: "🎓",     iconKey: "GraduationCap", description: "전공·시험·공모전" },
  { key: "employee",   label: "직장인",     emoji: "💼",     iconKey: "Briefcase",     description: "경제·산업·시사" },
  { key: "medical",    label: "의료인",     emoji: "👨‍⚕️",   iconKey: "Stethoscope",   description: "논문·학회·가이드" },
  { key: "freelancer", label: "프리랜서",   emoji: "💻",     iconKey: "Laptop",        description: "스타트업·기술·세션" },
  { key: "parent",     label: "부모",       emoji: "👶",     iconKey: "Baby",          description: "육아·교육·학교" },
  { key: "senior",     label: "시니어",     emoji: "👴",     iconKey: "UserRound",     description: "건강·복지·동네" },
  { key: "etc",        label: "기타 / 직접 선택할게요", emoji: "✨",     iconKey: "MoreHorizontal", description: "" },
] as const satisfies readonly EnumItem<string>[];

export type JobKey = (typeof JOBS)[number]["key"];

// ============================================================
// 7단계: 관심사 (다중 선택)
// ============================================================
export const INTERESTS = [
  { key: "economy",       label: "경제·시사",   emoji: "📈", iconKey: "TrendingUp" },
  { key: "entertainment", label: "엔터·연예",   emoji: "🎬", iconKey: "Film" },
  { key: "sports",        label: "스포츠",       emoji: "⚽", iconKey: "Trophy" },
  { key: "it",            label: "IT·테크",      emoji: "💻", iconKey: "Cpu" },
  { key: "health",        label: "의료·헬스",   emoji: "🩺", iconKey: "HeartPulse" },
  { key: "fashion",       label: "패션·라이프", emoji: "👗", iconKey: "Shirt" },
  { key: "self-dev",      label: "자기계발",    emoji: "📚", iconKey: "BookOpen" },
  { key: "parenting",     label: "육아·교육",   emoji: "👶", iconKey: "Baby" },
  { key: "food",          label: "음식·요리",   emoji: "🍜", iconKey: "ChefHat" },
  { key: "travel",        label: "여행",         emoji: "✈️", iconKey: "Plane" },
] as const satisfies readonly EnumItem<string>[];

export type InterestKey = (typeof INTERESTS)[number]["key"];

// ============================================================
// 헬퍼: key → label/emoji lookup
// ============================================================
export function findItem<K extends string>(
  list: readonly EnumItem<K>[],
  key: K | string | null | undefined,
): EnumItem<K> | undefined {
  if (!key) return undefined;
  return list.find((x) => x.key === key);
}
