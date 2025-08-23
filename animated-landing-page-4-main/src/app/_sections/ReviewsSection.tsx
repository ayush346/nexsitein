"use client";
import { ArrowDown } from "lucide-react";
import React from "react";

interface ReviewProps {
  initial: string;
  rating: string;
  text: string;
  author: string;
  date: string;
}

const GradientBorderProvider: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

const reviews: ReviewProps[] = [
  {
    initial: "M",
    rating: "Excellent",
    text: "Excellent mobile app development service, Thank you for creating a stunning application for our business.",
    author: "MegaC Technology pvt ltd",
    date: "",
  },
  {
    initial: "M",
    rating: "Very Good",
    text: "Very Good. Thank you for creating a beautiful software solution for my business.",
    author: "Mithun",
    date: "22/7/2024",
  },
  {
    initial: "D",
    rating: "Worth it",
    text: "The mobile app development service offered by Nexsite was worth it. Although I have seen many other companies offering similar services, the quality here is exceptional.",
    author: "Deepak D",
    date: "17/11/2024",
  },
  {
    initial: "M",
    rating: "Excellent",
    text: "Excellent service for software development. Nexsite provided expert guidance and support throughout the process.",
    author: "MegaC Technology pvt ltd",
    date: "",
  },
  {
    initial: "M",
    rating: "Very Good",
    text: "Very Good. Nexsite developed a custom software solution that perfectly fits our needs.",
    author: "Mithun",
    date: "22/7/2024",
  },
  {
    initial: "D",
    rating: "Worth it",
    text: "The web application developed by Nexsite has streamlined our operations. Highly recommend their services.",
    author: "Deepak D",
    date: "17/11/2024",
  },
  {
    initial: "M",
    rating: "Excellent",
    text: "Nexsite's custom software development service is top-notch. They understood our requirements and delivered beyond expectations.",
    author: "MegaC Technology pvt ltd",
    date: "",
  },
  {
    initial: "M",
    rating: "Very Good",
    text: "Nexsite created a website that not only looks great but also performs exceptionally well. Thank you!",
    author: "Mithun",
    date: "22/7/2024",
  },
  {
    initial: "D",
    rating: "Worth it",
    text: "Our mobile app, developed by Nexsite, has received rave reviews from our users. Excellent work!",
    author: "Deepak D",
    date: "17/11/2024",
  },
  {
    initial: "M",
    rating: "Excellent",
    text: "The software solution provided by Nexsite has greatly improved our efficiency. Highly satisfied with their service.",
    author: "MegaC Technology pvt ltd",
    date: "",
  },
];

export default function ReviewsSection() {
  return (
    <section
      className="pb-40 overflow-hidden min-h-[50vh] flex justify-center items-center"
      id="reviews"
    >
      <div className="container w-full mx-auto px-4 flex items-center justify-center flex-col">
        <p className="text-center w-full mt-16 text-sm md:text-base flex items-center justify-center gap-2 text-black/80 max-w-md animate-fade-in-up">
          What our customers say <ArrowDown className="w-4 h-4" />
        </p>

        <div className="scroll-container relative overflow-hidden h-full w-full">
          <div className="inline-flex animate-infinite-scroll gap-6 py-6 overflow-hidden relative">
            {/* Add gradient overlays */}
            <div className="absolute left-0 bottom-0 h-10 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 bottom-0 h-10 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

            {reviews.map((review, i) => (
              <GradientBorderProvider
                key={i}
                className="rounded-[24px] bg-gradient-to-br backdrop-blur-xl from-[#ffffff22] to-[#ffffff11] !p-0.5 transition-transform duration-300 flex-shrink-0 hover:scale-[1.02] group"
              >
                <div className="bg-[#00000005] flex flex-col gap-4 h-full flex flex-col justify-between text-left p-8 rounded-[22px] hover:bg-[#00000010] transition-all duration-300 w-[320px] relative overflow-hidden">
                  {/* Review Text */}
                  <p className="text-black/70 text-sm line-clamp-4 leading-relaxed group-hover:text-black/90 transition-colors duration-300">
                    &quot;{review.text}&quot;
                  </p>

                  {/* Author & Date */}
                  <div className="border-t border-black/10 pt-4 flex gap-2 justify-center items-center animate-fade-in-up">
                    <p className="text-sm font-medium text-black/80">
                      {review.author}
                    </p>
                    {review.date && (
                      <p className="text-sm text-black/50">{review.date}</p>
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(400px_at_50%_50%,#0000ff10,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </GradientBorderProvider>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
