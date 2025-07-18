"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { ShopifyService, Product } from "@/services/shopify";
import ProductListing from "@/components/products/listing";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    endCursor?: string;
  }>({ hasNextPage: false });

  const fetchProducts = async (loadMore = false) => {
    try {
      if (!loadMore) setLoading(true);

      const shopifyService = ShopifyService.getInstance();
      const { products: fetchedProducts, pageInfo: fetchedPageInfo } =
        await shopifyService.getProducts(
          loadMore ? 12 : 24,
          loadMore ? pageInfo.endCursor : undefined
        );

      setProducts((prev) =>
        loadMore ? [...prev, ...fetchedProducts] : fetchedProducts
      );
      setPageInfo(fetchedPageInfo);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(false);
  }, []);

  // const { addToCart } = useCart();

  if (loading && products.length === 0) {
    return (
      <Screen>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12 text-center">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help support Active Inland Empire and our mission to help build
            community through sport, health, and wellness.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p>{error}</p>
            <button
              onClick={() => fetchProducts(false)}
              className="mt-2 text-red-700 underline hover:text-red-900"
            >
              Try again
            </button>
          </div>
        )}

        {products.length === 0 && !loading ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-gray-600 mb-6">
              Check back later for new arrivals!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <>
            <ProductListing
              products={products}
              // onAddToCart={addToCart}
              // onRemoveFromCart={() => {}}
              // updateQuantity={() => {}}
            />

            {pageInfo.hasNextPage && (
              <div className="text-center mt-12">
                <button
                  onClick={() => fetchProducts(true)}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Analytics />
    </Screen>
  );
}

//           <div className="mt-8">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-4  text-black">
//               Cart Summary
//             </h2>
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center"
//                 >
//                   <span className="text-xl font-bold text-black">
//                     {item.name}
//                   </span>
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => {
//                         if (item.quantity == 1) {
//                           removeFromCart(
//                             products.find((p) => p.id === item.id)!
//                           );
//                         } else {
//                   <div
//                     key={item.id}
//                     className="flex justify-between items-center"
//                   >
//                     <span className="text-xl font-bold text-black">
//                       {item.name}
//                     </span>
//                     <div className="flex space-x-4">
//                       <button
//                         onClick={() => {
//                           if (item.quantity == 1) {
//                             removeFromCart(
//                               products.find((p) => p.id === item.id)!
//                             );
//                           } else {
//                             updateQuantity(
//                               products.find((p) => p.id === item.id)!,
//                               item.quantity - 1
//                             );
//                           }
//                         }}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         -
//                       </button>
//                       <span className="text-xl font-bold text-black">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             products.find((p) => p.id === item.id)!,
//                             item.quantity + 1
//                           )
//                         }
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="border-t mt-4 pt-4">
//                   <button
//                     onClick={() =>
//                       window.open(
//                         "https://checkout.shopify.com/checkout",
//                         "_blank"
//                       )
//                     }
//                     className="bg-blue-600 text-black px-6 py-3 rounded-full hover:bg-blue-700 transition-colors w-full"
//                   >
//                     Checkout (
//                     {cartItems.reduce(
//                       (total, item) => total + item.quantity,
//                       0
//                     )}{" "}
//                     items)
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <Analytics />
//     </Screen>
//   );
// }
