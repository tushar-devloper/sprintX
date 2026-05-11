import { Product } from '../data';
import { motion } from 'motion/react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

interface WishlistProps {
  items: Product[];
  onRemove: (id: string) => void;
  onProductClick: (id: string) => void;
  onContinueShopping: () => void;
}

export default function Wishlist({ items, onRemove, onProductClick, onContinueShopping }: WishlistProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Heart className="w-16 h-16 text-zinc-200 mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Your wishlist is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Save items you love here and purchase them when you're ready.</p>
        <button 
          onClick={onContinueShopping}
          className="inline-flex py-3 px-8 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
        >
          Explore Shoes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-12">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 rounded-2xl mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <button 
                onClick={(e) => { e.stopPropagation(); onRemove(product.id); }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">{product.brand}</h3>
              <h2 className="text-lg font-bold text-zinc-900 leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">{product.name}</h2>
              <div className="mt-auto pt-2 flex items-baseline gap-2">
                <span className="text-lg font-medium text-zinc-900">{formatPrice(product.price)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
