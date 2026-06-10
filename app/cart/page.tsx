'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/i18n/translations';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="bg-dd-black py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Shopping Cart</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-black text-dd-black mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
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
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Shopping Cart</h1>
          <p className="text-gray-400 mt-2">{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border-2 border-gray-200 p-4 hover:border-dd-gold/50 transition-colors">
                <div className="flex gap-4">
                  <Link href={`/products/${item.product.id}`} className="shrink-0">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-200 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.setName}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-bold text-dd-black hover:text-dd-gold transition-colors"
                        >
                          {item.product.setName}
                        </Link>
                        <p className="text-sm text-gray-400 font-mono">Set #{item.product.setNumber}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-dd-gold/10 text-dd-gold font-bold uppercase">
                            {item.product.condition === 'new' ? 'New (MISB)' : item.product.condition === 'used' ? 'Used (BIB)' : 'Rare'}
                          </span>
                          {item.product.boxCondition && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 font-bold uppercase">
                              {item.product.boxCondition}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-dd-red p-1 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border-2 border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1.5 text-sm font-bold min-w-[2.5rem] text-center border-x-2 border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          {formatPrice(item.product.price)} each
                        </p>
                        <p className="font-black text-dd-gold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Link
                href="/catalog"
                className="flex items-center gap-2 text-dd-gold font-bold hover:underline uppercase tracking-wider text-sm"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-dd-red font-bold uppercase tracking-wider transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-black text-dd-black uppercase tracking-tight mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Subtotal ({totalItems} items)</span>
                  <span className="text-sm font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-bold text-green-600">Calculated at checkout</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-black text-dd-black uppercase tracking-tight">Total</span>
                    <span className="font-black text-xl text-dd-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-3.5 bg-dd-gold text-white font-bold uppercase tracking-wider hover:bg-dd-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}