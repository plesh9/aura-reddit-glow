
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = "Reddit - Dive into what you love";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
