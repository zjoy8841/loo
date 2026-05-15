import { useState } from 'react';
import { VersionA } from './components/VersionA';
import { VersionB } from './components/VersionB';

export default function App() {
  const [version, setVersion] = useState<'A' | 'B'>('A');

  return (
    <div className="size-full flex flex-col items-center justify-center bg-[#E5E7EB]">
      {/* Version toggle */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setVersion('A')}
          className={`px-6 py-3 rounded-xl transition-all ${
            version === 'A'
              ? 'bg-[#5B5FE0] text-white shadow-lg'
              : 'bg-white text-[#5A6372] hover:bg-[#F4F6FA]'
          }`}
          style={{ fontWeight: 500 }}
        >
          Ⓐ AI 비서 대화 입구
        </button>
        <button
          onClick={() => setVersion('B')}
          className={`px-6 py-3 rounded-xl transition-all ${
            version === 'B'
              ? 'bg-[#5B5FE0] text-white shadow-lg'
              : 'bg-white text-[#5A6372] hover:bg-[#F4F6FA]'
          }`}
          style={{ fontWeight: 500 }}
        >
          Ⓑ 데일리 브리핑 피드
        </button>
      </div>

      {/* iPhone frame */}
      <div className="relative">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-black p-3">
          <div className="rounded-[2.5rem] overflow-hidden">
            {version === 'A' ? <VersionA /> : <VersionB />}
          </div>
        </div>
      </div>
    </div>
  );
}