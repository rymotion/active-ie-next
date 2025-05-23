"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import ProductCarousel from "@/components/products/carousel";
import { useCart } from "@/contexts/cart-context";
import { ShopifyService, Product } from "@/services/shopify";

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

  const { addToCart } = useCart();

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
      </div>

      <Analytics />
    </Screen>
  );
}
