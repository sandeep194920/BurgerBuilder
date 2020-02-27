import React, { Component } from "react";
import Order from "../../components/Order/Order";

class Orders extends Component {
  render() {
    console.log("ORDERS COMP");
    console.log(this.props);
    console.log("------");
    // In this Orders, we need to return list of individual Order Components. Hence we create Order and its Css in
    // the Order folder which already exists in components.
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
