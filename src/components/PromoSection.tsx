
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Check } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Promo Card 1: Limited Time Deal */}
          <div className="relative rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1621570070325-5aa90bd92df7?q=80&w=1470&auto=format&fit=crop" 
              alt="Limited time deal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
              <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full py-1.5 px-4 text-white w-fit">
                <Clock size={14} />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Up to 40% Off Premium Headphones
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Experience immersive sound quality with our selection of top-rated noise-cancelling headphones. Sale ends this weekend.
                </p>
                
                <Button 
                  className="group/btn" 
                  asChild
                >
                  <Link to="/category/audio">
                    Shop Now 
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Promo Card 2: New Release */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="absolute top-0 right-0 w-[calc(100%-3rem)] h-[calc(100%-3rem)] rounded-tl-[10rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1470&auto=format&fit=crop" 
                alt="Smartphone"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
                  New Release
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  The Next Generation<br />Smartphone
                </h3>
                
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Experience the future in your hands with our latest flagship model.
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-primary" />
                    <span>Revolutionary camera system</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-primary" />
                    <span>All-day battery life</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-primary" />
                    <span>Incredible processing power</span>
                  </li>
                </ul>
                
                <div className="flex gap-3">
                  <Button 
                    className="group/btn" 
                    asChild
                  >
                    <Link to="/product/1">
                      Learn More
                      <ChevronRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    asChild
                  >
                    <Link to="/category/smartphones">
                      Compare
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 text-right">
                <div className="text-sm text-muted-foreground mb-1">Starting at</div>
                <div className="text-3xl font-bold">$999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
