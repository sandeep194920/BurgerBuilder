import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(
        // The response.data we get back is objects and we need to convert that to an array to get orders so that we can map on it.
        (response) => {
          const orders = [];
          for (const key in response.data) {
            // key will be a unique number and that holds an order object ---> {customer : ... , ingreds: ... , price : ...}
            // orders.push(response.data[key]);    // I can do this but the problem is we don't get the unique identifier that can be used later in the map function as key. So I will retain the key as well
            orders.push({
              id: key,
              ...response.data[key]
            });
          }
          this.setState({ orders: orders, loading: false });
        }
      )
      .catch((err) => this.setState({ loading: false }));
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
//This component is wrapped with withErrorHandler since we are interested to display if we face any errors
// You can try if this works by removing .json extension in get request in cdm
