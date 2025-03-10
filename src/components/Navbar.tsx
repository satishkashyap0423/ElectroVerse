
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, Menu, X, User, Heart, 
  SunMedium, Moon, ChevronDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const categories = [
    { name: 'Smartphones', path: '/category/smartphones' },
    { name: 'Laptops', path: '/category/laptops' },
    { name: 'Gaming', path: '/category/gaming' },
    { name: 'Audio', path: '/category/audio' },
    { name: 'Wearables', path: '/category/wearables' },
    { name: 'Home Tech', path: '/category/home-tech' },
    { name: 'Accessories', path: '/category/accessories' },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="relative w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-30 bg-gradient-radial from-neon-blue to-transparent animate-pulse-soft"></div>
              <span className="text-2xl font-bold text-primary relative z-10">E</span>
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight text-foreground">
              Electro<span className="text-primary">Verse</span>
            </h1>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.path} asChild>
                    <Link to={category.path}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" asChild>
              <Link to="/deals">Deals</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link to="/new-arrivals">New Arrivals</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link to="/support">Support</Link>
            </Button>
          </div>
          
          {/* Search bar */}
          <div className="hidden md:flex relative w-full max-w-md mx-4">
            <Input
              type="text"
              placeholder="Search products, brands, categories..."
              className="pl-10 pr-4 py-2 rounded-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/wishlist">
                <Heart size={20} />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/cart">
                <div className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span>
                </div>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/account">
                <User size={20} />
              </Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden rounded-full" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[4.5rem] bg-background/95 backdrop-blur-sm z-40 animate-fade-in md:hidden">
            <div className="container py-6 flex flex-col gap-4">
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
                {categories.map((category) => (
                  <Button
                    key={category.path}
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <Link to={category.path}>{category.name}</Link>
                  </Button>
                ))}
              </div>
              
              <div className="border-t border-border my-2"></div>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/deals">Deals</Link>
              </Button>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/new-arrivals">New Arrivals</Link>
              </Button>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/support">Support</Link>
              </Button>
              
              <div className="border-t border-border my-2"></div>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/account">My Account</Link>
              </Button>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/orders">Orders</Link>
              </Button>
              
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/wishlist">Wishlist</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
