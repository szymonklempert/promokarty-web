"use client";

import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { Product } from "@/types/products";

import { Button } from "@chakra-ui/react";

export default function ProductPriceButton({ product }: { product: Product }) {
  const router = useRouter();

  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) {
      return "Produkt niedostępny";
    }
    return "Od " + price.toFixed(2) + " PLN";
  };

  return (
    <Button
      variant="solid"
      colorScheme="blue"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {formatPrice(product.lowestPrice)}
      <ArrowRightIcon ml="7px" />
    </Button>
  );
}
