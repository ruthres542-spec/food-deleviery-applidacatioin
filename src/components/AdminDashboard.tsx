import React from 'react';
import { 
  Building2, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Bike, 
  BarChart3, 
  Star 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { restaurants, orders, drivers } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderVal = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Chart Mock Data
  const REVENUE_DATA = [
    { day: 'Mon', revenue: 420 },
    { day: 'Tue', revenue: 680 },
    { day: 'Wed', revenue: 850 },
    { day: 'Thu', revenue: 1100 },
    { day: 'Fri', revenue: 1450 },
    { day: 'Sat', revenue: 1980 },
    { day: 'Sun', revenue: 2240 }
  ];

  const CUISINE_DATA = [
    { cuisine: 'Indian', orders: 142, color: '#f97316' },
    { cuisine: 'Italian', orders: 118, color: '#3b82f6' },
    { cuisine: 'Burgers', orders: 95, color: '#eab308' },
    { cuisine: 'Asian', orders: 84, color: '#a855f7' },
    { cuisine: 'Healthy', orders: 62, color: '#22c55e' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-neutral-900 via-neutral-800 to-slate-900 text-white rounded-3xl shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            System Admin Portal · Task JV-EC-002
          </div>
          <h2 className="text-2xl font-black">FoodDelivery Platform Analytics</h2>
          <p className="text-xs text-neutral-400">Real-time metrics, revenue streams, partner restaurants & delivery operations.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-emerald-400">Platform Online · All Systems Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Gross Platform Sales</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹{totalRevenue.toFixed(2)}</div>
            <div className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24% vs last week
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Total Orders</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{orders.length}</div>
            <div className="text-[11px] text-neutral-500 font-semibold mt-0.5">Avg Value: ₹{avgOrderVal.toFixed(2)}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Partner Kitchens</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{restaurants.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              {restaurants.filter((r) => r.isOpen).length} Currently Open
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase">Delivery Drivers</div>
            <div className="text-2xl font-black text-neutral-900 mt-1">{drivers.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              {drivers.filter((d) => d.isAvailable).length} Active on Road
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Bike className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Revenue Area Chart */}
        <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-neutral-900">Weekly Revenue Trend</h3>
              <p className="text-xs text-neutral-500">Gross sales volume (₹)</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cuisine Popularity Bar Chart */}
        <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-neutral-900">Popularity by Cuisine Category</h3>
              <p className="text-xs text-neutral-500">Total orders fulfilled by food domain</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Top 5 Cuisines
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CUISINE_DATA}>
                <XAxis dataKey="cuisine" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
                  {CUISINE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Partner Restaurants Table */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs">
        <h3 className="font-extrabold text-base text-neutral-900 mb-4">Registered Partner Restaurants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Restaurant</th>
                <th className="pb-3">Cuisine</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Delivery Fee</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50/80">
                  <td className="py-3 font-bold text-neutral-900 flex items-center gap-3">
                    <img src={r.image} alt={r.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div>{r.name}</div>
                      <div className="text-[10px] text-neutral-400 font-normal">{r.address}</div>
                    </div>
                  </td>
                  <td className="py-3 font-medium text-neutral-600">{r.cuisine.join(', ')}</td>
                  <td className="py-3 font-extrabold text-emerald-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-emerald-600" /> {r.rating} ({r.reviewCount})
                  </td>
                  <td className="py-3 font-semibold text-neutral-800">₹{r.deliveryFee.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      r.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {r.isOpen ? 'OPEN' : 'CLOSED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
