import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  Leaf, 
  Flame, 
  ShoppingBag, 
  Info 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';

export const RestaurantDetailModal: React.FC = () => {
  const { 
    activeRestaurant, 
    setActiveRestaurant, 
    menuItems, 
    cart, 
    addToCart, 
    updateCartQuantity, 
    setIsCartOpen 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  if (!activeRestaurant) return null;

  const restaurantMenu = menuItems.filter((item) => item.restaurantId === activeRestaurant.id);

  const categories = ['All', ...Array.from(new Set(restaurantMenu.map((item) => item.category)))];

  const filteredMenu = restaurantMenu.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) || 
                          item.description.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesVeg = !vegOnly || item.isVegetarian;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const getCartQty = (itemId: string) => {
    const found = cart.find((ci) => ci.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Banner Header */}
        <div className="relative h-48 sm:h-64 w-full bg-neutral-900 shrink-0">
          <img
            src={activeRestaurant.image}
            alt={activeRestaurant.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setActiveRestaurant(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Restaurant Details Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-neutral-950 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-neutral-950" /> {activeRestaurant.rating} ({activeRestaurant.reviewCount})
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeRestaurant.deliveryTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{activeRestaurant.name}</h2>
            <p className="text-xs text-neutral-300 line-clamp-1">{activeRestaurant.description}</p>
            <div className="flex items-center gap-4 text-[11px] text-neutral-300 mt-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-400" /> {activeRestaurant.address}</span>
              <span className="hidden sm:flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-400" /> {activeRestaurant.phone}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-neutral-200/80 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white hover:bg-neutral-200/70 text-neutral-700 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Veg Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search menu..."
                className="bg-white text-xs text-neutral-900 pl-8 pr-3 py-1.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                vegOnly ? 'bg-emerald-600 text-white' : 'bg-white border border-neutral-200 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" /> Veg
            </button>
          </div>
        </div>

        {/* Menu Items Grid Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-sm">No menu items match your search.</p>
              <p className="text-xs">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenu.map((item) => {
                const qty = getCartQty(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-orange-200 hover:shadow-md transition-all flex gap-3 justify-between items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                          item.isVegetarian ? 'border-emerald-600 bg-emerald-50' : 'border-rose-600 bg-rose-50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </span>
                        <h4 className="font-bold text-sm text-neutral-900 truncate">{item.name}</h4>
                        {item.isSpicy && <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                      </div>

                      <p className="text-xs text-neutral-500 line-clamp-2 mb-2">{item.description}</p>

                      <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="text-neutral-900 font-extrabold text-sm">₹{item.price}</span>
                        {item.calories && <span className="text-neutral-400 text-[11px]">{item.calories} kcal</span>}
                        {item.prepTimeMinutes && <span className="text-neutral-400 text-[11px]">{item.prepTimeMinutes}m prep</span>}
                      </div>
                    </div>

                    {/* Image & Add Button */}
                    <div className="relative shrink-0 flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover border border-neutral-200 mb-2"
                      />

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-extrabold text-xs px-3 py-1 rounded-xl border border-orange-200 shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> ADD
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-orange-600 text-white font-extrabold text-xs px-2 py-1 rounded-xl shadow-xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="hover:text-amber-200 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span>{qty}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="hover:text-amber-200 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Cart Sticky bar */}
        {totalCartCount > 0 && (
          <div className="p-4 bg-neutral-900 text-white flex items-center justify-between shrink-0 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center">
                {totalCartCount}
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-medium">Cart Updated</div>
                <div className="text-sm font-bold">{cart[0]?.menuItem?.name || 'Item'} & more</div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveRestaurant(null);
                setIsCartOpen(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> View Cart & Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
