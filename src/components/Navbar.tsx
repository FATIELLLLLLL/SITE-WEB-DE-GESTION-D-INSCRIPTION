
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();

  const isScrolled = scrollPosition > 10;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Links for navigation
  const navLinks = [
    { title: 'Accueil', path: '/' },
    { title: 'Inscription', path: '/register' },
    { title: 'Tableau de bord', path: '/dashboard' },
  ];

  // Check if current path matches the link path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when location changes
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
        >
          InscriPro
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-medium transition-all hover:text-primary relative',
                isActive(link.path)
                  ? 'text-primary after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:transform after:scale-x-100 after:transition-transform'
                  : 'text-foreground/80 after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100'
              )}
            >
              {link.title}
            </Link>
          ))}
          
          <Button asChild className="animate-fade-in">
            <Link to="/register">S'inscrire</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 animate-fade-in" />
          ) : (
            <Menu className="h-6 w-6 animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-md z-40 animate-fade-in">
          <nav className="container mx-auto py-8 px-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium py-2 transition-colors hover:text-primary',
                  isActive(link.path) ? 'text-primary' : 'text-foreground/80'
                )}
                onClick={closeMobileMenu}
              >
                {link.title}
              </Link>
            ))}
            <Button asChild className="w-full mt-4">
              <Link to="/register" onClick={closeMobileMenu}>
                S'inscrire
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
