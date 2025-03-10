
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found - ElectroVerse";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">
              404
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you were looking for. It might have been moved, 
            deleted, or perhaps the URL was mistyped.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gap-2" asChild>
              <Link to="/">
                <Home size={18} />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
