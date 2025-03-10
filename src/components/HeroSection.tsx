
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Experience the Future",
      subtitle: "Discover cutting-edge technology that transforms your digital lifestyle",
      image: "https://images.unsplash.com/photo-1661581095158-4dbd936cea25?q=80&w=1470&auto=format&fit=crop",
      category: "smartphones",
    },
    {
      title: "Elevate Your Gaming",
      subtitle: "Immerse yourself in next-generation gaming consoles and accessories",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1374&auto=format&fit=crop",
      category: "gaming",
    },
    {
      title: "Smart Home Revolution",
      subtitle: "Transform your living space with intelligent devices and automation",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1470&auto=format&fit=crop",
      category: "home-tech",
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6">
        <div className="max-w-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              {index === currentSlide && (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm border border-primary/20"
                  >
                    {slide.category.charAt(0).toUpperCase() + slide.category.slice(1)}
                  </motion.span>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4 [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)] tracking-tight"
                  >
                    {slide.title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/90 mb-8 max-w-lg [text-shadow:_0_1px_5px_rgba(0,0,0,0.2)]"
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex gap-4"
                  >
                    <Button 
                      size="lg" 
                      className="group"
                      asChild
                    >
                      <Link to={`/category/${slide.category}`}>
                        Explore Now 
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-white/20"
                      asChild
                    >
                      <Link to="/deals">
                        View Deals
                      </Link>
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
