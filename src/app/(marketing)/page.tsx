"use client";

import Hero from "@/components/landing/Hero";
import Architecture from "@/components/landing/Architecture";
import Philosophy from "@/components/landing/Philosophy";
import Features from "@/components/landing/Features";
import MicroFrontends from "@/components/landing/MicroFrontends";
import TechStack from "@/components/landing/TechStack";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full h-full flex flex-col items-center overflow-hidden bg-[#040508]">
      <div className="w-full">
        <Hero />
        <Architecture />
        <Philosophy />
        <Features />
        <MicroFrontends />
        <TechStack />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}
