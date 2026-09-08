import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BannerCarousel } from './components/BannerCarousel';
import { CuisineFilter } from './components/CuisineFilter';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AiCravingAssistantModal } from './components/AiCravingAssistantModal';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { DriverDashboard } from './components/DriverDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { InternshipTaskPortal } from './components/InternshipTaskPortal';
import { Search, Heart, Sparkles, SlidersHorizontal, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

export default function App() {
  const {
    currentRole,
    restaurants,
    selectedCuisine,
    searchQuery,
    setSearchQuery,
    isVegOnlyFilter,
    favoriteRestaurantIds,
    toastMessage,
    orders,
    setTrackingOrder
  } = useApp();

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filter restaurants based on user search, selected cuisine, veg filter, and favorites filter
  const filteredRestaurants = restaurants.filter((r) => {
    // Search query
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Cuisine filter
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine.includes(selectedCuisine);

    // Favorites filter
    const matchesFavorites = !onlyFavorites || favoriteRestaurantIds.includes(r.id);

    return matchesSearch && matchesCuisine && matchesFavorites;
  });

  const activeUserOrders = orders.filter((o) => o.status !== 'DELIVERED');

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area based on User Role */}
      {currentRole === 'restaurant' ? (
        <main className="flex-1">
          <RestaurantDashboard />
        </main>
      ) : currentRole === 'driver' ? (
        <main className="flex-1">
          <DriverDashboard />
        </main>
      ) : currentRole === 'admin' ? (
        <main className="flex-1">
          <AdminDashboard />
        </main>
      ) : (
        /* CUSTOMER VIEW */
        <main className="flex-1 pb-16">
          
          {/* Promotional Banner Carousel */}
          <BannerCarousel />

          {/* Sticky Active Orders Live Banner (if customer placed an active order) */}
          {activeUserOrders.length > 0 && (
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Your Order ({activeUserOrders[0].id}) is active & in progress!</span>
                </div>
                <button
                  onClick={() => setTrackingOrder(activeUserOrders[0])}
                  className="bg-white text-orange-700 hover:bg-neutral-100 px-4 py-1.5 rounded-xl font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer shrink-0"
                >
                  Track Live Delivery 🛵
                </button>
              </div>
            </div>
          )}

          {/* Cuisine Pill Filter */}
          <CuisineFilter />

          {/* Customer Main Grid Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            
            {/* Search & Favorites Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              
              {/* Search Box */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants, cuisines or dishes..."
                  className="w-full bg-white text-xs font-medium text-neutral-900 pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-200/90 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Favorites & Total Count Info */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    onlyFavorites
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : 'text-rose-500'}`} />
                  <span>Favorites ({favoriteRestaurantIds.length})</span>
                </button>

                <div className="text-xs font-bold text-neutral-500">
                  Showing <span className="text-neutral-900 font-extrabold">{filteredRestaurants.length}</span> Restaurants
                </div>
              </div>

            </div>

            {/* Restaurant Grid */}
            {filteredRestaurants.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 my-6">
                <UtensilsCrossed className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="font-extrabold text-base text-neutral-800 mb-1">No restaurants match your search</h3>
                <p className="text-xs text-neutral-500 mb-4">Try clearing your search query or selecting a different cuisine filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setOnlyFavorites(false);
                  }}
                  className="bg-orange-600 text-white font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}

          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-xs text-neutral-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-neutral-900 tracking-tight text-sm">
              <span className="text-orange-600">FOOD</span>DELIVERY
            </span>
            <span>· Data Alcott Systems Free Internship Task JV-EC-002</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-neutral-400">
            <span>Spring Boot · React · MySQL · Gemini AI</span>
            <span>© {new Date().getFullYear()} www.dataalcott.com</span>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <RestaurantDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <AiCravingAssistantModal />
      <InternshipTaskPortal />

      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
