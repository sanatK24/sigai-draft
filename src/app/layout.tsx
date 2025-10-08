import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "RAIT ACM SIGAI",
  description: "RAIT ACM Special Interest Group on Artificial Intelligence",
  icons: {
    icon: "/img/sigai-logo.webp",
    apple: "/img/sigai-logo.webp",
    shortcut: "/img/sigai-logo.webp"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
