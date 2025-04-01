import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Images/intellclasslogo.png";
import "./Header.css";
import { IoHome } from "react-icons/io5";
import { MdOutlineContactMail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { Btn } from "../Btn/Btn";
import { useDarkMode } from "./DarkModeContext";

function Header() {

  const { isDark, setIsDark } = useDarkMode();
  

  return (
    <header id="head" data-theme={isDark ? "dark" : "light"}>
      <div id="landh5">
        <img id="logo" src={logo} alt="IntellClass Logo" />
        <h2>IntellClass</h2>
      </div>

      <nav>
        <ul>
          <li><Link to="/"><IoHome /> Home</Link></li>
          <li><Link to="/contactus"><MdOutlineContactMail /> Contact Us</Link></li>
          <li><Link to="/about"><FcAbout /> About Us</Link></li>

          <div className="dropdown">
            <FaUser size="30px" className="user-icon" />
            <div className="dropdown-content">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        </ul>
      </nav>
      

      <Btn isChecked={isDark} onClick={()=> setIsDark(!isDark)}/>
    </header>
  );
}

export default Header;
