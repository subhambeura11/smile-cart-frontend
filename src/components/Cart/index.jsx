import { useEffect, useState } from "react";

import productsApi from "apis/products";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { isNotEmpty } from "neetocist";
import { Toastr } from "neetoui";
import { keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const slugs = keys(cartItems);

  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );

      setProducts(responses);

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            {
              autoClose: 2000,
            }
          );
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  if (isLoading) return <PageLoader />;

  if (isNotEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />
        <div className="mt-10 flex justify-center space-x-10">
          <div className="w-1/3 space-y-5">
            {products.map(product => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
          {totalMrp > 0 && (
            <div className="w-1/4">
              <PriceCard {...{ totalMrp, totalOfferPrice }} />
            </div>
          )}
        </div>
      </>
    );
  }

  return <Header title="My Cart" />;
};

export default Cart;
