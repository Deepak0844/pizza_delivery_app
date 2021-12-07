import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";


export function Veg() {
  const [pizzaVeg, setPizzaVeg] = useState([]);
  const getPizza = () => {
    fetch("https://testing-api-hackathon.herokuapp.com/pizza")
      .then((data) => data.json())
      .then((pza) => setPizzaVeg(pza));
  };
  useEffect(getPizza, [pizzaVeg._id]);
  console.log(pizzaVeg);
  return (
    <div className="pizza">
      {pizzaVeg.map(({ name, description, image, price, _id, type }, index) => (
        <>
          {type === "veg" ? (
            <VegList
              name={name}
              description={description}
              image={image}
              price={price}
              id={_id}
              key={_id}
              pizzaVeg={pizzaVeg}
              index={index} />
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}
function VegList({ name, description, image, price, pizzaVeg, index }) {
  const [cart, setCart] = useState([]);
  const history = useHistory();
  const addCart = () => {
    const result = pizzaVeg[index];
    console.log(result);

    fetch("https://testing-api-hackathon.herokuapp.com/cart")
      .then((data) => data.json())
      .then((crt) => setCart(crt));

    const cartItem = {
      name: result.name,
      image: result.image,
      price: result.price,
      quantity: "",
    };

    fetch(`https://testing-api-hackathon.herokuapp.com/cart`, {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    history.push("/cart");
  };
  return (
    <div>
      <div className="pizzaList">
        <img src={image} alt={name}></img>
        <h4>{name}</h4>
        <p>{description}</p>
        <p>
          <b>₹{price}</b>
        </p>
        <Button onClick={addCart} variant="contained">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
