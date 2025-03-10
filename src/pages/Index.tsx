
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts'; 
import PromoSection from '@/components/PromoSection';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const Index = () => {
  // Set document title on component mount
  useEffect(() => {
    document.title = 'ElectroVerse - Premium Electronics Shop';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <PromoSection />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
