"use client";

import { useEffect, useRef } from "react";

export default function BuyButton({ componentId, productId }) {
  const buyButtonRef = useRef(null);
  //   const componentId = "product-component-1754935153925";

  useEffect(() => {
    // Check if script is already loaded
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const loadScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = initializeShopifyBuy;
    };

    const initializeShopifyBuy = () => {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
        console.error("Shopify Buy Button failed to load");
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain: "efewxt-sp.myshopify.com",
        storefrontAccessToken: "27b51d5fcbb2f207a296841d6d3214b0",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(componentId),
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
                button: {
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#e60000",
                  },
                  "background-color": "#ff0000",
                  ":focus": {
                    "background-color": "#e60000",
                  },
                  "border-radius": "29px",
                  "padding-left": "54px",
                  "padding-right": "54px",
                },
              },
              text: {
                button: "Add to cart",
              },
              googleFonts: ["Quantico"],
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#e60000",
                  },
                  "background-color": "#ff0000",
                  ":focus": {
                    "background-color": "#e60000",
                  },
                  "border-radius": "29px",
                  "padding-left": "54px",
                  "padding-right": "54px",
                },
              },
              googleFonts: ["Quantico"],
              text: {
                button: "Add to cart",
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#e60000",
                  },
                  "background-color": "#ff0000",
                  ":focus": {
                    "background-color": "#e60000",
                  },
                  "border-radius": "29px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
              googleFonts: ["Quantico"],
            },
            toggle: {
              styles: {
                toggle: {
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  "background-color": "#ff0000",
                  ":hover": {
                    "background-color": "#e60000",
                  },
                  ":focus": {
                    "background-color": "#e60000",
                  },
                },
              },
              googleFonts: ["Quantico"],
            },
          },
        });
      });
    };

    // Initialize the buy button
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initializeShopifyBuy();
    } else if (!document.querySelector(`script[src="${scriptURL}"]`)) {
      loadScript();
    }

    // Cleanup function
    return () => {
      // Cleanup if needed when component unmounts
    };
  }, []);

  return <div id={componentId} ref={buyButtonRef} />;
}
