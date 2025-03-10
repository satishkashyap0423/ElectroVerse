
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Plus, Check, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

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

const featuredProducts: Product[] = [
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
    image: 'https://images.unsplash.com/photo-1667855766927-9d0c8fa1965a?q=80&w=1471&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 7,
    name: 'Ultra Wide Monitor 34"',
    category: 'Computers',
    price: 549.99,
    oldPrice: 649.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596443019365-eb263a588404?q=80&w=1332&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1728971975421-50f3dc9663a4?q=80&w=1470&auto=format&fit=crop',
  },
];

const FeaturedProducts = () => {
  const [inCart, setInCart] = useState<number[]>([]);
  const [inWishlist, setInWishlist] = useState<number[]>([]);
  
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
    <section className="container mx-auto py-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-sm font-medium text-primary mb-2 block">Featured Products</span>
          <h2 className="text-3xl md:text-4xl font-bold">Trending Technology</h2>
        </div>
        
        <Button variant="outline" className="hidden md:flex gap-1 items-center" asChild>
          <Link to="/products">
            View All <ExternalLink size={14} className="ml-1" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
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
      
      <div className="mt-10 flex justify-center md:hidden">
        <Button variant="outline" className="flex gap-1 items-center" asChild>
          <Link to="/products">
            View All Products <ExternalLink size={14} className="ml-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
