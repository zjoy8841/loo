"use client";

import { useRef } from "react";
import RyanMascot, { type RyanMascotHandle } from "@/components/RyanMascot";

export default function MascotTestPage() {
  const mascotRef = useRef<RyanMascotHandle>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900">라이언 마스코트 테스트</h1>
      <RyanMascot ref={mascotRef} size={300} />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => mascotRef.current?.bounce()}
          className="px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 active:scale-95 transition shadow-lg shadow-emerald-500/30"
        >
          🎉 Bounce
        </button>
        <button
          type="button"
          onClick={() => mascotRef.current?.tilt()}
          className="px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 active:scale-95 transition shadow-lg shadow-indigo-500/30"
        >
          🤔 Tilt
        </button>
      </div>
      <p className="text-sm text-gray-600">
        호흡(loop) + 깜빡임(랜덤 jitter). 버튼으로 점프/기울임 트리거.
      </p>
      <p className="text-xs text-gray-400">
        파일: <code>/mascot/ryan_v1_f.riv</code> · 애니메이션:{" "}
        <code>blink</code> + <code>breathe</code> + <code>bounce</code> +{" "}
        <code>tilt</code>
      </p>
    </div>
  );
}
