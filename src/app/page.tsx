"use client";

import Header from "@/components/components/header";
import Hero from "@/components/landing/Hero";
import Architecture from "@/components/landing/Architecture";
import Philosophy from "@/components/landing/Philosophy";
import Features from "@/components/landing/Features";
import MicroFrontends from "@/components/landing/MicroFrontends";
import TechStack from "@/components/landing/TechStack";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full h-full flex flex-col items-center overflow-hidden bg-[#040508]">
      {/* Development Notice (rendered above header) */}
      <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-3 px-4 shadow-lg z-50 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <p className="text-sm font-medium">
            🚧 This project is in early development. Features may not work as intended.
            Please wait for the beta release.
          </p>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <Header />

      <main className="w-full">
        <Hero />
        <Architecture />
        <Philosophy />
        <Features />
        <MicroFrontends />
        <TechStack />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
