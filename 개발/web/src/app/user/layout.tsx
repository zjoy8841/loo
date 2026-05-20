import AIVoiceFAB from "@/components/AIVoiceFAB";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-[420px] min-h-screen bg-[#F4F7FC]">
      {children}
      <AIVoiceFAB />
    </div>
  );
}
