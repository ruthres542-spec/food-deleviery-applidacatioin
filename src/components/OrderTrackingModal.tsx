import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  Bike, 
  UtensilsCrossed, 
  ShoppingBag, 
  Navigation, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { trackingOrder, setTrackingOrder } = useApp();

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    { sender: 'driver', text: 'Hi! I have picked up your order and am en route now 🛵', time: 'Just now' }
  ]);

  if (!trackingOrder) return null;

  const STATUS_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'PLACED', label: 'Order Placed', desc: 'Received by system' },
    { status: 'CONFIRMED', label: 'Accepted', desc: 'Restaurant confirmed' },
    { status: 'PREPARING', label: 'Kitchen Prep', desc: 'Chefs preparing food' },
    { status: 'OUT_FOR_DELIVERY', label: 'On The Way', desc: 'Driver picked up' },
    { status: 'DELIVERED', label: 'Delivered', desc: 'Arrived at drop-off' }
  ];

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.status === trackingOrder.status);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    setChatInput('');

    // Simulate driver reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: `Got it! Driving safely. ETA: ${trackingOrder.driverEtaMinutes || 5} mins.`, time: 'Just now' }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-lg">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">Live Delivery Tracking</h3>
                <span className="bg-orange-500/20 text-orange-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-500/30">
                  {trackingOrder.id}
                </span>
              </div>
              <p className="text-xs text-neutral-400">Order from {trackingOrder.restaurantName}</p>
            </div>
          </div>

          <button
            onClick={() => setTrackingOrder(null)}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Status Stepper */}
          <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-200/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider">Estimated Arrival</div>
                <div className="text-2xl font-black text-neutral-900">
                  {trackingOrder.status === 'DELIVERED' ? 'Delivered 🎉' : `${trackingOrder.driverEtaMinutes || 15} Minutes`}
                </div>
              </div>
              <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full animate-pulse">
                {trackingOrder.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Progress Line */}
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-200 z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-600 z-0 transition-all duration-500"
                style={{ width: `${(Math.max(0, currentStepIndex) / (STATUS_STEPS.length - 1)) * 100}%` }}
              />

              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.status} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                        isCompleted
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30'
                          : 'bg-white text-neutral-400 border-2 border-neutral-300'
                      } ${isCurrent ? 'ring-4 ring-orange-200 scale-110' : ''}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="text-[10px] font-bold text-neutral-700 mt-1 hidden sm:block text-center max-w-[65px]">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulated Map Box */}
          <div className="relative h-56 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex flex-col justify-between p-4">
            
            {/* Map Grid Background Graphics */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Animated Route Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 50 160 Q 200 60 450 160 T 700 80"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Map Pins */}
            <div className="relative z-10 flex justify-between items-center h-full px-6">
              
              {/* Restaurant Pin */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-neutral-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-white bg-black/60 px-2 py-0.5 rounded-md mt-1">
                  {trackingOrder.restaurantName}
                </span>
              </div>

              {/* Driver Pin (Animated) */}
              <div className="flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 rounded-full bg-orange-600 text-white font-black flex items-center justify-center shadow-xl shadow-orange-600/50 ring-4 ring-orange-400/30">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-amber-300 bg-black/80 px-2 py-0.5 rounded-md mt-1 flex items-center gap-1">
                  <Navigation className="w-3 h-3 animate-spin" /> {trackingOrder.deliveryPersonName || 'Driver'}
                </span>
              </div>

              {/* Destination Pin */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black flex items-center justify-center shadow-lg shadow-rose-600/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-white bg-black/60 px-2 py-0.5 rounded-md mt-1">
                  Your Address
                </span>
              </div>

            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-800">
              <span>GPS Telemetry Active</span>
              <span className="text-emerald-400 font-bold">Speed: 28 km/h</span>
            </div>
          </div>

          {/* Driver Info Card */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={trackingOrder.deliveryPersonAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt="Driver"
                className="w-12 h-12 rounded-2xl object-cover border border-neutral-300"
              />
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900">{trackingOrder.deliveryPersonName || 'Rajesh Kumar'}</h4>
                <div className="text-xs text-neutral-500 font-medium">
                  Scooter · KA-01-EQ-9821 · ⭐ 4.9 Rating
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Calling driver at ${trackingOrder.deliveryPersonPhone || '+1 (555) 901-2345'}...`)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Driver</span>
            </button>
          </div>

          {/* Chat with Driver Box */}
          <div className="p-4 bg-neutral-100/80 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>Direct Chat with Delivery Executive</span>
            </div>

            <div className="h-28 overflow-y-auto space-y-2 p-2 bg-white rounded-xl border border-neutral-200 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-2 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-orange-600 text-white rounded-br-xs'
                        : 'bg-neutral-100 text-neutral-800 rounded-bl-xs'
                    }`}
                  >
                    <div className="font-medium">{msg.text}</div>
                    <div className="text-[9px] opacity-70 text-right mt-0.5">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message to driver..."
                className="flex-1 bg-white text-xs px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Items Summary */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
            <h5 className="font-bold text-xs text-neutral-700 uppercase tracking-wider mb-2">Order Items</h5>
            <div className="space-y-2 text-xs">
              {trackingOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between text-neutral-800">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-bold">₹{it.subtotal.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-extrabold text-neutral-900">
                <span>Total Paid ({trackingOrder.paymentMethod})</span>
                <span className="text-orange-600">₹{trackingOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
