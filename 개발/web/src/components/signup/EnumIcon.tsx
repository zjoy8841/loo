"use client";

import {
  Activity,
  HeartPulse,
  Droplet,
  BatteryLow,
  Bone,
  Heart,
  TrendingUp,
  TrendingDown,
  Dumbbell,
  Infinity as InfinityIcon,
  Equal,
  Leaf,
  Sprout,
  Fish,
  MoonStar,
  UtensilsCrossed,
  Nut,
  Shell,
  MilkOff,
  Coffee,
  Wine,
  Moon,
  Sunrise,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Laptop,
  Baby,
  UserRound,
  MoreHorizontal,
  Film,
  Trophy,
  Cpu,
  Shirt,
  BookOpen,
  ChefHat,
  Plane,
  Target,
  Sparkles,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  HeartPulse,
  Droplet,
  BatteryLow,
  Bone,
  Heart,
  TrendingUp,
  TrendingDown,
  Dumbbell,
  Infinity: InfinityIcon,
  Equal,
  Leaf,
  Sprout,
  Fish,
  MoonStar,
  UtensilsCrossed,
  Nut,
  Shell,
  MilkOff,
  Coffee,
  Wine,
  Moon,
  Sunrise,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Laptop,
  Baby,
  UserRound,
  MoreHorizontal,
  Film,
  Trophy,
  Cpu,
  Shirt,
  BookOpen,
  ChefHat,
  Plane,
  Target,
  Sparkles,
};

/**
 * enum.iconKey → lucide 아이콘 매핑.
 * 키가 매핑에 없으면 HelpCircle fallback (dev 중 발견용).
 *
 * stroke 기반 라인 아이콘. 디자인 컨펌 후 컬러·두께·자체 SVG 등으로 교체 가능.
 */
export default function EnumIcon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className = "",
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? HelpCircle;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={className}
    />
  );
}
