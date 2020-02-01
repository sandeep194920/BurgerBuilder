import React, { Component } from "react";
import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Build Controls</div>
        {/* Build Controls should also contain Order button */}
      </Aux>
    );
  }
}
export default BurgerBuilder;
