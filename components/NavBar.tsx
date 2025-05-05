"use client";

import { Box, Image, Flex } from "@chakra-ui/react";

import React, { useState } from "react";

import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <Flex align="center" width="100%" p={4} borderColor="gray.200" px="0px">
      <Box flexShrink={0} width="250px">
        <Image src="/logo.png" />
      </Box>

      <Box flex="1" minWidth="150px" ml={4}>
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default NavBar;
