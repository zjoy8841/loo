import type { Messages } from "./ko";
import en from "./en";

// vi (Tiếng Việt). description §9: "vi 키는 일괄 fallback to en — vi 카피라이터 검수 후 별도 추가".
// 현재 모든 키 en 그대로. 검수된 카피가 들어오면 이 객체만 채우면 됨.
const vi: Messages = en;

export default vi;
