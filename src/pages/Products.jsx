import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import HeaderPage from "../components/HeaderPage";
import { getProduct } from "../redux/slice/product-slice";
import { getUserBasicInfo } from "../redux/slice/user-slice";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);
  const userBasicInfo = useSelector((state) => state.user_basic_info);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getUserBasicInfo());
  }, [dispatch]);

  if (products.length === 0 || !userBasicInfo) {
    return (
      <div className="container-page flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="container-page flex flex-col gap-4 w-full">
        <HeaderPage
          title={`Hai ${userBasicInfo.data.user_name}, mau jual apa hari ini?`}
          subtitle="Yuk, jaga bumi dan dapatkan koin dari setiap penjualan sampahmu!"
        />
        <div className="flex flex-wrap w-full justify-center gap-5 items-start">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                id={product.id_product}
                imgSrc={product.product_pic}
                imgAlt={product.product_name}
                title={product.product_name}
                coin={product.coin}
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