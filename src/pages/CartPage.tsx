import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Trash2, Plus, Minus, ChevronLeft, CreditCard, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Cart item interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

// Dummy cart data (in a real app, this would come from a state management solution)
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Galaxy Pro Ultra',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1611740677496-3e0ef378e189?q=80&w=1374&auto=format&fit=crop',
    quantity: 1,
    category: 'Smartphones'
  },
  {
    id: 7,
    name: 'Ultra Wide Monitor 34"',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1617901647379-bfa885db27f4?q=80&w=1332&auto=format&fit=crop',
    quantity: 2,
    category: 'Computers'
  },
  {
    id: 12,
    name: 'Bluetooth Keyboard',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1665&auto=format&fit=crop',
    quantity: 1,
    category: 'Accessories'
  }
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  useEffect(() => {
    document.title = 'Your Cart - ElectroVerse';
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    // Load discount from localStorage if available
    const savedDiscount = localStorage.getItem('cartDiscount');
    if (savedDiscount) {
      try {
        const parsedDiscount = parseFloat(savedDiscount);
        if (!isNaN(parsedDiscount)) {
          setDiscountAmount(parsedDiscount);
          setCouponApplied(parsedDiscount > 0);
        }
      } catch (error) {
        console.error('Error loading discount from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Shipping cost (free over $100)
  const shippingCost = subtotal > 100 ? 0 : 10;
  
  // Total cost
  const totalCost = subtotal + shippingCost - discountAmount;
  
  // Save order summary to localStorage
  useEffect(() => {
    localStorage.setItem('cartSubtotal', subtotal.toString());
    localStorage.setItem('cartShipping', shippingCost.toString());
    localStorage.setItem('cartDiscount', discountAmount.toString());
    localStorage.setItem('cartTotal', totalCost.toString());
  }, [subtotal, shippingCost, discountAmount, totalCost]);

  const handleQuantityChange = (id: number, action: 'increase' | 'decrease') => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ELECTROVERSE20') {
      const discount = subtotal * 0.2; // 20% discount
      setDiscountAmount(discount);
      setCouponApplied(true);
      localStorage.setItem('cartDiscount', discount.toString());
      toast.success('Coupon applied successfully: 20% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <ShoppingCart className="h-12 w-12 text-primary mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4">
                <span className="text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="flex items-center">
                    <ChevronLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border border-border rounded-lg p-4">
                  <div className="sm:w-24 h-24 rounded-md overflow-hidden bg-accent/5 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Link 
                        to={`/product/${item.id}`} 
                        className="font-medium hover:text-primary hover:underline transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center border border-border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item.id, 'increase')}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount (20%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Coupon code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Coupon code"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try using code: ELECTROVERSE20
                  </p>
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard size={18} className="mr-2" />
                  Checkout
                </Button>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-2">
                  <Truck size={16} />
                  <span>Free shipping on orders over $100</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default CartPage;
