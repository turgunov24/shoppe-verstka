//hooks
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ShopPageFilter from "../../components/shop-page-filter/shop-page-filter";

//addtional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { navLinks } from "../../data/navbar-data/navLinks";
import { actions } from "../../data/redux/reducers/allData";

function ShopPage() {
  //all-data
  const products = useSelector((data) => data.getAllData.data);
  const [data, setData] = useState(products);
  //use-dispatch-hook
  const dispatch = useDispatch();
  //useNavigate-hook
  const navigate = useNavigate();

  //shop-page-filter-component-toggle
  const [shopPageFilterToggle, setShopPageFilterToggle] = useState(false);

  //////////////filtered-data//////////////////

  ////////////////////////-----------shop-page-filter-component--------////////////////////////

  //shop-dropdown-toggle
  const [shopDropdown, setShopDropdown] = useState(false);
  //shop-dropdown-data
  const [shopInputData, setShopInputData] = useState("Shop By");
  //shop-dropdown-icon
  const [shopDropdownIcon, setShopDropdownIcon] = useState(false);
  //sort-dropdown-toggle
  const [sortDropdown, setSortDropdown] = useState(false);
  //sort-dropdown-data
  const [sortInputData, setSortInputData] = useState("Sort By");
  //sort-dropdown-icon
  const [sortDropdownIcon, setSortDropdownIcon] = useState(false);

  ////////////////////range-inputs-data///////////////////////////////////////

  //input-range-child-one
  const [inputRangeOne, setInputRangeOne] = useState(0);
  //input-range-child-two
  const [inputRangeTwo, setInputRangeTwo] = useState(500);

  //////////////////////radio-input-toggle///////////////////
  //on-sale-input-toggle
  const [onSaleInput, setOnSaleInput] = useState(false);
  //in-stock-input-toggle
  const [inStockInput, setInStockInput] = useState(false);
  ///////radio-inputs-height-toggle
  const [radioInputsHeight, setRadioInputsHeight] = useState(false);
  //FILTER
  //search-function
  const [searchInputValue, setSearchInputValue] = useState(null);
  const searchFunction = () => {
    if (searchInputValue) {
      let filteredData = [];
      products.forEach((product) => {
        if (
          product.category
            .toLowerCase()
            .includes(searchInputValue.toLowerCase()) ||
          product.title.toLowerCase().includes(searchInputValue.toLowerCase())
        ) {
          filteredData.push(product);
        }
      });
      setData(filteredData.length != 0 ? filteredData : products);
    } else {
      setData(products);
    }
  };
  //shop-by
  useEffect(() => {
    if (shopInputData != "Shop By") {
      if (shopInputData == "Cheapest") {
        // console.log(data.sort((a, b) => a.price < b.price));
        console.log(1);
      } else if (shopInputData == "Expensive") {
        // console.log(data.sort((a, b) => a.price > b.price));
        console.log(2);
      }
    } else {
      setData(products);
    }
  }, [shopInputData]);
  console.log(data);
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 w-full min-h-screen"
    >
      <Navbar />
      <h4 className="mt-32 text-lg font-bold md:hidden">Shop</h4>
      <h4 className="hidden md:block mt-32 text-2xl font-bold">
        Shop The Latest
      </h4>
      <div className="flex items-center justify-start gap-3 md:hidden">
        <h5 className="text-lg -rotate-90">
          {navLinks.icons.find((icon) => icon.name == "filterIcon").icon}
        </h5>
        <h5 onClick={() => setShopPageFilterToggle(!shopPageFilterToggle)}>
          Filters
        </h5>
      </div>
      <div className="flex flex-col flex-grow md:flex-row gap-2">
        <div
          id="shop-page-filter-component"
          className={
            shopPageFilterToggle
              ? "flex flex-col gap-3 w-full md:w-56"
              : "h-0 w-full overflow-hidden  md:flex flex-col gap-3 md:w-56 md:h-max"
          }
        >
          <div className="relative">
            <input
              onChange={(e) => setSearchInputValue(e.target.value)}
              type="text"
              className="outline-none border-b border-[#D8D8D8] bg-[transparent] pr-6 py-3 w-full h-full"
              placeholder="Search..."
            />
            <button
              onClick={searchFunction}
              className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl border-none outline-none md:text-lg"
            >
              {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
            </button>
          </div>
          <div
            className={
              shopDropdown
                ? "border border-[#D8D8D8] mt-5 h-36 overflow-hidden rounded-md duration-300 md:h-[34]"
                : "border border-[#D8D8D8] mt-5 h-14 overflow-hidden rounded-md duration-300 md:h-12"
            }
          >
            <div
              className="relative h-14 md:h-12"
              onClick={() => {
                setShopDropdown(!shopDropdown);
                setShopDropdownIcon(!shopDropdownIcon);
              }}
            >
              <input
                type="text"
                disabled
                value={shopInputData}
                className="w-full h-full px-3 bg-[white]"
              />
              <h4
                className={
                  shopDropdownIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-5 rotate-90 duration-200 md:text-sm"
                    : "absolute top-1/2 -translate-y-1/2 right-5 -rotate-90 duration-200 md:text-sm"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <h4
              onClick={() => {
                setShopInputData("Cheapest");
                setShopDropdown(false);
                setShopDropdownIcon(false);
              }}
              className={
                shopDropdown
                  ? "flex items-center px-3 h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                  : "flex items-center px-3 h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
              }
            >
              Cheapest
            </h4>
            <h4
              onClick={() => {
                setShopInputData("Expensive");
                setShopDropdown(false);
                setShopDropdownIcon(false);
              }}
              className={
                shopDropdown
                  ? "flex items-center px-3 h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                  : "flex items-center px-3 h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
              }
            >
              Expensive
            </h4>
          </div>
          <div
            className={
              sortDropdown
                ? "border border-[#D8D8D8] h-36 overflow-hidden rounded-md duration-300 md:h-[34]"
                : "border border-[#D8D8D8] h-14 overflow-hidden rounded-md duration-300 md:h-12"
            }
          >
            <div
              className="relative h-14 md:h-12"
              onClick={() => {
                setSortDropdown(!sortDropdown);
                setSortDropdownIcon(!sortDropdownIcon);
              }}
            >
              <input
                type="text"
                disabled
                value={sortInputData}
                className="w-full h-full px-3 bg-[white]"
              />
              <h4
                className={
                  sortDropdownIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-5 rotate-90 duration-200 md:text-sm"
                    : "absolute top-1/2 -translate-y-1/2 right-5 -rotate-90 duration-200 md:text-sm"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <h4
              onClick={() => {
                setSortInputData("Newest");
                setSortDropdown(false);
                setSortDropdownIcon(false);
              }}
              className={
                sortDropdown
                  ? "flex items-center px-3 h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                  : "flex items-center px-3 h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
              }
            >
              Newest
            </h4>
            <h4
              onClick={() => {
                setSortInputData("Oldest");
                setSortDropdown(false);
                setSortDropdownIcon(false);
              }}
              className={
                sortDropdown
                  ? "flex items-center px-3 h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                  : "flex items-center px-3 h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
              }
            >
              Oldest
            </h4>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <div classNa me="border flex items-center justify-center">
              <input
                onChange={(e) => setInputRangeOne(e.target.value)}
                id="shop-page-filter-input-range"
                type="range"
                value={inputRangeOne}
                min={0}
                max={500}
                className="w-1/2"
              />
              <input
                onChange={(e) => setInputRangeTwo(e.target.value)}
                id="shop-page-filter-input-range"
                type="range"
                value={inputRangeTwo}
                min={500}
                max={1000}
                className="w-1/2"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>
                Price: ${inputRangeOne} - ${inputRangeTwo}{" "}
              </p>
              <h5 onClick={() => setRadioInputsHeight(!radioInputsHeight)}>
                Filter
              </h5>
            </div>
          </div>
          <div
            className={
              radioInputsHeight
                ? "opacity-100 h-16 overflow-hidden duration-300"
                : "opacity-0 h-0 overflow-hidden duration-300"
            }
          >
            <div className="flex items-center justify-between ">
              <h6>On sale</h6>
              <div
                onClick={() => setOnSaleInput(!onSaleInput)}
                className={
                  onSaleInput
                    ? "flex items-center justify-end w-10 h-6 p-1 rounded-2xl bg-[black] delay-100 duration-500"
                    : "flex items-center justify-start w-10 h-6 p-1 rounded-2xl bg-[#707070] delay-100 duration-500"
                }
              >
                <div className="w-1/2 h-full bg-[white] rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <h6>In stock</h6>
              <div
                onClick={() => setInStockInput(!inStockInput)}
                className={
                  inStockInput
                    ? "flex items-center justify-end w-10 h-6 p-1 rounded-2xl bg-[black] delay-100 duration-500"
                    : "flex items-center justify-start w-10 h-6 p-1 rounded-2xl bg-[#707070] delay-100 duration-500"
                }
              >
                <div className="w-1/2 h-full bg-[white] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full flex-wrap py-5 md:py-0 md:px-5 md:gap-10">
          {data.map((product) => (
            <motion.div
              variants={introAnimation}
              initial="hidden"
              animate="visible"
              key={product.id}
              className="flex flex-col items-start gap-2 w-40 sm:w-52 md:w-64"
            >
              <div
                id="relative-home-page-card"
                className="relative w-full h-40 overflow-hidden sm:h-48 md:h-56 lg:h-60"
              >
                <img
                  src={product.image}
                  className="w-full h-full object-cover rounded-md "
                />
                <div
                  id="absolute-home-page-card"
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4"
                >
                  <h6 className="text-lg ">
                    {
                      navLinks.icons.find((icon) => icon.name == "shopIcon")
                        .icon
                    }
                  </h6>
                  <h6 className="text-lg ">
                    {navLinks.icons.find((icon) => icon.name == "eyeIcon").icon}
                  </h6>
                  <h6 className="text-lg ">
                    {
                      navLinks.icons.find((icon) => icon.name == "heartIcon")
                        .icon
                    }
                  </h6>
                </div>
              </div>
              <h6
                onClick={() => {
                  navigate("/product-page");
                  dispatch(actions.selectedProduct(product.id));
                }}
                className="text-lg font-bold"
              >
                {product.title.split(" ", 1).map((title) => title)}
              </h6>
              <h5
                onClick={() => {
                  navigate("/product-page");
                  dispatch(actions.selectedProduct(product.id));
                }}
                className="text-sm"
              >
                $ {product.price}
              </h5>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default ShopPage;
