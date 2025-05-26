export interface Product {
  id: string;
  title: string;
  description: string;
  images: { src: string }[];
  price: string;
  available: boolean;
  tags: string[];
  url: string;
}

interface ShopifyResponse {
  data: {
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          description: string;
          images: {
            edges: Array<{
              node: {
                src: string;
              };
            }>;
          };
          priceRange: {
            minVariantPrice: {
              amount: string;
            };
          };
          availableForSale: boolean;
          tags: string[];
          url: string;
        };
      }>;
    };
  };
}

export class ShopifyService {
  private static instance: ShopifyService;
  private shopifyStorefrontUrl = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
  private shopifyStorefrontToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_KEY;

  private constructor() {}

  public static getInstance(): ShopifyService {
    console.log(
      "Shopfiy Service call: %s",
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL
    );
    console.log("Shopify Storefront Token: %s", process.env.shpfy_strft_key);
    if (!ShopifyService.instance) {
      ShopifyService.instance = new ShopifyService();
    }
    return ShopifyService.instance;
  }

  async getProducts(): Promise<Product[]> {
    if (!this.shopifyStorefrontUrl || !this.shopifyStorefrontToken) {
      throw new Error("Shopify environment variables not configured");
    }

    const response = await fetch(
      `${this.shopifyStorefrontUrl}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.shopifyStorefrontToken,
        },
        body: JSON.stringify({
          query: `
          {
            products(first: 12) {
              edges {
                node {
                  id
                  title
                  description
                  images(first: 1) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  availableForSale
                }
              }
            }
          }
        `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products from Shopify");
    }

    const data = (await response.json()) as ShopifyResponse;
    return data.data.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      images: edge.node.images.edges.map((img) => ({ src: img.node.src })),
      price: edge.node.priceRange.minVariantPrice.amount,
      available: edge.node.availableForSale,
      tags: edge.node.tags,
      url: edge.node.url,
    }));
  }
}
