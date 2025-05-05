"use client";
import {
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
  Heading,
  Image,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Spinner,
  TableCaption,
  Text,
  Tab,
} from "@chakra-ui/react";
import { ChevronRightIcon, ArrowRightIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/server/products";
import { Offer } from "@/types/offers";
import { ProductWithOffers } from "@/types/products";
import { PriceHistoryEntry } from "@/types/products";

import {
  AreaChart,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const OfferRow = ({
  shop,
  price,
  url,
}: {
  shop: string;
  price: number;
  url: string;
}) => (
  <Tr>
    <Td>{shop}</Td>
    <Td isNumeric>{price} PLN</Td>
    <Td>
      <Button
        as="a"
        variant="solid"
        colorScheme="blue"
        rightIcon={<ArrowRightIcon />}
        aria-label={`Go to ${shop}`}
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Do sklepu
      </Button>
    </Td>
  </Tr>
);

const CurrentOffers = ({ offers }: { offers?: Offer[] }) => {
  if (!offers) return null;

  return (
    <VStack width="100%" spacing={4}>
      <Heading size="lg" alignSelf="flex-start">
        Aktualne oferty w sklepach
      </Heading>
      <TableContainer width="100%">
        <Table variant="simple">
          <Tbody>
            {offers.map((offer) => (
              <OfferRow
                key={offer.id}
                shop={offer.shop.name}
                price={offer.price}
                url={offer.url}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

  
const ProductChart = ({ priceHistory }: {priceHistory?: PriceHistoryEntry[]}) => {

  const formattedData = (priceHistory || []).map(entry => ({
    price: entry.price,
    date: new Date(entry.date).toLocaleDateString('en-CA')  // Format as YYYY-MM-DD
  }));


  return (
  <LineChart width={900} height={300} data={formattedData} style={{ marginTop: "20px" }}>
      <Line type="stepAfter" dataKey="price" stroke="#8884d8" />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
    </LineChart>


  );
};

const ProductData = ( {productData}: {productData?: ProductWithOffers}) => {
  return (
      <Flex>
        <VStack>
          <Heading width="100%">{productData?.title}</Heading>

          <Flex>
            <Image width="400px" src={productData?.imageUrl} />
            <VStack>
              <TableContainer py="20px">
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Seria: </Td>
                      <Td>Scarlet & Violet</Td>
                    </Tr>

                    <Tr>
                      <Td>Expansion: </Td>
                      <Td>Temporal Forces</Td>
                    </Tr>

                    <Tr>
                      <Td>Liczba boosterów: </Td>
                      <Td isNumeric>36</Td>
                    </Tr>

                    <Tr>
                      <Td>Aktualnie najnizsza cena:</Td>
                      <Td isNumeric>{productData?.lowestPrice}</Td>
                    </Tr>

                    <Tr>
                      <Td>Historycznie najnizsza cena:</Td>
                      <Td isNumeric>489.99</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              </VStack>
          </Flex>
        </VStack>
      </Flex>
  )
}

export default function ProductPageLayout({
  productId,
}: {
  productId: string;
}) {
  const { data } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });

  return (
    <VStack minH="100vh">
      <NavBar />
      <ProductData productData={data} />
      <CurrentOffers offers={data?.offers} />
      <ProductChart priceHistory={data?.priceHistory} />
    </VStack>
  );
}
