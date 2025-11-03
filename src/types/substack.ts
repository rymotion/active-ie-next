export interface SubstackFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

export interface SubstackEnclosure {
  link: string;
  type: string;
}

export interface SubstackItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: SubstackEnclosure;
  categories: string[];
}

export interface SubstackResponse {
  status: string;
  feed: SubstackFeed;
  items: SubstackItem[];
}
