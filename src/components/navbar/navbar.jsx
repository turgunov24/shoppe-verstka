//hooks
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import dataJson from "../../data/data.json";
import { actions } from "../../data/redux/reducers/allData";

function Navbar() {
  //use-dispath
  const dispatch = useDispatch();
  const product1 = useSelector((state) => state.getAllData.data);
  const product2 = dataJson;
  let products = product1.concat(product2);
  //menu-toggle
  const [navbarToggle, setnavbarToggle] = useState(false);
  //shopping-cart-toggle
  const [shoppingCartToggle, setShoppingCartToggle] = useState(false);
  //search-input
  const [search, setSearch] = useState(null);
  //search-icon-action
  const [searchSize, setSearchSize] = useState(false);
  //navigate-hook
  const navigate = useNavigate();
  //search-size-toggle
  const navbarTopSearch = useRef(null);
  //bottom-search

  const [bottomSearch, setBottomSearch] = useState(null);

  //selected-prdouct-function
  const selectedProductFunction = (product) => {
    if (
      product.category == "accessories" ||
      product.category == "men" ||
      product.category == "woman" ||
      product.category == "child"
    ) {
      dispatch(actions.selectedBlog(product));
      navigate("/selected-blog-page");
      setSearch(null);
    } else {
      dispatch(actions.selectedProduct(product.id));
      navigate("/product-page");
      setSearch(null);
    }
  };

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
                  ? "hidden sm:relative sm:flex items-end justify-end w-40 duration-300"
                  : "hidden sm:relative sm:flex items-end justify-end overflow-hidden w-10 duration-300"
              }
            >
              <input
                onChange={(e) => setSearch(e.target.value)}
                ref={navbarTopSearch}
                value={search}
                type="text"
                className="outline-none border-b border-black bg-[transparent] px-1 w-full h-full"
              />
              <button
                onClick={() => setSearchSize(!searchSize)}
                className="h-full px-3 py-2 text-xl flex items-center justify-center"
              >
                {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
              </button>
              {search &&
              products.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
              ).length == 0 ? (
                <p className="absolute top-full left-0 bg-[#fff] w-full py-1 px-1">
                  no items
                </p>
              ) : (
                search != "" && (
                  <div className="absolute top-full left-0 w-full max-h-40 flex flex-col py-1 overflow-y-scroll bg-[#fff]">
                    {products
                      .filter((product) => product.title.includes(search))
                      .map((product) => (
                        <p
                          onClick={() => {
                            selectedProductFunction(product);
                          }}
                          className="py-1 px-1 w-full bg-[#fff] hover:bg-gray1 duration-200"
                        >
                          {product.title.split(" ", 2).join(" ")}
                        </p>
                      ))}
                  </div>
                )
              )}
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
      <div className="relative w-full pb-2 sm:hidden">
        <input
          onChange={(e) => setBottomSearch(e.target.value)}
          value={bottomSearch}
          type="text"
          placeholder="search ..."
          className="w-full px-5 py-2 border-none outline-none bg-gray1 rounded-md"
        />
        {bottomSearch &&
        products.filter((product) =>
          product.title.includes(bottomSearch)
        ).length == 0 ? (
          <p className="absolute top-full left-0 bg-[#fff] w-full py-1 px-1">
            no items
          </p>
        ) : (
          bottomSearch != "" && (
            <div className="absolute top-full left-0 w-full max-h-40 flex flex-col py-1 overflow-y-scroll bg-[#fff]">
              {products
                .filter((product) => product.title.includes(bottomSearch))
                .map((product) => (
                  <p
                    onClick={() => {
                      selectedProductFunction(product);
                    }}
                    className="py-1 px-1 w-full bg-[#fff] hover:bg-gray1 duration-200"
                  >
                    {product.title.split(" ", 2).join(" ")}
                  </p>
                ))}
            </div>
          )
        )}
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
