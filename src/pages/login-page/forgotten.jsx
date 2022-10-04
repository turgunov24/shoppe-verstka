//hooks
import React, { useEffect, useState, useRef } from "react";

//icons
import { AiFillCloseCircle } from "react-icons/ai";
//components
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import ForgottenPageSnackbar from "./forgotten-page-alert/forgotten-page-alert";

//additional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../data/firebase/firebase-setup";
function Forgotten() {
  //input-data
  const [forgottenInput, setforgottenInput] = useState(null);
  const [forgottenInputIcon, setforgottenInputIcon] = useState(false);
  const forgottenInputRef = useRef("");
  //forgotten-page-alert-toggle
  const [forgottenPageAlertToggle, setForgottenPageAlertToggle] =
    useState(false);
  ///////////firebase-data///////
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);
  //get
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(usersCollection);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);
  ////////form-submit/////
  const forgottenFormSubmitted = (e) => {
    e.preventDefault();
    forgottenInputRef.current.value != ""
      ? alert(
          usersList.find((user) => user.email == forgottenInput)
            ? `your password is ${
                usersList.find((user) => user.email == forgottenInput).password
              }`
            : "user is not defined"
        )
      : (forgottenInputRef.current.style.borderBottom = "1px solid red");
  };
  return (
    <motion.form
      onSubmit={forgottenFormSubmitted}
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full min-h-screen gap-7"
    >
      <Navbar />
      <h4 className="text-lg font-bold mt-32 text-center md:text-2xl">
        Have you Forgotten Your Password ?
      </h4>
      <h6 className="text-sm text-start md:text-md sm:text-center">
        If you've forgotten your password, enter your e-mail{" "}
        <br className="hidden sm:block" /> address and we'll send you an e-mail
      </h6>
      <div className="relative w-full mt-5 sm:w-80">
        <input
          ref={forgottenInputRef}
          onChange={(e) => {
            setforgottenInput(e.target.value);
            e.target.value == ""
              ? setforgottenInputIcon(false)
              : setforgottenInputIcon(true);
            forgottenInputRef.current.style.borderBottom = "1px solid #D8D8D8";
          }}
          value={forgottenInput}
          type="email"
          placeholder="Email"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setforgottenInput("");
            setforgottenInputIcon(false);
          }}
          className={
            forgottenInputIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0 "
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <button id="btn-border-dark" className="w-full py-1 mt-5 sm:w-80">
        RESET PASSWORD
      </button>
      <Footer />
      <ForgottenPageSnackbar
        forgottenPageAlertToggle={forgottenPageAlertToggle}
      />
    </motion.form>
  );
}

export default Forgotten;
