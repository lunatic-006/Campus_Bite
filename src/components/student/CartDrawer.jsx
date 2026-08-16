import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { X, Trash2, Plus, Minus, Clock, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import UPIPaymentModal from './UPIPaymentModal';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart,
    selectedTimeSlot,
    orderType,
    cartSubtotal,
    packagingFee,
    platformFee,
    cartTotal
  } = useCanteen();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
        <div className="glass-panel-elevated w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl border-l border-white/90 relative animate-slideLeft">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Your Canteen Tray</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                    title="Clear tray"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
                  aria-label="Close tray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Selected Pickup Window Banner */}
            <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Scheduled Counter Pickup</span>
                  <span className="text-xs font-extrabold text-indigo-950 font-['Outfit']">
                    {orderType === 'NOW' ? 'Immediate (~10 mins)' : `${selectedTimeSlot} Window`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="my-4 flex-1 overflow-y-auto pr-1 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-16 h-16 mb-3 text-slate-300 stroke-[1.5]" />
                <p className="font-extrabold text-slate-700 text-base mb-1 font-['Outfit']">Your tray is empty</p>
                <p className="text-xs text-slate-400 max-w-xs">Add delicious snacks & meals from the canteen menu to get started.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-white/80 border border-slate-200/70 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 font-['Outfit']">{item.name}</h4>
                      <span className="text-xs text-indigo-600 font-extrabold">₹{item.price * item.qty}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-slate-900 w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Billing Breakdown & Pay CTA */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-200/60 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-bold text-slate-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Canteen Container Fee</span>
                  <span className="font-bold text-slate-900">₹{packagingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Token Convenience Fee</span>
                  <span className="font-bold text-slate-900">₹{platformFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900 font-['Outfit']">
                  <span>Grand Total</span>
                  <span className="text-indigo-600 text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Proceed to Pay (₹{cartTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant UPI Payment & Digital Token Receipt</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* UPI Payment Modal Trigger */}
      <UPIPaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </>
  );
}
