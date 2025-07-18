export interface ProductImage {
  id: string;
  src: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  image?: ProductImage;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  images: ProductImage[];
  variants: ProductVariant[];
  price: string;
  available: boolean;
  tags: string[];
  url: string;
  collections: {
    id: string;
    title: string;
    handle: string;
  }[];
  featuredImage?: ProductImage;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: {
    src: string;
    altText?: string;
  };
  products: Product[];
}

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
}

export class ShopifyService {
  private static instance: ShopifyService;
  private shopifyStorefrontUrl = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
  private shopifyStorefrontToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_KEY;

  private constructor() {}

  public static getInstance(): ShopifyService {
    if (!ShopifyService.instance) {
      ShopifyService.instance = new ShopifyService();
    }
    return ShopifyService.instance;
  }

  public static async getAssets(query: string): Promise<string[]> {
    try {
      const response = await ShopifyService.getInstance().shopifyRequest<{
        assets: string[];
      }>(query);

      return response.assets;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async shopifyRequest<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<T> {
    if (!this.shopifyStorefrontUrl || !this.shopifyStorefrontToken) {
      throw new Error("Shopify environment variables not configured");
    }

    const response = await fetch(
      `${this.shopifyStorefrontUrl}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.shopifyStorefrontToken!,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API request failed: ${response.statusText}`);
    }

    const result = (await response.json()) as ShopifyResponse<T>;

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error(result.errors.map((e) => e.message).join("\n"));
    }

    return result.data;
  }

  async getProducts(
    first: number = 20,
    after?: string
  ): Promise<{
    products: Product[];
    pageInfo: { hasNextPage: boolean; endCursor?: string };
  }> {
    const query = `
      query GetProducts($first: Int!, $after: String) {
        products(first: $first, after: $after, sortKey: CREATED_AT, reverse: true) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              availableForSale
              tags
              onlineStoreUrl
              featuredImage {
                id
                url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER, preferredContentType: WEBP})
                altText
                width
                height
              }
              images(first: 5) {
                edges {
                  node {
                    id
                    url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER, preferredContentType: WEBP})
                    altText
                    width
                    height
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price
                    compareAtPrice
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      id
                      url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER, preferredContentType: WEBP})
                      altText
                      width
                      height
                    }
                  }
                }
              }
              collections(first: 10) {
                edges {
                  node {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = { first, after };
    const data = await this.shopifyRequest<{
      products: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor?: string;
        };
        edges: Array<{
          node: any;
        }>;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
          maxVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>(query, variables);

    const products = data.products.edges.map((edge) =>
      this.transformProduct(edge.node)
    );

    return {
      products,
      pageInfo: data.products.pageInfo,
    };
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const query = `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          descriptionHtml
          handle
          availableForSale
          tags
          onlineStoreUrl
          images(first: 10) {
            edges {
              node {
                id
                src: url(transform: {maxWidth: 1600, maxHeight: 1600, preferredContentType: WEBP})
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  id
                  src: url(transform: {maxWidth: 800, maxHeight: 800, preferredContentType: WEBP})
                  altText
                  width
                  height
                }
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.shopifyRequest<{
        productByHandle: any;
      }>(query, { handle });

      if (!data.productByHandle) {
        return null;
      }

      return this.transformProduct(data.productByHandle);
    } catch (error) {
      console.error("Error fetching product by handle:", error);
      return null;
    }
  }

  async getCollectionByHandle(
    handle: string,
    first: number = 20,
    after?: string
  ): Promise<{
    collection: Collection | null;
    pageInfo: { hasNextPage: boolean; endCursor?: string };
  }> {
    const query = `
      query GetCollectionByHandle($handle: String!, $first: Int!, $after: String) {
        collectionByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          image {
            src: url(transform: {maxWidth: 1200, maxHeight: 800, preferredContentType: WEBP})
            altText
          }
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                handle
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      id
                      src: url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER, preferredContentType: WEBP})
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.shopifyRequest<{
        collectionByHandle: any;
      }>(query, { handle, first, after });

      if (!data.collectionByHandle) {
        return { collection: null, pageInfo: { hasNextPage: false } };
      }

      const collection = data.collectionByHandle;
      const products = collection.products.edges.map((edge: any) => {
        const product = edge.node;
        return {
          id: product.id,
          title: product.title,
          handle: product.handle,
          available: product.availableForSale,
          price: product.priceRange.minVariantPrice.amount,
          images: product.images.edges.map((img: any) => ({
            id: img.node.id,
            src: img.node.src,
            altText: img.node.altText,
            width: img.node.width,
            height: img.node.height,
          })),
          variants: [],
          tags: [],
          collections: [],
          description: "",
          descriptionHtml: "",
          url: `/${product.handle}`,
        };
      });

      return {
        collection: {
          id: collection.id,
          title: collection.title,
          handle: collection.handle,
          description: collection.description,
          descriptionHtml: collection.descriptionHtml,
          image: collection.image
            ? {
                src: collection.image.src,
                altText: collection.image.altText || "",
              }
            : undefined,
          products,
        },
        pageInfo: collection.products.pageInfo,
      };
    } catch (error) {
      console.error("Error fetching collection by handle:", error);
      return { collection: null, pageInfo: { hasNextPage: false } };
    }
  }

  private transformProduct(productData: any): Product {
    return {
      id: productData.id,
      title: productData.title,
      description: productData.description,
      descriptionHtml: productData.descriptionHtml,
      handle: productData.handle,
      available: productData.availableForSale,
      tags: productData.tags || [],
      url: productData.onlineStoreUrl || `/${productData.handle}`,
      images:
        productData.images?.edges?.map((edge: any) => ({
          id: edge.node.id,
          src: edge.node.src,
          altText: edge.node.altText || productData.title,
          width: edge.node.width,
          height: edge.node.height,
        })) || [],
      variants:
        productData.variants?.edges?.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          price: edge.node.price,
          available: edge.node.availableForSale,
          image: edge.node.image
            ? {
                id: edge.node.image.id,
                src: edge.node.image.src,
                altText:
                  edge.node.image.altText ||
                  `${productData.title} - ${edge.node.title}`,
                width: edge.node.image.width,
                height: edge.node.image.height,
              }
            : undefined,
          selectedOptions: edge.node.selectedOptions || [],
        })) || [],
      price: productData.priceRange?.minVariantPrice?.amount || "0",
      collections:
        productData.collections?.edges?.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          handle: edge.node.handle,
        })) || [],
      featuredImage: productData.images?.edges?.[0]?.node
        ? {
            id: productData.images.edges[0].node.id,
            src: productData.images.edges[0].node.src,
            altText:
              productData.images.edges[0].node.altText || productData.title,
            width: productData.images.edges[0].node.width,
            height: productData.images.edges[0].node.height,
          }
        : undefined,
    };
  }
}
