import AIVoiceFAB from "@/components/AIVoiceFAB";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <AIVoiceFAB />
    </>
  );
}
