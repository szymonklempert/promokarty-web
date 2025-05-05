"use server";

import { Offer } from "@/types/offers";


export const getOffers = async (productId: string): Promise<Offer[]> => {
  const queryParams = new URLSearchParams();
  if (productId) queryParams.set("product_id", productId);
  const res = await fetch(
    `http://127.0.0.1:8000/offers?${queryParams.toString()}`
  );
  const response: Offer[] = await res.json();

  return response;
};
