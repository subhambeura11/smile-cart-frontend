import Cart from "components/Cart";
import Checkout from "components/Checkout/index";
import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Route exact component={Cart} path={routes.cart} />
    <Route exact component={Checkout} path={routes.checkout} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
