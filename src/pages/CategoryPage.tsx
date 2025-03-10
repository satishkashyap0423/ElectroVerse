
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Plus, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Import product interface and data from a shared location
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  isNew?: boolean;
}

// Product data (using the same data structure as in FeaturedProducts)
const allProducts: Product[] = [
  {
    id: 1,
    name: 'Galaxy Pro Ultra',
    category: 'Smartphones',
    price: 999.99,
    oldPrice: 1099.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611740677496-3e0ef378e189?q=80&w=1374&auto=format&fit=crop',
    badge: {
      text: 'Sale',
      variant: 'destructive',
    },
  },
  {
    id: 2,
    name: 'Ultra Book X1',
    category: 'Laptops',
    price: 1299.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1470&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 3,
    name: 'Pro Noise Cancelling Headphones',
    category: 'Audio',
    price: 299.99,
    oldPrice: 349.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Game Station 5',
    category: 'Gaming',
    price: 499.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1632&auto=format&fit=crop',
    badge: {
      text: 'Limited',
      variant: 'secondary',
    },
  },
  {
    id: 5,
    name: 'Smart Watch Series 7',
    category: 'Wearables',
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1527&auto=format&fit=crop',
    badge: {
      text: 'Popular',
      variant: 'default',
    },
  },
  {
    id: 6,
    name: 'Smart Home Hub',
    category: 'Home Tech',
    price: 149.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1648317136273-10b5f0d70b24?q=80&w=1471&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 7,
    name: 'Ultra Wide Monitor 34"',
    category: 'Computers',
    price: 549.99,
    oldPrice: 649.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1617901647379-bfa885db27f4?q=80&w=1332&auto=format&fit=crop',
    badge: {
      text: 'Sale',
      variant: 'destructive',
    },
  },
  {
    id: 8,
    name: 'Smart Security Camera',
    category: 'Home Tech',
    price: 129.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 9,
    name: 'Wireless Earbuds Pro',
    category: 'Audio',
    price: 179.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1631176093617-63490a3d785a?q=80&w=1470&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 10,
    name: 'Phone Charging Stand',
    category: 'Accessories',
    price: 39.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1603539444875-76e7684275dd?q=80&w=1528&auto=format&fit=crop',
  },
  {
    id: 11,
    name: 'Premium Laptop Sleeve',
    category: 'Accessories',
    price: 29.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1548&auto=format&fit=crop',
  },
  {
    id: 12,
    name: 'Bluetooth Keyboard',
    category: 'Accessories',
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1665&auto=format&fit=crop',
    badge: {
      text: 'Sale',
      variant: 'destructive',
    },
  },
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [inCart, setInCart] = useState<number[]>([]);
  const [inWishlist, setInWishlist] = useState<number[]>([]);
  
  // Filter products by category
  const categoryProducts = allProducts.filter(product => {
    // Format the category from the URL (e.g., "smartphones") to match the product category format
    const formattedCategoryId = categoryId?.replace(/-/g, ' ');
    return product.category.toLowerCase() === formattedCategoryId?.toLowerCase();
  });
  
  useEffect(() => {
    // Set document title based on category
    const formattedCategory = categoryId ? 
      categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ') : 
      'Category';
    
    document.title = `${formattedCategory} - ElectroVerse`;
    
    // In a real app, you would fetch category data here
    console.log(`Fetching data for category: ${categoryId}`);
  }, [categoryId]);

  const handleAddToCart = (product: Product) => {
    if (!inCart.includes(product.id)) {
      setInCart([...inCart, product.id]);
      toast.success(`${product.name} added to cart`);
    } else {
      setInCart(inCart.filter(id => id !== product.id));
      toast.info(`${product.name} removed from cart`);
    }
  };
  
  const handleAddToWishlist = (product: Product) => {
    if (!inWishlist.includes(product.id)) {
      setInWishlist([...inWishlist, product.id]);
      toast.success(`${product.name} added to wishlist`);
    } else {
      setInWishlist(inWishlist.filter(id => id !== product.id));
      toast.info(`${product.name} removed from wishlist`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="mt-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 capitalize">
            {categoryId?.replace(/-/g, ' ')}
          </h1>
          
          {categoryProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="bg-primary/10 p-6 rounded-lg mb-4">
                <ShoppingCart className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any products in this category. Please check back later or browse other categories.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group relative bg-card rounded-xl overflow-hidden border border-border/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
                >
                  {/* Product badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.badge && (
                      <Badge variant={product.badge.variant}>
                        {product.badge.text}
                      </Badge>
                    )}
                    
                    {product.isNew && (
                      <Badge variant="default" className="bg-neon-blue text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  
                  {/* Wishlist button */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm border-white/10 transition-all duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToWishlist(product);
                          }}
                        >
                          <Heart 
                            size={18} 
                            className={inWishlist.includes(product.id) ? 'fill-destructive text-destructive' : ''} 
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{inWishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Product image */}
                  <Link to={`/product/${product.id}`} className="block aspect-square">
                    <div className="bg-accent/5 w-full h-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  
                  {/* Product details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        variant={inCart.includes(product.id) ? "secondary" : "default"}
                        size="sm"
                        className="rounded-full" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        {inCart.includes(product.id) ? (
                          <>
                            <Check size={16} className="mr-1" /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={16} className="mr-1" /> Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryPage;
