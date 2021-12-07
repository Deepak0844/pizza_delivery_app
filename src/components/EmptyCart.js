import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

export function EmptyCart() {
  const history = useHistory();
  return (
    <div className="emptyCart">
      <h2>cart is empty</h2>
      <img
        src="https://hakimitr.com/assets/website/images/empty-cart.gif"
        alt="no cart pic"
      ></img>
      <Button
        onClick={() => {
          history.push("/best-seller");
        }}
      >
        Go to Menu
      </Button>
    </div>
  );
}
