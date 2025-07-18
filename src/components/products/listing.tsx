"use client";

import { Product } from "@/services/shopify";
import { motion } from "framer-motion";

interface ProductListingProps {
  products: Product[];
  // onAddToCart: (product: Product) => void;
  // onRemoveFromCart: (product: Product) => void;
  // updateQuantity: (productId: string, quantity: number) => void;
}

export default function ProductListing({
  products,
}: // onAddToCart,
// onRemoveFromCart,
// updateQuantity,
ProductListingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-black">
              {product.title}
            </h3>
            {/* <p className="text-gray-600 mb-4">{product.description}</p> */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-600">
                ${Number(product.price).toFixed(2)}
              </span>

              <button
                // onClick={() => onAddToCart(product)}
                onClick={() => window.open(product.url, "new tab")}
                //   onClick={() => window.open(product.url, "_blank")}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                See in Shop
              </button>
              {/* <button
                onClick={() => onAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button> */}
            </div>
          </div>
          <div className="relative h-64">
            <img
              src={product.images[0]?.src || "/placeholder.jpg"}
              alt={product.title}
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
