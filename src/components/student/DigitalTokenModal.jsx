import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { X, QrCode, TicketCheck, ChefHat, CheckCircle2, Clock, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export default function DigitalTokenModal() {
  const { activeTokenOrder, setActiveTokenOrder } = useCanteen();

  if (!activeTokenOrder) return null;

  const isPreparing = activeTokenOrder.status === 'KITCHEN_PREPARING';
  const isReady = activeTokenOrder.status === 'READY_FOR_PICKUP';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-white/90 relative animate-scaleUp text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveTokenOrder(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition z-10"
          aria-label="Close digital token pass"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Digital Token Card Header */}
        <div className="text-center mb-5">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-xs font-black uppercase tracking-wider inline-flex items-center space-x-1 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Digital Food Token Pass</span>
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight">
            Order #{activeTokenOrder.orderId}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Slot: <span className="font-extrabold text-slate-800">{activeTokenOrder.slotTime}</span>
          </p>
        </div>

        {/* Dynamic Status Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className={`w-3 h-3 rounded-full animate-ping ${isReady ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Kitchen Live Status</span>
              <span className="text-xs font-extrabold font-['Outfit']">
                {isReady ? 'READY FOR COUNTER PICKUP' : 'Kitchen Preparing Food...'}
              </span>
            </div>
          </div>
          {isReady ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <ChefHat className="w-5 h-5 text-amber-400 animate-bounce" />
          )}
        </div>

        {/* Visual Simulated QR Code Box */}
        <div className="glass-panel p-5 rounded-2xl border border-indigo-200/60 text-center mb-5 flex flex-col items-center justify-center bg-white/90 shadow-inner">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-md mb-2">
            <QrCode className="w-32 h-32 text-slate-900 stroke-[1.5]" />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Counter Verification QR</span>
        </div>

        {/* 4-Digit OTP Display */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100 text-center mb-5">
          <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">
            Express Counter Verification OTP
          </span>
          <div className="text-3xl font-black text-indigo-700 tracking-widest font-['Outfit']">
            {activeTokenOrder.otp}
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            Show QR or read 4-digit OTP at counter
          </span>
        </div>

        {/* Counter Location */}
        <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-100/80 text-xs font-bold text-slate-700 mb-5">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Pickup Counter: <span className="text-slate-900 font-extrabold">{activeTokenOrder.counterNo}</span></span>
        </div>

        {/* Items Summary */}
        <div className="text-xs text-slate-600 space-y-1 mb-6 border-t border-slate-200/60 pt-3">
          <span className="font-extrabold text-slate-800 block mb-1">Order Items:</span>
          {activeTokenOrder.items.map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{item.qty}x {item.name}</span>
              <span className="font-bold text-slate-900">₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between font-extrabold text-slate-900 text-sm pt-2 border-t border-slate-200">
            <span>Total Paid (UPI)</span>
            <span className="text-indigo-600">₹{activeTokenOrder.totalAmount}</span>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={() => setActiveTokenOrder(null)}
          className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs transition active:scale-95 shadow-md"
        >
          Close Digital Pass
        </button>

      </div>
    </div>
  );
}
