"use client";

import Noise from "@/Animations/Noise/Noise";
import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import ServiceModal from "@/Components/ServiceModal";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

type ServiceCategory = "webdev" | "design" | "erp";

const categoryStyles: Record<ServiceCategory, string> = {
  webdev: "bg-gradient-to-br from-black to-gray-500 text-white",
  design:
    "bg-gradient-to-br from-violet-500/30 via-transparent to-blue-500/10 text-black/80",
  erp: "bg-gradient-to-br from-blue-900 to-blue-500 text-white",
};

const services: Array<{
  title: string;
  description: string;
  category: ServiceCategory;
  buttonText: string;
  serviceType: "mobile" | "software" | "web";
}> = [
  // {
  //   title: "Website Development",
  //   description:
  //     "We create stunning, user-friendly websites that enhance your online presence and drive conversions. Let’s build your digital storefront together.",
  //   category: "webdev",
  //   buttonText: "Get Started",
  // },
  // {
  //   title: "Capstone Projects",
  //   description:
  //     "Our team assists with capstone projects, providing expert guidance and development support to ensure your project stands out.",
  //   category: "erp",
  //   buttonText: "Learn More",
  // },
  {
    title: "Mobile Apps",
    description:
      "We design and develop intuitive mobile applications tailored to your business needs, ensuring seamless user experiences across devices.",
    category: "erp",
    buttonText: "Explore Apps",
    serviceType: "mobile",
  },
  {
    title: "Web Applications",
    description:
      "Our web applications are robust, scalable, and designed to meet your specific requirements, enhancing productivity and user engagement.",
    category: "design",
    buttonText: "Discover More",
    serviceType: "web",
  },
];

export function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    serviceType: "mobile" | "software" | "web";
  } | null>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleServiceClick = (service: (typeof services)[0]) => {
    // Prevent event propagation and ensure clean click handling
    setSelectedService({
      title: service.title,
      description: service.description,
      serviceType: service.serviceType,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white to-blue-200 !overflow-hidden bg-cover w-screen relative min-h-screen flex justify-center items-center text-white pt-20 px-4"
    >
      {/* Floating background blobs */}

      <div className="max-w-full mx-auto relative z-1">
        <p className="text-center mb-8 md:mb-2 text-sm md:text-base flex items-center justify-center gap-2 text-black/80 animate-fade-in-up">
          Our Services <ArrowDown className="w-4 h-4" />
        </p>

        <div className="grid grid-cols-1 relative md:flex md:overflow-x-scroll scroll-x-hide md:p-6 md:px-48 gap-6">
          {" "}
          {services.map((service, index) => (
            <GradientBorderProvider
              key={index}
              className="rounded-[42px] hover:-translate-y-2 p-2 transition-all duration-300 w-full md:w-[80vw] md:min-w-[470px] group"
            >
              <div
                className={`${
                  categoryStyles[service.category]
                } p-12 rounded-[40px] aspect-[1/1.1] flex flex-col min-h-[400px] relative overflow-hidden`}
              >
                {/* Animated floating blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    animate={{
                      x: [-50, 50, -50],
                      y: [-50, 50, -50],
                    }}
                    transition={{
                      duration: 15 + index * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute w-48 h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-30"
                  />
                </div>

                {/* Noise texture with shimmer overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <Noise
                    patternSize={100}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={10}
                    patternAlpha={15}
                  />
                </div>

                <div className="relative z-1 h-full flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="opacity-80 mb-6">{service.description}</p>
                  </div>

                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                    className={`w-full mt-auto py-3 px-6 rounded-[16px] transition-all duration-300 relative overflow-hidden cursor-pointer pointer-events-auto z-20 ${
                      service.category === "webdev"
                        ? "bg-white/10 hover:bg-white/20"
                        : service.category === "erp"
                        ? "bg-blue-800/90 hover:bg-blue-700"
                        : "bg-white/90 hover:bg-white"
                    }`}
                  >
                    <span className="relative z-30 pointer-events-none">
                      {service.buttonText}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </button>
                </div>
              </div>
            </GradientBorderProvider>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceTitle={selectedService.title}
          serviceDescription={selectedService.description}
          serviceType={selectedService.serviceType}
        />
      )}
    </section>
  );
}
