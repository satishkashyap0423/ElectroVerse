
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ArrowLeft, CheckCircle, Truck, ShoppingCart } from 'lucide-react';
import { toast } from "sonner";
import ScrollToTopButton from '@/components/ScrollToTopButton';

interface AddressInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    document.title = 'Checkout - ElectroVerse';
    
    // Check if cart is empty
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) {
      navigate('/cart');
      toast.error('Your cart is empty');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!addressInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!addressInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(addressInfo.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!addressInfo.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!addressInfo.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!addressInfo.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    if (!addressInfo.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      // Clear cart
      localStorage.setItem('cartItems', '[]');
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const renderAddressForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Address</h2>
      
      <form onSubmit={handleAddressSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            id="fullName"
            name="fullName"
            value={addressInfo.fullName}
            onChange={handleInputChange}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={addressInfo.email}
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
          <Input
            id="address"
            name="address"
            value={addressInfo.address}
            onChange={handleInputChange}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
            <Input
              id="city"
              name="city"
              value={addressInfo.city}
              onChange={handleInputChange}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
            <Input
              id="state"
              name="state"
              value={addressInfo.state}
              onChange={handleInputChange}
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
            <Input
              id="zipCode"
              name="zipCode"
              value={addressInfo.zipCode}
              onChange={handleInputChange}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
            <Input
              id="country"
              name="country"
              value={addressInfo.country}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" type="button" onClick={() => navigate('/cart')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Cart
          </Button>
          <Button type="submit">Continue to Payment</Button>
        </div>
      </form>
    </div>
  );

  const renderPaymentDetails = () => {
    if (isComplete) {
      return (
        <div className="text-center py-10 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for your purchase. We've sent a confirmation email with your order details.
          </p>
          <div className="pt-6">
            <Button onClick={() => navigate('/')} className="mx-auto">
              Continue Shopping
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        
        <div className="border border-border rounded-md p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">Name on Card</label>
              <Input id="nameOnCard" placeholder="John Doe" />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="font-medium">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${parseFloat(localStorage.getItem('cartSubtotal') || '0').toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {parseFloat(localStorage.getItem('cartShipping') || '0') === 0 
                  ? 'Free' 
                  : `$${parseFloat(localStorage.getItem('cartShipping') || '0').toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>-${parseFloat(localStorage.getItem('cartDiscount') || '0').toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${parseFloat(localStorage.getItem('cartTotal') || '0').toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" type="button" onClick={() => setCurrentStep(1)}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Shipping
          </Button>
          <Button 
            onClick={handlePlaceOrder} 
            disabled={isProcessing}
            className="min-w-[150px]"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Processing...
              </span>
            ) : (
              <>
                <CreditCard size={18} className="mr-2" />
                Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Checkout progress */}
        <div className="mb-8">
          <div className="relative flex items-center justify-between">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                <ShoppingCart size={18} />
              </div>
              <span className="text-sm mt-2">Cart</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-border mx-2"></div>
            
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                <Truck size={18} />
              </div>
              <span className="text-sm mt-2">Shipping</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-border mx-2"></div>
            
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                <CreditCard size={18} />
              </div>
              <span className="text-sm mt-2">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && renderAddressForm()}
            {currentStep === 2 && renderPaymentDetails()}
          </div>
          
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold">Order Protection</h2>
              <div className="flex items-start gap-3 text-sm">
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-full p-1">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-muted-foreground">Full refund if you don't receive your order</p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-full p-1">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-muted-foreground">Returns accepted within 30 days of delivery</p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-full p-1">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-muted-foreground">24/7 customer support</p>
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

export default CheckoutPage;
