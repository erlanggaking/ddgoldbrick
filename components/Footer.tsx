import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { whatsappNumber } from '@/lib/data/sample-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dd-black">
      {/* Newsletter */}
      <div className="bg-dd-gold/10 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-dd-black uppercase tracking-tight">Stay Updated</h3>
              <p className="text-sm text-gray-500 mt-1">Get notified about new sets and exclusive deals</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 border-2 border-gray-200 focus:border-dd-gold outline-none flex-1 md:w-64"
              />
              <button className="px-6 py-2.5 bg-dd-gold text-white font-bold uppercase tracking-wider hover:bg-dd-gold-dark transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-dd-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">DD</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">DD Gold Brick</h3>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">Premium LEGO Collector</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted Indonesian destination for premium LEGO sets, rare collectibles, and everything brick-built.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-dd-gold uppercase tracking-tight mb-4">Catalog</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/catalog" className="hover:text-dd-gold transition-colors">All Products</Link></li>
              <li><Link href="/themes" className="hover:text-dd-gold transition-colors">Browse by Theme</Link></li>
              <li><Link href="/catalog?filter=featured" className="hover:text-dd-gold transition-colors">Featured Sets</Link></li>
              <li><Link href="/catalog?filter=rare" className="hover:text-dd-gold transition-colors">Rare Collectibles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-dd-gold uppercase tracking-tight mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-dd-gold transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-dd-gold transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-dd-gold transition-colors">Returns Policy</Link></li>
              <li><Link href="/contact" className="hover:text-dd-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-dd-gold uppercase tracking-tight mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-dd-gold shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-dd-gold shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-dd-gold shrink-0" />
                <span>info@ddgoldbrick.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-dd-gold transition-colors">
                <Facebook size={16} className="text-white" />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-dd-gold transition-colors">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-dd-gold transition-colors">
                <Twitter size={16} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} DD Gold Brick. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-dd-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-dd-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}