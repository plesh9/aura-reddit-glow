
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const subreddits = [
  {
    name: "r/aww",
    description: "A subreddit for cute and cuddly pictures",
    members: "30.2M",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "r/worldnews",
    description: "A place for major news from around the world",
    members: "31.4M",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-red-500 to-amber-500"
  },
  {
    name: "r/music",
    description: "The musical community of Reddit",
    members: "32.3M",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-amber-500 to-orange-400"
  },
  {
    name: "r/movies",
    description: "News and discussions about movies",
    members: "29.7M",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-amber-400 to-yellow-300"
  },
  {
    name: "r/science",
    description: "The latest scientific breakthroughs",
    members: "30.4M",
    image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-red-400 to-orange-300"
  },
  {
    name: "r/technology",
    description: "For news and discussions about technology",
    members: "15.8M",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-orange-300 to-red-400"
  },
  {
    name: "r/books",
    description: "Book discussions and recommendations",
    members: "22.1M",
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-amber-400 to-red-400"
  },
  {
    name: "r/Art",
    description: "This is a subreddit about art",
    members: "23.5M",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gradient: "from-orange-500 to-yellow-500"
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
    
    return () => {
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
    <section id="subreddits" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Background gradient blob */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-reddit-orange/10 rounded-full filter blur-[150px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your <span className="text-gradient">Subreddit</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Discover communities that match your interests, passions, and curiosities.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subreddits.map((subreddit, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="stagger-item rounded-xl overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
              <div className={`absolute inset-0 bg-gradient-to-tr ${subreddit.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300 z-0`}></div>
              <img 
                src={subreddit.image} 
                alt={subreddit.name} 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 z-0"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 z-20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{subreddit.name}</h3>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{subreddit.members}</span>
                </div>
                <p className="text-white/80 text-sm mb-3">{subreddit.description}</p>
                <Button variant="outline" size="sm" className="w-full justify-center border-white/20 bg-black/30 hover:bg-white/10 transition-colors">
                  Join Community
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-gradient-reddit hover:brightness-110 transition-all duration-300 group">
            Explore All Communities
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
