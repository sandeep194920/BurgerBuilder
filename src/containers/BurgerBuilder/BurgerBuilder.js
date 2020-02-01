import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        {/* <div>Burger</div> */}
        <Burger />
        <div>Build Controls</div>
        {/* Build Controls should also contain Order button */}
      </Aux>
    );
  }
}
export default BurgerBuilder;
