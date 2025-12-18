import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenModal: (modal: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/light-logo.jpg" 
              alt="The Light Acapella"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10' : 'h-12'
              }`}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-gold transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-gold transition-colors"
            >
              Songs
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="text-white hover:text-gold transition-colors"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-gold transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('members')}
              className="text-white hover:text-gold transition-colors"
            >
              Members
            </button>
            <button 
              onClick={() => onOpenModal('quotation')}
              className="text-white hover:text-gold transition-colors"
            >
              Book Us
            </button>
          </nav>

          {/* Donate Button */}
          <button 
            onClick={() => onOpenModal('donation')}
            className="hidden md:block btn-primary"
          >
            Donate
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Songs
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('members')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Members
            </button>
            <button 
              onClick={() => onOpenModal('quotation')}
              className="block w-full text-left text-white hover:text-gold transition-colors py-2"
            >
              Book Us
            </button>
            <button 
              onClick={() => onOpenModal('donation')}
              className="btn-primary w-full mt-4"
            >
              Donate
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
