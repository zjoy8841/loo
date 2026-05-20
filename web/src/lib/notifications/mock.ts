// v0.1 데모용 mock 알림 데이터.
// 실제 운영은 DB·서버에서 fetch. 본 파일은 시연 시 일관된 화면 노출용.

export type NotificationKind = "event" | "schedule" | "system";
export type NotificationStatus = "unread" | "read" | "actioned";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string; // 표시용 ("방금", "12:25", "어제" 등)
  status: NotificationStatus;
  target?: { type: "reservation" | "menu" | "plan"; id: string };
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n-001",
    kind: "event",
    title: "5분 후 예약 시간이에요",
    body: "B카페 · 강남점 12:30 · 도보 3분. 길찾기를 미리 띄워드릴게요.",
    time: "방금",
    status: "unread",
    target: { type: "reservation", id: "LO-26052012-742" },
  },
  {
    id: "n-002",
    kind: "event",
    title: "식당이 예약을 수락했어요",
    body: "B카페 · 강남점에서 12:30에 자리·메뉴를 준비해둡니다.",
    time: "12:26",
    status: "read",
    target: { type: "reservation", id: "LO-26052012-742" },
  },
  {
    id: "n-003",
    kind: "schedule",
    title: "오늘 점심 추천이 도착해요",
    body: "매일 12:00 라이언 자동 추천. 단백질 부족 페르소나 기반.",
    time: "12:00 예정",
    status: "read",
    target: { type: "plan", id: "rule-lunch-pick" },
  },
  {
    id: "n-004",
    kind: "event",
    title: "결제가 완료됐어요",
    body: "₩9,800 · 토스페이. 식당 응답 대기 중이에요.",
    time: "12:24",
    status: "actioned",
    target: { type: "reservation", id: "LO-26052012-742" },
  },
  {
    id: "n-005",
    kind: "system",
    title: "앱이 v0.1.2로 업데이트됐어요",
    body: "회원가입 흐름이 빨라졌고 그레이스케일 톤이 일관되게 적용됐어요.",
    time: "어제",
    status: "read",
  },
];

export function findNotification(id: string): Notification | undefined {
  return NOTIFICATIONS.find((n) => n.id === id);
}

export type ScheduleRule = {
  id: string;
  title: string;
  pattern: "daily" | "weekly" | "weekday" | "once";
  patternLabel: string;
  time: string;
  nextTrigger: string;
  enabled: boolean;
};

export const SCHEDULE_RULES: ScheduleRule[] = [
  {
    id: "rule-lunch-pick",
    title: "점심 메뉴 추천",
    pattern: "weekday",
    patternLabel: "평일 · 매일",
    time: "12:00",
    nextTrigger: "내일 12:00",
    enabled: true,
  },
  {
    id: "rule-morning-brief",
    title: "아침 브리핑",
    pattern: "daily",
    patternLabel: "매일",
    time: "07:00",
    nextTrigger: "내일 07:00",
    enabled: true,
  },
  {
    id: "rule-friday-review",
    title: "이번 주 회고",
    pattern: "weekly",
    patternLabel: "매주 금요일",
    time: "19:00",
    nextTrigger: "금요일 19:00",
    enabled: false,
  },
];

export function findRule(id: string): ScheduleRule | undefined {
  return SCHEDULE_RULES.find((r) => r.id === id);
}
