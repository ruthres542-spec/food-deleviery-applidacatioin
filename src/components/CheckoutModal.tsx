import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  QrCode, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    deliveryAddress,
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartTax,
    cartDiscount,
    cartTotal,
    placeOrder,
    setIsCartOpen
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('RAZORPAY_SIM');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      try {
        placeOrder(paymentMethod, specialNotes);
      } catch (err: any) {
        alert(err.message || 'Failed to place order');
      } finally {
        setIsProcessing(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              className="p-1 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer mr-1"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <h3 className="font-extrabold text-lg text-neutral-900">Confirm Order & Payment</h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Address Box */}
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-orange-600" /> Drop-Off Delivery Location
            </div>
            <p className="text-sm font-semibold text-neutral-800">{deliveryAddress}</p>
          </div>

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Razorpay / Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('RAZORPAY_SIM')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'RAZORPAY_SIM'
                    ? 'bg-blue-50/80 border-blue-600 text-blue-900 ring-2 ring-blue-500/20'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  {paymentMethod === 'RAZORPAY_SIM' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <div className="font-extrabold text-xs">Razorpay / Card</div>
                  <div className="text-[10px] text-neutral-500">Credit, Debit & NetBanking</div>
                </div>
              </button>

              {/* UPI GPay */}
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI_GPAY')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'UPI_GPAY'
                    ? 'bg-emerald-50/80 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  {paymentMethod === 'UPI_GPAY' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div>
                  <div className="font-extrabold text-xs">Instant UPI / QR</div>
                  <div className="text-[10px] text-neutral-500">GPay, PhonePe, Paytm</div>
                </div>
              </button>

              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'bg-amber-50/80 border-amber-600 text-amber-900 ring-2 ring-amber-500/20'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  {paymentMethod === 'CASH_ON_DELIVERY' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>
                <div>
                  <div className="font-extrabold text-xs">Cash on Delivery</div>
                  <div className="text-[10px] text-neutral-500">Pay cash upon arrival</div>
                </div>
              </button>

            </div>
          </div>

          {/* Delivery Note */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Special Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Leave at front door, ring bell twice, extra napkins"
              className="w-full bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Order Summary Box */}
          <div className="p-4 bg-neutral-900 text-white rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-bold text-white">₹{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Delivery & Platform Fee</span>
              <span className="font-bold text-white">₹{cartDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Taxes</span>
              <span className="font-bold text-white">₹{cartTax.toFixed(2)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Promo Discount</span>
                <span>-₹{cartDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-neutral-800 flex justify-between text-base font-extrabold">
              <span>Grand Total To Pay</span>
              <span className="text-orange-400">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted & Secured Transaction</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black text-sm py-4 rounded-2xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Pay ₹{cartTotal.toFixed(2)} & Place Order</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
