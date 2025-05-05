export interface Offer {
    id: string;
    title: string;
    price: number;
    availability: boolean;
    url: string;
    productId: string;
    shop: { name: string; imageUrl: string };
  }