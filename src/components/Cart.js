import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import { EmptyCart } from "./EmptyCart";
import { cartContext } from "../App";


export function Cart() {
  const [cart, setCart] = useState([]);
  const carts = React.useContext(cartContext);
  carts(cart.length);

  const getCart = () => {
    fetch("http://localhost:9000/cart")
      .then((data) => data.json())
      .then((crt) => setCart(crt));
  };
  useEffect(getCart, [cart._id]);

  const deleteCart = (_id) => {
    console.log(_id);
    fetch(`http://localhost:9000/cart/${_id}`, {
      method: "DELETE",
    }).then(() => getCart());
  };
  const history = useHistory();
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "20px" }}>Your Cart</h2>
      <Button
        style={{ paddingLeft: "20px" }}
        onClick={() => {
          history.goBack();
        }}
      >
        Back to Menu
      </Button>
      {cart.length !== 0 ? (
        <>
          {cart.map(({ name, image, price, _id }, index) => (
            <CartList
              name={name}
              image={image}
              price={price}
              id={_id}
              index={index}
              dltBtn={<Button
                onClick={() => {
                  deleteCart(_id);
                }}
              >
                delete
              </Button>} />
          ))}
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
function CartList({ name, image, price, dltBtn, index }) {
  const history = useHistory();
  return (
    <div className="cartList">
      <p>{index + 1}.</p>
      <img src={image} alt={name}></img>
      <h4>{name}</h4>
      <p>
        <b>₹{price}</b>
      </p>
      {dltBtn}
      <Button
        onClick={() => {
          history.push("/checkout");
        }}
      >
        Check Out
      </Button>
    </div>
  );
}
