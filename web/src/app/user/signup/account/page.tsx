"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">1 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: "14.3%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-bold mb-2">계정을 만들어요</h1>
        <p className="text-gray-500 mb-8 text-sm">
          이메일과 비밀번호로 시작하세요
        </p>

        <div className="space-y-4">
          <Field label="이름" placeholder="홍길동" value={name} onChange={setName} />
          <Field
            label="이메일"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
          <Field
            label="비밀번호"
            type="password"
            placeholder="8자 이상"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">또는 SNS로</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <SocialButton label="K" bg="bg-yellow-300" />
          <SocialButton label="N" bg="bg-green-500" textColor="text-white" />
          <SocialButton
            label="G"
            bg="bg-white border border-gray-200"
            textColor="text-blue-500"
          />
          <SocialButton label="" bg="bg-black" textColor="text-white" />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <Link
          href="/user/signup/health"
          className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          다음
        </Link>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}

function SocialButton({
  label,
  bg,
  textColor = "",
}: {
  label: string;
  bg: string;
  textColor?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => alert("곧 지원 예정이에요")}
      className={`aspect-square rounded-xl flex items-center justify-center text-xl font-bold ${bg} ${textColor}`}
    >
      {label}
    </button>
  );
}
