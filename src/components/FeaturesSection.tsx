
import React from 'react';
import { Users, MessageSquare, TrendingUp, Globe, ShieldCheck, Zap } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: string;
};

const FeatureCard = ({ icon, title, description, gradient, delay }: FeatureCardProps) => (
  <div 
    className="p-6 rounded-xl glass border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-5px] opacity-0 animate-slide-up"
    style={{ animationDelay: delay, animationFillMode: 'forwards' }}
  >
    <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-foreground/70">{description}</p>
  </div>
);

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="text-white" size={24} />,
      title: "Vibrant Communities",
      description: "Find your people with thousands of communities for every interest, hobby and passion.",
      gradient: "bg-gradient-reddit",
      delay: "0.1s"
    },
    {
      icon: <MessageSquare className="text-white" size={24} />,
      title: "Authentic Discussions",
      description: "Engage in real conversations with people who share your interests.",
      gradient: "bg-gradient-reddit-blue",
      delay: "0.2s"
    },
    {
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Discover What's Trending",
      description: "Stay updated with the latest trends, news, and viral content from around the world.",
      gradient: "bg-gradient-reddit-purple",
      delay: "0.3s"
    },
    {
      icon: <Globe className="text-white" size={24} />,
      title: "Global Perspectives",
      description: "Connect with users worldwide and broaden your understanding of diverse viewpoints.",
      gradient: "bg-gradient-reddit-purple",
      delay: "0.4s"
    },
    {
      icon: <ShieldCheck className="text-white" size={24} />,
      title: "Safe Environment",
      description: "Community-focused moderation that keeps conversations constructive and respectful.",
      gradient: "bg-gradient-reddit-blue",
      delay: "0.5s"
    },
    {
      icon: <Zap className="text-white" size={24} />,
      title: "Personalized Feed",
      description: "Your home feed evolves as you engage, delivering content tailored to your interests.",
      gradient: "bg-gradient-reddit",
      delay: "0.6s"
    }
  ];

  return (
    <section id="features" className="py-24 relative noise-bg overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-reddit-purple/20 rounded-full filter blur-[80px] opacity-40"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-reddit-orange/20 rounded-full filter blur-[100px] opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Front Page of <span className="text-gradient">the Internet</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Explore endless possibilities with Reddit's community-powered platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
