import React from "react";
import classes from "./Modal.module.css";

const modal = (props) => (
  //   <div className={props.show ? classes.Modal : null}>{props.children}</div>  // This is one way of doing without inline css
  <div
    className={classes.Modal}
    style={{
      transform: props.show ? "translateY(0)" : "translateX(-100)",
      opacity: props.show ? "1" : "0"
    }}
  >
    {props.children}
  </div> // This is second way with inline styles
);

export default modal;
