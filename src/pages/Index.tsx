
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
    
    
    return () => {
      document.querySelectorAll('.section-animate').forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
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
