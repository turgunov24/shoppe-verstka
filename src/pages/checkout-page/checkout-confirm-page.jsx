//hooks
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//icons
import { BsCheckCircleFill } from "react-icons/bs";
import { CircularProgress } from "@mui/material";
//components
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
//additional
import { motion } from "framer-motion";
import {
  introAnimation,
  alert,
} from "../../data/framer-motion/intro-animation";
import { dataBase } from "../../data/firebase/firebase-setup";
import { getDocs, collection } from "firebase/firestore";

function CheckoutConfirmPage() {
  const selectedOrder = useSelector((state) => state.getAllData.selectedOrder);
  console.log(selectedOrder);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);
  //calculate-price
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    selectedOrder.order.forEach((product) => {
      if (product.orderCount < 2) {
        price += product.price;
      } else {
        price += product.orderCount * product.price;
      }
    });
    setTotalPrice(price);
  }, []);
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 w-full min-h-screen"
    >
      <Navbar />
      <motion.div
        variants={alert}
        initial="hidden"
        animate="visible"
        className="w-full border-t border-[#A18A68] bg-gray1 flex items-center p-3 gap-3 mt-32 md:px-7"
      >
        <h5>
          <BsCheckCircleFill />
        </h5>
        <h6 className="text-sm">We've recieved your order</h6>
      </motion.div>
      <div className="flex flex-col w-full gap-5 md:flex-row justify-between">
        <div className="flex flex-col w-full gap-5 md:w-[400px] lg:w-[450px] xl:w-[500px]">
          <h4 className="text-lg font-bold w-full md:text-xl">Order Details</h4>
          <div className="flex flex-col gap-5 w-full md:flex-row">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>ORDER NUMBER</h4>
                <p>{selectedOrder.orderNumber ? selectedOrder.orderNumber : 1}</p>
              </div>
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>EMAIL</h4>
                <p>{user.email}</p>
              </div>
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>PAYMENT METHOD</h4>
                <p>{selectedOrder.cardNumber}</p>
              </div>
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>ORDER DATE</h4>
                <p>{`${
                  selectedOrder.orderDate.split(" ", 2)[
                    selectedOrder.orderDate.split(" ", 2).length - 1
                  ]
                } ${
                  selectedOrder.orderDate.split(" ", 3)[
                    selectedOrder.orderDate.split(" ", 3).length - 1
                  ]
                },${
                  selectedOrder.orderDate.split(" ", 4)[
                    selectedOrder.orderDate.split(" ", 4).length - 1
                  ]
                }`}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>DELIVERY OPTIONS</h4>
                <p>Standart delivery</p>
              </div>
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>DELIVERY ADDRESS</h4>
                <p>{user.streetAddress}</p>
                <p>{user.city}</p>
                <p>{user.country}</p>
              </div>
              <div className="flex flex-col justify-between w-full gap-1">
                <h4>CONTACT NUMBER</h4>
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
          <h4 className="text-lg font-bold w-full md:text-xl">Order Summary</h4>
          <div className="flex flex-col w-full bg-gray1 rounded-md p-5 gap-5 md:p-10 md:rounded-none">
            <div className="flex items-center justify-between flex-wrap">
              <h4>PRODUCT</h4>
              <h4>TOTAL</h4>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex flex-col items-center w-full gap-5">
              {selectedOrder.order.map((product) => (
                <div className="flex items-center justify-between w-full">
                  <p>{product.title.split(" ", 2)}</p>
                  <p>
                    ${" "}
                    {product.orderCount > 1
                      ? (product.orderCount * product.price)
                          .toString()
                          .split(".", 1)
                      : product.price.toString().split(".", 1)}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>SUBTOTAL</h4>
              <p>$ {totalPrice.toString().split(".", 1)}</p>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>SHIPPING</h4>
              <p>Free shipping</p>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>TOTAL</h4>
              <h4 className="font-bold">
                $ {Number(totalPrice.toString().split(".", 1)) + 5}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default CheckoutConfirmPage;
