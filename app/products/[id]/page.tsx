'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts, whatsappNumber } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/i18n/translations';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingCart, Minus, Plus, Share2, Heart, MessageCircle, ArrowLeft, Package, Truck, Shield } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = sampleProducts.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-dd-black mb-4">Product Not Found</h1>
          <Link href="/catalog" className="text-dd-gold font-bold hover:underline uppercase tracking-wider">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
    });
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in this product:\n\n${product.setName} (Set #${product.setNumber})\n${window.location.href}\n\nCan you help me with more information?`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const conditionLabels: Record<string, string> = {
    new: 'New (MISB)',
    used: 'Used (BIB)',
    rare: 'Rare / Collector',
  };

  const boxConditionLabels: Record<string, string> = {
    MISB: 'Mint in Sealed Box',
    BIB: 'Box in Box',
    loose: 'Loose (No Box)',
    'no-box': 'No Box',
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-dd-gold transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/catalog" className="text-gray-500 hover:text-dd-gold transition-colors">Catalog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-dd-black font-medium truncate">{product.setName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Image Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-square bg-gray-50 border border-gray-200 overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.setName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border-2 overflow-hidden transition-colors ${
                    selectedImage === idx ? 'border-dd-gold' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-dd-gold/10 text-dd-gold text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                {product.theme}
              </span>
              {product.isRare && (
                <span className="badge-rare">RARE</span>
              )}
              {product.isFeatured && (
                <span className="badge-featured">FEATURED</span>
              )}
              {product.stock === 0 && (
                <span className="bg-dd-red/10 text-dd-red text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-dd-black leading-tight mb-2">{product.setName}</h1>
            <p className="text-gray-400 text-sm font-mono mb-4">Set #{product.setNumber}</p>

            {/* Price */}
            <div className="bg-gray-50 p-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-dd-gold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.originalPrice && (
                <span className="inline-block mt-2 px-3 py-1 bg-dd-gold/10 text-dd-gold text-sm font-bold uppercase tracking-wider">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <Package className="mx-auto text-dd-gold mb-1" size={20} />
                <p className="text-xs text-gray-500 uppercase">Pieces</p>
                <p className="font-black text-dd-black">{product.pieces.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <p className="text-2xl mb-1">🧑‍🚀</p>
                <p className="text-xs text-gray-500 uppercase">Minifigs</p>
                <p className="font-black text-dd-black">{product.minifigures}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <p className="text-2xl mb-1">📅</p>
                <p className="text-xs text-gray-500 uppercase">Year</p>
                <p className="font-black text-dd-black">{product.releaseYear}</p>
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-500">Condition</span>
                <span className="text-sm font-bold text-dd-black">{conditionLabels[product.condition]}</span>
              </div>
              {product.boxCondition && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Box Condition</span>
                  <span className="text-sm font-bold text-dd-black">{boxConditionLabels[product.boxCondition]}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-500">Stock</span>
                <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-dd-red'}`}>
                  {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-bold text-dd-black uppercase tracking-wider">Quantity:</label>
              <div className="flex items-center border-2 border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-2 font-bold min-w-[3rem] text-center border-x-2 border-gray-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 bg-dd-gold text-white font-bold uppercase tracking-wider hover:bg-dd-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="p-3.5 border-2 border-gray-200 hover:border-dd-gold transition-colors">
                <Heart size={18} />
              </button>
              <button className="p-3.5 border-2 border-gray-200 hover:border-dd-gold transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            {/* WhatsApp Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 text-white font-bold uppercase tracking-wider hover:bg-green-600 transition-colors mb-6"
            >
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <Truck className="mx-auto text-dd-gold mb-1" size={18} />
                <p className="text-[10px] text-gray-500 uppercase font-bold">Free Shipping</p>
              </div>
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <Shield className="mx-auto text-dd-gold mb-1" size={18} />
                <p className="text-[10px] text-gray-500 uppercase font-bold">Authentic</p>
              </div>
              <div className="text-center p-3 bg-gray-50 border border-gray-200">
                <MessageCircle className="mx-auto text-dd-gold mb-1" size={18} />
                <p className="text-[10px] text-gray-500 uppercase font-bold">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-black text-dd-black uppercase tracking-tight mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-black text-dd-black uppercase tracking-tight mb-4">Specifications</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Theme</span>
                  <span className="text-sm font-bold text-dd-black">{product.theme}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Sub-Theme</span>
                  <span className="text-sm font-bold text-dd-black">{product.subTheme}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Set Number</span>
                  <span className="text-sm font-bold text-dd-black">{product.setNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Pieces</span>
                  <span className="text-sm font-bold text-dd-black">{product.pieces.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Dimensions</span>
                  <span className="text-sm font-bold text-dd-black">{product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-500">Weight</span>
                  <span className="text-sm font-bold text-dd-black">{product.weight}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}