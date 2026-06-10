'use client';

import { legoThemes } from '@/lib/data/sample-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ThemesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-dd-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">LEGO Themes</h1>
          <p className="text-gray-400 mt-2">Explore our wide range of LEGO themes. From Star Wars to Technic, find your perfect theme.</p>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {legoThemes.map((theme) => (
            <Link
              key={theme.id}
              href={`/catalog?theme=${theme.slug}`}
              className="group bg-white border border-gray-200 overflow-hidden hover:border-dd-gold hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square bg-gradient-to-br from-dd-gold/10 to-dd-gold/5 flex items-center justify-center">
                <span className="text-6xl">{theme.icon}</span>
                <div className="absolute top-3 right-3 bg-dd-gold text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {theme.productCount} sets
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base text-dd-black mb-2 group-hover:text-dd-gold transition-colors">{theme.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{theme.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-dd-gold uppercase tracking-wider">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}