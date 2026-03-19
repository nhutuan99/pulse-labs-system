import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import AppProvider from "@/providers/AppProvider";
import TopNavbar from "@/components/navbars/TopNavbar";
import RealTimeTicker from "@/components/common/RealTimeTicker";
import SplashScreen from "@/components/common/SplashScreen";
import Footer from "@/components/common/Footer";

// ============================================
// Root Layout — Provider Nesting + Shell
// ============================================

export const metadata: Metadata = {
  title: "Vietnam Trending — Crypto Dashboard",
  description: "Phân tích thị trường crypto, phát hiện giai đoạn thị trường, và quản lý tín hiệu giao dịch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-bg-app antialiased flex flex-col">
        <SplashScreen />
        <QueryProvider>
          <AppProvider>
            <TopNavbar />
            <RealTimeTicker />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
