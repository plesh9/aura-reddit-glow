
import React from 'react';
import { Github, Twitter, Instagram, Youtube, Facebook, ChevronRight } from 'lucide-react';

export const Footer = () => {
  const footerLinks = [
    {
      title: "About",
      links: ["About Reddit", "How It Works", "Careers", "Press", "Blog"]
    },
    {
      title: "Support",
      links: ["Help Center", "Community Guidelines", "Privacy Policy", "Terms of Service", "Contact Us"]
    },
    {
      title: "Popular Communities",
      links: ["r/AskReddit", "r/worldnews", "r/gaming", "r/science", "r/Showerthoughts"]
    }
  ];

  const socialLinks = [
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Youtube size={18} />, href: "#", label: "Youtube" },
    { icon: <Github size={18} />, href: "#", label: "Github" },
  ];

  return (
    <footer className="py-12 md:py-20 relative noise-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-reddit"></div>
              <span className="font-bold text-lg">reddit</span>
            </a>
            <p className="text-foreground/70 mb-6 max-w-md">
              Reddit is a network of communities where people can dive into their interests, hobbies, and passions. There's a community for whatever you're interested in.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight size={14} className="opacity-0 -ml-5 mr-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-white/10 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Reddit, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Content Policy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
