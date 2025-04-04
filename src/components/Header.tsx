
import React, { useState } from 'react';
import { Menu, X, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 glass">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-reddit animate-glow-pulse"></div>
          <span className="font-bold text-lg">reddit</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-reddit-orange transition duration-200">Features</a>
          <a href="#showcase" className="text-sm font-medium hover:text-reddit-orange transition duration-200">Communities</a>
          <a href="#cta" className="text-sm font-medium hover:text-reddit-orange transition duration-200">Join Now</a>
          <div className="flex items-center gap-3">
            <a href="https://github.com/reddit" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition duration-200">
              <Github size={18} />
            </a>
            <a href="https://twitter.com/reddit" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition duration-200">
              <Twitter size={18} />
            </a>
          </div>
        </nav>
        
        {/* Sign Up Button - Desktop */}
        <div className="hidden md:block">
          <Button className="bg-gradient-reddit hover:brightness-110 transition-all duration-300">
            Sign Up
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 noise-bg p-4 flex flex-col items-center gap-8 animate-slide-up">
          <a 
            href="#features" 
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#showcase" 
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Communities
          </a>
          <a 
            href="#cta" 
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Now
          </a>
          <div className="flex items-center gap-6 mt-4">
            <a href="https://github.com/reddit" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition duration-200">
              <Github size={24} />
            </a>
            <a href="https://twitter.com/reddit" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition duration-200">
              <Twitter size={24} />
            </a>
          </div>
          <Button 
            className="mt-8 w-full bg-gradient-reddit hover:brightness-110 transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Button>
        </div>
      )}
    </header>
  );
};
