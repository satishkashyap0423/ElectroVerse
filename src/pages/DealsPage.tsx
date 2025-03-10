
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Percent, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ScrollToTopButton from '@/components/ScrollToTopButton';

const DealsPage = () => {
  useEffect(() => {
    document.title = 'Special Deals - ElectroVerse';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="mt-12">
          <div className="bg-primary/10 rounded-xl p-8 mb-8 text-center">
            <span className="inline-block p-3 bg-primary/20 rounded-full mb-4">
              <Percent className="h-8 w-8 text-primary" />
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Deals & Discounts</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover amazing offers on our top-rated electronics. Limited-time deals updated regularly.
            </p>
          </div>
          
          {/* Placeholder for deals content */}
          <div className="grid gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-border/60 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <ShoppingBag className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <Tag className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Limited Time Offer</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deal Placeholder {item}</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for special deal content. In a complete implementation, 
                    this would display real promotional offers and discounts.
                  </p>
                  <Button>View Deal</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default DealsPage;
