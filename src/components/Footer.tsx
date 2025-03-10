
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  CreditCard, 
  Shield, 
  Truck, 
  PhoneCall,
  MapPin,
  Mail
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border">
      {/* Service highlights */}
      <div className="container mx-auto py-10 border-b border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Truck size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $99</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <CreditCard size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure payment</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Money Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">Within 30 days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <PhoneCall size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-30 bg-gradient-radial from-neon-blue to-transparent"></div>
                <span className="text-2xl font-bold text-primary relative z-10">E</span>
              </div>
              <h1 className="text-xl font-bold font-display tracking-tight">
                Electro<span className="text-primary">Verse</span>
              </h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Your destination for the latest technology and electronic products. We offer the best selection at competitive prices.
            </p>
            
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full p-2 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full p-2 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full p-2 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full p-2 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category/smartphones" className="text-muted-foreground hover:text-primary transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="text-muted-foreground hover:text-primary transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/gaming" className="text-muted-foreground hover:text-primary transition-colors">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/category/audio" className="text-muted-foreground hover:text-primary transition-colors">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/category/wearables" className="text-muted-foreground hover:text-primary transition-colors">
                  Wearables
                </Link>
              </li>
              <li>
                <Link to="/category/home-tech" className="text-muted-foreground hover:text-primary transition-colors">
                  Home Tech
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors">
                  Deals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-muted-foreground hover:text-primary transition-colors">
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Technical Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Tech Avenue, San Francisco, CA 94107, USA
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneCall size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+1-800-123-4567" className="text-muted-foreground hover:text-primary transition-colors">
                  +1-800-123-4567
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:support@electroverse.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@electroverse.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="text-muted-foreground">
                Monday - Friday: 9am - 7pm EST<br />
                Saturday: 10am - 5pm EST<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-border/50">
        <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} ElectroVerse. All rights reserved.
          </p>
          
          <div className="flex gap-4 text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
          
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Payment Methods:</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-muted/50 rounded"></div>
              <div className="w-8 h-5 bg-muted/50 rounded"></div>
              <div className="w-8 h-5 bg-muted/50 rounded"></div>
              <div className="w-8 h-5 bg-muted/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
