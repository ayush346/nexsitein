"use client";

import Noise from "@/Animations/Noise/Noise";
import Footer from "@/Components/footer";
import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import Header from "@/Components/header";
import ServiceModal from "@/Components/ServiceModal";
import { useEffect, useRef, useState } from "react";
import { ContactSection } from "../_sections/SocialSection";
import { ArrowDown, ArrowLeft } from "lucide-react";

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
  extendedDescription: string;
  category: ServiceCategory;
  buttonText: string;
  serviceType: "mobile" | "software" | "web";
}> = [
  // {
  //   title: "Website Development",
  //   description:
  //     "We create stunning, user-friendly websites that enhance your online presence and drive conversions. Let’s build your digital storefront together.",
  //   extendedDescription:
  //     "Our website development services focus on creating bespoke solutions tailored to your business needs. We combine cutting-edge design principles with intuitive user experiences to ensure your website not only looks stunning but also performs exceptionally. From responsive designs to seamless navigation, we enhance your online presence to attract and retain customers effectively.",
  //   category: "webdev",
  //   buttonText: "Get Started",
  // },
  // {
  //   title: "Capstone Projects",
  //   description:
  //     "Our team assists with capstone projects, providing expert guidance and development support to ensure your project stands out.",
  //   extendedDescription:
  //     "We provide comprehensive support for capstone projects, from initial concept to final deployment. Our team of experts guides you through every step, ensuring your project is innovative, technically sound, and meets all academic requirements. With our help, your capstone project will not only meet but exceed expectations.",
  //   category: "erp",
  //   buttonText: "Learn More",
  // },
  {
    title: "Mobile Apps",
    description:
      "We design and develop intuitive mobile applications tailored to your business needs, ensuring seamless user experiences across devices.",
    extendedDescription:
      "Our mobile app development services cover everything from initial design to deployment. We create apps that are not only visually appealing but also highly functional, ensuring a seamless user experience. Whether you need an app for iOS, Android, or both, we have the expertise to deliver a product that meets your business goals.",
    category: "erp",
    buttonText: "Explore Apps",
    serviceType: "mobile",
  },
  {
    title: "Web Applications",
    description:
      "Our web applications are robust, scalable, and designed to meet your specific requirements, enhancing productivity and user engagement.",
    extendedDescription:
      "We specialize in developing web applications that are not only functional but also user-friendly. Our applications are designed to enhance productivity and user engagement, ensuring your business operates efficiently. With our expertise, you can be confident that your web application will meet your specific requirements and exceed your expectations.",
    category: "design",
    buttonText: "Discover More",
    serviceType: "web",
  },
];

// Carousel Component with proper TypeScript typing
const ServiceCarousel = ({
  services,
}: {
  services: Array<{
    title: string;
    description: string;
    extendedDescription: string;
    category: ServiceCategory;
    buttonText: string;
    serviceType: "mobile" | "software" | "web";
  }>;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    serviceType: "mobile" | "software" | "web";
  } | null>(null);
  const [arrowPositions, setArrowPositions] = useState({
    leftX: 0,
    rightX: 0,
    y: 0,
  });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleServiceClick = (service: (typeof services)[0]) => {
    setSelectedService({
      title: service.title,
      description: service.extendedDescription,
      serviceType: service.serviceType,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const arrowWidth = 40; // Assuming arrow size with padding
      const offset = 20;
      const leftX = Math.max(
        0,
        Math.min(x - offset - arrowWidth, rect.width - arrowWidth)
      );
      const rightX = Math.max(0, Math.min(x + offset, rect.width - arrowWidth));
      const arrowY = Math.max(0, Math.min(y, rect.height - arrowWidth));
      setArrowPositions({ leftX, rightX, y: arrowY });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      if (x < width * 0.3) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="slides-wrapper relative w-full h-full">
        {services.map((service, index) => (
          <div
            key={index}
            className={`slide absolute top-0 left-0 w-full h-full ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 700ms ease-in-out" }}
          >
            <GradientBorderProvider className="rounded-[54px] p-2 lg:p-3 h-full bg-neutral-500/10">
              <div
                className={`${
                  categoryStyles[service.category]
                } p-8 sm:p-12 lg:p-16 rounded-[44px] shadow-xl h-full flex flex-col justify-center items-center bg-[length:200%_100%] animate-gradient-shift relative overflow-hidden`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-2/3 h-2/3 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-3xl opacity-40 animate-float-slow" />
                  <div className="absolute w-1/2 h-1/2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl opacity-30 animate-float delay-1000" />
                </div>
                <div className="absolute inset-0 z-10">
                  <Noise
                    patternSize={100}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={10}
                    patternAlpha={15}
                  />
                </div>
                <div className="relative z-1 text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 animate-slide-in-left">
                    {service.title}
                  </h3>
                  <p className="mb-2 text-base sm:text-base lg:text-lg opacity-90 animate-slide-in-left delay-200">
                    {service.extendedDescription}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                    className={`w-content py-3 px-8 rounded-lg pointer-events-all cursor-pointer transition-all duration-300 animate-slide-in-left delay-400 text-base sm:text-lg font-medium group z-20 ${
                      // service.category === "webdev"
                      //   ? "bg-white/10 hover:bg-white/20 border border-white/20"
                      //   : service.category === "erp"
                      //   ? "bg-blue-800/90 hover:bg-blue-700 border border-blue-600/50"
                      //   : "bg-white/90 hover:bg-white text-black border border-gray-200"
                      ""
                    }`}
                  >
                    <span className="relative inline-block text-sm opacity-80 hover:underline">
                      {service.buttonText}
                      <span className="absolute left-0 bottom-0 w-0 h-10 text-sm bg-current transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ArrowDown size={20} className="inline-block ml-2" />
                  </button>
                </div>
              </div>
            </GradientBorderProvider>
          </div>
        ))}
      </div>
      <div className="dots-wrapper absolute bottom-10 left-0 right-0 flex justify-center z-20">
        {services.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-2 rounded-full transition-transform duration-300 hover:scale-110 ${
              index === currentSlide ? "bg-white scale-125" : "bg-black/20"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      {isHovering && (
        <>
          <div
            className={`absolute z-30 bg-black/50 rounded-full !pointer-events-none p-2 transition-all duration-300 ease-in-out ${
              arrowPositions.leftX <
              (carouselRef.current?.getBoundingClientRect().width || 0) * 0.3
                ? ""
                : "!hidden"
            }`}
            style={{
              left: arrowPositions.leftX,
              top: arrowPositions.y,
              pointerEvents: "none",
              transition: "none 0ms linear 0s",
            }}
          >
            <ArrowLeft size={24} color="white" />
          </div>
        </>
      )}

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
    </div>
  );
};

export default function Page() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    serviceType: "mobile" | "software" | "web";
  } | null>(null);

  const handleServiceClick = (service: (typeof services)[0]) => {
    setSelectedService({
      title: service.title,
      description: service.extendedDescription,
      serviceType: service.serviceType,
    });
    setIsModalOpen(true);
  };

  const handleFooterServiceClick = (
    serviceType: "mobile" | "software" | "web",
    title: string,
    description: string
  ) => {
    setSelectedService({
      title,
      description,
      serviceType,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (blob1Ref.current && blob2Ref.current) {
        blob1Ref.current.animate(
          {
            left: `${clientX * 0.01}px`,
            top: `${clientY * 0.01}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
        blob2Ref.current.animate(
          {
            left: `${window.innerWidth - clientX * 0.02}px`,
            top: `${window.innerHeight - clientY * 0.02}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-screen overflow-x-hidden relative">
      {/* Background blobs */}
      <div
        ref={blob1Ref}
        className="hidden md:block absolute left-[5%] -top-20 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-blue-400 rounded-full filter blur-[100px] opacity-30 animate-blob1 animate-float z-0"
      />
      <div
        ref={blob2Ref}
        className="hidden md:block absolute right-[5%] -bottom-20 w-[45vw] max-w-[600px] h-[45vw] max-h-[600px] bg-blue-600 rounded-full filter blur-[120px] opacity-30 animate-blob2 animate-float z-0"
      />

      <Header />
      <section className="w-full relative overflow-hidden pt-8">
        <div className="backdrop-blur-2xl h-content py-12 sm:py-20 md:py-40 pt-24 sm:pt-20 md:pt-20 px-3 sm:px-4 z-10">
          {/* Full-width Carousel */}
          <div className="hidden lg:block full-width-carousel mx-auto mb-12 lg:mb-16">
            <ServiceCarousel services={services} />
          </div>
          <div className="max-w-7xl mx-auto md:mt-40 p-3 sm:p-4">
            <div className="text-center pb-6 sm:pb-8 md:pb-16 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black/80 mb-3 sm:mb-4">
                High Impact Software Services.
              </h2>
              <p className="text-black/60 max-w-xl mx-auto text-sm md:text-base px-2">
                Let&apos;s create something extraordinary together.
              </p>
            </div>
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 md:px-6 lg:px-8">
              {services.map((service, index) => (
                <GradientBorderProvider
                  key={index}
                  className="rounded-[42px] hover:-translate-y-2 p-[2px] sm:p-2 transition-all duration-300 w-full max-w-[500px] mx-auto group animate-card-enter"
                >
                  <div
                    className={`${
                      categoryStyles[service.category]
                    } p-6 sm:p-8 md:p-10 rounded-[36px] flex flex-col h-[450px] relative overflow-hidden transition-all duration-500 hover:scale-[1.02]`}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute w-1/2 h-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-30 animate-float" />
                    </div>
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
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 animate-text-enter line-clamp-2">
                          {service.title}
                        </h3>
                        <p
                          className="opacity-80 mb-4 sm:mb-6 text-sm sm:text-base animate-text-enter line-clamp-6 sm:line-clamp-none"
                          style={{ animationDelay: "100ms" }}
                        >
                          {service.description}
                        </p>
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
                        className={`w-full mt-auto py-2 sm:py-3 px-4 sm:px-6 rounded-[12px] sm:rounded-[16px] transition-all duration-300 text-sm sm:text-base pointer-events-auto z-20 cursor-pointer ${
                          service.category === "webdev"
                            ? "bg-white/10 hover:bg-white/20"
                            : service.category === "erp"
                            ? "bg-blue-800/90 hover:bg-blue-700"
                            : "bg-white/90 hover:bg-white"
                        } animate-button-enter`}
                        style={{ animationDelay: "200ms" }}
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
        </div>
      </section>
      <ContactSection />
      <Footer onServiceClick={handleFooterServiceClick} />

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

      <style jsx global>{`
        /* Full-width carousel */
        .full-width-carousel {
          width: 90vw;
          height: 80vh !important;
        }

        /* Content transitions */
        .content h3,
        .content p,
        .content button {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .content.active h3 {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0s;
        }
        .content.active p {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.2s;
        }
        .content.active button {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.4s;
        }

        /* Existing animations */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes text-enter {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes button-enter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes blob2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(0.9);
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-card-enter {
          animation: card-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-text-enter {
          animation: text-enter 0.5s ease-out forwards;
        }
        .animate-button-enter {
          animation: button-enter 0.5s ease-out forwards;
        }
        .animate-blob1 {
          animation: blob1 20s infinite alternate ease-in-out;
        }
        .animate-blob2 {
          animation: blob2 25s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
