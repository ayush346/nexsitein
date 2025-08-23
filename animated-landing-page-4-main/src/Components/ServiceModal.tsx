"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GradientBorderProvider } from "./gradientBorderProvider";
import Noise from "@/Animations/Noise/Noise";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceDescription: string;
  serviceType: "mobile" | "software" | "web";
}

export default function ServiceModal({
  isOpen,
  onClose,
  serviceTitle,
  serviceDescription,
  serviceType,
}: ServiceModalProps) {
  const projects: Project[] = projectsData[serviceType] || [];
  const isMobile = serviceType === "mobile";
  const isWeb = serviceType === "web";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-999999999999"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-999999999999 flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[95%] sm:w-[90%] lg:w-[85%] h-[90vh] sm:h-[85vh] relative max-w-8xl">
              <GradientBorderProvider className="rounded-[16px] sm:rounded-[24px] p-1.5 sm:p-2 h-full">
                <div className="bg-gradient-to-br bg-black/30 backdrop-blur-3xl p-3 sm:p-5 rounded-[14px] sm:rounded-[22px] h-full relative overflow-hidden">
                  {/* Noise Effect */}
                  <div className="absolute inset-0 z-10">
                    <Noise
                      patternSize={100}
                      patternScaleX={1}
                      patternScaleY={1}
                      patternRefreshInterval={10}
                      patternAlpha={15}
                    />
                  </div>

                  {/* Animated Background Blobs */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      animate={{
                        x: [-50, 50, -50],
                        y: [-30, 30, -30],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30"
                    />
                    <motion.div
                      animate={{
                        x: [50, -50, 50],
                        y: [30, -30, 30],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-20 h-full flex flex-col">
                    {isMobile ? (
                      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 text-white">
                        <div className="flex justify-end p-4 sm:p-6 pb-2">
                          <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                          >
                            <X size={20} className="sm:w-6 sm:h-6" />
                          </button>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-8">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Mobile Apps</h2>
                            <p className="text-white/80 text-sm sm:text-base">
                              We design and develop intuitive mobile applications tailored to your business needs, ensuring seamless user experiences across devices.
                            </p>
                          </div>

                          <div className="space-y-8">
                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Basic Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹25,000 – ₹75,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> Startups & small businesses</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Simple UI/UX design</li>
                                <li>Basic functionality</li>
                                <li>Limited screens (3–5)</li>
                                <li>Static content</li>
                                <li>Android or iOS (Single platform)</li>
                                <li>Basic backend or no backend</li>
                                <li>2-3 weeks delivery</li>
                              </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">🔸 Standard Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹75,001 – ₹1,75,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> Growing businesses & MVPs</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Custom UI/UX design</li>
                                <li>Moderate functionality</li>
                                <li>5–10 screens</li>
                                <li>API integration</li>
                                <li>Admin panel</li>
                                <li>Android + iOS (Hybrid or Native)</li>
                                <li>3rd-party services (e.g., payment gateway, map)</li>
                                <li>4-6 weeks delivery</li>
                              </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">🔶 Premium Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹1,75,001 – ₹3,50,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> Enterprises & feature-rich apps</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Advanced custom design</li>
                                <li>Complex features & workflows</li>
                                <li>10+ screens</li>
                                <li>Scalable backend (cloud-based)</li>
                                <li>Advanced integrations (AI, chat, analytics, etc.)</li>
                                <li>Native Android & iOS apps</li>
                                <li>Post-launch support & maintenance</li>
                                <li>6-10 weeks delivery</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isWeb ? (
                      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 text-white">
                        <div className="flex justify-end p-4 sm:p-6 pb-2">
                          <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                          >
                            <X size={20} className="sm:w-6 sm:h-6" />
                          </button>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-8">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Web Applications</h2>
                          </div>

                          <div className="space-y-8">
                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Basic Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹5,000 – ₹25,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> Personal sites & small businesses</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Clean, responsive design</li>
                                <li>Up to 5 pages</li>
                                <li>Static or semi-dynamic content</li>
                                <li>Contact form integration</li>
                                <li>Basic SEO setup</li>
                                <li>1-2 weeks delivery</li>
                              </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">🔸 Standard Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹25,001 – ₹75,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> SMEs & custom business tools</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Custom UI/UX design</li>
                                <li>Dynamic content & database integration</li>
                                <li>Admin dashboard</li>
                                <li>API integration</li>
                                <li>Mobile responsiveness</li>
                                <li>CMS (like WordPress or custom)</li>
                                <li>3-5 weeks delivery</li>
                              </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
                              <h3 className="text-xl sm:text-2xl font-semibold mb-3">🔶 Premium Package</h3>
                              <p className="mb-1 text-white/80"><span className="font-medium">Price Range:</span> ₹75,001 – ₹1,50,000</p>
                              <p className="mb-3 text-white/80"><span className="font-medium">Ideal For:</span> Advanced platforms & enterprise solutions</p>
                              <p className="font-medium mb-2">Features:</p>
                              <ul className="list-disc list-inside space-y-1 text-white/80 text-sm sm:text-base">
                                <li>Fully custom, scalable architecture</li>
                                <li>Advanced UI/UX with animations</li>
                                <li>Complex user roles & permissions</li>
                                <li>Real-time features (e.g., chat, live data)</li>
                                <li>Secure backend systems</li>
                                <li>Integrations with external platforms (CRM, payment, etc.)</li>
                                <li>Ongoing support & deployment</li>
                                <li>5-8 weeks delivery</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Header */}
                        <div className="flex justify-between items-start p-4 sm:p-6 pb-4">
                          <div className="flex-1 pr-4">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2">
                              {serviceTitle}
                            </h2>
                            <p className="text-xs sm:text-base lg:text-lg text-white/80 max-w-2xl">
                              {serviceDescription}
                            </p>
                          </div>
                          <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 flex-shrink-0"
                          >
                            <X size={20} className="sm:w-6 sm:h-6" />
                          </button>
                        </div>

                        {/* Projects Gallery */}
                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                          <h3 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6">
                            Our{" "}
                            {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}{" "}
                            Projects
                          </h3>
                          {projects.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                              {projects.map((project, index) => (
                                <motion.div
                                  key={project.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <GradientBorderProvider className="rounded-[16px] sm:rounded-[20px] p-1 sm:p-1.5 group hover:-translate-y-1 transition-all duration-300">
                                    <div
                                      className={`bg-white/10 backdrop-blur-lg rounded-[14px] sm:rounded-[18px] overflow-hidden h-full ${project.url ? "cursor-pointer" : ""}`}
                                      onClick={() => {
                                        if (project.url) {
                                          window.open(project.url, "_blank", "noopener,noreferrer");
                                        }
                                      }}
                                    >
                                      <div className="aspect-video relative overflow-hidden">
                                        <img
                                          src={project.image}
                                          alt={project.title}
                                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {project.url && (
                                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                                              <ExternalLink size={12} className="text-white sm:w-4 sm:h-4" />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="p-3 sm:p-4">
                                        <h4 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
                                          {project.title}
                                        </h4>
                                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                          {project.description}
                                        </p>
                                        {project.url && (
                                          <div className="mt-2 sm:mt-3 flex items-center text-white/60 text-xs">
                                            <ExternalLink size={10} className="mr-1 sm:w-3 sm:h-3" />
                                            <span className="text-xs">Click to visit</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </GradientBorderProvider>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" />
                              </div>
                              <p className="text-white/60 text-sm sm:text-base lg:text-lg">Projects coming soon for {serviceTitle}</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </GradientBorderProvider>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
