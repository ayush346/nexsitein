"use client";

import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import Noise from "@/Animations/Noise/Noise";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

// Add the missing categoryStyles definition
const categoryStyles: Record<string, string> = {
  webdev: "bg-gradient-to-r from-purple-900 to-blue-900",
  erp: "bg-gradient-to-r from-blue-900 to-cyan-800",
  mobile: "bg-gradient-to-r from-indigo-900 to-purple-800",
  default: "bg-gradient-to-r from-gray-800 to-gray-900",
};

interface Service {
  title: string;
  extendedDescription: string;
  buttonText: string;
  category: "webdev" | "erp" | "mobile" | string;
  serviceType: "mobile" | "software" | "web";
}

const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [arrowPositions, setArrowPositions] = useState({
    leftX: 0,
    rightX: 0,
    y: 0,
  });
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const arrowWidth = 40; // Approximate width of arrow div
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
            className={`slide absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <GradientBorderProvider className="rounded-[42px] p-2 lg:p-3 h-full">
              <div
                className={`${
                  categoryStyles[service.category] || categoryStyles.default
                } p-8 sm:p-12 lg:p-16 rounded-[44px] shadow-xl h-full flex flex-col justify-center items-center bg-[length:200%_100%] animate-gradient-shift relative overflow-hidden`}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute w-2/3 h-2/3 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-3xl opacity-40 animate-float-slow" />
                  <div className="absolute w-1/2 h-1/2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl opacity-30 animate-float delay-1000" />
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
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 animate-slide-in-left">
                    {service.title}
                  </h3>
                  <p className="mb-2 text-base sm:text-base lg:text-lg opacity-90 animate-slide-in-left delay-200">
                    {service.extendedDescription}
                  </p>
                  <button
                    className={`w-content py-3 px-8 rounded-lg pointer-events-all cursor-pointer transition-all duration-300 animate-slide-in-left delay-400 text-base sm:text-lg font-medium group ${
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
            className={`w-4 h-4 mx-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white border-2 border-white"
                : "bg-black/20 border-2 border-white/10"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      {isHovering && (
        <>
          <div
            className="arrow left absolute z-30 bg-black/50 rounded-full p-2 transition-all duration-300 ease-in-out"
            style={{
              left: arrowPositions.leftX,
              top: arrowPositions.y,
              pointerEvents: "none",
            }}
          >
            <ArrowLeft size={24} color="white" />
          </div>
          <div
            className="arrow right absolute z-30 bg-black/50 rounded-full p-2 transition-all duration-300 ease-in-out"
            style={{
              left: arrowPositions.rightX,
              top: arrowPositions.y,
              pointerEvents: "none",
            }}
          >
            <ArrowRight size={24} color="white" />
          </div>
        </>
      )}

    </div>
  );
};

export default ServiceCarousel;
