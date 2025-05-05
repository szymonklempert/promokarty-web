import NavBar from "@/components/NavBar";

import { getProducts } from "@/server/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";

import { ArrowRightIcon } from "@chakra-ui/icons";
import FilterSideBar from "@/components/FiltersSideBar";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "./get-query-client";
import Products from "./products";
import { getFilters } from "@/server/filters";
import ProductListing from "./ProductListing";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  await queryClient.prefetchQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar />
      <ProductListing />
    </HydrationBoundary>
  );
}
