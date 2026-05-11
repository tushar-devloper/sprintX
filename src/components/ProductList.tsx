import React from 'react';
import { Product } from '../data';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onProductClick: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
}

export default function ProductList({ products, onProductClick, wishlist, toggleWishlist }: ProductListProps) {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center mb-16 text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900"
        >
          CHASE <span className="italic text-zinc-400">FASTER.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-500 max-w-xl"
        >
          Premium race-day equipment to shatter your personal records. Engineered for speed, built for the podium.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="group cursor-pointer flex flex-col"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 rounded-2xl mb-4 isolate">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <button 
                onClick={(e) => toggleWishlist(product.id, e)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 backdrop-blur border border-white/50 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-zinc-700'}`} />
              </button>
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Sale
                </div>
              )}
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">{product.brand}</h3>
              <h2 className="text-lg font-bold text-zinc-900 leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">{product.name}</h2>
              <div className="mt-auto pt-2 flex items-baseline gap-2">
                <span className="text-lg font-medium text-zinc-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
