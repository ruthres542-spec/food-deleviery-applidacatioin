import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    cartSubtotal,
    cartDeliveryFee,
    cartTax,
    cartDiscount,
    cartTotal,
    setIsCheckoutOpen
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoNotice, setPromoNotice] = useState<{ success: boolean; msg: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoNotice({ success: res.success, msg: res.message });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-neutral-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h3 className="font-extrabold text-lg text-neutral-900">Your Food Basket</h3>
            <span className="bg-orange-100 text-orange-800 text-xs font-black px-2 py-0.5 rounded-full">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 text-3xl">
              🍕
            </div>
            <h4 className="font-bold text-lg text-neutral-900 mb-1">Your cart is empty</h4>
            <p className="text-xs text-neutral-500 mb-6">Explore our top partner restaurants and add delicious meals!</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Clear Cart Button */}
            <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-100">
              <span className="font-bold text-neutral-500">Items List</span>
              <button
                onClick={clearCart}
                className="text-rose-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map(({ menuItem, quantity }) => (
                <div
                  key={menuItem.id}
                  className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3"
                >
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-neutral-900 truncate">{menuItem.name}</h5>
                    <div className="text-xs font-extrabold text-neutral-700 mt-0.5">
                      ₹{menuItem.price}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateCartQuantity(menuItem.id, -1)}
                      className="text-neutral-600 hover:text-orange-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(menuItem.id, 1)}
                      className="text-neutral-600 hover:text-orange-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(menuItem.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Code Section */}
            <div className="pt-4 border-t border-neutral-200">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. SWIGGY50)"
                    className="w-full bg-neutral-100 text-xs font-bold text-neutral-900 pl-8 pr-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Promo Status */}
              {promoNotice && (
                <div className={`mt-2 p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                  promoNotice.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  {promoNotice.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{promoNotice.msg}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>{appliedPromo.code} applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-rose-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">₹{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-neutral-900">₹{cartDeliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Taxes (5%)</span>
                <span className="font-bold text-neutral-900">₹{cartTax.toFixed(2)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo Discount</span>
                  <span>-₹{cartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-extrabold text-neutral-900">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}

        {/* Footer Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-white">
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
