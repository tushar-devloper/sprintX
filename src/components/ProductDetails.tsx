import React, { useState } from 'react';
import { Product } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Ruler, Heart, Check, Plus, Minus } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (id: string, e?: React.MouseEvent) => void;
}

export default function ProductDetails({ product, onBack, onAddToCart, wishlist, toggleWishlist }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeTool, setShowSizeTool] = useState(false);
  const [footType, setFootType] = useState<'normal' | 'wide'>('normal');

  const sizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
  
  const recommendedSize = footType === 'wide' ? 'Consider a half size up for wide feet.' : 'Fits true to size for most runners.';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    onAddToCart(product, selectedSize, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all shoes
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
        {/* Left Column: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square md:aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Column: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">{product.brand}</h2>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">{product.name}</h1>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-medium text-zinc-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-zinc-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-zinc-900">Select Size</h3>
              <button 
                onClick={() => setShowSizeTool(!showSizeTool)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 underline underline-offset-4"
              >
                <Ruler className="w-4 h-4" />
                Size Guide & Recommender
              </button>
            </div>

            {/* Size Recommender Tool */}
            <AnimatePresence>
              {showSizeTool && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-zinc-50 rounded-xl p-5 mb-6 overflow-hidden border border-zinc-200"
                >
                  <h4 className="font-bold text-sm mb-3">Size Recommendation</h4>
                  <p className="text-sm text-zinc-600 mb-4">Do you generally have wider feet?</p>
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => setFootType('normal')}
                      className={`px-4 py-2 text-sm rounded-full border ${footType === 'normal' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 hover:border-zinc-500'} transition-colors`}
                    >
                      Normal / Narrow
                    </button>
                    <button 
                      onClick={() => setFootType('wide')}
                      className={`px-4 py-2 text-sm rounded-full border ${footType === 'wide' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 hover:border-zinc-500'} transition-colors`}
                    >
                      Yes, Wide
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-zinc-100 flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{recommendedSize}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium rounded-xl border transition-all ${
                    selectedSize === size 
                      ? 'border-zinc-900 bg-zinc-900 text-white' 
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-rose-500 text-sm mt-2 font-medium">Please select a size</p>
            )}
          </div>

          <div className="flex gap-4 mb-10">
            <div className="flex items-center border border-zinc-200 rounded-xl px-2">
              <button 
                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button 
                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold tracking-wide rounded-xl transition-colors py-4 px-6 flex items-center justify-center gap-2"
            >
              Add To Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="w-16 h-full flex flex-shrink-0 items-center justify-center border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-6 h-6 ${wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-zinc-600'}`} />
            </button>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h3 className="font-bold text-zinc-900 mb-4">Tech Specs</h3>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-zinc-200 pt-16 mb-16">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.reviews.map((review) => (
            <div key={review.id} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'fill-zinc-900 text-zinc-900' : 'fill-zinc-200 text-zinc-200'}`} 
                  />
                ))}
              </div>
              <p className="text-zinc-700 italic mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span className="font-bold">{review.author}</span>
                <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
