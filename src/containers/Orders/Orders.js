import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    // Below commented code has been moved to redux - order.js action and reducer
    // this.setState({ loading: true });
    // axios
    //   .get("/orders.json")
    //   .then(
    //     // The response.data we get back is objects and we need to convert that to an array to get orders so that we can map on it.
    //     (response) => {
    //       const orders = [];
    //       for (const key in response.data) {
    //         // key will be a unique number and that holds an order object ---> {customer : ... , ingreds: ... , price : ...}
    //         // orders.push(response.data[key]);    // I can do this but the problem is we don't get the unique identifier that can be used later in the map function as key. So I will retain the key as well
    //         orders.push({
    //           id: key,
    //           ...response.data[key]
    //         });
    //       }
    //       this.setState({ orders: orders, loading: false });
    //     }
    //   )
    //   .catch((err) => this.setState({ loading: false }));
    // Above commented code has been moved to redux - order.js action and reducer

    // Action creator in - orders.js - redux to do the same above task through redux
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price} // This plus is added to convert the string price to number format
          // If u dont pass + here then use Number.parseFloat in Order.js component where price is displayed
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
//This component is wrapped with withErrorHandler since we are interested to display if we face any errors
// You can try if this works by removing .json extension in get request in cdm
