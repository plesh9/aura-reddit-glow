
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = event;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
      
      // Enhanced parallax effect for the glow
      const glowElements = heroRef.current.querySelectorAll('.glow-element');
      glowElements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.05');
        const offsetX = (x - 0.5) * speed * 100;
        const offsetY = (y - 0.5) * speed * 100;
        (el as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    // Add animation for initial elements
    const animateElements = () => {
      const elements = document.querySelectorAll('.hero-animate');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, 100 * index);
      });
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      animateElements();
    }

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
      {/* Premium animated gradient blobs */}
      <div 
        className="absolute top-[calc(50%-300px)] left-[calc(50%-300px)] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-reddit-orange/30 to-reddit-orangeLight/10 filter blur-[120px] opacity-60 glow-element" 
        data-speed="0.05"
        style={{
          animationDelay: '-2s',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
      <div 
        className="absolute top-[calc(50%-250px)] left-[calc(50%-350px)] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-reddit-orangeLight/20 to-reddit-red/10 filter blur-[100px] opacity-50 glow-element"
        data-speed="0.08"
        style={{
          animationDelay: '-1s',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-reddit-orange/10 to-reddit-red/5 filter blur-[150px] opacity-30 glow-element"
        data-speed="0.03"
        style={{
          animationDelay: '-3s',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Refined noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      <div 
        ref={contentRef} 
        className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-24 text-center"
      >
        {/* Official Reddit logo */}
        <div className="flex justify-center mb-8 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <svg width="120" height="40" viewBox="0 0 121 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M18.2 23.8C18.2 21.7 16.5 20 14.4 20C12.3 20 10.7 21.7 10.7 23.8C10.7 25.9 12.3 27.6 14.4 27.6C16.5 27.6 18.2 25.9 18.2 23.8Z" fill="#FF4500"/>
            <path d="M41.9 23.8C41.9 21.7 40.2 20 38.1 20C36 20 34.3 21.7 34.3 23.8C34.3 25.9 36 27.6 38.1 27.6C40.2 27.6 41.9 25.9 41.9 23.8Z" fill="#FF4500"/>
            <path d="M59.8 20.1C58.9 20.1 58.2 20.8 58.2 21.7C58.2 22.5 58.9 23.3 59.8 23.3C60.6 23.3 61.4 22.6 61.4 21.7C61.3 20.8 60.6 20.1 59.8 20.1Z" fill="white"/>
            <path d="M69.8 20.1C68.9 20.1 68.2 20.8 68.2 21.7C68.2 22.5 68.9 23.3 69.8 23.3C70.6 23.3 71.4 22.6 71.4 21.7C71.3 20.8 70.6 20.1 69.8 20.1Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M26.2 10.3C26.2 8.10001 28 6.30001 30.2 6.30001C32.4 6.30001 34.2 8.10001 34.2 10.3C34.2 12.5 32.4 14.3 30.2 14.3C28.1 14.3 26.2 12.5 26.2 10.3ZM66.5 10.3H70.2L73.1 17.6L76.1 10.3H79.8V25.6H76.8V16.3L73.9 23.6H72.3L69.4 16.3V25.6H66.5V10.3ZM63.6 13.2C62.5 14.3 61.8 15.7 61.8 17.3V18.6C61.8 20.1 62.5 21.6 63.6 22.7C64.7 23.8 66.1 24.5 67.7 24.5H67.8V21.6H67.7C66.9 21.6 66.1 21.3 65.5 20.7C64.9 20.1 64.6 19.3 64.6 18.5V17.4C64.6 16.6 64.9 15.8 65.5 15.2C66.1 14.6 66.9 14.3 67.7 14.3H67.8V11.4H67.7C66.1 11.4 64.7 12.1 63.6 13.2ZM88.1 10.3H84.3V25.6H88.1V19.3H94.4V25.6H98.2V10.3H94.4V16.4H88.1V10.3ZM103 15.2C103.6 14.6 104.4 14.3 105.2 14.3H105.3V11.4H105.2C103.6 11.4 102.2 12.1 101.1 13.2C100 14.3 99.3 15.7 99.3 17.3V18.6C99.3 20.1 100 21.6 101.1 22.7C102.2 23.8 103.6 24.5 105.2 24.5H105.3V21.6H105.2C104.4 21.6 103.6 21.3 103 20.7C102.4 20.1 102.1 19.3 102.1 18.5V17.4C102 16.6 102.4 15.8 103 15.2ZM120 20.1L117.1 10.3H113.7L112.2 15.2L110.7 10.3H107.3L104.4 20.1V25.6H107.3V20.1H107.4L109.1 14.5L110.7 20.1H113.7L115.3 14.5L117 20.1H117.1V25.6H120V20.1ZM52.7 29.5C52.7 30.9 52.8 31.9 53.1 32.7C53.3 33.5 53.8 34.1 54.5 34.8C54.6 34.9 54.6 35 54.6 35C54.6 35.1 54.5 35.1 54.5 35.1L53.5 35.9C53.5 35.9 53.4 36 53.3 36C53.2 36 53.2 35.9 53.1 35.9C52.3 35 51.7 34.2 51.3 33.1C50.9 32 50.8 30.8 50.8 29.4V28C50.8 26.6 51 25.4 51.3 24.3C51.7 23.2 52.3 22.4 53.1 21.5C53.2 21.4 53.2 21.4 53.3 21.4C53.4 21.4 53.4 21.4 53.5 21.5L54.5 22.3C54.5 22.3 54.6 22.4 54.6 22.4C54.6 22.5 54.6 22.5 54.5 22.6C53.8 23.3 53.4 23.9 53.1 24.7C52.8 25.5 52.7 26.6 52.7 27.9V29.5ZM59.8 27.6C60.6 27.6 61.2 26.9 61.3 26.2C61.3 26.1 61.3 26.1 61.4 26C61.5 26 61.5 26 61.6 26L62.7 26.3C62.8 26.3 62.8 26.3 62.8 26.4C62.8 26.5 62.8 26.5 62.8 26.5C62.6 27.4 62.1 28.2 61.4 28.7C60.7 29.2 59.9 29.5 59 29.5C58.1 29.5 57.3 29.2 56.6 28.7C55.9 28.2 55.4 27.4 55.2 26.5C55.2 26.4 55.2 26.4 55.2 26.3C55.2 26.2 55.3 26.2 55.3 26.2L56.4 25.9C56.5 25.9 56.5 25.9 56.6 25.9C56.7 25.9 56.7 26 56.7 26C56.8 26.8 57.4 27.5 58.2 27.5C58.3 27.6 59.7 27.6 59.8 27.6ZM69.8 27.6C70.6 27.6 71.2 26.9 71.3 26.2C71.3 26.1 71.3 26.1 71.4 26C71.5 26 71.5 26 71.6 26L72.7 26.3C72.8 26.3 72.8 26.3 72.8 26.4C72.8 26.5 72.8 26.5 72.8 26.5C72.6 27.4 72.1 28.2 71.4 28.7C70.7 29.2 69.9 29.5 69 29.5C68.1 29.5 67.3 29.2 66.6 28.7C65.9 28.2 65.4 27.4 65.2 26.5C65.2 26.4 65.2 26.4 65.2 26.3C65.2 26.2 65.3 26.2 65.3 26.2L66.4 25.9C66.5 25.9 66.5 25.9 66.6 25.9C66.7 25.9 66.7 26 66.7 26C66.8 26.8 67.4 27.5 68.2 27.5C68.4 27.6 69.7 27.6 69.8 27.6ZM75.1 29.5C75.1 30.9 75 31.9 74.7 32.7C74.5 33.5 74 34.1 73.3 34.8C73.2 34.9 73.2 35 73.2 35C73.2 35.1 73.3 35.1 73.3 35.1L74.3 35.9C74.3 35.9 74.4 36 74.5 36C74.6 36 74.6 35.9 74.7 35.9C75.5 35 76.1 34.2 76.5 33.1C76.9 32 77 30.8 77 29.4V28C77 26.6 76.8 25.4 76.5 24.3C76.1 23.2 75.5 22.4 74.7 21.5C74.6 21.4 74.6 21.4 74.5 21.4C74.4 21.4 74.4 21.4 74.3 21.5L73.3 22.3C73.3 22.3 73.2 22.4 73.2 22.4C73.2 22.5 73.2 22.5 73.3 22.6C74 23.3 74.4 23.9 74.7 24.7C75 25.5 75.1 26.6 75.1 27.9V29.5ZM64.8 24.5C64.8 23.3 65 21.8 66.5 21.6C67.9 21.5 68.3 22.2 68.3 22.7C68.3 23.2 68 23.8 66.8 23.9C65.9 24 64.8 23.8 64.8 24.5ZM36.1 30.1C37.1 30.2 37.3 29.7 37.2 29.2C37.1 28.8 37 28.7 36.6 28.6C36.2 28.5 32.7 27.6 31.5 22.3C31.4 21.8 31.5 21.1 31.6 20.8C32.3 17.6 36.4 15.3 40.7 16.5C45 17.7 46.5 21.7 46.1 25.1C45.7 28.5 43.2 31.3 39.2 31.8C35.2 32.2 32.5 30.1 31.6 29.4C31 28.9 31.2 28.3 31.7 27.9C32.2 27.5 32.9 27.6 33.4 27.8C33.9 28.1 35.1 30 36.1 30.1ZM16.4 30.1C15.4 30.2 15.2 29.7 15.3 29.2C15.4 28.8 15.5 28.7 15.9 28.6C16.3 28.5 19.8 27.6 21 22.3C21.1 21.8 21 21.1 20.9 20.8C20.1 17.6 16.1 15.3 11.8 16.5C7.5 17.7 6 21.7 6.4 25.1C6.8 28.5 9.3 31.3 13.3 31.8C17.3 32.2 20 30.1 20.9 29.4C21.5 28.9 21.3 28.3 20.8 27.9C20.3 27.5 19.6 27.6 19.1 27.8C18.6 28.1 17.4 30 16.4 30.1ZM46.9 23.8C46.9 18.7 42.8 14.6 37.7 14.6C35.8 14.6 34 15.2 32.6 16.2C30 14.4 26.7 13.3 23.2 13.3C23.1 13.3 23 13.3 22.9 13.3C21.9 11.5 20 10.3 17.8 10.3C14.2 10.3 11.2 13.3 11.2 16.9C11.2 18.7 11.9 20.3 13.1 21.5C13 22 13 22.5 13 23C13 28.1 17.1 32.2 22.2 32.2C23.8 32.2 25.3 31.8 26.6 31.1C28.3 32.7 30.6 33.7 33.1 33.7C38.2 33.7 42.3 29.6 42.3 24.5C42.3 24.3 42.3 24.1 42.3 24C45.1 23.5 46.9 21 46.9 23.8Z" fill="white"/>
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tighter mb-6 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="text-gradient bg-gradient-to-br from-white via-white to-white/60">Dive into</span> what <br className="hidden sm:block" />
          makes you <span className="text-gradient-orange bg-gradient-to-br from-reddit-orange via-reddit-orangeLight to-reddit-orange/70">curious</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Join millions exploring endless communities, conversations, and connections on Reddit.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0 animate-slide-up hero-animate" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <Button className="w-full sm:w-auto text-base px-8 py-6 relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-red transition-all duration-300 group-hover:scale-[1.05] group-active:scale-95"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-reddit-orange to-reddit-orangeDark opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="absolute inset-0 w-full h-full bg-noise opacity-5"></span>
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
          
          <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-white/20 hover:bg-white/5 relative overflow-hidden transition-all duration-300 group">
            <span className="absolute inset-0 w-full h-full border border-white/20 rounded-md transition-all duration-300 group-hover:border-white/40"></span>
            <span className="absolute inset-0 w-full h-full bg-white/0 transition-all duration-300 group-hover:bg-white/5"></span>
            <span className="absolute inset-0 w-full h-full bg-noise opacity-5"></span>
            <span className="relative z-10">Explore Communities</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
