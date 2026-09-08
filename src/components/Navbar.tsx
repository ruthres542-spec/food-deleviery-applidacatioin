import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Sparkles, 
  Code2, 
  ChevronDown, 
  UserCheck, 
  UtensilsCrossed, 
  Bike, 
  ShieldAlert, 
  Heart, 
  Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    deliveryAddress,
    setDeliveryAddress,
    searchQuery,
    setSearchQuery,
    cart,
    setIsCartOpen,
    setIsAiAssistantOpen,
    setIsTaskPortalOpen,
    favoriteRestaurantIds,
    orders,
    setTrackingOrder
  } = useApp();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressInput, setAddressInput] = useState(deliveryAddress);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeTrackingOrder = orders.find((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setIsAccountMenuOpen(false);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setDeliveryAddress(addressInput.trim());
    }
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide">
                Internship Task JV-EC-002
              </span>
              <span>Data Alcott Systems · Free Java Full Stack Internship Project</span>
            </div>
            <button
              onClick={() => setIsTaskPortalOpen(true)}
              className="flex items-center gap-1.5 underline hover:text-amber-100 transition-colors font-semibold cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Code & DB Inspector</span>
            </button>
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
            
            {/* Brand Logo & Address */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <div 
                onClick={() => setCurrentRole('customer')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  🍕
                </div>
                <div>
                  <div className="font-extrabold text-lg text-neutral-900 tracking-tight leading-none flex items-center gap-1">
                    FOOD<span className="text-orange-600">DELIVERY</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-semibold tracking-wider uppercase">
                    Data Alcott Systems
                  </div>
                </div>
              </div>

              {/* Delivery Address Pill */}
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="hidden md:flex items-center gap-2 text-left bg-neutral-100 hover:bg-neutral-200/70 text-neutral-800 text-xs px-3 py-1.5 rounded-lg border border-neutral-200/80 transition-colors cursor-pointer max-w-[210px]"
              >
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase leading-tight">Deliver To</div>
                  <div className="font-semibold text-neutral-800 truncate">{deliveryAddress}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-auto" />
              </button>
            </div>

            {/* Middle Search Input */}
            {currentRole === 'customer' && (
              <div className="flex-1 max-w-md hidden sm:block">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes, biryani, pizza, or restaurants..."
                    className="w-full bg-neutral-100/90 hover:bg-neutral-100 focus:bg-white text-sm text-neutral-900 pl-10 pr-4 py-2 rounded-xl border border-neutral-200/80 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-neutral-400"
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
              </div>
            )}

            {/* Right Action Icons & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* AI Craving Assistant Button */}
              {currentRole === 'customer' && (
                <button
                  onClick={() => setIsAiAssistantOpen(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xs shadow-indigo-500/20 transition-all hover:scale-105 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span className="hidden lg:inline">AI Craving Assistant</span>
                  <span className="lg:hidden">AI Assistant</span>
                </button>
              )}

              {/* Active Tracking Button */}
              {activeTrackingOrder && (
                <button
                  onClick={() => setTrackingOrder(activeTrackingOrder)}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer animate-pulse"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Track Live Order</span>
                </button>
              )}

              {/* Role Switcher Pills */}
              <div className="hidden lg:flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200/80">
                <button
                  onClick={() => handleRoleChange('customer')}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                    currentRole === 'customer'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Customer
                </button>
                <button
                  onClick={() => handleRoleChange('restaurant')}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                    currentRole === 'restaurant'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Partner
                </button>
                <button
                  onClick={() => handleRoleChange('driver')}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                    currentRole === 'driver'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  Driver
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                    currentRole === 'admin'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>

              {/* Cart Button */}
              {currentRole === 'customer' && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 transition-all cursor-pointer hover:scale-105"
                  aria-label="View Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-neutral-900 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                      {totalCartCount}
                    </span>
                  )}
                </button>
              )}

              {/* Account / Role Menu Dropdown (Mobile + Fallback) */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:p-2 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl border border-neutral-200 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-xs">
                    {currentRole[0].toUpperCase()}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Switch Portal Role</div>
                      <div className="text-sm font-semibold text-neutral-800 capitalize">{currentRole} Mode</div>
                    </div>
                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => handleRoleChange('customer')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          currentRole === 'customer' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <UserCheck className="w-4 h-4" /> Customer Ordering
                      </button>
                      <button
                        onClick={() => handleRoleChange('restaurant')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          currentRole === 'restaurant' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <UtensilsCrossed className="w-4 h-4" /> Restaurant Partner
                      </button>
                      <button
                        onClick={() => handleRoleChange('driver')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          currentRole === 'driver' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <Bike className="w-4 h-4" /> Delivery Driver
                      </button>
                      <button
                        onClick={() => handleRoleChange('admin')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          currentRole === 'admin' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4" /> Admin Analytics
                      </button>
                    </div>

                    <div className="border-t border-neutral-100 pt-1 mt-1 p-1">
                      <button
                        onClick={() => {
                          setIsTaskPortalOpen(true);
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 text-left"
                      >
                        <Code2 className="w-4 h-4 text-amber-600" />
                        Internship Task Hub (JV-EC-002)
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Address Edit Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" /> Delivery Address
            </h3>
            <p className="text-xs text-neutral-500 mb-4">Set your drop-off location for fast delivery estimation.</p>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Street Address / Flat No.</label>
                <textarea
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  rows={3}
                  className="w-full text-sm p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="e.g. Apt 4B, 124 Park View Ave, Tech District"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md shadow-orange-500/20"
                >
                  Update Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
