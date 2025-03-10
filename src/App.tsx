
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import DealsPage from "./pages/DealsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

// Wrap each page with a motion component to animate page transitions
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton={true} richColors={true} />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Index />
                </PageTransition>
              } 
            />
            <Route 
              path="/deals" 
              element={
                <PageTransition>
                  <DealsPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/category/:categoryId" 
              element={
                <PageTransition>
                  <CategoryPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/product/:productId" 
              element={
                <PageTransition>
                  <ProductPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <PageTransition>
                  <CartPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <PageTransition>
                  <CheckoutPage />
                </PageTransition>
              } 
            />
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
