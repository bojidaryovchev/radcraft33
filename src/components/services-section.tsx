import { Zap, Target, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const services = [
  {
    icon: Zap,
    title: "YouTube Editing",
    description: "Full-length videos, thumbnails, and optimization for maximum engagement",
    price: "From $50",
    features: ["Color correction", "Audio enhancement", "Custom graphics", "SEO optimization"],
  },
  {
    icon: Target,
    title: "Short-Form Content",
    description: "TikTok, Instagram Reels, YouTube Shorts that go viral",
    price: "From $25",
    features: ["Trend adaptation", "Quick turnaround", "Platform optimization", "Hook creation"],
  },
  {
    icon: Clock,
    title: "Stream Highlights",
    description: "Transform your best streaming moments into shareable content",
    price: "From $35",
    features: ["Moment identification", "Multi-cam editing", "Chat integration", "Branding"],
  },
  {
    icon: Award,
    title: "Brand Content",
    description: "Professional commercial and promotional video editing",
    price: "From $100",
    features: ["Brand guidelines", "Motion graphics", "Sound design", "Revisions included"],
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Services & Pricing
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Professional video editing tailored to your platform and audience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>

                <div className="text-2xl font-bold text-white mb-6">{service.price}</div>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300">
                  Get Started
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
