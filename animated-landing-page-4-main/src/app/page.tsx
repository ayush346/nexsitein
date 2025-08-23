"use client";

import HeroSection from "./_sections/HeroSection";
import Header from "@/Components/header";
import { ServicesSection } from "./_sections/OurServices";
import { WhyChooseUs } from "./_sections/WhyChooseUs";
import { ProcessSection } from "./_sections/HowWeWork";
import { ContactSection } from "./_sections/SocialSection";
import Footer from "@/Components/footer";
import ReviewsSection from "./_sections/ReviewsSection";
import ServiceModal from "@/Components/ServiceModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    serviceType: "mobile" | "software" | "web";
  } | null>(null);

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

  return (
    <div className="w-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ReviewsSection />
      <ProcessSection />
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
    </div>
  );
}
