"use client";

import React, { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const sampleVideos = [
  {
    id: 1,
    title: "Gaming Montage - Epic Moments",
    thumbnail: "/placeholder.svg",
    category: "Gaming",
    views: "2.1M",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "TikTok Viral Dance Edit",
    thumbnail: "/placeholder.svg",
    category: "TikTok",
    views: "856K",
    platform: "TikTok",
  },
  {
    id: 3,
    title: "Product Review - Tech Unboxing",
    thumbnail: "/placeholder.svg",
    category: "Review",
    views: "432K",
    platform: "YouTube",
  },
  {
    id: 4,
    title: "Instagram Reel - Transition Magic",
    thumbnail: "/placeholder.svg",
    category: "Social",
    views: "1.2M",
    platform: "Instagram",
  },
  {
    id: 5,
    title: "Stream Highlights Compilation",
    thumbnail: "/placeholder.svg",
    category: "Streaming",
    views: "678K",
    platform: "Twitch",
  },
  {
    id: 6,
    title: "Brand Commercial - 30s Spot",
    thumbnail: "/placeholder.svg",
    category: "Commercial",
    views: "234K",
    platform: "YouTube",
  },
];

const VideoShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Gaming", "TikTok", "Review", "Social", "Streaming", "Commercial"];

  const filteredVideos =
    selectedCategory === "All" ? sampleVideos : sampleVideos.filter((video) => video.category === selectedCategory);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover the content that made creators go viral and brands stand out
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <div
            key={video.id}
            className="group cursor-pointer transition-all duration-500 transform hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl h-full flex flex-col">
              <AspectRatio ratio={16 / 9} className="flex-shrink-0">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                {/* Platform badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {video.platform}
                  </span>
                </div>
              </AspectRatio>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs font-medium rounded-full">
                      {video.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {video.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm mt-auto">{video.views} views</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoShowcase;
