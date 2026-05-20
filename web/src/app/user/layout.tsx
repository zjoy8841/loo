import AIVoiceFAB from "@/components/AIVoiceFAB";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-[420px] min-h-screen bg-signup-surface">
      {children}
      <AIVoiceFAB />
    </div>
  );
}
