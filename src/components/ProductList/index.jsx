import { useEffect, useState } from "react";

import productsApi from "apis/products";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debounceSearchKey = useDebounce(searchKey);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.fetch({
        searchTerm: debounceSearchKey,
      });
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  useEffect(() => {
    fetchProducts();
  }, [debounceSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
