import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// Checkout is added in the Routing module
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} />
          {/* Note that in all of the Routes above, we pass history and other props by default which is 
          given by react-router-dom. In case if we need additional props of that particular component we can write like 
          <Route path = "/xyz" render = {(props) => <XYZComponent additionalProp = {someProp} {...props}>} */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
