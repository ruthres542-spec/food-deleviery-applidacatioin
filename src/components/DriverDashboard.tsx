import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Navigation, 
  Power, 
  ShieldCheck, 
  Package 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DriverDashboard: React.FC = () => {
  const { drivers, orders, updateOrderStatus, showToast } = useApp();

  const myDriver = drivers[0]; // Rajesh Kumar
  const [isOnline, setIsOnline] = useState(true);

  // Orders available for delivery
  const assignedOrders = orders.filter((o) => o.deliveryPersonId === myDriver.id);
  const activeOrder = assignedOrders.find((o) => o.status === 'OUT_FOR_DELIVERY' || o.status === 'PREPARING');
  const completedOrders = assignedOrders.filter((o) => o.status === 'DELIVERED');

  const todayEarnings = completedOrders.length * 45 + 80; // base delivery fee + tips

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Driver Header */}
      <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={myDriver.avatar}
            alt={myDriver.name}
            className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-neutral-900">{myDriver.name}</h2>
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
              }`}>
                {isOnline ? 'ONLINE & READY FOR TRIPS' : 'OFFLINE'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {myDriver.vehicleType} ({myDriver.vehicleNumber}) · ⭐ {myDriver.rating} Rating
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOnline(!isOnline);
            showToast(isOnline ? 'Driver set to Offline' : 'Driver set to Online 🛵');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            isOnline
              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isOnline ? 'Go Offline' : 'Go Online'}</span>
        </button>
      </div>

      {/* Driver Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Trips Completed</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{completedOrders.length} Deliveries</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Bike className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Total Earnings</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹{todayEarnings.toFixed(2)}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Current Job Status</div>
            <div className="text-base font-extrabold text-neutral-900 mt-1">
              {activeOrder ? `Active (${activeOrder.id})` : 'Idle · Waiting for order'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Navigation className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Assignment Section */}
      {activeOrder ? (
        <div className="p-6 bg-gradient-to-br from-neutral-900 to-slate-900 text-white rounded-3xl space-y-4 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                ACTIVE DELIVERY JOB
              </span>
              <span className="text-xs text-neutral-400">{activeOrder.id}</span>
            </div>
            <span className="text-xs font-bold text-amber-300">ETA: {activeOrder.driverEtaMinutes || 10} Mins</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Pickup */}
            <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <div className="text-[10px] font-bold text-orange-400 uppercase">1. Pick Up From Kitchen</div>
              <h4 className="font-extrabold text-base mt-1">{activeOrder.restaurantName}</h4>
              <p className="text-xs text-neutral-300">{activeOrder.restaurantAddress}</p>
              <button
                onClick={() => alert(`Calling restaurant at ${activeOrder.restaurantPhone}`)}
                className="mt-3 text-xs text-orange-400 font-bold underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call Restaurant
              </button>
            </div>

            {/* Drop off */}
            <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <div className="text-[10px] font-bold text-emerald-400 uppercase">2. Deliver To Customer</div>
              <h4 className="font-extrabold text-base mt-1">{activeOrder.userName}</h4>
              <p className="text-xs text-neutral-300">{activeOrder.deliveryAddress}</p>
              <button
                onClick={() => alert(`Calling customer at ${activeOrder.userPhone}`)}
                className="mt-3 text-xs text-emerald-400 font-bold underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call Customer ({activeOrder.userPhone})
              </button>
            </div>

          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-neutral-400">
              Payment: <span className="font-bold text-white">{activeOrder.paymentMethod} (₹{activeOrder.totalAmount.toFixed(2)})</span>
            </div>

            <button
              onClick={() => updateOrderStatus(activeOrder.id, 'DELIVERED')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Order Delivered 🎉</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 text-neutral-500">
          <Bike className="w-12 h-12 mx-auto mb-3 opacity-40 text-orange-600" />
          <h4 className="font-extrabold text-base text-neutral-800 mb-1">No active delivery assignments</h4>
          <p className="text-xs text-neutral-500">Stay online. New trip assignments will pop up here automatically!</p>
        </div>
      )}

      {/* Completed History */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200">
        <h3 className="font-extrabold text-base text-neutral-900 mb-4">Completed Delivery Logs</h3>
        {completedOrders.length === 0 ? (
          <p className="text-xs text-neutral-400">No completed trips yet today.</p>
        ) : (
          <div className="space-y-3">
            {completedOrders.map((ord) => (
              <div key={ord.id} className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900">{ord.id}</span> · {ord.restaurantName} to {ord.userName}
                  <div className="text-[11px] text-neutral-500">{ord.deliveryAddress}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-emerald-600">+₹45.00 Fee</div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">DELIVERED</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
