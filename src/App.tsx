import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart, { CartItem } from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import ChatWidget from './components/ChatWidget';
import { products, Product } from './data';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'checkout' | 'wishlist'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Derived state
  const selectedProduct = products.find(p => p.id === selectedProductId) || null;
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Actions
  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (view: 'home' | 'cart' | 'wishlist') => {
    if (view === 'cart') {
      setIsCartOpen(true);
    } else {
      setCurrentView(view);
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeCheckout = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Header 
        cartCount={cartItemCount} 
        wishlistCount={wishlistIds.length} 
        onViewChange={handleViewChange} 
      />

      <main className="relative">
        {currentView === 'home' && (
          <ProductList 
            products={products} 
            onProductClick={handleProductClick}
            wishlist={wishlistIds}
            toggleWishlist={toggleWishlist}
          />
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={addToCart}
            wishlist={wishlistIds}
            toggleWishlist={toggleWishlist}
          />
        )}

        {currentView === 'wishlist' && (
          <Wishlist 
            items={wishlistProducts}
            onRemove={toggleWishlist}
            onProductClick={handleProductClick}
            onContinueShopping={() => setCurrentView('home')}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout 
            items={cartItems}
            onBack={() => { setIsCartOpen(true); setCurrentView('home'); }}
            onComplete={completeCheckout}
          />
        )}
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <Cart 
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onRemove={removeFromCart}
            onCheckout={startCheckout}
          />
        )}
      </AnimatePresence>

      <ChatWidget />
    </div>
  );
}
