"use client";

import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      title: "Choose Plan",
      description: "Select business-appropriate plan and domain",
    },
    {
      title: "Submit Info",
      description: "Provide business details and preferences",
    },
    { title: "Strategy", description: "Create sitemap and feature roadmap" },
    { title: "Design", description: "Develop brand-aligned visual identity" },
    {
      title: "Development",
      description: "Build responsive, mobile-friendly site",
    },
    { title: "Content", description: "Integrate provided media and copy" },
    { title: "Testing", description: "Ensure cross-device functionality" },
    { title: "Launch", description: "Deploy and monitor live website" },
    {
      title: "Maintenance",
      description: "Provide ongoing support and updates",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-blue-100 w-screen relative pb-20 px-4">
      <div className="max-w-4xl mx-auto relative z-10000" ref={ref}>
        <p className="text-center mb-8 md:mb-2 text-sm md:text-base flex items-center justify-center gap-2 text-black/80 animate-fade-in-up">
          Our Process from Concept to Launch <ArrowDown className="w-4 h-4" />
        </p>
        <div className="mt-8 relative grid grid-cols-1 gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="flex items-start gap-6">
                {/* Step content */}
                <GradientBorderProvider
                  className={`flex w-full bg-blue-800/10 shadow-sm shadow-blue-900/10 rounded-[24px] hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="bg-[#ffffff55] flex flex-col md:flex-row items-start md:items-center justify-start text-left w-full gap-x-5 backdrop-blur-sm px-5 md:!px-12 p-3 md:p-3 rounded-[22px] relative overflow-hidden">
                    <div className="rounded-full text-black flex items-center justify-center text-black/40 text-lg relative">
                      {index + 1}
                    </div>
                    <h3 className="text-black/90 md:w-30">{step.title}</h3>
                    <p className="text-black/60 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </GradientBorderProvider>
              </div>
            </motion.div>
          ))}
        </div>
      </div>{" "}
      <div className="absolute top-[55vh] md:top-[55vh] blur-[70px] bg-[#5e8acc] hidden md:block left-[50%] translate-x-[-50%] w-[200vw] md:w-[120vw] h-[40vh] z-1000" />
    </section>
  );
}
