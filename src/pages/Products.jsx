import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

function Product() {
  const URL = "https://656bda9ee1e03bfd572ddc89.mockapi.io/sarange/listSampah";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    try {
      const response = await fetch(URL);
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };
  if (products.length === 0) {
    return <div className="mt-20 py-10 px-20 flex justify-center items-center">Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col mt-20 py-10 px-20 gap-4 w-full" id="container">
        <div>
          <h1 className="text-2xl font-medium mb-1">Hai user, mau jual apa hari ini?</h1>
          <p className="mb-2">Yuk, jaga bumi dan dapatkan koin dari setiap penjualan sampahmu!</p>
        </div>
        <div
          className="flex flex-wrap w-full justify-center gap-5 items-start"
          id="product-card"
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                imgSrc={product.img}
                imgAlt={product.nama}
                title={product.nama}
                coin={product.koin}
              />
            );
          })}
          ;
        </div>
        <Cart className="ml-auto" />
      </div>
    </>
  );
}

export default Product;
