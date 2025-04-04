
import React, { useRef, useEffect } from 'react';

const showcaseData = [
  {
    title: "r/AskReddit",
    description: "Thought-provoking questions and engaging answers",
    members: "42.3M",
    color: "from-reddit-orange to-reddit-orangeDark",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "r/gaming",
    description: "For everything gaming related",
    members: "37.8M",
    color: "from-reddit-orange to-reddit-orangeDark",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "r/science",
    description: "The latest scientific breakthroughs",
    members: "30.4M",
    color: "from-reddit-orange to-reddit-red",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "r/worldnews",
    description: "Major news from around the world",
    members: "31.2M",
    color: "from-reddit-orangeLight to-reddit-orange",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

const contentPreviewImages = [
  [
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1615859131861-052f0641a60e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ]
];

export const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const offsetFromTop = window.innerHeight - sectionRect.top;
      
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const progress = Math.min(1, Math.max(0, (offsetFromTop - index * 100) / 500));
          const yOffset = (1 - progress) * 50;
          const scale = 0.95 + (progress * 0.05);
          const opacity = Math.min(1, progress * 2);
          
          card.style.transform = `translateY(${yOffset}px) scale(${scale})`;
          card.style.opacity = `${opacity}`;
        }
      });
    };

    // Enhanced card interaction with 3D effect
    const addCardInteraction = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((x - centerX) / centerX) * 5;
          const rotateX = ((y - centerY) / centerY) * -5;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          
          // Add shine effect
          const shine = card.querySelector('.card-shine') as HTMLElement;
          if (shine) {
            shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
          }
        };
        
        const handleMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          
          const shine = card.querySelector('.card-shine') as HTMLElement;
          if (shine) {
            shine.style.backgroundImage = 'none';
          }
        };
        
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Add IntersectionObserver for section animation
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('animate-in');
          sectionObserver.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions
    
    // Initialize card interactions after a short delay
    setTimeout(addCardInteraction, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Premium animated background elements */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-reddit-orange/20 to-transparent filter blur-[120px] opacity-30"></div>
      <div className="absolute bottom-1/4 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-reddit-orangeLight/20 to-transparent filter blur-[150px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore Endless <span className="text-gradient-orange bg-gradient-to-r from-reddit-orange via-reddit-orangeLight to-reddit-orange">Communities</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Find your people. Engage with millions of users in communities tailored to every interest.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="mb-8 p-6 rounded-xl neo-glass border-white/10 transition-all duration-500 hover:border-white/20 group"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px) translateY(50px)',
                opacity: 0,
                willChange: 'transform, opacity'
              }}
            >
              {/* Card shine effect overlay */}
              <div className="card-shine absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-4 md:mb-0 flex items-start md:items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-xs`}>r/</div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-gradient-orange transition-all duration-300">{item.title}</h3>
                    <p className="text-foreground/70 mt-1 group-hover:text-foreground/90 transition-colors duration-300">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 rounded-full px-4 py-1 text-sm group-hover:bg-white/15 transition-colors duration-300">
                    {item.members} members
                  </div>
                  <button className="ml-4 bg-white/5 hover:bg-white/15 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-105">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content Preview with High-Quality Images */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden relative group/card">
                    <div className="w-full h-24 bg-white/5 rounded-md mb-3 overflow-hidden">
                      <img 
                        src={contentPreviewImages[index][i]} 
                        alt={`${item.title} content`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover/card:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-white text-lg font-semibold mb-2  transition-all duration-300">
        {item.title}
      </div>
      <div className="text-white/70 text-sm mb-4  transition-all duration-300">
        {item.description} {/* Це може бути короткий опис або інший текст */}
      </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
