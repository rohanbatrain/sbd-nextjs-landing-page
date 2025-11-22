import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ApiInitializer } from "@/components/providers/api-initializer";
import { ServerGuard } from "@/components/providers/server-guard";
import { TenantProvider } from "@/contexts/TenantContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Second Brain Database - AI-Powered Knowledge Management Infrastructure",
  description:
    "Production-ready FastAPI application with document intelligence, family management, MCP server integration, and enterprise-grade security. Built for modern knowledge management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} min-h-screen`}>
        <ApiInitializer />
        <ServerGuard>
          <TenantProvider>
            {children}
          </TenantProvider>
        </ServerGuard>
      </body>
    </html>
  );
}
