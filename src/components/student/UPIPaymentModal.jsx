import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { MOCK_UPI_APPS } from '../../data/canteenData';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UPIPaymentModal({ isOpen, onClose }) {
  const { cartTotal, placeOrder, setIsCartOpen } = useCanteen();
  
  const [selectedApp, setSelectedApp] = useState('Google Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        const order = placeOrder(selectedApp);
        setIsSuccess(false);
        onClose();
        setIsCartOpen(false);
      }, 1500);

    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/90 relative animate-scaleUp">
        
        {/* Close Button */}
        {!isProcessing && !isSuccess && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            aria-label="Close payment modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Payment Successful!</h3>
              <p className="text-xs text-slate-500 mt-1">Generating your Canteen Digital Token Pass...</p>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">Opening UPI App...</h3>
              <p className="text-xs text-slate-500 mt-1">Directing to {selectedApp} for instant payment verification.</p>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                  Pay via UPI Deep-Link
                </h3>
                <p className="text-xs text-slate-500">
                  Zero Gateway Fees • Direct Canteen Merchant Transfer
                </p>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white mb-6 flex items-center justify-between shadow-md">
              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Payable Amount</span>
                <span className="text-2xl font-extrabold font-['Outfit']">₹{cartTotal}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                Instant Token Pass
              </span>
            </div>

            {/* Select UPI App */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Choose UPI App
              </label>

              {MOCK_UPI_APPS.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app.name)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    selectedApp === app.name
                      ? 'bg-indigo-600/10 border-indigo-600 shadow-sm'
                      : 'bg-white/60 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={app.icon} alt={app.name} className="w-7 h-7 object-contain" />
                    <span className="font-extrabold text-sm text-slate-900 font-['Outfit']">{app.name}</span>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedApp === app.name ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                  }`}>
                    {selectedApp === app.name && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center space-x-2 active:scale-98"
            >
              <span>Pay ₹{cartTotal} with {selectedApp}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-3 flex items-center justify-center space-x-1 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-bit Encrypted NPCI UPI Intent Security</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
