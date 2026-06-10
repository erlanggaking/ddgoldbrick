'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Globe, User, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useTranslation, translations } from '@/lib/i18n/translations';
import { Language } from '@/types';
import { legoThemes } from '@/lib/data/sample-data';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<Language>('id');
  const [themesOpen, setThemesOpen] = useState(false);
  const t = useTranslation(lang);
  const totalItems = useCartStore((state) => state.totalItems);

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <>
          {/* Header Container */}
          <div className="sticky top-0 z-50">
        {/* Announcement Bar */}
        <div className="announcement-bar">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span className="hidden sm:inline">🧱 Free Shipping for orders over Rp 2.000.000 | Premium LEGO Collection</span>
            <span className="sm:hidden">🧱 Free Shipping over Rp 2.000.000</span>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 hover:text-dd-gold transition-colors text-xs"
              >
                <Globe size={12} />
                {lang === 'id' ? 'ID' : 'EN'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white border-b border-gray-200 relative overflow-visible">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <img 
                  src="/images/logo.png" 
                  alt="Gold Brick LEGO Store" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <div>
                  <h1 className="text-lg md:text-xl font-black text-dd-black leading-none tracking-tight">
                    GOLD BRICK
                  </h1>
                  <p className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium">
                    Premium LEGO Store
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-between flex-1 ml-8">
                <nav className="flex items-center gap-8">
                  <Link href="/" className="nav-link">
                    {t.nav.home}
                  </Link>
                  <Link href="/catalog" className="nav-link">
                    {t.nav.catalog}
                  </Link>
                  {/* Themes dropdown container - keeps button and dropdown together */}
                  <div
                    className="relative overflow-visible"
                    onMouseEnter={() => setThemesOpen(true)}
                    onMouseLeave={() => setThemesOpen(false)}
                  >
                    <button className="nav-link flex items-center gap-1">
                      {t.nav.themes}
                      <svg className={`w-3 h-3 transition-transform duration-200 ${themesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Mega Menu - positioned absolutely but breaks out of container */}
                    {themesOpen && (
                      <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 w-max min-w-[600px]">
                        <div className="bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                          <div className="max-w-7xl mx-auto px-6 py-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {legoThemes.slice(0, 12).map((theme) => (
                              <Link
                                key={theme.id}
                                href={`/catalog?theme=${theme.slug}`}
                                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-dd-gold/5 transition-all duration-200 border border-transparent hover:border-dd-gold/20"
                              >
                                <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl group-hover:bg-dd-gold/10 group-hover:scale-110 transition-all duration-200 rounded-xl shadow-sm group-hover:shadow-md">
                                  {theme.icon}
                                </div>
                                <div className="text-center">
                                  <p className="font-bold text-xs text-dd-black group-hover:text-dd-gold transition-colors leading-tight">
                                    {theme.name}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">{theme.productCount} sets</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                           <div className="mt-5 pt-4 border-t border-gray-100 flex justify-center bg-gradient-to-r from-gray-50 via-white to-gray-50">
                               <Link
                                 href="/themes"
                                 className="inline-flex items-center gap-2 text-sm font-bold text-dd-gold hover:text-dd-gold-dark transition-colors uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-dd-gold/5"
                               >
                                 View All Themes <span className="text-lg">→</span>
                               </Link>
                             </div>
                           </div>
                         </div>
                      </div>
                    )}
                  </div>
                </nav>
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-2 md:gap-4">
                {/* Search - Desktop */}
                <div className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder={t.common.search}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 lg:w-64 pl-10 pr-4 py-2 border-2 border-gray-200 text-sm focus:border-dd-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Wishlist */}
                <button className="hidden md:flex p-2 hover:bg-gray-100 transition-colors">
                  <Heart size={22} className="text-dd-black" />
                </button>

                {/* Account */}
                <button className="hidden md:flex p-2 hover:bg-gray-100 transition-colors">
                  <User size={22} className="text-dd-black" />
                </button>

                {/* Cart */}
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 transition-colors">
                  <ShoppingCart size={22} className="text-dd-black" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-dd-gold text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Search */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t.common.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 text-sm focus:border-dd-gold focus:outline-none transition-colors"
              />
            </div>
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wider text-dd-black hover:bg-gray-50 transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wider text-dd-black hover:bg-gray-50 transition-colors"
              >
                {t.nav.catalog}
              </Link>
              <Link
                href="/themes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wider text-dd-black hover:bg-gray-50 transition-colors"
              >
                {t.nav.themes}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
