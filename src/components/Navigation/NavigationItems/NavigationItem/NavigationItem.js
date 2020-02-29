import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
// NOTE: Reason to use NavLink instead of Link is that, NavLink automatically comes with active css property (but in this case, to trigger that, we use activeClassName due to unique css property explained below).

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* <a href={props.link} className={props.active ? classes.active : null}> */}
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={classes.active}
    >
      {/* props.active is used during routing. basically if the link is clicked, that particular link recieves the active class */}
      {props.children}
    </NavLink>
    {/* When used NavLink, we dont need a condition to check if active class has been applied or not as I explained above and in the notes  */}
    {/* The main thing to remember with NavLink is, when we use NavLink then active is applied  but the problem is 
    we dont see that effect of our css active class because the css active class is converted into some unique hash code 
    for example like active#412 so on. So to change the active class to our css active we define activeClassName in NavLink */}

    {/* Again, the main difference between Link and NavLink is checking for active class like props.active?classes.active : null which is not required in NavLink */}
    {/* exact is used in NavigationItems and passed to this. This exact prop is used if we need to match the exact routes. I mean
    consider / and /orders. In both of these / exists so the active is applied for both.
    To override this and treat / and /orders separately (independently) we use exact */}
    {/* </a> */}
  </li>
);

export default navigationItem;
