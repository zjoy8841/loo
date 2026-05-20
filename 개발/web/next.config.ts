import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LAN IP·다른 호스트로 dev 서버 접근 시 HMR·폰트·WASM 등 dev 리소스 차단 회피.
  // Rive 마스코트(wasm 런타임)가 같은 LAN의 모바일 폰에서 안 보이는 이슈 fix.
  allowedDevOrigins: ["192.168.10.145"],
};

export default nextConfig;
