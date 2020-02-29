import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* We can create li tags here as navigation items, but it's also good to 
        outsource this into NavigationItems so that we can have some styling*/}
    <NavigationItem link="/" exact>
      {/* active prop is not passed anymore to the above NavigationItem since we now use NavLink in  NavigationItem */}
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Checkout </NavigationItem>
  </ul>
);

export default navigationItems;
