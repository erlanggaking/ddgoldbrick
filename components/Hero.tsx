'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px] lg:min-h-[450px]">
          {/* Left Hero - Featured Product */}
          <div className="lg:col-span-8 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center space-y-6 max-w-2xl">
                <span className="inline-block bg-dd-gold text-white text-xs font-bold px-4 py-1.5 uppercase tracking-widest">
                  Featured Set
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-dd-black leading-tight tracking-tight">
                  MILLENNIUM FALCON
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-lg mx-auto">
                  UCS Collection • 7,541 Pieces • The ultimate collector series
                </p>
                <Link href="/products/1" className="inline-flex items-center gap-2 btn-primary">
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <div className="bg-white px-4 py-2 shadow-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                <p className="text-xl font-black text-dd-gold">Rp 8.499.000</p>
              </div>
            </div>
          </div>

          {/* Right Side - Two Stacked Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Top Card */}
            <div className="relative flex-1 bg-gradient-to-br from-dd-black to-gray-800 rounded-sm p-6 flex flex-col justify-between group cursor-pointer overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge-rare">EXCLUSIVE</span>
              </div>
              <div>
                <p className="text-dd-gold text-xs font-bold uppercase tracking-widest mb-2">Limited Edition</p>
                <h3 className="text-white text-xl font-black leading-tight">HOGWARTS CASTLE</h3>
                <p className="text-gray-400 text-sm mt-1">6,020 Pieces • Collector's Item</p>
              </div>
              <div className="mt-4">
                <p className="text-dd-gold font-black text-lg">Rp 5.299.000</p>
                <Link href="/products/2" className="inline-flex items-center gap-1 text-xs text-white font-bold uppercase tracking-wider hover:text-dd-gold transition-colors mt-2">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="relative flex-1 bg-gradient-to-br from-dd-red to-red-700 rounded-sm p-6 flex flex-col justify-between group cursor-pointer overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge-sale">SALE</span>
              </div>
              <div>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">New Arrival</p>
                <h3 className="text-white text-xl font-black leading-tight">FERRARI DAYTONA SP3</h3>
                <p className="text-white/70 text-sm mt-1">3,796 Pieces • Technic Series</p>
              </div>
              <div className="mt-4">
                <p className="text-white font-black text-lg">Rp 3.499.000</p>
                <Link href="/products/7" className="inline-flex items-center gap-1 text-xs text-white font-bold uppercase tracking-wider hover:text-dd-yellow transition-colors mt-2">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="border-t border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-dd-gold/10 flex items-center justify-center">
                <span className="text-dd-gold text-lg">🧱</span>
              </div>
              <div>
                <p className="text-xs font-bold text-dd-black uppercase">100% Authentic</p>
                <p className="text-[10px] text-gray-500">Official LEGO Products</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-dd-gold/10 flex items-center justify-center">
                <span className="text-dd-gold text-lg">📦</span>
              </div>
              <div>
                <p className="text-xs font-bold text-dd-black uppercase">Free Shipping</p>
                <p className="text-[10px] text-gray-500">Orders over Rp 2.000.000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-dd-gold/10 flex items-center justify-center">
                <span className="text-dd-gold text-lg">🔒</span>
              </div>
              <div>
                <p className="text-xs font-bold text-dd-black uppercase">Secure Payment</p>
                <p className="text-[10px] text-gray-500">SSL Encrypted</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-dd-gold/10 flex items-center justify-center">
                <span className="text-dd-gold text-lg">⭐</span>
              </div>
              <div>
                <p className="text-xs font-bold text-dd-black uppercase">Premium Service</p>
                <p className="text-[10px] text-gray-500">24/7 Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}