import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  // We show the preview of the burger as well as continue and cancel buttons here.

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      {/* The below div is required to set the boundaries of the burger component .But that doesnt seem working fine*/}
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
      {/* Button clicked prop will be implemented later */}
    </div>
  );
};

export default checkoutSummary;
