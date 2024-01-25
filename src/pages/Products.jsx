import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import HeaderPage from "../components/HeaderPage";

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
    return <div className="container-page flex justify-center items-center">Loading...</div>;
  }
  return (
    <>
      <div className="container-page flex flex-col gap-4 w-full">
        <HeaderPage title="Hai user, mau jual apa hari ini?"  subtitle="Yuk, jaga bumi dan dapatkan koin dari setiap penjualan sampahmu!" />
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
        <Cart />
      </div>
    </>
  );
}

export default Product;
