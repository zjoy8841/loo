"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

export type MapMarker = {
  lat: number;
  lng: number;
  name: string;
  category?: string;
};

const DEFAULT_MARKERS: MapMarker[] = [
  { lat: 37.5012, lng: 127.0396, name: "B카페 강남점", category: "카페·샐러드" },
  { lat: 37.4979, lng: 127.0276, name: "SUBWAY 강남2호점", category: "양식" },
  { lat: 37.4995, lng: 127.0301, name: "C식당 (예시)", category: "한식" },
  { lat: 37.502, lng: 127.027, name: "D키친 (예시)", category: "지중해식" },
];

const DEFAULT_CENTER = { lat: 37.4995, lng: 127.0335 };

export default function KakaoMap({
  markers = DEFAULT_MARKERS,
  center = DEFAULT_CENTER,
  level = 4,
}: {
  markers?: MapMarker[];
  center?: { lat: number; lng: number };
  level?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.kakao || !containerRef.current) return;
      window.kakao.maps.load(() => {
        if (!containerRef.current) return;
        const kakao = window.kakao;
        const map = new kakao.maps.Map(containerRef.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level,
        });

        markers.forEach((m) => {
          const position = new kakao.maps.LatLng(m.lat, m.lng);
          const marker = new kakao.maps.Marker({ position, map });
          const iw = new kakao.maps.InfoWindow({
            content: `<div style="padding:8px 12px;font-size:12px;font-weight:600;font-family:Pretendard,sans-serif;">${m.name}${m.category ? `<br/><span style=\"color:#6B7280;font-weight:400;\">${m.category}</span>` : ""}</div>`,
          });
          kakao.maps.event.addListener(marker, "click", () => {
            iw.open(map, marker);
          });
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    if (!KAKAO_JS_KEY) {
      console.error("NEXT_PUBLIC_KAKAO_JS_KEY 미설정 — .env.local 확인");
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-kakao-sdk]");
    if (existing) {
      existing.addEventListener("load", initMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.onload = initMap;
    document.head.appendChild(script);
  }, [markers, center, level]);

  return <div ref={containerRef} className="w-full h-full bg-gray-100" />;
}
