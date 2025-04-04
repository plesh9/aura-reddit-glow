
import React, { useRef, useEffect } from 'react';

const showcaseData = [
  {
    title: "r/AskReddit",
    description: "Thought-provoking questions and engaging answers",
    members: "42.3M",
    color: "from-orange-500 to-red-500",
    delay: "0.1s"
  },
  {
    title: "r/gaming",
    description: "For everything gaming related",
    members: "37.8M",
    color: "from-blue-500 to-indigo-500",
    delay: "0.2s"
  },
  {
    title: "r/science",
    description: "The latest scientific breakthroughs",
    members: "30.4M",
    color: "from-emerald-500 to-green-600",
    delay: "0.3s"
  },
  {
    title: "r/worldnews",
    description: "Major news from around the world",
    members: "31.2M",
    color: "from-violet-500 to-purple-600",
    delay: "0.4s"
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-reddit-blue/10 rounded-full filter blur-[120px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Endless <span className="text-gradient-blue">Communities</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Find your people. Engage with millions of users in communities tailored to every interest.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`mb-8 p-6 rounded-xl glass border-white/10 opacity-0 animate-slide-up transition-all duration-300 hover:border-white/30`}
              style={{ 
                transformOrigin: 'center center',
                transform: 'perspective(1000px)',
                animationDelay: item.delay,
                animationFillMode: 'forwards',
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
              
              {/* Content Preview */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-full h-24 bg-white/10 rounded-md mb-3"></div>
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
