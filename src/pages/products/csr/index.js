import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

function Products() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("https://coffee-shop-taupe.vercel.app/products");
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <Layout title="Products | CSR">
      <main>
        <div>Products</div>
        <section className="flex flex-wrap gap-[5%] p-4">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div
                key={product.id}
                className="border-2 border-solid border-white p-4 w-[30%] cursor-pointer select-none mb-[3%] rounded"
                onClick={() => router.push(`/products/csr/${product.id}`)}
              >
                <Image
                  src={product.image || "/react-logo.svg"}
                  width={200}
                  height={200}
                  alt="product-image"
                  className="rounded"
                />
                <p className="text-2xl">{product.prod_name}</p>
                <p className="text-xl text-right">IDR {product.price}</p>
              </div>
            ))}
        </section>
      </main>
    </Layout>
  );
}

export default Products;
