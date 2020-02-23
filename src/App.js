import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// Checkout is added in the Routing module
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        {/* Note that we are interested to pass only one Component at a time either BurgerBuilder or Checkout and so on which can be done by routing */}
        {/* <BurgerBuilder /> */}
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
