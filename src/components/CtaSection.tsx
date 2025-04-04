
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CtaSection = () => {
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
    <section id="cta" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-reddit-orange/15 rounded-full filter blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-reddit-orangeLight/20 rounded-full filter blur-[150px] opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-reddit-orange/30 to-reddit-orangeLight/30 opacity-30 blur-2xl rounded-2xl"></div>
          
          <div className="text-center mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join the <span className="text-gradient">conversation</span>?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Create an account now and become part of the Reddit community. Dive into discussions, discover new perspectives, and connect with people who share your passions.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <Button className="w-full sm:w-auto text-base px-8 py-6 bg-gradient-reddit hover:brightness-110 transition-all duration-300 hover:scale-105 glow">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-white/20 hover:bg-white/5 transition-all duration-300">
              Learn More
            </Button>
          </div>
          
          {/* Quote/Testimonial */}
          <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10 opacity-0 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <blockquote className="text-foreground/90 italic text-lg">
              "I've found communities for everything from gardening to astronomy. Reddit has become my daily destination for both learning and entertainment."
            </blockquote>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt="Reddit user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">u/reddituser123</p>
                <p className="text-sm text-foreground/60">Community member since 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
