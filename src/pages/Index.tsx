
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { SubredditsSection } from '@/components/SubredditsSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = "Reddit - Dive into what you love";
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-animate').forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      document.querySelectorAll('.section-animate').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
