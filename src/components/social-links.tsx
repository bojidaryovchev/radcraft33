import { Youtube, Instagram, Users, Twitter, Twitch, Video } from "lucide-react";
import React from "react";

const socialPlatforms = [
  {
    name: "YouTube",
    icon: Youtube,
    followers: "125K",
    handle: "@videoeditor",
    color: "hover:text-red-500",
    bgColor: "hover:bg-red-500/10",
  },
  {
    name: "Instagram",
    icon: Instagram,
    followers: "89K",
    handle: "@videoedits",
    color: "hover:text-pink-500",
    bgColor: "hover:bg-pink-500/10",
  },
  {
    name: "TikTok",
    icon: Video,
    followers: "234K",
    handle: "@editmaster",
    color: "hover:text-white",
    bgColor: "hover:bg-black/20",
  },
  {
    name: "Twitter",
    icon: Twitter,
    followers: "45K",
    handle: "@videoeditor",
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-400/10",
  },
  {
    name: "Twitch",
    icon: Twitch,
    followers: "67K",
    handle: "videoeditor",
    color: "hover:text-green-500",
    bgColor: "hover:bg-green-500/10",
  },
  {
    name: "Discord",
    icon: Users,
    followers: "12K",
    handle: "Editor Community",
    color: "hover:text-emerald-400",
    bgColor: "hover:bg-emerald-400/10",
  },
];

const SocialLinks: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Connect With Me
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Follow my journey and get daily editing tips across all platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPlatforms.map((platform, index) => {
          const IconComponent = platform.icon;
          return (
            <a
              key={index}
              href="#"
              className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${platform.bgColor} hover:border-opacity-50`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${platform.bgColor}`}
                >
                  <IconComponent className={`w-6 h-6 text-gray-400 transition-colors duration-300 ${platform.color}`} />
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold text-white transition-colors duration-300 group-hover:${platform.color.replace("hover:", "")}`}
                  >
                    {platform.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{platform.handle}</p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-white">{platform.followers}</div>
                  <div className="text-xs text-gray-400">followers</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SocialLinks;
