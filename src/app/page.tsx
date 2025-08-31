import ContactSection from "@/components/contact-section";
import EarthSection from "@/components/earth-section";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import SocialLinks from "@/components/social-links";
import VideoShowcase from "@/components/video-showcase";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <HeroSection />

        <EarthSection />

        <VideoShowcase />

        <ServicesSection />

        <SocialLinks />

        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
