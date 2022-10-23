//hooks
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
//icons
import { AiFillCloseCircle } from "react-icons/ai";

//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

//additional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { dataBase } from "../../data/firebase/firebase-setup";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { navLinks } from "../../data/navbar-data/navLinks";
import CalculateShippingSelects from "./calculate-shipping-selects/calculate-shipping-selects";

function ShoppingCartPage() {
  const navigate = useNavigate();
  //apply-coupon-input-data
  const [applyCouponInput, setApplyCouponInput] = useState(null);
  const [applyCouponIcon, setapplyCouponIcon] = useState(false);
  const applyCouponInputRef = useRef("");
  //calculate-shipping-data
  const [calculateShippingDropdown, setCalculateShippingDropdown] =
    useState(false);
  const [calculateShippingDropdownIcon, setCalculateShippingDropdownIcon] =
    useState(false);

  //update-localstorage-function
  const updateLocalstorage = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        usersData.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        )
      )
    );
  };

  //----------------FIREBASE-------------//
  const shoppingBagCollection = collection(dataBase, "login-base");
  const [usersData, setUsersData] = useState(null);
  const [shoppingBag, setShoppingBag] = useState(null);
  const [orderPrices, setOrderPrices] = useState(0);
  const [calculatePriceToggle, setCalculatePriceToggle] = useState(false);
  // let orderPrices = 0;
  const [shoppingBagForCompare, setshoppingBagForCompare] = useState(null);
  const [updateCartButtonText, setUpdateCartButtonText] =
    useState("UPDATE CART");
  const [updateShoppingCartToggle, setUpdateShoppingCartToggle] =
    useState(false);
  const userDoc = doc(
    dataBase,
    "login-base",
    JSON.parse(localStorage.getItem("user")).id
  );
  //get
  const getData = async () => {
    const data = await getDocs(shoppingBagCollection);
    setUsersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setshoppingBagForCompare(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        )
        .shoppingbag.sort((a, b) => a.productId - b.productId)
    );
    setUpdateShoppingCartToggle(false);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (updateShoppingCartToggle) {
      getData();
      setCalculatePriceToggle(false);
    } else {
      if (usersData) {
        updateLocalstorage();
        setCalculatePriceToggle(true);
      }
    }
  }, [updateShoppingCartToggle]);
  
  useEffect(() => {
    if (usersData) {
      setShoppingBag(
        usersData.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        ).shoppingbag
      );
      setCalculatePriceToggle(true);
    }
  }, [usersData]);

  //calculating-price
  useEffect(() => {
    if (calculatePriceToggle) {
      if (shoppingBag.length != 0) {
        let allPrice = 0;
        shoppingBag.forEach((product) => {
          if (product.orderCount > 1) {
            allPrice += product.orderCount * product.price;
          } else {
            allPrice += product.price;
          }
        });
        setOrderPrices(allPrice);
      }
    }
  }, [calculatePriceToggle]);
  // const calculatePriceFunction = () => {
  //   if (shoppingBag) {
  //     if (shoppingBag.length != 0) {
  //       let allPrice = 0;
  //       shoppingBag.forEach((product) => {
  //         if (product.orderCount > 1) {
  //           allPrice += product.orderCount * product.price;
  //         } else {
  //           allPrice += product.price;
  //         }
  //       });
  //       setOrderPrices(allPrice)

  //     }
  //   }
  // };
  // useMemo(() => calculatePriceFunction(), shoppingBagForCompare);

  //update-order-count-function
  const updateOrderCountFunction = (id, event) => {
    const updatingProduct = shoppingBag.find(
      (product) => product.productId == id
    );
    const arrForPush = shoppingBag.filter((product) => product.productId != id);
    if (event == "INCREMENT") {
      updatingProduct.orderCount += 1;
      arrForPush.push(updatingProduct);
      setShoppingBag(arrForPush);
    } else {
      if (updatingProduct.orderCount > 1) {
        updatingProduct.orderCount -= 1;
        arrForPush.push(updatingProduct);
        setShoppingBag(arrForPush);
      }
    }
  };
  //update-shopping-bag-function
  const updateShoppingBagFunction = () => {
    let isChanged = 0;
    for (let i = 0; i < shoppingBag.length; i++) {
      if (shoppingBag[i].orderCount != shoppingBagForCompare[i].orderCount) {
        isChanged += 1;
      }
    }
    if (isChanged != 0) {
      const updateData = async () => {
        setUpdateCartButtonText("UPDATING...");
        await updateDoc(userDoc, {
          shoppingbag: shoppingBag,
        });
        setUpdateShoppingCartToggle(true);
        setUpdateCartButtonText("UPDATED");
        getData();
        setTimeout(() => {
          setUpdateCartButtonText("UPDATE CART");
        }, 1500);
      };

      updateData();
    }
  };
  //delete
  const deleteData = async (id) => {
    shoppingBag.find((product) => product.productId == id);

    await updateDoc(userDoc, {
      shoppingbag: shoppingBag.filter((product) => product.productId != id),
    });
    setUpdateShoppingCartToggle(true);
  };

  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <h4 className="text-start text-lg font-bold w-full mt-28 md:text-2xl md:text-center">
        Shopping Cart
      </h4>
      <div className="flex flex-col w-full gap-10 md:flex-row justify-between items-center">
        <div className="flex flex-col items-end gap-5 w-full md:w-[550px]">
          <div className="flex flex-col items-center w-full h-max gap-5 overflow-y-none md:overflow-y-scroll md:h-[400px]">
            {shoppingBag ? (
              shoppingBag.length == 0 ? (
                <p>no items</p>
              ) : (
                shoppingBag
                  .sort((a, b) => a.productId - b.productId)
                  .map((product, index) => (
                    <div
                      key={index}
                      className="flex items-start w-full pb-3 gap-3 sm:gap-4 md:gap-5 md:pb-5 md:border-b md:border-[#D8D8D8] xl:gap-7"
                    >
                      <img
                        src={product.image}
                        className="w-32 h-32 object-cover rounded-md md:w-36 md:h-36"
                      />
                      <div className="flex flex-col items-start gap-2 h-full">
                        <h6 className="text-sm font-bold">
                          {product.title.split(" ", 2).join(" ").trim()}
                        </h6>
                        <p>{product.category}</p>
                        <p>$ {product.price}</p>
                        <div className="flex justify-center items-center bg-gray1 text-sm rounded-md overflow-hidden lg:hidden">
                          <button
                            onClick={() =>
                              updateOrderCountFunction(
                                product.productId,
                                "DECREMENT"
                              )
                            }
                            className="px-2 py-1"
                          >
                            -
                          </button>
                          <div className="px-2 py-1">{product.orderCount}</div>
                          <button
                            onClick={() =>
                              updateOrderCountFunction(
                                product.productId,
                                "INCREMENT"
                              )
                            }
                            className="px-2 py-1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="hidden lg:flex justify-center items-center bg-gray1 text-sm rounded-md overflow-hidden ml-auto">
                        <button
                          onClick={() =>
                            updateOrderCountFunction(
                              product.productId,
                              "DECREMENT"
                            )
                          }
                          className="px-3 py-2"
                        >
                          -
                        </button>
                        <div className="px-3 py-2">{product.orderCount}</div>
                        <button
                          onClick={() =>
                            updateOrderCountFunction(
                              product.productId,
                              "INCREMENT"
                            )
                          }
                          className="px-3 py-2"
                        >
                          +
                        </button>
                      </div>
                      <div
                        onClick={() => deleteData(product.productId)}
                        className="font-bold ml-auto lg:ml-0"
                      >
                        {
                          navLinks.icons.find(
                            (icon) => icon.name == "closeIcon"
                          ).icon
                        }
                      </div>
                    </div>
                  ))
              )
            ) : (
              <CircularProgress />
            )}
          </div>
          {/* -------------- */}
          <button
            onClick={() => {
              shoppingBagForCompare
                ? updateShoppingBagFunction()
                : console.log("ozgarmangan");
            }}
            id="btn-dark"
            className="w-full py-1 sm:w-44 md:w-36 lg:w-56"
          >
            {updateCartButtonText}
          </button>
          <div className="flex flex-col w-full gap-5 sm:flex-row justify-between">
            <div className="relative w-full sm:w-1/2 md:w-40 lg:w-1/2">
              <input
                onChange={(e) => {
                  setApplyCouponInput(e.target.value);
                  e.target.value == ""
                    ? setapplyCouponIcon(false)
                    : setapplyCouponIcon(true);
                }}
                value={applyCouponInput}
                type="text"
                placeholder="Coupon Code"
                className="border-b border-[#D8D8D8] outline-none w-full py-1"
              />
              <button
                onClick={() => {
                  setApplyCouponInput("");
                  setapplyCouponIcon(false);
                }}
                className={
                  applyCouponIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-0"
                    : "hidden"
                }
              >
                <p>
                  <AiFillCloseCircle />
                </p>
              </button>
            </div>
            <button
              id="btn-border-dark"
              className="py-1 w-full sm:w-44 md:w-36 lg:w-56"
            >
              APPLY COUPON
            </button>
          </div>
        </div>
        <div className=" bg-gray1 flex flex-col items-end gap-5 px-3 pt-5 pb-16 w-full rounded-md md:w-[450px] md:px-5 md:pt-7 md:bg-[white]">
          <h4 className="font-bold w-full text-start text-lg">Cart totals</h4>
          <div className="flex justify-between w-full gap-10">
            <h4 className="font-bold text-sm">SUBTOTAL</h4>
            <p className="w-44 text-start sm:w-56">
              $
              {shoppingBag
                ? shoppingBag.length != 0
                  ? orderPrices
                  : 0
                : "Calculating ..."}
            </p>
          </div>
          <div className="flex justify-between w-full gap-10">
            <h4 className="font-bold text-sm">SHIPPING</h4>
            <p className="text-sm text-start w-44 sm:w-56">
              Shipping costs will be calculated once you have provided address
            </p>
          </div>
          <div
            className={
              calculateShippingDropdown
                ? "flex flex-col w-44 h-max gap-5 overflow-hidden sm:w-56"
                : "flex flex-col w-44 h-8 gap-5 overflow-hidden sm:w-56"
            }
          >
            <div
              className="relative w-full h-8"
              onClick={() => {
                setCalculateShippingDropdown(!calculateShippingDropdown);
                setCalculateShippingDropdownIcon(
                  !calculateShippingDropdownIcon
                );
              }}
            >
              <input
                type="text"
                disabled
                value={"Calculate Shipping"}
                className="w-full h-full font-bold"
              />
              <h4
                className={
                  calculateShippingDropdown
                    ? "absolute top-1/2 -translate-y-1/2 right-2 rotate-90 duration-200 text-sm"
                    : "absolute top-1/2 -translate-y-1/2 right-2 -rotate-90 duration-200 text-sm"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <CalculateShippingSelects />
            <button id="btn-border-white" className="w-full py-1 mt-2">
              UPDATE TOTALS
            </button>
          </div>
          <div className="w-full h-[2px] bg-whiteGray rounded-md"></div>
          <div className="flex justify-between w-full">
            <h4 className="font-bold">TOTAL</h4>
            <p className="md:text-[#000] font-bold">
              {" "}
              $
              {shoppingBag
                ? shoppingBag.length != 0
                  ? orderPrices + 5
                  : 0
                : "Calculating ..."}
            </p>
          </div>
          <div className="flex justify-center w-full">
            <button
              onClick={() => {
                shoppingBag.length != 0 && navigate("/checkout-page");
              }}
              id="btn-border-dark"
              className="w-full py-1 mt-5 sm:w-8/12 md:w-full"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default ShoppingCartPage;
