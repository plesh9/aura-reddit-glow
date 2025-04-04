
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { SubredditsSection } from '@/components/SubredditsSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Update page title
    document.title = "Reddit - Dive into what you love";
    
    // Set loaded state
    setIsLoaded(true);
    
    // Enhanced intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Handle staggered animation for child elements
          const staggerItems = entry.target.querySelectorAll('.stagger-item');
          staggerItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, index * 100);
          });
          
          // Once the animation is complete, disconnect to improve performance
          setTimeout(() => {
            observer.unobserve(entry.target);
          }, 1000);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    
    document.querySelectorAll('.section-animate').forEach((section) => {
      observer.observe(section);
    });
    
    // Enhanced header scroll effect
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize cursor effect for enhanced interactivity
    const initCursorEffect = () => {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(255, 69, 0, 0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        transition: width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s;
        backdrop-filter: blur(4px);
      `;
      document.body.appendChild(cursor);
      
      const cursorDot = document.createElement('div');
      cursorDot.className = 'cursor-dot';
      cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: #FF4500;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10000;
        transition: width 0.2s, height 0.2s, background-color 0.2s;
      `;
      document.body.appendChild(cursorDot);
      
      document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
          
          cursorDot.style.left = `${e.clientX}px`;
          cursorDot.style.top = `${e.clientY}px`;
        });
      });
      
      // Scale effect on interactive elements
      document.querySelectorAll('a, button, .interactive').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '60px';
          cursor.style.height = '60px';
          cursor.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
          cursor.style.borderColor = 'rgba(255, 69, 0, 0.5)';
          
          cursorDot.style.width = '10px';
          cursorDot.style.height = '10px';
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.style.width = '40px';
          cursor.style.height = '40px';
          cursor.style.backgroundColor = 'transparent';
          cursor.style.borderColor = 'rgba(255, 69, 0, 0.3)';
          
          cursorDot.style.width = '8px';
          cursorDot.style.height = '8px';
        });
      });
    };
    
    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      initCursorEffect();
    }
    
    return () => {
      document.querySelectorAll('.section-animate').forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up cursor elements
      const cursor = document.querySelector('.custom-cursor');
      const cursorDot = document.querySelector('.cursor-dot');
      if (cursor) document.body.removeChild(cursor);
      if (cursorDot) document.body.removeChild(cursorDot);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <SubredditsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
