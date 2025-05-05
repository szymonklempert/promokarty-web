"use client";

import { useState } from "react";
import FilterSideBar from "@/components/FiltersSideBar";
import Products from "./products";
import { Pagination } from "@/components/Pagination";
import { Grid, Flex } from "@chakra-ui/react";

const ProductListing = () => {
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <Grid width="100%" templateColumns="250px 750px" gap={4}>
      <FilterSideBar
        selectedGenerations={selectedGenerations}
        selectedExpansions={selectedExpansions}
        selectedProductTypes={selectedProductTypes}
        setSelectedGenerations={setSelectedGenerations}
        setSelectedExpansions={setSelectedExpansions}
        setSelectedProductTypes={setSelectedProductTypes}
        setPage={setPage}
      />
      <Flex direction="column" gap={4}>
        <Products
          selectedGenerations={selectedGenerations}
          selectedExpansions={selectedExpansions}
          selectedProductTypes={selectedProductTypes}
          page={page}
          size={size}
          onPageChange={setPage}
          onTotalPagesChange={setTotalPages}
        />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </Flex>
    </Grid>
  );
};

export default ProductListing;
