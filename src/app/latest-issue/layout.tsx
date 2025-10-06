"use client";

export default function MagazineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override parent layout to remove header/footer for full-screen magazine experience
  return (
    <>
      {children}
    </>
  );
}
