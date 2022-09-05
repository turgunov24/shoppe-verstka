//hooks
import React, { useState, useRef } from "react";
//additional
import "./shop-page-filter.css";
import { navLinks } from "../../data/navbar-data/navLinks";

function ShopPageFilter({ shopPageFilterToggle }) {
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

  return (
    <div
      className={
        shopPageFilterToggle
          ? "flex flex-col gap-3 md:w-48"
          : "hidden md:flex flex-col gap-3 w-48"
      }
    >
      <div className="relative">
        <input
          type="text"
          className="outline-none border-b border-[#D8D8D8] bg-[transparent] pr-6 py-3 w-full h-full"
          placeholder="Search..."
        />
        <button className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl border-none outline-none md:text-lg">
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
            {navLinks.icons.find((icon) => icon.name == "arrowDropdown").icon}
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
            {navLinks.icons.find((icon) => icon.name == "arrowDropdown").icon}
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
  );
}

export default ShopPageFilter;
