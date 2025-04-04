
import React, { useRef, useEffect } from 'react';

const showcaseData = [
  {
    title: "r/AskReddit",
    description: "Thought-provoking questions and engaging answers",
    members: "42.3M",
    color: "from-orange-500 to-red-500",
    delay: "0.1s",
    image: "https://images.unsplash.com/photo-1576967289095-ee91b65a85ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "r/gaming",
    description: "For everything gaming related",
    members: "37.8M",
    color: "from-red-500 to-orange-400",
    delay: "0.2s",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "r/science",
    description: "The latest scientific breakthroughs",
    members: "30.4M",
    color: "from-orange-400 to-yellow-500",
    delay: "0.3s",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "r/worldnews",
    description: "Major news from around the world",
    members: "31.2M",
    color: "from-yellow-500 to-amber-500",
    delay: "0.4s",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
];

export const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const offset = (window.innerHeight - sectionRect.top) * 0.3;
      
      cardsRef.current.forEach((card, index) => {
        if (card) {
          card.style.transform = `perspective(1000px) rotateX(${Math.min(20, Math.max(-20, (offset - index * 100) * 0.05))}deg) scale(${1 - Math.abs((offset - index * 100) * 0.0001)})`;
        }
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

    // Add IntersectionObserver for card animations
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    cardsRef.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Background gradient blob */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-reddit-orange/10 rounded-full filter blur-[120px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Endless <span className="text-gradient-orange">Communities</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Find your people. Engage with millions of users in communities tailored to every interest.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`mb-8 p-6 rounded-xl glass border-white/10 stagger-item transition-all duration-300 hover:border-white/30`}
              style={{ 
                transformOrigin: 'center center',
                transform: 'perspective(1000px)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} mr-3 flex items-center justify-center text-white font-bold text-xs`}>r/</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-foreground/70 mt-2">{item.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 rounded-full px-4 py-1 text-sm">
                    {item.members} members
                  </div>
                  <button className="ml-4 bg-white/5 hover:bg-white/10 rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content Preview with Real Images */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-full h-24 bg-white/10 rounded-md mb-3 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={`${item.title} content`} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
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
