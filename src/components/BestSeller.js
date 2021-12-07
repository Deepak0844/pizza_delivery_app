import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";


export function BestSeller() {
  const [pizza, setPizza] = useState([]);
  const getPizza = () => {
    fetch("https://testing-api-hackathon.herokuapp.com//pizza")
      .then((data) => data.json())
      .then((pza) => setPizza(pza));
  };
  useEffect(getPizza, [pizza._id]);
  return (
    <div className="pizza">
      {pizza.map(
        ({ name, description, image, price, category, _id }, index) => (
          <>
            {category === "bestseller" ? (
              <BestSellerList
                name={name}
                description={description}
                image={image}
                price={price}
                id={_id}
                key={_id}
                pizza={pizza}
                index={index}
                category={category} />
            ) : (
              ""
            )}
          </>
        )
      )}
    </div>
  );
}
function BestSellerList({
  name, description, image, price, pizza, index, category,
}) {
  const history = useHistory();
  const [cart, setCart] = useState([]);

  const addCart = () => {
    const result = pizza[index];
    const same = cart.map(({ name }) => name === result.name);
    console.log("same:", same);
    fetch("https://testing-api-hackathon.herokuapp.com//cart")
      .then((data) => data.json())
      .then((crt) => setCart(crt));

    if (!same[0]) {
      const cartItem = {
        name: result.name,
        image: result.image,
        price: result.price,
        quantity: "",
      };

      fetch(`https://testing-api-hackathon.herokuapp.com//cart`, {
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return;
    }
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
