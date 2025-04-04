
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
    
    // Add glow effect that follows mouse
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.setProperty('--mouse-x', `${x}px`);
      glowRef.current.style.setProperty('--mouse-y', `${y}px`);
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
      {/* Enhanced background gradient blobs with animations */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-reddit-orange/15 rounded-full filter blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-reddit-orangeLight/20 rounded-full filter blur-[150px] opacity-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4">
        <div 
          ref={glowRef}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative hover:border-white/20 transition-all duration-500"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
          } as React.CSSProperties}
        >
          {/* Interactive glow effect that follows cursor */}
          <div 
            className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), rgba(255,69,0,0.15), transparent 80%)',
              borderRadius: 'inherit'
            }}
          ></div>
          
          {/* Improved subtle glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-reddit-orange/30 to-reddit-orangeLight/30 opacity-30 blur-2xl rounded-2xl"></div>
          
          <div className="text-center mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join the <span className="text-gradient">conversation</span>?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Create an account now and become part of the Reddit community. Dive into discussions, discover new perspectives, and connect with people who share your passions.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <Button className="w-full sm:w-auto text-base px-8 py-6 bg-gradient-reddit hover:brightness-110 transition-all duration-500 hover:scale-105 glow group">
              <span className="relative z-10">Sign Up Now</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-reddit opacity-80 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></span>
              </span>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-white/20 hover:bg-white/5 transition-all duration-300 hover:border-white/40">
              Learn More
            </Button>
          </div>
          
          {/* Enhanced testimonial card with glassmorphism */}
          <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10 opacity-0 animate-slide-up backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:border-white/20" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="absolute top-3 right-4 text-4xl text-reddit-orange/20">"</div>
            <blockquote className="text-foreground/90 italic text-lg relative z-10">
              "I've found communities for everything from gardening to astronomy. Reddit has become my daily destination for both learning and entertainment."
            </blockquote>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-reddit-orange/30 ring-offset-2 ring-offset-transparent">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
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
