import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { Star, Clock, Flame, Plus, Minus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MenuCard({ item }) {
  const { cart, addToCart, removeFromCart } = useCanteen();

  const cartItem = cart.find(i => i.id === item.id);
  const currentQty = cartItem ? cartItem.qty : 0;

  const isLowStock = item.stockLeft > 0 && item.stockLeft <= 8;
  const isOutOfStock = item.stockLeft === 0;

  return (
    <div className={`glass-panel rounded-3xl p-4 flex flex-col justify-between glass-card-hover relative group transition-all duration-300 ${
      isOutOfStock ? 'opacity-75 grayscale-[0.3]' : ''
    }`}>
      
      {/* Top Media & Badges */}
      <div>
        <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-3.5 bg-slate-100">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

          {/* Diet Badge (Pure Veg Indicator) */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-sm flex items-center space-x-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="text-[10px] font-extrabold tracking-wide uppercase text-slate-800">
              {item.isVeg ? (item.isJain ? 'Jain Veg' : 'Pure Veg') : 'Non-Veg'}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-sm flex items-center space-x-1 text-slate-900 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
          </div>

          {/* Stock Availability Indicator */}
          {isOutOfStock ? (
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-rose-950/80 backdrop-blur-md text-white text-center text-xs font-bold flex items-center justify-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Sold Out for Today</span>
            </div>
          ) : isLowStock ? (
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-extrabold flex items-center space-x-1 shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-200" />
              <span>Hurry! Only {item.stockLeft} left</span>
            </div>
          ) : (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-slate-900/60 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>In Stock ({item.stockLeft})</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug font-['Outfit']">
            {item.name}
          </h3>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Prep Time & Calories */}
        <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-500 mb-4">
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100/80">
            <Clock className="w-3 h-3 text-indigo-500" />
            <span>{item.prepTimeMinutes} mins prep</span>
          </span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100/80">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>{item.calories} kcal</span>
          </span>
        </div>
      </div>

      {/* Bottom Price & Add / Quantity Button */}
      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
        <div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit']">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Inclusive of taxes</span>
        </div>

        {/* Add to Cart / Quantity Stepper */}
        {isOutOfStock ? (
          <button 
            disabled 
            className="px-4 py-2 rounded-2xl bg-slate-200 text-slate-400 text-xs font-bold cursor-not-allowed"
          >
            Unavailable
          </button>
        ) : currentQty > 0 ? (
          <div className="flex items-center space-x-2 bg-indigo-600 text-white rounded-2xl p-1 shadow-md shadow-indigo-600/25">
            <button 
              onClick={() => removeFromCart(item.id)}
              className="w-7 h-7 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-extrabold text-sm px-1 min-w-[20px] text-center">{currentQty}</span>
            <button 
              onClick={() => addToCart(item)}
              className="w-7 h-7 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(item)}
            className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-extrabold transition-all duration-200 shadow-md flex items-center space-x-1.5 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        )}
      </div>

    </div>
  );
}
