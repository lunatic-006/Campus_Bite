import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { Utensils, TicketCheck, ShoppingBag, Flame, ChefHat } from 'lucide-react';

export default function FloatingGlassDock() {
  const { 
    viewMode, 
    setViewMode, 
    cart, 
    setIsCartOpen, 
    orders, 
    setActiveTokenOrder 
  } = useCanteen();

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const activeOrder = orders.find(o => o.status !== 'COMPLETED');

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md sm:hidden">
      <div className="glass-panel-elevated rounded-3xl p-2 flex items-center justify-around shadow-2xl shadow-indigo-900/10 border border-white/90">
        
        {/* Menu Tab */}
        <button
          onClick={() => setViewMode('student')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            viewMode === 'student' ? 'text-indigo-600 font-bold bg-indigo-50/80' : 'text-slate-500'
          }`}
        >
          <Utensils className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Menu</span>
        </button>

        {/* Digital Token Pass */}
        <button
          onClick={() => activeOrder ? setActiveTokenOrder(activeOrder) : null}
          className={`relative flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeOrder ? 'text-emerald-600 font-bold' : 'text-slate-400 opacity-60'
          }`}
          disabled={!activeOrder}
        >
          <TicketCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Token</span>
          {activeOrder && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          )}
        </button>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center py-1.5 px-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 active:scale-95"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Cart ({totalCartCount})</span>
        </button>

        {/* Switch View */}
        <button
          onClick={() => setViewMode(viewMode === 'kitchen' ? 'student' : 'kitchen')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            viewMode === 'kitchen' ? 'text-indigo-600 font-bold bg-indigo-50/80' : 'text-slate-500'
          }`}
        >
          <ChefHat className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kitchen</span>
        </button>

      </div>
    </div>
  );
}
