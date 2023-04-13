import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

function Products({ products }) {
  // const [products, setProducts] = useState([]);
  const router = useRouter();
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const { data } = await axios.get("https://coffee-shop-taupe.vercel.app/products");
  //       setProducts(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // }, []);
  return (
    <main>
      <div>Products</div>
      <section className="flex flex-wrap gap-[5%] p-4">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              className="border-2 border-solid border-white p-4 w-[30%] cursor-pointer select-none mb-[3%] rounded"
              onClick={() => router.push(`/products/ssg/${product.id}`)}
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
  );
}

export async function getStaticProps() {
  let props = {};
  try {
    const { data } = await axios.get("https://coffee-shop-taupe.vercel.app/products");
    Object.assign(props, { products: data.data });
  } catch (error) {
    console.log(error);
  }
  if (!Object.keys(props).includes("products"))
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

// export async function getServerSideProps() {
//   let props = {};
//   try {
//     const { data } = await axios.get("https://coffee-shop-taupe.vercel.app/products");
//     Object.assign(props, { products: data.data });
//   } catch (error) {
//     console.log(error);
//   }

//   if (!Object.keys(props).includes("products"))
//     return {
//       redirect: {
//         destination: "/500",
//         permanent: false,
//       },
//     };

//   return {
//     props,
//   };
// }

export default Products;
