
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: 'The Ultra Book X1 exceeded all my expectations. The build quality is outstanding, and the performance is phenomenal for creative work. The display is absolutely stunning with accurate colors.',
    product: 'Ultra Book X1',
  },
  {
    id: 2,
    name: 'Jordan Lee',
    role: 'Software Developer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    text: 'As a developer, I needed something reliable and powerful. The Ultra Book X1 handles everything I throw at it with ease. Battery life is impressive and the keyboard is a joy to type on.',
    product: 'Ultra Book X1',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Content Creator',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    text: 'The Pro Noise Cancelling Headphones have transformed my daily commute. The sound quality is rich and the noise cancellation is truly impressive. Comfort could be slightly better for long sessions.',
    product: 'Pro Noise Cancelling Headphones',
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Tech Enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    text: 'The Game Station 5 delivers an incredible gaming experience. The graphics are mind-blowing and the load times are practically non-existent. Definitely worth the investment for any serious gamer.',
    product: 'Game Station 5',
  },
  {
    id: 5,
    name: 'Sarah Miller',
    role: 'Fitness Coach',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 4,
    text: 'The Smart Watch Series 7 has been a game-changer for my training. The fitness tracking is accurate, and the battery lasts much longer than advertised. The interface could be more intuitive though.',
    product: 'Smart Watch Series 7',
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const testimonial = testimonials[activeIndex];
  
  return (
    <section className="container mx-auto py-24">
      <div className="text-center mb-16">
        <span className="text-sm font-medium text-primary mb-2 block">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from our satisfied customers about their experience with our products
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 text-primary/10">
          <Quote size={120} strokeWidth={0.5} className="opacity-30" />
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-8 md:p-12 shadow-sm relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'} 
                  />
                ))}
              </div>
              
              <p className="text-lg md:text-xl mb-8 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
            
            <div className="md:border-l border-border/50 md:pl-8 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">About</p>
                <h4 className="font-medium text-lg">{testimonial.product}</h4>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full" 
                  onClick={handlePrev}
                >
                  <ArrowLeft size={18} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full" 
                  onClick={handleNext}
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
