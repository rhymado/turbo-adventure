// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function DetailProduct({ product }) {
  // const router = useRouter();
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const getProducts = async () => {
  //     if (!router.isReady) return;
  //     try {
  //       const { data } = await axios.get(
  //         `https://coffee-shop-taupe.vercel.app/products/${router.query.productId}`
  //       );
  //       setProduct(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // }, [router.isReady]);
  return (
    <main className="h-screen p-8">
      {Object.keys(product).length > 0 && (
        <div className="border-2 border-solid border-white p-4 cursor-pointer select-none rounded h-full flex flex-col items-center">
          <Image
            src={product.image || "/react-logo.svg"}
            width={500}
            height={500}
            alt="product-image"
            className="rounded"
          />
          <p className="text-2xl text-left w-full flex-1">{product.prod_name}</p>
          <p className="text-xl text-right w-full flex-1">IDR {product.price}</p>
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps(ctx) {
  let props = {};
  try {
    const { data } = await axios.get(
      `https://coffee-shop-taupe.vercel.app/products/${ctx.params.productId}`
    );
    Object.assign(props, { product: data.data });
  } catch (error) {
    console.log(error);
  }

  if (!Object.keys(props).includes("product"))
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };

  return {
    props,
  };
}

export default DetailProduct;
