import { useRouter } from "next/router";

function Products() {
  const router = useRouter();
  //   console.log(typeof window, router.isReady);
  if (router.isReady) router.replace("/products/csr");
  return <></>;
}

export default Products;
