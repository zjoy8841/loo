"use client";

import { useEffect, useImperativeHandle } from "react";
import { useRive } from "@rive-app/react-canvas";

export interface RyanMascotHandle {
  bounce: () => void;
  tilt: () => void;
}

interface RyanMascotProps {
  ref?: React.Ref<RyanMascotHandle>;
  className?: string;
  size?: number;
  /** 평균 깜빡임 주기(ms). 실제 사자처럼 약간의 랜덤성 추가됨. */
  blinkIntervalMs?: number;
}

export default function RyanMascot({
  ref,
  className = "",
  size = 200,
  blinkIntervalMs = 3500,
}: RyanMascotProps) {
  const { RiveComponent, rive } = useRive({
    src: "/mascot/ryan_v1_f.riv",
    animations: ["blink", "breathe"],
    autoplay: true,
  });

  useImperativeHandle(
    ref,
    () => ({
      bounce: () => {
        rive?.play("bounce");
      },
      tilt: () => {
        rive?.play("tilt");
      },
    }),
    [rive],
  );

  useEffect(() => {
    if (!rive) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const jitter = Math.random() * 1500;
      timeoutId = setTimeout(() => {
        rive.play("blink");
        scheduleNext();
      }, blinkIntervalMs + jitter);
    };
    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [rive, blinkIntervalMs]);

  return (
    <div className={className} style={{ width: size, height: size }}>
      <RiveComponent />
    </div>
  );
}
