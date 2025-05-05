"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/server/products";

import {
  Image,
  VStack,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ProductPriceButton from "@/components/ProductPriceButton";

interface ProductsProps {
  selectedGenerations: string[];
  selectedExpansions: string[];
  selectedProductTypes: string[];
  page: number;
  size: number;
  onPageChange: (newPage: number) => void;
  onTotalPagesChange: (totalPages: number) => void;
}

const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) {
    return "Produkt niedostępny";
  }
  return "Od " + price.toFixed(2) + " PLN";
};

export default function Products({
  selectedGenerations,
  selectedExpansions,
  selectedProductTypes,
  page,
  size,
  onPageChange,
  onTotalPagesChange,
}: ProductsProps) {
  const { data, isSuccess } = useQuery({
    queryKey: [
      "products",
      page,
      size,
      selectedGenerations,
      selectedExpansions,
      selectedProductTypes,
    ],
    queryFn: () =>
      getProducts({
        page,
        size,
        generations: selectedGenerations,
        expansions: selectedExpansions,
        productTypes: selectedProductTypes,
      }),
  });
  if (isSuccess && data) onTotalPagesChange(data.pages);
  //   onTotalPagesChange(data.pages)
  console.log(data?.items);

  return (
    <VStack gap="5" color="gray.950" height="100%">
      {data?.items.map((product: Product) => (
        <Card
          key={product.id}
          direction={{ base: "column", sm: "row" }}
          borderRadius="md"
          boxShadow="md"
          backgroundColor="white"
          _hover={{
            boxShadow: "lg", // Hover effect
          }}
          width="100%"
        >
          <Image
            maxW={{ base: "100%", sm: "200px" }}
            src={product.imageUrl}
            alt={product.imageUrl}
          />

          <Stack textAlign="left">
            <CardBody>
              <Heading size="sm">Pokemon TCG</Heading>
              <Heading size="md">{product.title}</Heading>

              <Flex justify="space-between" width="100%">
                {/* <Text textStyle="sm">Cena per booster: 18.99</Text> */}
                {/* <Text textStyle="sm">Data wydania: III kwartal 2023</Text> */}
              </Flex>
            </CardBody>

            <CardFooter>
                <ProductPriceButton product={product}/>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </VStack>
  );
}
