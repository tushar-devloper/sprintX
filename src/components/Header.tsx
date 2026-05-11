import { useState } from 'react';
import { Product } from '../data';
import { ShoppingBag, Heart, MessageCircle } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onViewChange: (view: 'home' | 'cart' | 'wishlist') => void;
}

export default function Header({ cartCount, wishlistCount, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onViewChange('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 text-white rounded flex items-center justify-center font-black italic tracking-tighter transform -skew-x-12 group-hover:scale-105 transition-transform">
            SX
          </div>
          <span className="text-xl font-black italic tracking-tighter text-zinc-900">Sprint<span className="text-rose-500">X</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onViewChange('wishlist')}
            className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => onViewChange('cart')}
            className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
