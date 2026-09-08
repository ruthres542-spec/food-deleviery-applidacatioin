import React, { useState } from 'react';
import { 
  Utensils, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Power, 
  Flame, 
  Package, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus, MenuItem } from '../types';

export const RestaurantDashboard: React.FC = () => {
  const {
    restaurants,
    menuItems,
    orders,
    updateOrderStatus,
    addMenuItem,
    toggleMenuItemAvailability,
    toggleRestaurantOpenStatus,
    showToast
  } = useApp();

  const myRestaurant = restaurants[0]; // e.g., Spicy Tandoor India
  const myOrders = orders.filter((o) => o.restaurantId === myRestaurant.id);
  const myMenuItems = menuItems.filter((m) => m.restaurantId === myRestaurant.id);

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'analytics'>('orders');

  // New Item Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('249');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('Main Course');
  const [newItemVeg, setNewItemVeg] = useState(true);
  const [newItemImage, setNewItemImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');

  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addMenuItem({
      restaurantId: myRestaurant.id,
      name: newItemName.trim(),
      description: newItemDesc.trim() || 'Freshly prepared specialty dish.',
      price: parseFloat(newItemPrice) || 249,
      category: newItemCategory,
      image: newItemImage,
      isAvailable: true,
      isVegetarian: newItemVeg,
      rating: 4.8,
      prepTimeMinutes: 15
    });

    setIsAddModalOpen(false);
    setNewItemName('');
    setNewItemDesc('');
  };

  const todayRevenue = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Restaurant Status Header */}
      <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={myRestaurant.image}
            alt={myRestaurant.name}
            className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-neutral-900">{myRestaurant.name}</h2>
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                myRestaurant.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {myRestaurant.isOpen ? 'ONLINE & ACCEPTING ORDERS' : 'CLOSED'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">{myRestaurant.address} · Partner Kitchen Portal</p>
          </div>
        </div>

        {/* Toggle Store Status */}
        <button
          onClick={() => toggleRestaurantOpenStatus(myRestaurant.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            myRestaurant.isOpen
              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{myRestaurant.isOpen ? 'Set Store to Offline' : 'Set Store to Online'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Incoming Orders</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{myOrders.length}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Today's Sales</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹{todayRevenue.toFixed(2)}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Menu Dishes</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{myMenuItems.length} Items</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Utensils className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'border-orange-600 text-orange-600' : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Live Kitchen Queue ({myOrders.filter((o) => o.status !== 'DELIVERED').length})
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'menu' ? 'border-orange-600 text-orange-600' : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Menu & Stock Manager ({myMenuItems.length})
        </button>
      </div>

      {/* Tab 1: Live Kitchen Orders Queue */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 text-neutral-400 font-semibold">
              No orders received yet for this kitchen.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myOrders.map((ord) => (
                <div key={ord.id} className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex justify-between items-start border-b border-neutral-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-neutral-900">{ord.id}</span>
                        <span className="text-xs text-neutral-400">· {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-xs text-neutral-600 font-bold mt-0.5">{ord.userName} ({ord.userPhone})</div>
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-xs font-black px-2.5 py-1 rounded-lg uppercase">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Order items */}
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span><strong className="text-neutral-900">{it.quantity}x</strong> {it.name}</span>
                        <span className="font-semibold">₹{it.subtotal.toFixed(2)}</span>
                      </div>
                    ))}
                    {ord.specialNotes && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl font-medium mt-1">
                        Note: {ord.specialNotes}
                      </div>
                    )}
                  </div>

                  {/* Action status buttons */}
                  <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-2 justify-between items-center text-xs">
                    <span className="font-black text-neutral-900 text-sm">Total: ₹{ord.totalAmount.toFixed(2)}</span>

                    <div className="flex gap-2">
                      {ord.status === 'PLACED' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'PREPARING')}
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Mark Preparing
                        </button>
                      )}
                      {ord.status === 'PREPARING' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'OUT_FOR_DELIVERY')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          Ready for Pickup
                        </button>
                      )}
                      {ord.status === 'OUT_FOR_DELIVERY' && (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Driver Picked Up
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Menu Items & Stock Management */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-neutral-900">Restaurant Menu Dishes</h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Dish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myMenuItems.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-2xl border border-neutral-200 flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-sm text-neutral-900 truncate">{item.name}</h5>
                    <div className="text-xs text-neutral-500">{item.category} · ₹{item.price}</div>
                    <span className={`text-[10px] font-bold ${item.isAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleMenuItemAvailability(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    item.isAvailable ? 'bg-neutral-100 hover:bg-rose-50 text-neutral-700 hover:text-rose-600' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {item.isAvailable ? 'Mark Sold Out' : 'Mark In Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Dish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Add New Menu Dish</h3>
            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-neutral-50 p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 outline-none"
                  placeholder="e.g. Malai Kofta Curry"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-neutral-50 p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as MenuItem['category'])}
                    className="w-full bg-neutral-50 p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Pizzas & Pasta">Pizzas & Pasta</option>
                    <option value="Burgers & Wraps">Burgers & Wraps</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
                <textarea
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-neutral-50 p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 outline-none"
                  placeholder="Brief dish ingredients & flavor description..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="vegCheck"
                  checked={newItemVeg}
                  onChange={(e) => setNewItemVeg(e.target.checked)}
                  className="rounded text-orange-600"
                />
                <label htmlFor="vegCheck" className="text-xs font-bold text-neutral-700 cursor-pointer">
                  Vegetarian Dish
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
