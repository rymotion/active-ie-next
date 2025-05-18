'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/shopify';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [products, isHovered]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
  };

  return (
    <div className="relative w-full h-[600px]">
      <div
        className="absolute inset-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          <img
            src={products[currentIndex].images[0]?.src || '/placeholder.jpg'}
            alt={products[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {products[currentIndex].title}
            </h2>
            <p className="text-lg text-white mb-4">
              {products[currentIndex].description}
            </p>
            <div className="flex items-center mb-8">
              <span className="text-2xl font-bold text-white mr-4">
                ${products[currentIndex].price}
              </span>
              <button
                onClick={() => handleAddToCart(products[currentIndex])}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
