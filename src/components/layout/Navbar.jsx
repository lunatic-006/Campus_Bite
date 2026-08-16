import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { ShoppingBag, Flame, ChefHat, ScanLine, TicketCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { 
    viewMode, 
    setViewMode, 
    cart, 
    setIsCartOpen, 
    orders, 
    setActiveTokenOrder, 
    peakHoursInfo 
  } = useCanteen();

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'COMPLETED').length;

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 pt-4 pb-2">
      <div className="max-w-7xl mx-auto glass-panel-elevated rounded-3xl px-4 sm:px-6 py-3.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setViewMode('student')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center animate-pulse-glow">
            <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-['Outfit']">
                Campus<span className="text-indigo-600">Bite</span>
              </h1>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Smart Canteen & Peak Rush Management
            </p>
          </div>
        </div>

        {/* Live Rush Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold">
          <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>7-8 PM Peak Hour: <span className="font-bold text-amber-800">{peakHoursInfo.estimatedWaitMinutes}m Avg Wait</span></span>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Mode Switcher Buttons */}
          <div className="flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 backdrop-blur-md">
            <button
              onClick={() => setViewMode('student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                viewMode === 'student'
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setViewMode('kitchen')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                viewMode === 'kitchen'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kitchen KDS</span>
            </button>
            <button
              onClick={() => setViewMode('counter')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                viewMode === 'counter'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Counter Kiosk</span>
            </button>
          </div>

          {/* Active Digital Token Badge */}
          {activeOrdersCount > 0 && viewMode === 'student' && (
            <button
              onClick={() => setActiveTokenOrder(orders.find(o => o.status !== 'COMPLETED'))}
              className="relative p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 transition-all flex items-center space-x-1.5 text-xs font-bold shadow-sm"
              title="View Active Digital Token Pass"
            >
              <TicketCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="hidden sm:inline">Active Token</span>
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeOrdersCount}
              </span>
            </button>
          )}

          {/* Shopping Bag / Cart Button */}
          {viewMode === 'student' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all duration-200 shadow-lg shadow-indigo-600/25 active:scale-95 flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-black text-[11px] flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
