
import React, { useRef, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Reddit is where I discovered communities that transformed my career. The advice and mentorship I found in r/programming led me to switch careers and double my salary.",
    author: "u/TechDreamer",
    community: "r/programming",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    stars: 5
  },
  {
    text: "I've found communities for everything from gardening to astronomy. Reddit has become my daily destination for both learning and entertainment.",
    author: "u/CosmicExplorer",
    community: "r/space",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    stars: 5
  },
  {
    text: "During lockdown, r/fitness kept me sane and healthy. The community support helped me lose 50 pounds and develop habits that changed my life.",
    author: "u/FitnessJourney",
    community: "r/fitness",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    stars: 5
  },
  {
    text: "As a small business owner, the advice I received on r/Entrepreneur was more valuable than my MBA. Real entrepreneurs sharing real experiences.",
    author: "u/StartupFounder",
    community: "r/Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    stars: 5
  }
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Background gradient blob */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-reddit-orange/15 rounded-full filter blur-[150px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What <span className="text-gradient">Redditors</span> Say</h2>
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
                  <div className="p-6 rounded-xl glass border border-white/10 h-full hover:border-white/20 transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="mb-4 flex justify-between items-start">
                      <div className="text-2xl text-reddit-orange">
                        <Quote size={24} />
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} size={14} className="text-reddit-orange fill-reddit-orange" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-foreground/90 mb-6 italic">"{testimonial.text}"</p>
                    
                    <div className="flex items-center mt-auto">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-white/10">
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
