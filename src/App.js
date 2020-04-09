import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// Checkout is added in the Routing module
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

// converting this to class based as I need to use the mapStateToProps and dispatch authCheckState because, on page refresh, I need to login back the user if the token stored in localstorage is valid
// Also, this needs to be called in ComponentDidMount hence using class based for these two reasons
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
            {/* Note that in all of the Routes above, we pass history and other props by default which is 
          given by react-router-dom. In case if we need additional props of that particular component we can write like 
          <Route path = "/xyz" render = {(props) => <XYZComponent additionalProp = {someProp} {...props}>} */}
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(null, mapDispatchToProps)(App);
