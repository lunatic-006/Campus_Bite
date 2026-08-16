import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { Flame, Clock, Users, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

export default function PeakRushBanner({ onOpenSchedule }) {
  const { peakHoursInfo, selectedTimeSlot, orderType } = useCanteen();

  return (
    <div className="glass-panel-elevated rounded-3xl p-5 sm:p-6 mb-8 border border-amber-200/60 shadow-xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        {/* Left Info Section */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-sm flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 fill-white animate-bounce" />
              <span>Dinner Rush Active</span>
            </span>
            <span className="text-xs font-bold text-slate-500">7:00 PM - 8:00 PM</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Skip the 20-Min Canteen Queue with <span className="text-indigo-600">Smart Scheduling</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Over <span className="font-bold text-slate-900">{peakHoursInfo.activeQueueCount} students</span> are currently ordering. Pre-book your food pickup slot during class breaks to get your meal piping hot instantly!
          </p>

          {/* Kitchen Capacity Progress Bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Kitchen Load: {peakHoursInfo.kitchenLoadPercent}%</span>
              </span>
              <span className="text-amber-700 font-extrabold">{peakHoursInfo.estimatedWaitMinutes} min estimated prep</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500" 
                style={{ width: `${peakHoursInfo.kitchenLoadPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right CTA Slot Selection */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center space-y-3 min-w-[240px] border border-white/80 shadow-md">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Selected Pickup Window</span>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5 flex items-center justify-center space-x-1.5 font-['Outfit']">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>{orderType === 'NOW' ? 'Immediate (~10 mins)' : selectedTimeSlot}</span>
            </div>
          </div>

          <button
            onClick={onOpenSchedule}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-extrabold transition-all duration-200 shadow-md flex items-center justify-center space-x-2 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Change Pickup Slot</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
