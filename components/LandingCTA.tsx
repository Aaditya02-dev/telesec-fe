"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function LandingCTA() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;
      const height = 450; // Approximate height of the CTA
      setGridSize({
        rows: Math.ceil(height / 15),
        cols: Math.ceil(width / 15),
      });
    };
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#1F2C30] p-10 lg:p-12 shadow-2xl">
          {/* Static Grid Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="flex flex-wrap h-full w-full opacity-40">
              {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      margin: 1,
                      border: "1px solid rgba(65, 191, 99, 0.1)",
                      backgroundColor: "rgba(65, 191, 99, 0.04)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl text-left">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase leading-tight">
                Scale your network <br className="hidden sm:block" /> with intelligence.
              </h2>
              <p className="text-base text-slate-400">
                Experience a unified platform designed for next-gen
                telecom orchestration and automated troubleshooting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard" className="group flex h-14 items-center rounded-full bg-[#41bf63] pl-6 pr-1.5 text-sm font-bold text-black transition-all hover:bg-[#bce628]">
                <span className="mr-4 text-black">Get Started Free</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F2C30] text-[#41bf63] transition-transform group-hover:scale-105">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </div>
              </Link>
              <button className="h-14 rounded-full border border-white/10 bg-transparent px-8 text-sm font-bold text-white transition-all hover:bg-white/5">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
