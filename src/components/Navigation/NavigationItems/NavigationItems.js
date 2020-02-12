import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* We can create li tags here as navigation items, but it's also good to 
        outsource this into NavigationItems so that we can have some styling*/}
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout </NavigationItem>
  </ul>
);

export default navigationItems;
