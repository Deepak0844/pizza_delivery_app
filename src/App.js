import "./App.css";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { NavBar } from "./components/NavBar";
export const cartContext = React.createContext("");

function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));


