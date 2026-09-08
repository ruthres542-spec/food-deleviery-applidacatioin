import React from 'react';
import { Sparkles, Percent, Truck, Zap, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BannerCarousel: React.FC = () => {
  const { applyPromoCode, setIsCartOpen, setIsAiAssistantOpen } = useApp();

  const handleApplyPromo = (code: string) => {
    applyPromoCode(code);
    setIsCartOpen(true);
  };

  return (
    <div className="py-6 bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: SWIGGY50 offer */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-amber-600 text-white p-6 shadow-md shadow-orange-500/10 flex flex-col justify-between group">
            <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-15 pointer-events-none font-black text-9xl">
              🍕
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                <Percent className="w-3.5 h-3.5" /> First Order Special
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-snug mb-1">
                Get 50% OFF Your First Meal
              </h3>
              <p className="text-xs text-orange-100 font-medium mb-4">
                Use code <span className="font-extrabold underline decoration-white/50">SWIGGY50</span> at checkout. Valid on orders above $15.
              </p>
            </div>
            <button
              onClick={() => handleApplyPromo('SWIGGY50')}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-700 hover:bg-orange-50 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-transform group-hover:scale-[1.02] cursor-pointer self-start"
            >
              Apply SWIGGY50
            </button>
          </div>

          {/* Card 2: AI Craving Feature */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white p-6 shadow-md shadow-purple-500/10 flex flex-col justify-between group">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Gemini AI Powered
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-snug mb-1">
                Can't Decide What To Eat?
              </h3>
              <p className="text-xs text-purple-100 font-medium mb-4">
                Tell our AI Assistant your mood or cravings and get tailored dish recommendations instantly!
              </p>
            </div>
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-purple-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-transform group-hover:scale-[1.02] cursor-pointer self-start"
            >
              Ask AI Craving Assistant ✨
            </button>
          </div>

          {/* Card 3: Express Free Delivery */}
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-6 shadow-md shadow-neutral-900/10 flex flex-col justify-between group">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-neutral-800 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5" /> Express Delivery
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-snug mb-1">
                Free Delivery Under 25 Mins
              </h3>
              <p className="text-xs text-neutral-400 font-medium mb-4">
                Track your driver live on an interactive map from kitchen prep to your doorstep.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <Zap className="w-4 h-4 fill-emerald-400" />
              <span>Average ETA: 22 Minutes</span>
            </div>
          </div>

        </div>

        {/* Quick Craving Tags */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Hot Cravings:
          </span>
          <button 
            onClick={() => handleApplyPromo('SWIGGY50')}
            className="shrink-0 bg-orange-100/70 hover:bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full border border-orange-200"
          >
            🔥 50% OFF Code: SWIGGY50
          </button>
          <span className="shrink-0 bg-neutral-100 text-neutral-700 font-semibold px-3 py-1 rounded-full border border-neutral-200">
            🥘 Dum Biryani
          </span>
          <span className="shrink-0 bg-neutral-100 text-neutral-700 font-semibold px-3 py-1 rounded-full border border-neutral-200">
            🍕 Wood-fired Pizza
          </span>
          <span className="shrink-0 bg-neutral-100 text-neutral-700 font-semibold px-3 py-1 rounded-full border border-neutral-200">
            🍔 Smash Burgers
          </span>
          <span className="shrink-0 bg-neutral-100 text-neutral-700 font-semibold px-3 py-1 rounded-full border border-neutral-200">
            🥗 Organic Poke Bowls
          </span>
        </div>

      </div>
    </div>
  );
};
