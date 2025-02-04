import Home from "components/Home";
import PageNotFound from "components/PageNotFound";
import Product from "components/Product";
import { Link, Route, Switch } from "react-router-dom";

import "./App.css";

const App = () => (
  <>
    <div className="flex space-x-2">
      <Link to="/">Home</Link>
      <Link to="/product">Product</Link>
    </div>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
