
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from 'lucide-react';
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('You have been subscribed to our newsletter!');
      setEmail('');
      
      // Reset success state after delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <section className="bg-gradient-to-b from-background to-muted/20 py-24">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-medium text-primary mb-2 block">Stay Updated</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to receive updates on new products, special offers, and tech tips directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="Your email address"
                className="pl-10 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSubmitted}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="h-12 px-8"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center">
                  <Check className="mr-2" size={18} />
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
