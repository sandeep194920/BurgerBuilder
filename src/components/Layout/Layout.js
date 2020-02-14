import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/SideDrawer/SideDrawer";
const layout = (props) => (
  <Aux>
    {/* <div>Toolbar, Sidedrawer,Backdrop</div> */}
    <Toolbar />
    <Sidedrawer />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
