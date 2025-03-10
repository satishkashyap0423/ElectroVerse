import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, ShoppingCart, Heart, Check, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Product interface
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
  description?: string;
}

// Product data (same as in CategoryPage)
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
    description: 'Experience the ultimate smartphone with cutting-edge technology. Features include a 6.8" Dynamic AMOLED display, 108MP camera system, 5000mAh battery, and the latest processor for unmatched performance.',
  },
  {
    id: 2,
    name: 'Ultra Book X1',
    category: 'Laptops',
    price: 1299.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1470&auto=format&fit=crop',
    isNew: true,
    description: 'The Ultra Book X1 is a powerhouse laptop designed for professionals. With a 15.6" 4K display, latest-gen processor, 32GB RAM, and 1TB SSD, it handles any task with ease while remaining incredibly portable.',
  },
  // ... other products
  {
    id: 10,
    name: 'Phone Charging Stand',
    category: 'Accessories',
    price: 39.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1603539444875-76e7684275dd?q=80&w=1528&auto=format&fit=crop',
    description: 'This premium wireless charging stand powers your device at high speed while allowing convenient viewing in both portrait and landscape orientations. Compatible with all Qi-enabled devices.',
  },
  {
    id: 11,
    name: 'Premium Laptop Sleeve',
    category: 'Accessories',
    price: 29.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1548&auto=format&fit=crop',
    description: 'Protect your laptop in style with this premium sleeve featuring water-resistant material, plush interior lining, and additional pockets for accessories. Available for laptops up to 15.6 inches.',
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
    description: 'This ergonomic Bluetooth keyboard connects to multiple devices simultaneously and features customizable backlighting, programmable keys, and a comfortable typing experience with long battery life.',
  },
];

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Find product by ID
  const product = allProducts.find(p => p.id === Number(productId));
  
  useEffect(() => {
    // Set document title based on product
    if (product) {
      document.title = `${product.name} - ElectroVerse`;
    } else {
      document.title = 'Product Not Found - ElectroVerse';
    }
  }, [product]);

  const handleAddToCart = () => {
    setInCart(!inCart);
    if (!inCart) {
      toast.success(`${product?.name} added to cart`);
    } else {
      toast.info(`${product?.name} removed from cart`);
    }
  };
  
  const handleAddToWishlist = () => {
    setInWishlist(!inWishlist);
    if (!inWishlist) {
      toast.success(`${product?.name} added to wishlist`);
    } else {
      toast.info(`${product?.name} removed from wishlist`);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-primary/10 p-6 rounded-lg mb-4">
              <ShoppingCart className="h-12 w-12 text-primary mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find the product you're looking for. It may have been removed or never existed.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="mt-4 mb-8">
          <Button variant="ghost" size="sm" asChild className="flex items-center">
            <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`}>
              <ArrowLeft size={16} className="mr-2" /> Back to {product.category}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative rounded-xl overflow-hidden border border-border">
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
            
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <Link 
                to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} 
                className="text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.oldPrice && (
                <Badge variant="destructive">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-8">
              {product.description || 'No description available for this product.'}
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center border border-border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-none"
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                size="lg" 
                className="gap-2 flex-1" 
                onClick={handleAddToCart}
                variant={inCart ? "secondary" : "default"}
              >
                {inCart ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={handleAddToWishlist}
              >
                <Heart 
                  size={18} 
                  className={inWishlist ? 'fill-destructive text-destructive' : ''} 
                />
                Wishlist
              </Button>
              
              <Button 
                size="icon" 
                variant="outline"
                className="sm:w-11 sm:h-11"
              >
                <Share2 size={18} />
              </Button>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium text-green-500">In Stock</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free shipping</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-medium">EV-{product.id.toString().padStart(6, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductPage;
