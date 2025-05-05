import { Offer } from "./offers";


export interface Product {
    id: string;
    title: string;
    imageUrl: string;
    urlSlug: string;
    lowestPrice: number;
    expansionId: string;
    generationId: string;
    productTypeId: string;
  }

export interface ProductResponse {
  items: Product[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface PriceHistoryEntry {
  price: number;
  date: Date;
}

export interface ProductWithOffers extends Product {
  offers: Offer[];
  priceHistory: PriceHistoryEntry[];
}