import React, { useState } from 'react';
import { CanteenProvider, useCanteen } from './context/CanteenContext';
import Navbar from './components/layout/Navbar';
import FloatingGlassDock from './components/layout/FloatingGlassDock';
import MenuCard from './components/student/MenuCard';
import PeakRushBanner from './components/student/PeakRushBanner';
import ScheduleModal from './components/student/ScheduleModal';
import CartDrawer from './components/student/CartDrawer';
import DigitalTokenModal from './components/student/DigitalTokenModal';
import KitchenDashboard from './components/kitchen/KitchenDashboard';
import CounterKiosk from './components/kitchen/CounterKiosk';
import { CANTEEN_CATEGORIES } from './data/canteenData';
import { Search, Sparkles, SlidersHorizontal, Leaf, UtensilsCrossed } from 'lucide-react';

function CanteenMainContent() {
  const { 
    viewMode, 
    menuItems, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    vegOnlyFilter,
    setVegOnlyFilter
  } = useCanteen();

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Filter Logic
  const filteredMenuItems = menuItems.filter(item => {
    // Category match
    const matchCategory = selectedCategory === 'All Items'
      ? true
      : selectedCategory === 'Popular Right Now'
      ? item.popular
      : item.category === selectedCategory;

    // Search query match
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Veg filter
    const matchVeg = vegOnlyFilter ? item.isVeg : true;

    return matchCategory && matchSearch && matchVeg;
  });

  return (
    <div className="min-h-screen pb-24 sm:pb-12">
      <Navbar />

      {viewMode === 'student' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
          
          {/* Peak Rush Hour Management Banner */}
          <PeakRushBanner onOpenSchedule={() => setIsScheduleModalOpen(true)} />

          {/* Search Bar & Diet Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Dosa, Paneer Thali, Samosa Pav, Cold Coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-panel text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition border border-white/80 shadow-sm"
              />
            </div>

            {/* Pure Veg Filter Toggle Button */}
            <button
              onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
              className={`px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center space-x-2 border shadow-sm ${
                vegOnlyFilter
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/20'
                  : 'glass-panel text-slate-700 hover:bg-white border-white/80'
              }`}
            >
              <Leaf className={`w-4 h-4 ${vegOnlyFilter ? 'text-white' : 'text-emerald-500'}`} />
              <span>Pure Veg Only</span>
            </button>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {CANTEEN_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'glass-pill-active'
                      : 'glass-pill text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredMenuItems.length === 0 ? (
              <div className="col-span-full glass-panel p-12 rounded-3xl text-center text-slate-400 space-y-3">
                <UtensilsCrossed className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
                <h3 className="text-lg font-extrabold text-slate-700 font-['Outfit']">No items found</h3>
                <p className="text-xs text-slate-400">Try searching for a different dish or clearing your filters.</p>
              </div>
            ) : (
              filteredMenuItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Modals & Drawers */}
          <ScheduleModal 
            isOpen={isScheduleModalOpen} 
            onClose={() => setIsScheduleModalOpen(false)} 
          />
          <CartDrawer />
          <DigitalTokenModal />
        </main>
      )}

      {/* Staff Kitchen Mode */}
      {viewMode === 'kitchen' && <KitchenDashboard />}

      {/* Staff Counter Kiosk Mode */}
      {viewMode === 'counter' && <CounterKiosk />}

      {/* Floating Bottom Glass Dock for Mobile View */}
      <FloatingGlassDock />
    </div>
  );
}

export default function App() {
  return (
    <CanteenProvider>
      <CanteenMainContent />
    </CanteenProvider>
  );
}
