// Base types and interfaces
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
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
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
  collections: Array<{
    id: string;
    title: string;
    handle: string;
  }>;
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
  pageInfo?: {
    hasNextPage: boolean;
    endCursor?: string | null;
  };
}

// GraphQL response types
interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
}

interface ShopifyResponse<T> {
  data: T;
  errors?: GraphQLError[];
}

interface ProductPrice {
  amount: string;
  currencyCode: string;
}

interface ProductPriceRange {
  minVariantPrice: ProductPrice;
  maxVariantPrice: ProductPrice;
}

interface ProductImageNode {
  id: string;
  src?: string;
  url?: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface ProductImageEdge {
  node: ProductImageNode;
}

interface ProductImagesConnection {
  edges: ProductImageEdge[];
}

interface ProductVariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string | ProductPrice;
  compareAtPrice?: string | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: ProductImageNode | null;
}

interface ProductVariantEdge {
  node: ProductVariantNode;
}

interface ProductVariantsConnection {
  edges: ProductVariantEdge[];
}

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

interface CollectionEdge {
  node: CollectionNode;
}

interface CollectionsConnection {
  edges: CollectionEdge[];
}

interface ProductNode {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  availableForSale: boolean;
  tags: string[];
  onlineStoreUrl?: string | null;
  featuredImage?: ProductImageNode | null;
  images: ProductImagesConnection;
  priceRange: ProductPriceRange;
  variants: ProductVariantsConnection;
  collections: CollectionsConnection;
}

interface ProductEdge {
  node: ProductNode;
}

interface ProductsConnection {
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | null;
  };
  edges: ProductEdge[];
}

interface CollectionProductsConnection {
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | null;
  };
  edges: Array<{
    node: {
      id: string;
      title: string;
      handle: string;
      availableForSale: boolean;
      priceRange: ProductPriceRange;
      images: ProductImagesConnection;
    };
  }>;
}

interface CollectionResponse {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: {
    src: string;
    altText?: string | null;
  } | null;
  products: CollectionProductsConnection;
}

export class ShopifyService {
  private static instance: ShopifyService;
  private shopifyStorefrontUrl: string;
  private shopifyStorefrontToken: string;

  private constructor() {
    const url = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!url || !token) {
      throw new Error('Missing Shopify environment variables. Please check your .env file.');
    }

    this.shopifyStorefrontUrl = url;
    this.shopifyStorefrontToken = token;
  }

  public static getInstance(): ShopifyService {
    if (!ShopifyService.instance) {
      ShopifyService.instance = new ShopifyService();
    }
    return ShopifyService.instance;
  }

  /**
   * Makes a request to the Shopify Storefront API
   * @param query The GraphQL query string
   * @param variables Variables for the GraphQL query
   * @returns Promise with the typed response data
   */
  private async shopifyRequest<T>(
    query: string,
    variables: Record<string, unknown> = {}
  ): Promise<T> {
    try {
      const response = await fetch(this.shopifyStorefrontUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.shopifyStorefrontToken,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as ShopifyResponse<T>;

      if (result.errors?.length) {
        const errorMessages = result.errors.map(e => e.message).join('\n');
        throw new Error(`GraphQL Error: ${errorMessages}`);
      }

      return result.data as T;
    } catch (error) {
      console.error('Shopify API request failed:', error);
      throw error;
    }
  }

  /**
   * Helper function to get price as string from either string or ProductPrice
   * @param price The price as string or ProductPrice object
   * @returns The price as a string
   */
  private getPrice(price: string | ProductPrice): string {
    if (typeof price === 'string') return price;
    return price?.amount || '0';
  }

  /**
   * Transforms a Shopify ProductNode into our application's Product type
   * @param productNode The raw product node from Shopify
   * @returns A normalized Product object
   */
  private transformProduct(productNode: ProductNode): Product {
    // Handle featured image
    const featuredImage = productNode.featuredImage || 
      (productNode.images?.edges?.[0]?.node || null);

    // Process images
    const images = (productNode.images?.edges || []).map(edge => ({
      id: edge.node.id,
      src: edge.node.src || edge.node.url || '',
      altText: edge.node.altText || productNode.title,
      width: edge.node.width || 0,
      height: edge.node.height || 0
    }));

    // Process variants
    const variants = (productNode.variants?.edges || []).map(edge => {
      const variant = edge.node;
      const variantImage = variant.image || featuredImage;
      
      return {
        id: variant.id,
        title: variant.title,
        price: this.getPrice(variant.price),
        available: variant.availableForSale,
        image: variantImage ? {
          id: variantImage.id,
          src: variantImage.src || variantImage.url || '',
          altText: variantImage.altText || productNode.title,
          width: variantImage.width || 0,
          height: variantImage.height || 0
        } : undefined,
        selectedOptions: variant.selectedOptions || []
      };
    });

    // Process collections
    const collections = (productNode.collections?.edges || []).map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle
    }));

    // Get the first available price or default to 0
    const price = variants.length > 0 ? variants[0].price : '0';

    // Create the final product object
    return {
      id: productNode.id,
      title: productNode.title,
      description: productNode.description,
      descriptionHtml: productNode.descriptionHtml,
      handle: productNode.handle,
      images,
      variants,
      price,
      available: productNode.availableForSale,
      tags: productNode.tags || [],
      url: productNode.onlineStoreUrl || `https://${this.shopifyStorefrontUrl.split('/')[2]}/products/${productNode.handle}`,
      collections,
      featuredImage: featuredImage ? {
        id: featuredImage.id,
        src: featuredImage.src || featuredImage.url || '',
        altText: featuredImage.altText || productNode.title,
        width: featuredImage.width || 0,
        height: featuredImage.height || 0
      } : undefined
    };
  }

  /**
   * Fetches a list of products from Shopify
   * @param first Number of products to fetch (default: 20)
   * @param after Cursor for pagination (optional)
   * @returns Object containing products array and pagination info
   */
  async getProducts(
    first: number = 20,
    after?: string | null
  ): Promise<{
    products: Product[];
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
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
              featuredImage {
                id
                src
                altText
                width
                height
              }
              images(first: 5) {
                edges {
                  node {
                    id
                    src
                    altText
                    width
                    height
                  }
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
                      src
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
              tags
              onlineStoreUrl
            }
          }
        }
      }
    `;

    try {
      const data = await this.shopifyRequest<{ products: ProductsConnection }>(
        query,
        { first, after }
      );

      const products = data.products.edges.map(edge => 
        this.transformProduct(edge.node)
      );

      return {
        products,
        pageInfo: data.products.pageInfo
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], pageInfo: { hasNextPage: false } };
    }
  }

  /**
   * Fetches a single product by its handle
   * @param handle The product handle (slug)
   * @returns The product or null if not found
   */
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
          featuredImage {
            id
            src
            altText
            width
            height
          }
          images(first: 5) {
            edges {
              node {
                id
                src
                altText
                width
                height
              }
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
                  src
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
          tags
          onlineStoreUrl
        }
      }
    `;

    try {
      const data = await this.shopifyRequest<{ productByHandle: ProductNode | null }>(
        query,
        { handle }
      );

      return data.productByHandle ? this.transformProduct(data.productByHandle) : null;
    } catch (error) {
      console.error('Error fetching product by handle:', error);
      return null;
    }
  }

  /**
   * Fetches a collection by its handle
   * @param handle The collection handle (slug)
   * @param first Number of products to fetch (default: 20)
   * @param after Cursor for pagination (optional)
   * @returns The collection or null if not found
   */
  async getCollectionByHandle(
    handle: string,
    first: number = 20,
    after?: string | null
  ): Promise<Collection | null> {
    const query = `
      query GetCollectionByHandle($handle: String!, $first: Int, $after: String) {
        collectionByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          image {
            src
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
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      id
                      src
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
      const data = await this.shopifyRequest<{ collectionByHandle: CollectionResponse | null }>(
        query,
        { handle, first, after }
      );

      if (!data.collectionByHandle) {
        return null;
      }

      const collection = data.collectionByHandle;
      
      // Transform the products in the collection
      const products = collection.products.edges.map(edge => {
        const productNode = edge.node;
        const image = productNode.images?.edges?.[0]?.node;
        
        return {
          id: productNode.id,
          title: productNode.title,
          handle: productNode.handle,
          available: productNode.availableForSale,
          price: productNode.priceRange.minVariantPrice.amount,
          images: image ? [{
            id: image.id,
            src: image.src || '',
            altText: image.altText || productNode.title,
            width: image.width || 0,
            height: image.height || 0
          }] : [],
          // Add minimal required fields
          description: '',
          descriptionHtml: '',
          variants: [],
          tags: [],
          url: `https://${this.shopifyStorefrontUrl.split('/')[2]}/products/${productNode.handle}`,
          collections: []
        };
      });

      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        description: collection.description,
        descriptionHtml: collection.descriptionHtml,
        image: collection.image ? {
          src: collection.image.src,
          altText: collection.image.altText || ''
        } : undefined,
        products,
        pageInfo: collection.products.pageInfo
      };
    } catch (error) {
      console.error('Error fetching collection by handle:', error);
      return null;
    }
  }
}

// Export a singleton instance
export const shopifyService = ShopifyService.getInstance();
