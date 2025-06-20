"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 animate-pulse" />

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="radcraft33 video editing" className="w-32 h-32 object-contain" />
        </div>

        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-green-400 mr-3 animate-spin" />
          <span className="text-green-400 font-semibold tracking-wider uppercase text-sm">Premium Video Editing</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent leading-tight">
          Elevate Your
          <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Content</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Professional video editing for streamers, content creators, and brands.
          <br />
          Transform your raw footage into viral-worthy content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            View My Work
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            Get Started
          </Button>
        </div>

        <div className="my-12 flex justify-center space-x-8 text-sm text-gray-400">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">500+</span>
            <span>Videos Edited</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">50+</span>
            <span>Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">24h</span>
            <span>Turnaround</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
