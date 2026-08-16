import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { ScanLine, CheckCircle2, AlertCircle, Delete, QrCode, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CounterKiosk() {
  const { verifyCounterToken, orders } = useCanteen();

  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const readyOrders = orders.filter(o => o.status === 'READY_FOR_PICKUP');

  const handleKeyPress = (num) => {
    if (enteredOTP.length < 4) {
      const updated = enteredOTP + num;
      setEnteredOTP(updated);

      // Auto verify when 4 digits reached
      if (updated.length === 4) {
        verifyCode(updated);
      }
    }
  };

  const handleDelete = () => {
    setEnteredOTP(prev => prev.slice(0, -1));
    setVerificationResult(null);
  };

  const verifyCode = (code) => {
    const res = verifyCounterToken(code);
    setVerificationResult(res);

    if (res.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
      setTimeout(() => {
        setEnteredOTP('');
        setVerificationResult(null);
      }, 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-200/60 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <ScanLine className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
              Counter #2 Token Verification Kiosk
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Rapid OTP Numpad & QR Code Handover Verification
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
          {readyOrders.length} Orders Ready for Handover
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Numpad Input Box */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-lg text-center flex flex-col items-center justify-between">
          <div className="w-full">
            <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
              Enter Student's 4-Digit OTP
            </span>

            {/* OTP Display Slots */}
            <div className="flex justify-center space-x-3 my-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-['Outfit'] transition-all ${
                    enteredOTP[idx]
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-slate-200 bg-white/70 text-slate-400'
                  }`}
                >
                  {enteredOTP[idx] || ''}
                </div>
              ))}
            </div>

            {/* Verification Result Message */}
            {verificationResult && (
              <div className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 my-2 ${
                verificationResult.success
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}>
                {verificationResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>TOKEN VERIFIED! Hand over Order #{verificationResult.order.orderId}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>{verificationResult.message}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Numeric Touchpad */}
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                className="py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-lg shadow-sm border border-slate-200 active:scale-95 transition font-['Outfit']"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => { setEnteredOTP(''); setVerificationResult(null); }}
              className="py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs hover:bg-slate-200 transition"
            >
              Clear
            </button>
            <button
              onClick={() => handleKeyPress('0')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-lg shadow-sm border border-slate-200 active:scale-95 transition font-['Outfit']"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="py-3.5 rounded-2xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rapid One-Tap Ready Orders List */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-lg space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-indigo-600" />
            <span>Ready Orders at Counter #2</span>
          </h3>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {readyOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-bold text-slate-600">No ready tokens awaiting pickup</p>
              </div>
            ) : (
              readyOrders.map((order) => (
                <div 
                  key={order.orderId}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-indigo-400 transition"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-slate-900 font-['Outfit']">Order #{order.orderId}</span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold">OTP: {order.otp}</span>
                    </div>
                    <span className="text-xs text-slate-500">{order.items.length} items • Slot: {order.slotTime}</span>
                  </div>

                  <button
                    onClick={() => verifyCode(order.otp)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition shadow-sm active:scale-95"
                  >
                    Quick Verify
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
