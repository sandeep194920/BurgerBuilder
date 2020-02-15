import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  //   <div className={props.show ? classes.Modal : null}>{props.children}</div>  // This is one way of doing without inline css
  <Aux>
    {/* Placing the backdrop inside the modal makes more sense as it is closeley connected with modal*/}
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateX(-100vh)", // in translateX, vh was missed till now so the modal wasn't getting out of way
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
    {/* This is second way with inline styles*/}
  </Aux>
);

export default modal;
