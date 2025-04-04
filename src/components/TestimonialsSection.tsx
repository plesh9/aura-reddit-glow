
import React, { useRef, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Reddit is where I discovered communities that transformed my career. The advice and mentorship I found in r/programming led me to switch careers and double my salary.",
    author: "u/TechDreamer",
    community: "r/programming",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    text: "I've found communities for everything from gardening to astronomy. Reddit has become my daily destination for both learning and entertainment.",
    author: "u/CosmicExplorer",
    community: "r/space",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    text: "During lockdown, r/fitness kept me sane and healthy. The community support helped me lose 50 pounds and develop habits that changed my life.",
    author: "u/FitnessJourney",
    community: "r/fitness",
    avatar: "https://images.unsplash.com/photo-1543132220-3ec99c6094dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    text: "As a small business owner, the advice I received on r/Entrepreneur was more valuable than my MBA. Real entrepreneurs sharing real experiences.",
    author: "u/StartupFounder",
    community: "r/Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    stars: 5
  }
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  
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
    
    // Enhanced card hover effect
    const handleCardHover = (event: MouseEvent) => {
      const cards = document.querySelectorAll('.testimonial-card');
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        if (
          x >= 0 && 
          x <= rect.width && 
          y >= 0 && 
          y <= rect.height
        ) {
          const rotateY = ((x - rect.width / 2) / rect.width) * 5;
          const rotateX = ((y - rect.height / 2) / rect.height) * -5;
          
          card.setAttribute('style', `transform: perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02); 
            box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4), 0 0 40px -20px rgba(255, 69, 0, 0.1);`);
          
          // Add shine effect
          const shine = card.querySelector('.card-shine') as HTMLElement;
          if (shine) {
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`;
            shine.style.opacity = '1';
          }
        }
      });
    };
    
    const handleCardLeave = () => {
      const cards = document.querySelectorAll('.testimonial-card');
      
      cards.forEach((card) => {
        card.setAttribute('style', '');
        
        const shine = card.querySelector('.card-shine') as HTMLElement;
        if (shine) {
          shine.style.opacity = '0';
        }
      });
    };
    
    document.addEventListener('mousemove', handleCardHover);
    document.addEventListener('mouseleave', handleCardLeave);
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      document.removeEventListener('mousemove', handleCardHover);
      document.removeEventListener('mouseleave', handleCardLeave);
    };
  }, []);
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Premium background effects */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-reddit-orange/15 to-transparent filter blur-[150px] opacity-40"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-reddit-orangeLight/10 to-transparent filter blur-[130px] opacity-30" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What <span className="text-gradient bg-gradient-to-r from-reddit-orange via-reddit-orangeLight to-reddit-orange">Redditors</span> Say</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Hear from the people who make our communities thrive.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="testimonial-card p-6 rounded-xl neo-glass border border-white/10 h-full transition-all duration-500 hover:border-white/20 relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Card shine effect */}
                    <div className="card-shine absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none z-0"></div>
                    
                    <div className="mb-4 flex justify-between items-start relative z-10">
                      <div className="text-2xl text-reddit-orange">
                        <Quote size={24} className="drop-shadow-glow" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 69, 0, 0.4))' }} />
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} size={14} className="text-reddit-orange fill-reddit-orange drop-shadow-glow" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 69, 0, 0.4))' }} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-foreground/90 mb-6 italic relative z-10">"{testimonial.text}"</p>
                    
                    <div className="flex items-center mt-auto relative z-10">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-white/10 ring-2 ring-reddit-orange/20">
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-foreground/60">From {testimonial.community}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-8">
              <CarouselPrevious className="relative -left-0 hover:bg-white/10 border-white/20" />
              <CarouselNext className="relative -right-0 hover:bg-white/10 border-white/20" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
