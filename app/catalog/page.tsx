'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { legoThemes, sampleProducts } from '@/lib/data/sample-data';
import { X, SlidersHorizontal } from 'lucide-react';

const priceRanges = [
  { id: 'under-500k', label: 'Under Rp 500.000', min: 0, max: 500000 },
  { id: '500k-1m', label: 'Rp 500.000 - Rp 1.000.000', min: 500000, max: 1000000 },
  { id: '1m-3m', label: 'Rp 1.000.000 - Rp 3.000.000', min: 1000000, max: 3000000 },
  { id: 'over-3m', label: 'Over Rp 3.000.000', min: 3000000, max: Infinity },
];

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme') || '';

  // Convert slug (e.g., "star-wars") to theme name (e.g., "Star Wars")
  const initialTheme = themeParam
    ? legoThemes.find(t => t.slug === themeParam)?.name || ''
    : '';

  const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedBoxCondition, setSelectedBoxCondition] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Sync selectedTheme with URL parameter when it changes
  useEffect(() => {
    const themeParam = searchParams.get('theme') || '';
    const themeName = themeParam
      ? legoThemes.find(t => t.slug === themeParam)?.name || ''
      : '';
    setSelectedTheme(themeName);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...sampleProducts];

    if (selectedTheme) {
      result = result.filter(p => p.theme === selectedTheme);
    }

    if (selectedCondition) {
      result = result.filter(p => p.condition === selectedCondition);
    }

    if (selectedBoxCondition) {
      result = result.filter(p => p.boxCondition === selectedBoxCondition);
    }

    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && (range.max === Infinity ? true : p.price < range.max));
      }
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'pieces':
        result.sort((a, b) => b.pieces - a.pieces);
        break;
      case 'year':
        result.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return result;
  }, [selectedTheme, selectedCondition, selectedBoxCondition, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedTheme('');
    setSelectedCondition('');
    setSelectedBoxCondition('');
    setSelectedPriceRange('');
    setSortBy('newest');
  };

  const activeFiltersCount = [selectedTheme, selectedCondition, selectedBoxCondition, selectedPriceRange].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-dd-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Catalog</h1>
          <p className="text-gray-400 mt-2">Browse our complete collection of premium LEGO sets</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Theme Filter */}
              <div>
                <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Theme</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="theme" checked={!selectedTheme} onChange={() => setSelectedTheme('')} className="text-dd-gold focus:ring-dd-gold" />
                    <span className="text-sm text-gray-600">All Themes</span>
                  </label>
                  {legoThemes.map(theme => (
                    <label key={theme.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" checked={selectedTheme === theme.name} onChange={() => setSelectedTheme(theme.name)} className="text-dd-gold focus:ring-dd-gold" />
                      <span className="text-sm text-gray-600">{theme.icon} {theme.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Condition</h3>
                <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dd-gold">
                  <option value="">All Conditions</option>
                  <option value="new">New (MISB)</option>
                  <option value="used">Used (BIB)</option>
                  <option value="rare">Rare / Collector</option>
                </select>
              </div>

              {/* Box Condition Filter */}
              <div>
                <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Box Condition</h3>
                <select value={selectedBoxCondition} onChange={(e) => setSelectedBoxCondition(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dd-gold">
                  <option value="">All Box Conditions</option>
                  <option value="MISB">Mint in Sealed Box</option>
                  <option value="BIB">Box in Box</option>
                  <option value="loose">Loose (No Box)</option>
                  <option value="no-box">No Box</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="radio" name="priceRange" checked={!selectedPriceRange} onChange={() => setSelectedPriceRange('')} className="mt-1 text-dd-gold focus:ring-dd-gold" />
                    <span className="text-sm text-gray-600">All Prices</span>
                  </label>
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-start gap-2 cursor-pointer">
                      <input type="radio" name="priceRange" checked={selectedPriceRange === range.id} onChange={() => setSelectedPriceRange(range.id)} className="mt-1 text-dd-gold focus:ring-dd-gold" />
                      <span className="text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button onClick={clearFilters} className="w-full py-2.5 text-sm font-bold text-dd-gold border-2 border-dd-gold rounded-lg hover:bg-dd-gold hover:text-white transition-colors uppercase tracking-wider">
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-xl overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-dd-black uppercase">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Theme</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme-m" checked={!selectedTheme} onChange={() => setSelectedTheme('')} className="text-dd-gold focus:ring-dd-gold" />
                        <span className="text-sm text-gray-600">All Themes</span>
                      </label>
                      {legoThemes.map(theme => (
                        <label key={theme.id} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="theme-m" checked={selectedTheme === theme.name} onChange={() => setSelectedTheme(theme.name)} className="text-dd-gold focus:ring-dd-gold" />
                          <span className="text-sm text-gray-600">{theme.icon} {theme.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Condition</h3>
                    <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dd-gold">
                      <option value="">All Conditions</option>
                      <option value="new">New (MISB)</option>
                      <option value="used">Used (BIB)</option>
                      <option value="rare">Rare / Collector</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Box Condition</h3>
                    <select value={selectedBoxCondition} onChange={(e) => setSelectedBoxCondition(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dd-gold">
                      <option value="">All Box Conditions</option>
                      <option value="MISB">Mint in Sealed Box</option>
                      <option value="BIB">Box in Box</option>
                      <option value="loose">Loose (No Box)</option>
                      <option value="no-box">No Box</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-dd-black uppercase tracking-wider mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="radio" name="priceRange-m" checked={!selectedPriceRange} onChange={() => setSelectedPriceRange('')} className="mt-1 text-dd-gold focus:ring-dd-gold" />
                        <span className="text-sm text-gray-600">All Prices</span>
                      </label>
                      {priceRanges.map(range => (
                        <label key={range.id} className="flex items-start gap-2 cursor-pointer">
                          <input type="radio" name="priceRange-m" checked={selectedPriceRange === range.id} onChange={() => setSelectedPriceRange(range.id)} className="mt-1 text-dd-gold focus:ring-dd-gold" />
                          <span className="text-sm text-gray-600">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={clearFilters} className="w-full py-2.5 text-sm font-bold text-dd-gold border-2 border-dd-gold rounded-lg hover:bg-dd-gold hover:text-white transition-colors uppercase tracking-wider">
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-bold hover:border-dd-gold transition-colors">
                  <SlidersHorizontal size={16} /> Filters ({activeFiltersCount})
                </button>
                <p className="text-sm text-gray-500"><span className="font-bold text-dd-black">{filteredProducts.length}</span> products found</p>
              </div>
              <div className="flex items-center gap-3">
                {activeFiltersCount > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-dd-gold/10 text-dd-gold rounded-full text-xs font-bold uppercase tracking-wider">
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                  </span>
                )}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dd-gold">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="pieces">Most Pieces</option>
                  <option value="year">Latest Year</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg font-medium">No products found matching your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-dd-gold font-bold hover:underline uppercase tracking-wider">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}