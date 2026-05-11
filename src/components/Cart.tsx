import { Product } from '../data';
import { motion } from 'motion/react';
import { ShoppingBag, X, ArrowRight, Trash2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onClose, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-lg">Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-zinc-900 text-white font-medium rounded-full"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-zinc-900 line-clamp-1">{item.product.name}</h3>
                      <button 
                        onClick={() => onRemove(item.product.id, item.size)}
                        className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-zinc-500 mb-2">Size: {item.size}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                      <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-zinc-400 mb-6 font-medium">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
