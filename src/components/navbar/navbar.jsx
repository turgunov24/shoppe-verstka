//hooks
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//icons
import { BsCheckCircleFill } from "react-icons/bs";
//components
import Sidebar from "./sidebar";
import ShoppingCart from "../shopping-cart/shopping-cart";
//assets
import navbarLogo from "../../assets/images/navbarLogo.png";

//additional
import "./navbar.css";
import { navLinks } from "../../data/navbar-data/navLinks";

function Navbar() {
  //menu-toggle
  const [navbarToggle, setnavbarToggle] = useState(false);
  //shopping-cart-toggle
  const [shoppingCartToggle, setShoppingCartToggle] = useState(false);
  //search-icon-action
  const [searchSize, setSearchSize] = useState(false);
  //navigate-hook
  const navigate = useNavigate();
  const searchSizeFunction = () => {
    if (searchSize) {
      setSearchSize(false);
      navigate("/search-page");
      console.log(navbarTopSearch.current.value);
    } else {
      setSearchSize(true);
    }
  };
  const navbarTopSearch = useRef(null);
  //visible < 576px
  const navbarBottomSearch = useRef(null);
  const navbarBottomSearchButton = useRef(null);
  /////navbar-alert////////

  return (
    <nav className="fixed top-0 left-0 z-30 bg-[white] flex flex-col items-center w-full px-5 pt-2 md:pt-10 md:px-10">
      <div className="pb-3 w-full flex items-center justify-between md:border-b border-borderGray ">
        <img src={navbarLogo} className="w-24 md:w-28" />
        <div className="flex items-center gap-5">
          <ul className="hidden md:flex items-center gap-10 px-5 border-r border-black">
            {navLinks.desktopNav.map((navLink, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(navLink.to);
                }}
                className="cursor-pointer"
              >
                {navLink.name}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <div
              className={
                searchSize
                  ? "hidden sm:flex items-end justify-end overflow-hidden w-40 duration-300"
                  : "hidden sm:flex items-end justify-end overflow-hidden w-10 duration-300"
              }
            >
              <input
                ref={navbarTopSearch}
                type="text"
                className="outline-none border-b border-black bg-[transparent] px-5 w-full h-full"
              />
              <button
                onClick={searchSizeFunction}
                className="h-full px-3 py-2 text-xl flex items-center justify-center"
              >
                {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
              </button>
            </div>
            <button
              onClick={() => setShoppingCartToggle(true)}
              className="px-3 py-2 text-xl"
            >
              {navLinks.icons.find((icon) => icon.name == "shopIcon").icon}
            </button>
            <button
              onClick={() => navigate("/profile-page")}
              className="hidden md:block px-3 py-2 text-xl"
            >
              {navLinks.icons.find((icon) => icon.name == "userIcon").icon}
            </button>
            <button
              onClick={() => setnavbarToggle(!navbarToggle)}
              className="px-3 py-2 text-xl md:hidden"
            >
              {navbarToggle
                ? navLinks.icons.find((icon) => icon.name == "closeIcon").icon
                : navLinks.icons.find((icon) => icon.name == "menuIcon").icon}
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full pb-2 overflow-hidden sm:hidden">
        <input
          onChange={() => {
            navbarBottomSearchButton.current.style.right = "0";
            navbarBottomSearchButton.current.style.transitionDuration = ".5s";
            navbarBottomSearchButton.current.style.opacity = "1";
            setTimeout(() => {
              navbarBottomSearchButton.current.style.right = "-100%";
              navbarBottomSearchButton.current.style.transitionDuration = "3s";
              navbarBottomSearchButton.current.style.opacity = "0";
            }, 2000);
          }}
          ref={navbarBottomSearch}
          type="text"
          placeholder="search ..."
          className="w-full px-5 py-2 border-none outline-none bg-gray1 rounded-md"
        />
        <button
          ref={navbarBottomSearchButton}
          className="absolute top-0 -right-full text-xl h-full px-2 opacity-0"
        >
          {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
        </button>
      </div>
      <Sidebar toggle={navbarToggle} />
      <ShoppingCart
        setToggle={setShoppingCartToggle}
        toggle={shoppingCartToggle}
      />
    </nav>
  );
}

export default Navbar;
