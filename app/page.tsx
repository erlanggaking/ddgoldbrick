import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { sampleProducts, legoThemes } from '@/lib/data/sample-data';
import Link from 'next/link';
import { ArrowRight, Star, Package, Truck, Shield } from 'lucide-react';

export default function Home() {
  const featuredProducts = sampleProducts.filter(p => p.isFeatured).slice(0, 4);
  const newProducts = sampleProducts.slice(0, 8);
  const topThemes = legoThemes.slice(0, 6);

  return (
    <div>
      <Hero />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-dd-black uppercase tracking-tight">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Our most popular LEGO sets</p>
          </div>
          <Link href="/catalog" className="inline-flex items-center gap-1 text-sm font-bold text-dd-gold hover:text-dd-gold-dark transition-colors uppercase tracking-wider">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shop by Theme Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-dd-black uppercase tracking-tight">Shop by Theme</h2>
              <p className="text-gray-500 text-sm mt-1">Find your favorite LEGO collections</p>
            </div>
            <Link href="/themes" className="inline-flex items-center gap-1 text-sm font-bold text-dd-gold hover:text-dd-gold-dark transition-colors uppercase tracking-wider">
              All Themes <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topThemes.map(theme => (
              <Link
                key={theme.id}
                href={`/catalog?theme=${theme.slug}`}
                className="group bg-white border border-gray-200 p-6 text-center hover:border-dd-gold hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-dd-gold/10 flex items-center justify-center text-2xl group-hover:bg-dd-gold/20 transition-colors">
                  {theme.icon}
                </div>
                <h3 className="font-bold text-sm text-dd-black group-hover:text-dd-gold transition-colors">
                  {theme.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{theme.productCount} sets</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-dd-black uppercase tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-1">Fresh additions to our collection</p>
          </div>
          <Link href="/catalog" className="inline-flex items-center gap-1 text-sm font-bold text-dd-gold hover:text-dd-gold-dark transition-colors uppercase tracking-wider">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-dd-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center uppercase tracking-tight mb-12">Why Choose DD Gold Brick?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-dd-gold/20 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-dd-gold" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-400 text-sm">Free shipping for orders over Rp 2.000.000 across Indonesia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dd-gold/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-dd-gold" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">100% Authentic</h3>
              <p className="text-gray-400 text-sm">All products are genuine LEGO sets with warranty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dd-gold/20 flex items-center justify-center mx-auto mb-4">
                <Star className="text-dd-gold" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Premium Service</h3>
              <p className="text-gray-400 text-sm">24/7 WhatsApp support for your inquiries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-dd-gold py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-6">Get notified about new arrivals and exclusive offers</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-sm border-0 focus:outline-none"
            />
            <button className="bg-dd-black text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}