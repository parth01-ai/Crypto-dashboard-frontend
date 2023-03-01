import React from "react";
import Logo from "../../Logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
    {/* Navbar */}
      <div className="main_div">
        <figure className="img_tag">
          <img src={Logo} alt="Almabetter" className="photo" />
        </figure>
      </div>
    </>
  );
};

export default Navbar;
