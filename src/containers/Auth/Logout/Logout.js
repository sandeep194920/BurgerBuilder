import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  // I need to dispatch logout the moment I enter this page (I mean the moment the render is done).
  // Also I need to redirect to home page after logout

  componentDidMount() {
    console.log("Yes this is executed - CDM logout comp");
    this.props.onLogout();
  }
  render() {
    console.log("Yes this is executed - render logout comp");
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
