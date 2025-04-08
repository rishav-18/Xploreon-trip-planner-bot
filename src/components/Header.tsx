
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      {/* Registration Numbers Bar */}
      <div className="bg-travel-teal text-white text-xs md:text-sm py-2 px-4">
        <div className="container mx-auto">
          <div>Reg. No: 12322768 | Roll No: 49</div>
          <div>Reg. No: 12310507 | Roll No: 61</div>
          <div>Reg. No: 12311905 | Roll No: 62</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-travel-teal">
            Xploreon
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-travel-dark hover:text-travel-blue transition-colors py-[9px]">Features</a>
          <a href="#how-it-works" className="text-travel-dark hover:text-travel-blue transition-colors mx-[25px] py-[9px]">How It Works</a>
          <Button className="bg-travel-blue hover:bg-travel-teal text-white transition-colors">
            Start Planning
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md animate-fade-in z-40">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="text-travel-dark hover:text-travel-blue transition-colors py-2 px-4" onClick={toggleMenu}>
              Features
            </a>
            <a href="#how-it-works" className="text-travel-dark hover:text-travel-blue transition-colors py-2 px-4" onClick={toggleMenu}>
              How It Works
            </a>
            <Button className="bg-travel-blue hover:bg-travel-teal text-white transition-colors w-full" onClick={() => {
          toggleMenu();
          document.getElementById('chatbot-container')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}>
              Start Planning
            </Button>
          </div>
        </div>}
    </header>;
};

export default Header;
