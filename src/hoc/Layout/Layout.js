import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  // The click listener of the backdrop component of SideDrawer is handled here because this is the common component
  // that has both Toolbar and SidDrawer. This connection is important because we have a menu button in the toolbar
  // which when clicked opens the sidedrawer. Hence we turn this component from function to class so that we can set state

  // state has been primarily added for the above mentioned reasons. This component initially was a functional based
  state = {
    showSideDrawer: false
  };

  sidDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sidDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sidDrawerToggleHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };

  render() {
    return (
      <Aux>
        {/* <div>Toolbar, Sidedrawer,Backdrop</div> */}
        <Toolbar drawerToggleClicked={this.sidDrawerToggleHandler} />
        {/* Instead of sideDrawerToggleHandler above in the toolbar, we could have used sidDrawerOpenHandler because
        we are using this button just to open the sideDrawer. However, it might help us in future just in case */}
        <Sidedrawer
          closed={this.sidDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
