
import React, { useEffect, useRef } from 'react';
import { Users, MessageSquare, TrendingUp, Globe, ShieldCheck, Zap } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  index: number;
};

const FeatureCard = ({ icon, title, description, gradient, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Add mouse movement interaction for cards
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="p-6 rounded-xl neo-glass border-white/10 transition-all duration-500 hover:border-white/20 stagger-item"
      style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
    >
      <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-4 relative`}>
        <div className="absolute inset-0 rounded-lg bg-noise opacity-10"></div>
        {icon}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('animate-in');
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Users className="text-white" size={24} />,
      title: "Vibrant Communities",
      description: "Find your people with thousands of communities for every interest, hobby and passion.",
      gradient: "bg-gradient-to-br from-reddit-orange to-reddit-orangeDark",
    },
    {
      icon: <MessageSquare className="text-white" size={24} />,
      title: "Authentic Discussions",
      description: "Engage in real conversations with people who share your interests.",
      gradient: "bg-gradient-to-br from-reddit-orangeLight to-reddit-orange",
    },
    {
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Discover What's Trending",
      description: "Stay updated with the latest trends, news, and viral content from around the world.",
      gradient: "bg-gradient-to-br from-reddit-orange to-reddit-red",
    },
    {
      icon: <Globe className="text-white" size={24} />,
      title: "Global Perspectives",
      description: "Connect with users worldwide and broaden your understanding of diverse viewpoints.",
      gradient: "bg-gradient-to-br from-reddit-red to-reddit-orange",
    },
    {
      icon: <ShieldCheck className="text-white" size={24} />,
      title: "Safe Environment",
      description: "Community-focused moderation that keeps conversations constructive and respectful.",
      gradient: "bg-gradient-to-br from-reddit-orangeLight to-reddit-orange",
    },
    {
      icon: <Zap className="text-white" size={24} />,
      title: "Personalized Feed",
      description: "Your home feed evolves as you engage, delivering content tailored to your interests.",
      gradient: "bg-gradient-to-br from-reddit-orange to-reddit-orangeLight",
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Enhanced background gradient elements */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-reddit-orange/10 to-transparent filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-reddit-orangeLight/10 to-transparent filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Front Page of <span className="text-gradient bg-gradient-to-r from-reddit-orange via-reddit-orangeLight to-reddit-orange">the Internet</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Explore endless possibilities with Reddit's community-powered platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
