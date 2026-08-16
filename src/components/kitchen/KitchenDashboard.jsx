import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { ChefHat, Clock, CheckCircle2, AlertCircle, Sparkles, Filter, ToggleLeft, ToggleRight, Search } from 'lucide-react';

export default function KitchenDashboard() {
  const { 
    orders, 
    updateOrderStatus, 
    menuItems, 
    toggleStockStatus, 
    peakHoursInfo 
  } = useCanteen();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory'
  const [filterSlot, setFilterSlot] = useState('ALL');

  const pendingOrders = orders.filter(o => o.status !== 'COMPLETED');
  const filteredOrders = filterSlot === 'ALL' 
    ? pendingOrders 
    : pendingOrders.filter(o => o.slotTime === filterSlot || o.slotTime.includes(filterSlot));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel-elevated rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-200/60 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
              Kitchen Display System (KDS)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Real-Time Order Prep Stream & Live Stock Controls
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'orders'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Kitchen Queue ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'inventory'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Stock & Menu Availability
          </button>
        </div>
      </div>

      {/* Orders View */}
      {activeTab === 'orders' ? (
        <div className="space-y-6">
          
          {/* Time Slot Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Filter Slot:</span>
            </span>

            {['ALL', '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM'].map((slot) => (
              <button
                key={slot}
                onClick={() => setFilterSlot(slot)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                  filterSlot === slot
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {slot === 'ALL' ? 'All Pickup Slots' : slot}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.length === 0 ? (
              <div className="col-span-full glass-panel p-12 rounded-3xl text-center text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-slate-700 font-['Outfit']">No Pending Kitchen Orders</h3>
                <p className="text-xs text-slate-400 mt-1">All student orders for this slot have been prepared & handed over.</p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isPreparing = order.status === 'KITCHEN_PREPARING';
                const isReady = order.status === 'READY_FOR_PICKUP';

                return (
                  <div 
                    key={order.orderId}
                    className={`glass-panel rounded-3xl p-5 border transition-all shadow-md relative ${
                      isReady ? 'border-emerald-400 bg-emerald-50/20' : 'border-indigo-200 bg-white/80'
                    }`}
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                      <div>
                        <span className="text-xs font-extrabold text-indigo-600 font-['Outfit']">
                          Order #{order.orderId}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-medium">Placed: {order.timestamp}</span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isReady ? 'Ready at Counter' : 'In Prep'}
                      </span>
                    </div>

                    {/* Slot Pickup Info */}
                    <div className="p-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Pickup Slot:</span>
                      </span>
                      <span className="font-extrabold text-slate-900">{order.slotTime}</span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 mb-5 min-h-[90px]">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-black">
                              {item.qty}x
                            </span>
                            <span>{item.name}</span>
                          </span>
                          <span className="text-slate-400 font-medium">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    {isPreparing ? (
                      <button
                        onClick={() => updateOrderStatus(order.orderId, 'READY_FOR_PICKUP')}
                        className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition shadow-md flex items-center justify-center space-x-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Order Ready at Counter</span>
                      </button>
                    ) : (
                      <div className="py-2.5 px-3 rounded-2xl bg-emerald-100 text-emerald-800 text-center font-extrabold text-xs flex items-center justify-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Waiting Student Pickup (OTP: {order.otp})</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Inventory Management View */
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">
                Live Item Stock & Canteen Menu Toggle
              </h3>
              <p className="text-xs text-slate-500">
                Toggle items out-of-stock instantly when kitchen ingredients run out during peak rush.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => {
              const isAvailable = item.stockLeft > 0;

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                    isAvailable ? 'bg-white border-slate-200/80' : 'bg-rose-50/50 border-rose-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 font-['Outfit']">{item.name}</h4>
                      <span className="text-xs text-slate-500">₹{item.price} • Stock: {item.stockLeft}</span>
                    </div>
                  </div>

                  {/* Stock Toggle Button */}
                  <button
                    onClick={() => toggleStockStatus(item.id)}
                    className="p-2 transition"
                    title={isAvailable ? 'Mark Out of Stock' : 'Mark In Stock'}
                  >
                    {isAvailable ? (
                      <ToggleRight className="w-8 h-8 text-indigo-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-300" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
