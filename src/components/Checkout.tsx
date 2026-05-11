import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem } from './Cart';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const handleNextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="text-emerald-500 mb-6"
        >
          <CheckCircle2 className="w-24 h-24" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight text-zinc-900 mb-4"
        >
          Order Confirmed
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-600 mb-8"
        >
          Your premium gear is getting ready to be shipped.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step === 1 ? 'bg-zinc-900 text-white' : 'bg-emerald-500 text-white'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : 1}
            </div>
            <div className="h-px flex-1 bg-zinc-200" />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step === 2 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
              2
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-8">
            {step === 1 ? 'Shipping Details' : 'Payment Information'}
          </h1>

          <form onSubmit={handleNextSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">First Name</label>
                    <input required type="text" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Last Name</label>
                    <input required type="text" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                  <input required type="email" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Address</label>
                  <input required type="text" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Expiry</label>
                    <input required type="text" placeholder="MM/YY" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">CVC</label>
                    <input required type="text" placeholder="123" className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-900 font-mono" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Payments are secure and encrypted.
                </div>
              </motion.div>
            )}

            <button type="submit" className="w-full bg-zinc-900 text-white font-bold rounded-xl py-4 hover:bg-zinc-800 transition-colors">
              {step === 1 ? 'Continue to Payment' : `Pay ${formatPrice(total)}`}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 sticky top-24">
            <h2 className="font-bold text-lg mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <img src={item.product.image} className="w-16 h-16 rounded-lg object-cover bg-white" />
                  <div className="flex-1 text-sm">
                    <p className="font-bold line-clamp-1">{item.product.name}</p>
                    <p className="text-zinc-500">Size: {item.size} × {item.quantity}</p>
                    <p className="font-medium mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-zinc-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
