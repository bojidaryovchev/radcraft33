import React from "react";
import ContactSection from "@/components/contact-section";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import SocialLinks from "@/components/social-links";
import VideoShowcase from "@/components/video-showcase";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <HeroSection />

        <VideoShowcase />

        <ServicesSection />

        <SocialLinks />

        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
