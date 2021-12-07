import { useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CheckOut } from "./formValidationSchema";
import { cartContext, StyledBadge } from "../App";
import { Successful } from "./Successful";
import { Cart } from "./Cart";
import { Meal } from "./Meal";
import { NewLaunches } from "./NewLaunches";
import { NonVeg } from "./NonVeg";
import { Veg } from "./Veg";
import { BestSeller } from "./BestSeller";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";

export function NavBar() {
  const history = useHistory();
  const [cartLength, setCartLength] = useState(0);
  return (
    <cartContext.Provider value={setCartLength}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <div className="container-fluid">
            <p
              className="navbar-brand"
              onClick={() => {
                history.push("/");
              }}
            >
              Pizza App
            </p>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <p
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      history.push("/best-seller");
                    }}
                  >
                    Best Seller
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link active"
                    onClick={() => {
                      history.push("/veg");
                    }}
                  >
                    Veg
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link active"
                    onClick={() => {
                      history.push("/non-veg");
                    }}
                  >
                    Non Veg
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link active"
                    onClick={() => {
                      history.push("/new-launches");
                    }}
                  >
                    New Launches
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link active"
                    onClick={() => {
                      history.push("/meals-combos");
                    }}
                  >
                    Meals & Combos
                  </p>
                </li>
              </ul>
              <IconButton
                onClick={() => {
                  history.push("/cart");
                }}
                aria-label="cart"
              >
                <StyledBadge
                  badgeContent={cartLength}
                  showZero
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Redirect to="/best-seller" />
          </Route>
          <Route path="/best-seller">
            <BestSeller />
          </Route>
          <Route path="/veg">
            <Veg />
          </Route>
          <Route path="/non-veg">
            <NonVeg />
          </Route>
          <Route path="/new-launches">
            <NewLaunches />
          </Route>
          <Route path="/meals-combos">
            <Meal />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <CheckOut />
          </Route>
          <Route path="/ordered-successful">
            <Successful />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/signin">
            <SigninForm />
          </Route>
          <Route path="**"></Route>
        </Switch>
      </div>
    </cartContext.Provider>
  );
}

function SignUpForm() {
  const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const addBtn = () => {
    const newUser = {
      userName,
      // email,
      password,
      // confirmPassword,
    };
    console.log(newUser);
    fetch(`http://localhost:9000/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="signup-form">
      <section>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr></hr>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <PersonIcon fontSize="large" />
            </span>
            <input
              type="text"
              onChange={(event) => setUserName(event.target.value)}
              className="form-control"
              name="username"
              placeholder="Username"
            ></input>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <PasswordIcon fontSize="large" />
            </span>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              name="password"
              placeholder="Password"
            ></input>
          </div>
        </div>

        <div className="form-group"></div>
        <div className="form-group">
          <button onClick={addBtn} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </section>
    </div>
  );
}

function SigninForm() {
  const [userName, setUserName] = useState("");
  const [loginStatus,setLoginStatus] = useState(false)
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const addBtn = () => {
    const existingUser = {
      userName,
      // email,
      password,
      // confirmPassword,
    };
    console.log(existingUser);
    fetch(`http://localhost:9000/signin`, {
      method: "POST",
      body: JSON.stringify(existingUser),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response)=>{
      if(!response.data.message){
        setLoginStatus(false)
      }else{
        console.log(response.data)
        setLoginStatus(true);
      }
    })
  };

  return (
    <div className="signup-form">
      <section>
        <h2>Sign In</h2>
        <p>Please fill in this form to Login</p>
        <hr></hr>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <PersonIcon fontSize="large" />
            </span>
            <input
              type="text"
              onChange={(event) => setUserName(event.target.value)}
              className="form-control"
              name="username"
              placeholder="Username"
            ></input>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <PasswordIcon fontSize="large" />
            </span>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              name="password"
              placeholder="Password"
            ></input>
          </div>
        </div>

        <div className="form-group"></div>
        <div className="form-group">
          <button onClick={addBtn} className="btn btn-primary btn-lg">
            Sign in
          </button>
          {loginStatus &&(
            <button>check if authenticated</button>
          )}
        </div>
      </section>
    </div>
  );
}
