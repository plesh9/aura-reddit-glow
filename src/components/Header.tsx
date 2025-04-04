import { useState, useEffect } from "react";
import { Menu, X, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 header-scroll ${
          isScrolled ? "scrolled" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="text-reddit-orange"
            >
              <path
                d="M10 0C4.478 0 0 4.478 0 10c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm5.7 11.1c.063.27.1.554.1.85 0 2.285-2.662 4.138-5.95 4.138-3.285 0-5.95-1.853-5.95-4.138 0-.297.037-.581.1-.85a1.67 1.67 0 01-.72-1.37c0-.923.749-1.67 1.67-1.67.432 0 .823.166 1.12.433 1.124-.794 2.64-1.304 4.318-1.346l.975-3.07a.462.462 0 01.555-.296l2.52.56c.183-.348.547-.584.969-.584a1.113 1.113 0 110 2.227c-.61 0-1.106-.49-1.112-1.099l-2.288-.51-.886 2.788c1.614.064 3.067.57 4.156 1.347.297-.268.688-.434 1.12-.434.921 0 1.67.747 1.67 1.67 0 .576-.293 1.079-.72 1.37zm-9.8.15c0 .548.447.995.996.995a.996.996 0 100-1.99.996.996 0 00-.996.995zm5.458 2.37c.702-.703.702-1.843 0-2.546-.701-.701-1.843-.701-2.545 0-.7.703-.7 1.843 0 2.546.702.701 1.844.701 2.545 0zm-.356-2.19a.664.664 0 01.942 0 .664.664 0 010 .942.664.664 0 01-.942 0 .664.664 0 010-.942zM14.1 12.245a.996.996 0 100-1.99.996.996 0 000 1.99z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <span className="font-bold text-lg">reddit</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-reddit-orange transition duration-200"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-sm font-medium hover:text-reddit-orange transition duration-200"
            >
              Communities
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-reddit-orange transition duration-200"
            >
              Testimonials
            </a>
            <a
              href="#subreddits"
              className="text-sm font-medium hover:text-reddit-orange transition duration-200"
            >
              Subreddits
            </a>
            <a
              href="#cta"
              className="text-sm font-medium hover:text-reddit-orange transition duration-200"
            >
              Join Now
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/reddit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/reddit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition duration-200"
              >
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
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-reddit-dark/90 fixed inset-0 justify-center noise-bg p-4 flex flex-col z-50 items-center gap-8 animate-fade-in"
          data-test="LOL"
        >
          <button
            className="absolute top-0 right-0 p-4 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            href="#testimonials"
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#subreddits"
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Subreddits
          </a>
          <a
            href="#cta"
            className="text-xl font-medium hover:text-reddit-orange transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Now
          </a>
          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://github.com/reddit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition duration-200"
            >
              <Github size={24} />
            </a>
            <a
              href="https://twitter.com/reddit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition duration-200"
            >
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
    </>
  );
};
