import { useState } from "react";

import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";
import CartItemContext from "./contexts/CartItemContext";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemContext.Provider value={[cartItems, setCartItems]}>
      <Switch>
        <Route exact component={ProductList} path={routes.products.index} />
        <Route exact component={Product} path={routes.products.show} />
        <Redirect exact from={routes.root} to={routes.products.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </CartItemContext.Provider>
  );
};

export default App;
