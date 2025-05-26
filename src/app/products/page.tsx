"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import ProductCarousel from "@/components/products/carousel";
import { useCart } from "@/contexts/cart-context";
import { ShopifyService, Product } from "@/services/shopify";
import { motion } from "framer-motion";
import ProductListing from "@/components/products/listing";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopifyService = ShopifyService.getInstance();
        const fetchedProducts = await shopifyService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();

  if (loading) {
    return (
      <Screen>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <ProductCarousel products={products} onAddToCart={addToCart} />
        <ProductListing
          products={products}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />

        {cartItems.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4  text-black">
                Cart Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xl font-bold text-black">
                      {item.name}
                    </span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          if (item.quantity == 1) {
                            removeFromCart(
                              products.find((p) => p.id === item.id)!
                            );
                          } else {
                            updateQuantity(
                              products.find((p) => p.id === item.id)!,
                              item.quantity - 1
                            );
                          }
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            products.find((p) => p.id === item.id)!,
                            item.quantity + 1
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://checkout.shopify.com/checkout",
                        "_blank"
                      )
                    }
                    className="bg-blue-600 text-black px-6 py-3 rounded-full hover:bg-blue-700 transition-colors w-full"
                  >
                    Checkout (
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}{" "}
                    items)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Analytics />
    </Screen>
  );
}
