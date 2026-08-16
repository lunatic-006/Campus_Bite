import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { X, Clock, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose }) {
  const { 
    selectedTimeSlot, 
    setSelectedTimeSlot, 
    orderType, 
    setOrderType, 
    peakHoursInfo 
  } = useCanteen();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-white/90 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
              Select Canteen Pickup Time
            </h3>
            <p className="text-xs text-slate-500">
              Pick a time slot to skip counter lines during 7-8 PM Dinner Rush
            </p>
          </div>
        </div>

        {/* Order Mode Toggle: Now vs Schedule */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100/90 rounded-2xl mb-6">
          <button
            onClick={() => setOrderType('NOW')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              orderType === 'NOW'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Order Now (~10 min prep)</span>
          </button>
          
          <button
            onClick={() => setOrderType('SCHEDULED')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              orderType === 'SCHEDULED'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Schedule Slot</span>
          </button>
        </div>

        {/* Available Time Slots List */}
        {orderType === 'SCHEDULED' && (
          <div className="space-y-3 mb-6">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Available 10-Minute Windows
            </label>

            {peakHoursInfo.timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.time;
              const isCritical = slot.loadPercent > 90;

              return (
                <div
                  key={slot.time}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/10 border-indigo-600 shadow-sm'
                      : 'bg-white/60 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-slate-900 font-['Outfit']">{slot.label}</span>
                        {isCritical && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3 text-rose-500" />
                            <span>Rush Slot ({slot.loadPercent}%)</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">Estimated counter wait: {slot.wait}</span>
                    </div>
                  </div>

                  {/* Load Indicator */}
                  <div className="text-right">
                    <span className={`text-xs font-bold ${
                      slot.loadPercent > 80 ? 'text-rose-600' : slot.loadPercent > 50 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {slot.load}
                    </span>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          slot.loadPercent > 80 ? 'bg-rose-500' : slot.loadPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${slot.loadPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Confirm Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition active:scale-95"
        >
          Confirm Pickup Time
        </button>

      </div>
    </div>
  );
}
