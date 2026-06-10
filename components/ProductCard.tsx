'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const conditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return 'New';
      case 'used': return 'Used';
      case 'rare': return 'Rare';
      default: return condition;
    }
  };

  return (
    <div className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:border-dd-gold/30 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.setName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isRare && (
              <span className="badge-rare">RARE</span>
            )}
            {product.isFeatured && (
              <span className="badge-featured">FEATURED</span>
            )}
            <span className="bg-white/95 text-gray-700 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {conditionLabel(product.condition)}
            </span>
          </div>
          {/* Stock indicator */}
          {product.stock <= 3 && product.stock > 0 && (
            <div className="absolute bottom-3 left-3 bg-dd-red text-white text-[10px] font-bold px-3 py-1">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 text-sm font-bold px-4 py-2 uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-dd-gold bg-dd-gold/10 px-2.5 py-0.5 uppercase tracking-wider">
            {product.theme}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">#{product.setNumber}</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 hover:text-dd-gold transition-colors mb-2">
            {product.setName}
          </h3>
        </Link>

        <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-3">
          <span>{product.pieces.toLocaleString()} pcs</span>
          {product.minifigures > 0 && (
            <>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{product.minifigures} minifig</span>
            </>
          )}
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{product.releaseYear}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-dd-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (product.stock > 0) addItem(product);
            }}
            disabled={product.stock === 0}
            className="p-2.5 bg-dd-gold text-white hover:bg-dd-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}