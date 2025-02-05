import { useEffect, useState } from "react";

import productsApi from "apis/products";
import PageLoader from "components/commons/PageLoader";
import { Typography } from "neetoui";

import ProductListItem from "./ProductListItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.fetch();
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
          Smile Cart
        </Typography>
        <hr className="neeto-ui-bg-black h-1" />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
