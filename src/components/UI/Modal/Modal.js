import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // Converting this component into classbased to implement shouldComponentUpdate for performance optimizations

  // Adding this method CDU to check if Modal is being called when ingredient is added or removed. So this is for testing purpose
  componentDidUpdate() {
    console.log("[Modal] component");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Note that if you don't return true or false in shouldCompUpdate then it throws a warning.
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children // props.children check is required to see if spinner is updated to order summary
    ) {
      return true;
    } else {
      return false;
    }

    // The above if else logic can also be written as
    // return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    return (
      //   <div className={this.props.show ? classes.Modal : null}>{props.children}</div>  // This is one way of doing without inline css
      <Aux>
        {/* Placing the backdrop inside the modal makes more sense as it is closeley connected with modal*/}
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateX(-100vh)", // in translateX, vh was missed till now so the modal wasn't getting out of way
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
        {/* This is second way with inline styles*/}
      </Aux>
    );
  }
}
export default Modal;
