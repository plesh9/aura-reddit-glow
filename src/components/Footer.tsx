
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
              <svg width="32" height="32" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-reddit-orange">
                <path d="M10 0C4.478 0 0 4.478 0 10c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm5.7 11.1c.063.27.1.554.1.85 0 2.285-2.662 4.138-5.95 4.138-3.285 0-5.95-1.853-5.95-4.138 0-.297.037-.581.1-.85a1.67 1.67 0 01-.72-1.37c0-.923.749-1.67 1.67-1.67.432 0 .823.166 1.12.433 1.124-.794 2.64-1.304 4.318-1.346l.975-3.07a.462.462 0 01.555-.296l2.52.56c.183-.348.547-.584.969-.584a1.113 1.113 0 110 2.227c-.61 0-1.106-.49-1.112-1.099l-2.288-.51-.886 2.788c1.614.064 3.067.57 4.156 1.347.297-.268.688-.434 1.12-.434.921 0 1.67.747 1.67 1.67 0 .576-.293 1.079-.72 1.37zm-9.8.15c0 .548.447.995.996.995a.996.996 0 100-1.99.996.996 0 00-.996.995zm5.458 2.37c.702-.703.702-1.843 0-2.546-.701-.701-1.843-.701-2.545 0-.7.703-.7 1.843 0 2.546.702.701 1.844.701 2.545 0zm-.356-2.19a.664.664 0 01.942 0 .664.664 0 010 .942.664.664 0 01-.942 0 .664.664 0 010-.942zM14.1 12.245a.996.996 0 100-1.99.996.996 0 000 1.99z" fill="currentColor" fillRule="evenodd"/>
              </svg>
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
