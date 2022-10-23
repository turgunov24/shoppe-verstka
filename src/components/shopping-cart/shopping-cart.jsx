//hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//icons
import { CircularProgress } from "@mui/material";
//additional
import "./shopping-cart.css";
import { navLinks } from "../../data/navbar-data/navLinks";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dataBase } from "../../data/firebase/firebase-setup";

function ShoppingCart({ toggle, setToggle }) {
  const navigate = useNavigate();
  //FIREBASE
  const [shoppingBag, setShoppingBag] = useState(null);
  const [shoppingBagForCompare, setShoppingBagForCompare] = useState(null);
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);
  //get
  const getData = async () => {
    const data = await getDocs(usersCollection);
    setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setShoppingBagForCompare(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        ).shoppingbag
    );

  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (usersList) {
      setShoppingBag(
        usersList.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        ).shoppingbag
      );
    }
  }, [usersList]);
  //calculate-price-function
  const [totalPrice, setTotalPrice] = useState(0);
  const calculatePriceFunction = () => {
    let price = 0;
    shoppingBagForCompare.forEach((product) => {
      if (product.orderCount > 1) {
        price += product.orderCount * product.price;
      } else {
        price += product.price;
      }
    });
    setTotalPrice(Math.floor(price));
  };
  useEffect(() => {
    if (shoppingBag) {
      calculatePriceFunction();
    }
  }, [shoppingBag]);

  //update-order-count-function
  const updateOrderCountFunction = (productId, action) => {
    let product = shoppingBagForCompare.find(
      (product) => product.productId == productId
    );
    if (action == "INCREMENT") {
      product.orderCount += 1;
    } else {
      if (product.orderCount > 1) {
        product.orderCount -= 1;
      }
    }
    let newArr = shoppingBagForCompare.filter((a) => a.productId != productId);
    newArr.push(product);
    setShoppingBag(newArr);
  };

  return (
    <div
      id="shopping-cart"
      className={
        toggle
          ? "absolute top-0 right-0 z-50 duration-500 flex flex-col gap-5 px-3 py-1 w-full h-[100vh] bg-[#fff] opacity-100 md:w-96 md:border border-[#D8D8D8] md:px-5"
          : "absolute top-0 right-0 z-50 translate-x-full duration-500 flex flex-col gap-5 px-2 py-1 h-[100vh] bg-[#fff] opacity-0 md:w-96"
      }
    >
      <div className="relative flex justify-center items-center w-full py-2">
        <button
          onClick={() => setToggle(false)}
          className={
            toggle
              ? "absolute left-0 top-1/2 -translate-y-1/2 text-xl"
              : "absolute left-0 top-1/2 -translate-y-1/2 text-xl rotate-180 duration-200"
          }
        >
          {navLinks.icons.find((icon) => icon.name == "arrowDropdown").icon}
        </button>
        <h6 className="font-bold">Shopping bag</h6>
      </div>
      {shoppingBag ? (
        shoppingBag.length == 0 ? (
          <p>no items</p>
        ) : (
          <div className="flex flex-col items-start gap-1 w-full">
            <p>{shoppingBag.length} items</p>
            <div className="flex flex-col gap-5 w-full overflow-y-scroll">
              {shoppingBag
                .sort((a, b) => a.productId - b.productId)
                .map((product, index) => (
                  <div
                    key={index}
                    className="flex items-start w-full gap-3 sm:gap-4 md:gap-5 md:border-b md:border-[#D8D8D8]"
                  >
                    <img
                      src={product.image}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex flex-col items-start gap-2 h-full">
                      <h6 className="text-sm font-bold">
                        {product.title.split(" ", 2).join(" ").trim()}
                      </h6>
                      <p>{product.category}</p>
                      <p>$ {product.price}</p>
                      <div className="flex justify-center items-center bg-gray1 text-sm rounded-md overflow-hidden">
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
                    <div
                      // onClick={() => deleteData(product.productId)}
                      className="font-bold ml-auto"
                    >
                      {
                        navLinks.icons.find((icon) => icon.name == "closeIcon")
                          .icon
                      }
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )
      ) : (
        <CircularProgress />
      )}
      {shoppingBag && shoppingBag.length != 0 && (
        <div className="absolute bottom-0 left-0 flex flex-col items-center w-full py-5 px-3 gap-4 border border-[#D8D8D8] md:px-5">
          <div className="flex items-center justify-between w-full">
            <h6>Subtotal ({shoppingBag.length} items)</h6>
            <h6>$ {totalPrice}</h6>
          </div>
          <button
            onClick={() => navigate("/shopping-cart-page")}
            id="btn-dark"
            className="w-full py-1"
          >
            VIEW CART
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
