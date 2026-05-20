"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import RyanMascot, { type RyanMascotHandle } from "@/components/RyanMascot";

export default function SignupAccount() {
  const router = useRouter();
  const mascotRef = useRef<RyanMascotHandle>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "가입에 실패했어요");
        return;
      }
      const r = await signIn("credentials", { email, password, redirect: false });
      if (r?.error) {
        setError("자동 로그인에 실패했어요. 다시 시도해주세요.");
        return;
      }
      mascotRef.current?.bounce();
      setTimeout(() => router.push("/user/signup/health"), 700);
    } catch {
      setError("네트워크 오류가 발생했어요");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">1 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F8BD9]" style={{ width: "14.3%" }} />
        </div>
      </div>

      <div className="flex justify-center pt-4 pb-2">
        <RyanMascot ref={mascotRef} size={160} />
      </div>

      <div className="flex-1 px-6 pt-2">
        <h1 className="text-2xl font-bold mb-2 text-center">계정을 만들어요</h1>
        <p className="text-gray-500 mb-8 text-sm text-center">
          이메일과 비밀번호로 시작하세요
        </p>

        <div className="space-y-4">
          <Field
            label="이름"
            placeholder="홍길동"
            value={name}
            onChange={setName}
            required
            autoComplete="name"
          />
          <Field
            label="이메일"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
          />
          <Field
            label="비밀번호"
            type="password"
            placeholder="8자 이상"
            value={password}
            onChange={setPassword}
            required
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">또는 SNS로</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <SocialButton label="K" color="#FEE500" />
          <SocialButton label="N" color="#03C75A" />
          <SocialButton label="G" color="#4285F4" />
          <SocialButton label="" color="#000000" />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={submitting}
          className="block w-full bg-[#4F8BD9] hover:bg-[#3B73C2] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          {submitting ? "가입 중…" : "다음"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F8BD9]"
      />
    </div>
  );
}

function SocialButton({ label, color }: { label: string; color: string }) {
  return (
    <button
      type="button"
      onClick={() => alert("곧 지원 예정이에요")}
      className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-white border-2 transition"
      style={{ borderColor: color, color }}
    >
      {label}
    </button>
  );
}
