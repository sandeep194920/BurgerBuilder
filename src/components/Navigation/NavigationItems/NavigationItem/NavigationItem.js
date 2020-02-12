import React from "react";
import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {/* props.active is used during routing. basically if the link is clicked, that particular link recieves the active class */}
      {props.children}
    </a>
  </li>
);

export default navigationItem;
