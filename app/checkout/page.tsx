'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/i18n/translations';
import { whatsappNumber } from '@/lib/data/sample-data';
import { MessageCircle, Package, CreditCard, MapPin, User, Truck, Shield, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [shippingMethod, setShippingMethod] = useState('regular');
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const shippingCosts: Record<string, number> = {
    regular: 15000,
    express: 35000,
    instant: 50000,
  };

  const finalTotal = totalPrice + (shippingCosts[shippingMethod] || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderItems = items.map(item =>
      `${item.product.setName} (${item.product.setNumber}) - ${item.quantity}x @ ${formatPrice(item.product.price)}`
    ).join('\n');

    const message = `*New Order - DD Gold Brick*\n\n` +
      `*Customer Info:*\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `*Shipping Address:*\n` +
      `${formData.address}\n` +
      `${formData.city}, ${formData.postalCode}\n\n` +
      `*Items:*\n${orderItems}\n\n` +
      `*Subtotal:* ${formatPrice(totalPrice)}\n` +
      `*Shipping:* ${formatPrice(shippingCosts[shippingMethod])}\n` +
      `*Total:* ${formatPrice(finalTotal)}\n\n` +
      `*Shipping Method:* ${shippingMethod}\n` +
      `*Payment Method:* ${paymentMethod}\n\n` +
      `*Notes:* ${formData.notes || 'None'}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    router.push('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="bg-dd-black py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Checkout</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <Package className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-black text-dd-black mb-2">No Items to Checkout</h2>
            <p className="text-gray-500 mb-8">Add some products to your cart first.</p>
            <Link
              href="/catalog"
              className="inline-block px-8 py-3.5 bg-dd-gold text-white font-bold uppercase tracking-wider hover:bg-dd-gold-dark transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-dd-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Checkout</h1>
          <p className="text-gray-400 mt-2">Complete your order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white border-2 border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-dd-gold" size={20} />
                  <h2 className="text-lg font-black text-dd-black uppercase tracking-tight">Customer Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border-2 border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-dd-gold" size={20} />
                  <h2 className="text-lg font-black text-dd-black uppercase tracking-tight">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">Street Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors resize-none"
                      placeholder="123 Main Street, Building A, Unit 5B"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors"
                        placeholder="Jakarta"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-1.5">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white border-2 border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="text-dd-gold" size={20} />
                  <h2 className="text-lg font-black text-dd-black uppercase tracking-tight">Shipping Method</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'regular', name: 'Regular Shipping', desc: '3-5 business days', price: 15000 },
                    { id: 'express', name: 'Express Shipping', desc: '1-2 business days', price: 35000 },
                    { id: 'instant', name: 'Instant Delivery', desc: 'Same day (order before 12PM)', price: 50000 },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-all ${
                        shippingMethod === method.id
                          ? 'border-dd-gold bg-dd-gold/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4 accent-dd-gold"
                        />
                        <div>
                          <span className="font-bold text-dd-black block">{method.name}</span>
                          <span className="text-xs text-gray-500">{method.desc}</span>
                        </div>
                      </div>
                      <span className="font-black text-dd-gold">{formatPrice(method.price)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border-2 border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="text-dd-gold" size={20} />
                  <h2 className="text-lg font-black text-dd-black uppercase tracking-tight">Payment Method</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'transfer', name: 'Bank Transfer (BCA/Mandiri/BNI)', desc: 'Direct bank transfer' },
                    { id: 'va', name: 'Virtual Account', desc: 'Auto-verified payment' },
                    { id: 'ewallet', name: 'E-Wallet (GoPay/OVO/Dana)', desc: 'Instant payment' },
                    { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Pay when received' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-dd-gold bg-dd-gold/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex-1">
                        <span className="font-bold text-dd-black block">{method.name}</span>
                        <span className="text-xs text-gray-500">{method.desc}</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-dd-gold"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white border-2 border-gray-200 p-6">
                <h2 className="text-lg font-black text-dd-black uppercase tracking-tight mb-4">Order Notes (Optional)</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold focus:ring-1 focus:ring-dd-gold outline-none transition-colors resize-none"
                  placeholder="Any special instructions for your order?"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-gray-200 p-6 sticky top-4">
                <h2 className="text-lg font-black text-dd-black uppercase tracking-tight mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 bg-gray-50 border border-gray-200 shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.setName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-dd-black truncate">{item.product.setName}</p>
                        <p className="text-xs text-gray-400 font-mono">Set #{item.product.setNumber}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.quantity} x {formatPrice(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm font-bold">{formatPrice(shippingCosts[shippingMethod])}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-black text-dd-black uppercase tracking-tight">Total</span>
                      <span className="font-black text-xl text-dd-gold">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 bg-dd-gold text-white font-bold uppercase tracking-wider hover:bg-dd-gold-dark transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Place Order via WhatsApp
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Lock size={12} /> Secure</span>
                  <span className="flex items-center gap-1"><Shield size={12} /> Authentic</span>
                </div>

                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 mt-4 text-sm text-dd-gold font-bold hover:underline uppercase tracking-wider"
                >
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}