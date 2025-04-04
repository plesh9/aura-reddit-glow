
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const subreddits = [
  {
    name: "r/aww",
    description: "A subreddit for cute and cuddly pictures",
    members: "30.2M",
    image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orange to-reddit-orangeDark"
  },
  {
    name: "r/worldnews",
    description: "A place for major news from around the world",
    members: "31.4M",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orangeDark to-reddit-red"
  },
  {
    name: "r/music",
    description: "The musical community of Reddit",
    members: "32.3M",
    image: "https://images.unsplash.com/photo-1599467556385-48b57868f038?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orange to-reddit-orangeLight"
  },
  {
    name: "r/movies",
    description: "News and discussions about movies",
    members: "29.7M",
    image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orangeLight to-reddit-orange"
  },
  {
    name: "r/science",
    description: "The latest scientific breakthroughs",
    members: "30.4M",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-red to-reddit-orange"
  },
  {
    name: "r/technology",
    description: "For news and discussions about technology",
    members: "15.8M",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orange to-reddit-orangeDark"
  },
  {
    name: "r/books",
    description: "Book discussions and recommendations",
    members: "22.1M",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orangeLight to-reddit-orange"
  },
  {
    name: "r/Art",
    description: "This is a subreddit about art",
    members: "23.5M",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-reddit-orange to-reddit-orangeLight"
  }
];

export const SubredditsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
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
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
              
              // Add parallax effect for images
              const img = entry.target.querySelector('img');
              if (img) {
                img.style.transform = 'scale(1.01)';
                img.style.transition = 'transform 0.7s ease-out';
              }
            }, index * 50);
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
    
    // Enhanced 3D perspective on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const percentX = (x - centerX) / centerX;
          const percentY = (y - centerY) / centerY;
          
          const intensity = 15; // Adjust for stronger or weaker effect
          card.style.transform = `perspective(1000px) rotateY(${percentX * intensity}deg) rotateX(${-percentY * intensity}deg) scale3d(1.05, 1.05, 1.05)`;
          
          // Add shadow effect based on perspective
          card.style.boxShadow = `
            ${-percentX * 20}px ${-percentY * 20}px 30px rgba(0,0,0,0.2),
            inset 0 0 0 1px rgba(255, 255, 255, ${0.05 + Math.abs(percentX) * 0.05})
          `;
          
          // Move image in parallax
          const img = card.querySelector('img');
          if (img) {
            (img as HTMLElement).style.transform = `scale(1.1) translate(${-percentX * 10}px, ${-percentY * 10}px)`;
          }
          
          // Add shine effect
          const shine = card.querySelector('.card-shine') as HTMLElement;
          if (shine) {
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`;
            shine.style.opacity = '1';
          }
        }
      });
    };
    
    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.style.transform = '';
        card.style.boxShadow = '';
        
        const img = card.querySelector('img');
        if (img) {
          (img as HTMLElement).style.transform = 'scale(1)';
        }
        
        const shine = card.querySelector('.card-shine') as HTMLElement;
        if (shine) {
          shine.style.opacity = '0';
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <section id="subreddits" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Premium background elements */}
      <div className="absolute -bottom-[300px] -right-[300px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-reddit-orange/10 to-transparent filter blur-[150px] opacity-40"></div>
      <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-reddit-orangeLight/15 to-transparent filter blur-[130px] opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Find Your <span className="text-gradient bg-gradient-to-r from-reddit-orange via-reddit-orangeLight to-reddit-orange">Subreddit</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Discover communities that match your interests, passions, and curiosities.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subreddits.map((subreddit, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="stagger-item rounded-xl overflow-hidden relative transition-all duration-500 card-3d will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card shine effect overlay */}
              <div className="card-shine absolute inset-0 opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>
              
              {/* High-quality overlay with refined glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
              
              {/* Premium gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${subreddit.gradient} opacity-40 transition-opacity duration-500 z-0`}></div>
              
              {/* Inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5" 
                   style={{ 
                     boxShadow: 'inset 0 0 30px rgba(255, 69, 0, 0.3)', 
                     borderRadius: 'inherit' 
                   }}>
              </div>
              
              {/* High-quality optimized image */}
              <img 
                src={subreddit.image} 
                alt={subreddit.name} 
                className="w-full h-64 object-cover transition-all duration-700 will-change-transform"
                loading="lazy"
              />
              
              {/* Premium glassmorphism content panel */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-20 backdrop-blur-md bg-black/30 border-t border-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient-orange transition-all duration-300">{subreddit.name}</h3>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full transition-all duration-300">{subreddit.members}</span>
                </div>
                <p className="text-white/80 text-sm mb-3 transition-all duration-300">{subreddit.description}</p>
                <Button variant="outline" size="sm" className="w-full justify-center border-white/20 backdrop-blur-sm bg-black/30 hover:bg-white/10 transition-all duration-300 hover:border-white/40">
                  Join Community
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-red transition-all duration-300 group-hover:scale-[1.05] group-active:scale-95"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-orangeDark opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="absolute inset-0 w-full h-full bg-noise opacity-5"></span>
            <span className="relative z-10 flex items-center px-6 py-2">
              Explore All Communities
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
