"use client";

import {
  Box,
  Text,
  VStack,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { getFilters } from "@/server/filters";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Expansion } from "@/types/expansions";
import { Generation } from "@/types/generations";
import { ProductType } from "@/types/product-types";

interface FilterSideBarProps {
    selectedGenerations: string[];
    selectedExpansions: string[];
    selectedProductTypes: string[];
    setSelectedGenerations: (ids: string[]) => void;
    setSelectedExpansions: (ids: string[]) => void;
    setSelectedProductTypes: (ids: string[]) => void;
    setPage: (page: number) => void;
  }


const FilterSideBar = ({
    selectedGenerations,
    selectedExpansions,
    selectedProductTypes,
    setSelectedGenerations,
    setSelectedExpansions,
    setSelectedProductTypes,
    setPage,
}: FilterSideBarProps) => {
  const data = useQuery({ queryKey: ["filters"], queryFn: getFilters });
  if (data.isLoading) return <div>Loading...</div>;

  const handleGenerationChange = (selectedGenerationIds: string[]) => {
    setSelectedGenerations(selectedGenerationIds);
    setPage(1);
  };

  const handleProductTypeChange = (selectedIds: string[]) => {
    setSelectedProductTypes(selectedIds);
    setPage(1);
  };

  const handleExpansionChange = (selectedIds: string[]) => {
    setSelectedExpansions(selectedIds);
    setPage(1);
  };

  return (
    <Box
      p={4}
      border="1px solid #ddd"
      borderRadius="8px"
      bg="gray.50"
      color="gray.900"
    >
      <VStack align="flex-start" gap={4}>
        <Text fontSize="lg" fontWeight="bold">
          Select Filters
        </Text>

        <CheckboxGroup
          value={selectedGenerations}
          onChange={handleGenerationChange}
        >
          <Stack spacing={4} direction="column">
            {data.data.generations.map((generation: Generation) => (
              <Box key={generation.id}>
                <Checkbox value={generation.id}>{generation.name}</Checkbox>
                <CheckboxGroup
                  value={selectedExpansions}
                  onChange={handleExpansionChange}
                >
                  {
                    <VStack align="flex-start" spacing={2} pl={6}>
                      {generation.expansions.map((expansion: Expansion) => (
                        <Checkbox key={expansion.id} value={expansion.id}>
                          {expansion.name}
                        </Checkbox>
                      ))}
                    </VStack>
                  }
                </CheckboxGroup>
              </Box>
            ))}
          </Stack>
        </CheckboxGroup>

        <Text fontSize="lg" fontWeight="bold">
          Select Type
        </Text>
        <CheckboxGroup
          value={selectedProductTypes}
          onChange={handleProductTypeChange}
        >
          <Stack spacing={4} direction="column">
            {data.data.productTypes.map((productType: ProductType) => (
              <Checkbox key={productType.id} value={productType.id}>
                {productType.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </VStack>
    </Box>
  );
};

export default FilterSideBar;
