"use client";

import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-gradient-to-b from-blue-200 to-white w-screen min-h-[80vh] flex justify-center items-center relative py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <p className="text-center mb-8 md:mb-2 text-sm md:text-base flex items-center justify-center gap-2 text-black/80 animate-fade-in-up">
          Why Partner With Us? <ArrowDown className="w-4 h-4" />
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              value: 35,
              label: "Projects Completed",
              suffix: "+",
              classN: "bg-gradient-to-br from-black to-neutral-400",
            },
            {
              value: 3,
              label: "Years of Experience",
              suffix: "+",
              classN: "bg-gradient-to-br from-black to-neutral-400",
            },
            {
              value: 1000,
              label: "Active Visitors",
              suffix: "+",
              classN: "bg-gradient-to-br from-black to-neutral-400",
            },
          ].map((stat, index) => (
            <GradientBorderProvider
              key={index}
              className=" hover:-translate-y-2 p-2 transition-all duration-300 w-full group -z-1 rounded-[22px]"
            >
              <div className="text-center p-8 relative overflow-hidden flex flex-col items-center justify-center gap-2">
                {/* 
                <Noise
                  patternSize={250}
                  patternScaleX={1}
                  patternScaleY={1}
                  patternRefreshInterval={2}
                  patternAlpha={15}
                />*/}
                {/* Animated number counter */}
                <div
                  className={`text-5xl md:text-9xl text-center text-black ${stat.classN} bg-clip-text flex items-center justify-center text-transparent`}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-sm md:text-base text-black/60 text-left">
                  {stat.label}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(200px_at_50%_50%,#0000ff05,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </GradientBorderProvider>
          ))}
        </div>
      </div>
    </section>
  );
}
