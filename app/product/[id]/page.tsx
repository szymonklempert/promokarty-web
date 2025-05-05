import { getQueryClient } from "@/app/get-query-client";
import { getProduct } from "@/server/products";
import { HydrationBoundary } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";

import { dehydrate } from "@tanstack/react-query";
import ProductPageLayout from "@/components/ProductPageLayout";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = await params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", productId],
    queryFn: getProduct,
  });

  console.log(productId);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageLayout productId={productId} />
    </HydrationBoundary>
  );
}
