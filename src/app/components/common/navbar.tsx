import React from "react";
import RouteButton from "../navigator";

interface NavBarLink {}

const NavBarComponent: React.FC<NavBarLink> = () => {
  return (
    <div>
      <RouteButton route="/" label="Home"></RouteButton>
      <RouteButton route="/contact" label="Contact"></RouteButton>
      <RouteButton route="/shop" label="Merch Shop"></RouteButton>
    </div>
  );
};

export default NavBarComponent;
