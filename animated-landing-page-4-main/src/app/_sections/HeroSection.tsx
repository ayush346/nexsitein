"use client";

import Noise from "@/Animations/Noise/Noise";
import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import "./custom.css";
import {
  PhoneIncoming,
  Stars,
  Code,
  Palette,
  Globe,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="w-screen overflow-x-hidden">
      <section
        className="bg-blue-100 !overflow-hidden bg-cover w-screen min-h-screen relative text-white"
        id="home"
        style={{
          background: 'url("/back.png")',
          backgroundSize: "cover",
        }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />

        {/* Background Elements */}
        <div className="absolute top-[70vh] md:top-[80vh] blur-[100px] bg-[#00000000] left-[50%] translate-x-[-50%] bg-white w-[200vw] md:w-[120vw] aspect-[1/1]" />
        {/* <div className="absolute -bottom-[95vw] blur-[200px] bg-blue-500 opacity-40 rounded-full left-[50%] translate-x-[-50%] w-[120vw] aspect-[1/1]" />
          <div
          className="absolute inset-0 h-full w-full pointer-events-none 
          bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] 
          bg-[size:40px_40px] md:bg-[size:80px_80px] animate-grid-movement"
        />

        {/* Floating Icons - Left */}
        <div className="absolute left-[5%] top-[20%] hidden lg:block">
          <Code className="w-12 h-12 hover:scale-110 text-white p-2.5 rotate-[10deg] hover:rotate-[0deg] shadow-xl bg-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 animate-float" />
        </div>
        <div className="absolute left-[10%] top-[60%] hidden lg:block">
          <Palette className="w-10 h-10 hover:scale-110 text-white p-2 rotate-[-15deg] hover:rotate-[0deg] shadow-xl bg-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 animate-float-delay" />
        </div>

        {/* Floating Icons - Right */}
        <div className="absolute right-[8%] top-[25%] hidden lg:block">
          <Globe className="w-11 h-11 hover:scale-110 text-white p-2 rotate-[5deg] hover:rotate-[0deg] shadow-xl bg-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 animate-float-reverse" />
        </div>
        <div className="absolute right-[12%] top-[65%] hidden lg:block">
          <Lightbulb className="w-9 h-9 hover:scale-110 text-white p-2 rotate-[-8deg] hover:rotate-[0deg] shadow-xl bg-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 animate-float" />
        </div>
        <div className="absolute right-[5%] top-[45%] hidden lg:block">
          <Sparkles className="w-10 h-10 hover:scale-110 text-white p-2 rotate-[12deg] hover:rotate-[0deg] shadow-xl bg-white/30 rounded-xl backdrop-blur-xl transition-all duration-300 animate-float-delay" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center justify-center h-full pt-[25vh] md:pt-[20vh] px-10 md:px-12 lg:px-20 relative z-10">
          <div className="text-sm shadow-md bg-white text-center text-black rounded-full py-1 px-4 mb-4">
            Complete website solutions
          </div>

          <h1 className="text-4xl my-2 text-center md:text-5xl lg:text-6xl max-w-3xl font-semibold text-white leading-[1] shine-text">
            We create{" "}
            <Stars className="inline w-13 h-13 hover:scale-105 text-white p-2.5 rotate-[-5deg] hover:rotate-[0deg] shadow-xl bg-white/30 rounded-xl backdrop-blur-xl " />{" "}
            innovation for every business.{" "}
          </h1>

          <p className="mt-2 text-center md:mt-4 text-sm md:text-base text-white/80 max-w-md animate-fade-in-up">
            Website Building & Hosting, Designed to drive growth and achieve
            your business objectives
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-8">
            <GradientBorderProvider className="rounded-[14px] hover:-translate-y-0.5 bg-gradient-to-br from-[#00000011] to-[#00000022] !p-0.5 transition-transform duration-300">
              <button
                className="bg-black text-base items-center text-white/80 px-6 py-2.5 rounded-[14px] 
                  hover:bg-black/80 hover:!px-7 transition-all duration-300 relative overflow-hidden flex justify-center items-center gap-4"
                onClick={() => (window.location.href = "/#contact")}
              >
                <PhoneIncoming className="w-5 h-5" /> Schedule a call
              </button>
            </GradientBorderProvider>
          </div>

            <div className="relative h-full w-full mt-12" style={{ zIndex: 100 }}>
            <div className="flex gap-6 py-6 items-center justify-center">
              <GradientBorderProvider className="rounded-[24px] bg-gradient-to-br backdrop-blur-xl from-[#ffffff22] to-[#ffffff11] !p-0.5 w-full max-w-[1000px] transition-transform duration-300 flex-shrink-0 hover:scale-[1.02] group">
              <div className="bg-[#00000005] flex flex-col gap-4 flex flex-col justify-between text-left p-4 rounded-[22px] hover:bg-[#00000033] transition-all duration-300 relative overflow-hidden cursor-pointer" onClick={() => window.open('https://www.hirebuddy.net/', '_blank')}>
                {/* Initial Badge */}

                {/* Rating Chip 
                <div className="animate-rating-pop-in origin-left">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                  {review.rating}
                  </span>
                </div>*/}

                <img
                src="/ss1.png"
                className="w-full h-full object-cover rounded-[16px]"
                />
              </div>
              </GradientBorderProvider>
            </div>
            </div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute inset-x-20 top-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm opacity-30" />
        <div className="absolute inset-x-60 top-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm opacity-30" />
      </section>
    </div>
  );
}
