import React from "react";
import "./Header.css";
import { ReactComponent as CutleryIcon } from "../../assets/svg/CutleryIcon.svg";

const Header = () => {
  return (
    <header>
      <h1>
        <CutleryIcon width={"1.5rem"} fill="white" />{" "}
        <span>Restaurants Nearby</span>
      </h1>
      <p>Find the best location to wine and dine</p>
    </header>
  );
};

export default Header;
