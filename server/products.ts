"use server";

import { ProductResponse } from "@/types/products";
import { ProductWithOffers } from "@/types/products";

export const getProducts = async (params?: {
    page?: number;
    size?: number;
    generations?: string[];
    expansions?: string[];
    productTypes?: string[];
}): Promise<ProductResponse> => {

    const queryParams = new URLSearchParams(); //TODO

    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.size) queryParams.set('size', params.size.toString())

    params?.expansions?.forEach(expansion => queryParams.append('expansions', expansion))
    params?.generations?.forEach(generation => queryParams.append('generations', generation))
    params?.productTypes?.forEach(productType => queryParams.append('product_types', productType))

    const res = await fetch(`http://127.0.0.1:8000/products?${queryParams.toString()}`);

    const response: ProductResponse = await res.json();
    return response
}


export const getProduct = async (productId: string): Promise<ProductWithOffers> => {
  const res = await fetch(
    `http://127.0.0.1:8000/products/${productId}`
  );
  const response: ProductWithOffers = await res.json();
  return response;
};
