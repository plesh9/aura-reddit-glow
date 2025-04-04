
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
    
    // Add intersection observer for scroll animations with enhanced parameters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Once the animation is complete, disconnect to improve performance
          setTimeout(() => {
            observer.unobserve(entry.target);
          }, 1000);
        }
      });
    }, { 
      threshold: 0.15,
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
    
    // Add smooth parallax scroll effect
    const handleParallax = () => {
      const scrolled = window.scrollY;
      
      document.querySelectorAll('.parallax').forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.1';
        const direction = element.getAttribute('data-direction') || '1';
        const offset = scrolled * parseFloat(speed) * parseInt(direction);
        
        element.style.transform = `translateY(${offset}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    
    // Preload critical images for better performance
    const preloadImages = () => {
      const imageUrls = [
        // Add your important image URLs here
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
        "https://images.unsplash.com/photo-1495020689067-958852a7765e"
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadImages();
    
    return () => {
      document.querySelectorAll('.section-animate').forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
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
