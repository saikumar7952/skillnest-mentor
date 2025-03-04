
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out', 
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary rounded-md rotate-45 opacity-80"></div>
            <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
            <div className="absolute inset-2 bg-primary/30 rounded-sm rotate-45 animate-subtle-float"></div>
          </div>
          <span className="font-light text-xl tracking-tight">
            SkillNest
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
            Demo
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
          <Button variant="outline" size="sm" className="mr-2">
            Login
          </Button>
          <Button size="sm">
            Early Access
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-x-0 top-[60px] z-40 w-full transform transition-all duration-300 ease-in-out md:hidden",
        isMobileMenuOpen 
          ? "translate-y-0 opacity-100" 
          : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="bg-white/95 backdrop-blur-sm border-b border-border shadow-lg">
          <div className="container-custom py-4 flex flex-col">
            <nav className="flex flex-col space-y-4 py-4">
              <a 
                href="#features" 
                className="py-2 px-4 hover:bg-secondary transition-colors rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#demo" 
                className="py-2 px-4 hover:bg-secondary transition-colors rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo
              </a>
              <a 
                href="#about" 
                className="py-2 px-4 hover:bg-secondary transition-colors rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col space-y-2 mt-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm">
                  Login
                </Button>
                <Button size="sm">
                  Early Access
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
