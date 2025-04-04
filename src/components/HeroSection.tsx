
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = event;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    // Add animation for initial elements
    const animateElements = () => {
      const elements = document.querySelectorAll('.hero-animate');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, 100 * index);
      });
    };

    animateElements();

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center noise-bg overflow-hidden pt-20"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      {/* Animated gradient blobs */}
      <div className="absolute top-[calc(50%-300px)] left-[calc(50%-300px)] w-[600px] h-[600px] rounded-full bg-reddit-orange/20 filter blur-[100px] opacity-60 animate-float" 
        style={{
          transform: 'translate(calc(var(--mouse-x) * -40px), calc(var(--mouse-y) * -40px))',
          animationDelay: '-2s'
        }}
      />
      <div className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] w-[500px] h-[500px] rounded-full bg-reddit-orangeLight/20 filter blur-[100px] opacity-50 animate-float"
        style={{
          transform: 'translate(calc(var(--mouse-x) * 40px), calc(var(--mouse-y) * 40px))',
          animationDelay: '-1s'
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="text-gradient">Dive into</span> what <br className="hidden sm:block" />
          makes you <span className="text-gradient-orange">curious</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Join millions exploring endless communities, conversations, and connections on Reddit.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <Button className="w-full sm:w-auto text-base px-8 py-6 bg-gradient-reddit hover:brightness-110 transition-all duration-300 hover:scale-105 glow">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-white/20 hover:bg-white/5 transition-all duration-300">
            Explore Communities
          </Button>
        </div>
      </div>
    </section>
  );
};
