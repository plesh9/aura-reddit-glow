
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CtaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
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
    
    // Add premium glow effect that follows mouse
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.setProperty('--mouse-x', `${x}px`);
      glowRef.current.style.setProperty('--mouse-y', `${y}px`);
      
      // Add subtle parallax to background elements
      const parallaxElements = glowRef.current.querySelectorAll('.parallax-element');
      parallaxElements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.05');
        const offsetX = (x - rect.width / 2) * speed;
        const offsetY = (y - rect.height / 2) * speed;
        (el as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    const glowElement = glowRef.current;
    if (glowElement) {
      glowElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      if (glowElement) {
        glowElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="py-24 relative noise-bg overflow-hidden section-animate">
      {/* Premium background gradient blobs with animations */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-gradient-to-br from-reddit-orange/15 to-transparent rounded-full filter blur-[150px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-reddit-orangeLight/10 to-transparent rounded-full filter blur-[180px] opacity-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4">
        <div 
          ref={glowRef}
          className="max-w-4xl mx-auto relative rounded-2xl p-8 md:p-12 overflow-hidden will-change-transform"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
          } as React.CSSProperties}
        >
          {/* Premium glassmorphism background with depth */}
          <div className="absolute inset-0 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl z-0"></div>
          
          {/* Subtle animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-reddit-orange/5 to-reddit-orangeLight/5 opacity-80 rounded-2xl -z-10"></div>
          
          {/* Noise texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay rounded-2xl -z-5"></div>
          
          {/* Interactive glow effect that follows cursor */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none -z-10" 
            style={{ 
              background: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), rgba(255,69,0,0.15), transparent 80%)',
              opacity: 0.6,
            }}
          ></div>
          
          {/* Floating elements with parallax effect */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-reddit-orange/20 to-transparent filter blur-[80px] opacity-30 parallax-element" data-speed="-0.03"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-reddit-orangeLight/15 to-transparent filter blur-[60px] opacity-20 parallax-element" data-speed="0.05"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to join the <span className="text-gradient bg-gradient-to-r from-reddit-orange via-reddit-orangeLight to-reddit-orange">conversation</span>?</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">Create an account now and become part of the Reddit community. Dive into discussions, discover new perspectives, and connect with people who share your passions.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <Button className="w-full sm:w-auto text-base px-8 py-6 relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-red transition-all duration-300 group-hover:scale-[1.05] group-active:scale-95"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-orangeDark opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="absolute inset-0 w-full h-full bg-noise opacity-5"></span>
                <span className="relative z-10 flex items-center">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-white/20 hover:bg-white/5 relative overflow-hidden transition-all duration-300 group">
                <span className="absolute inset-0 w-full h-full border border-white/20 rounded-md transition-all duration-300 group-hover:border-white/40"></span>
                <span className="absolute inset-0 w-full h-full bg-white/0 transition-all duration-300 group-hover:bg-white/5"></span>
                <span className="absolute inset-0 w-full h-full bg-noise opacity-5"></span>
                <span className="relative z-10">Learn More</span>
              </Button>
            </div>
            
            {/* Enhanced testimonial card with premium glassmorphism */}
            <div className="mt-12 p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 opacity-0 animate-slide-up hover:bg-white/10 transition-all duration-500 hover:border-white/20 relative overflow-hidden" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              {/* Enhanced quote styling */}
              <div className="absolute top-2 right-3 text-5xl text-reddit-orange/20 font-serif">"</div>
              <div className="absolute bottom-2 left-3 text-5xl text-reddit-orange/20 font-serif transform rotate-180">"</div>
              
              {/* Subtle card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <blockquote className="text-foreground/90 italic text-lg relative z-10">
                "I've found communities for everything from gardening to astronomy. Reddit has become my daily destination for both learning and entertainment."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-reddit-orange/30 ring-offset-2 ring-offset-transparent">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
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
      </div>
    </section>
  );
};
