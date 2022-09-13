//hooks
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//icons
import { AiFillCloseCircle } from "react-icons/ai";

//additional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { dataBase } from "../../data/firebase/firebase-setup";
import { collection,getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

function Register() {
  //useNavigate-hook
  const navigate = useNavigate();
  //first-name-data
  const [registerFirstName, setregisterFirstName] = useState(null);
  const [registerFirstNameIcon, setregisterFirstNameIcon] = useState(false);
  const registerFirstNameInputRef = useRef("");
  //last-name-data
  const [registerLastName, setregisterLastName] = useState(null);
  const [registerLastNameIcon, setregisterLastNameIcon] = useState(false);
  const registerLastNameInputRef = useRef("");
  //email-data
  const [registerEmail, setregisterEmail] = useState(null);
  const [registerEmailIcon, setregisterEmailIcon] = useState(false);
  const registerEmailInputRef = useRef("");
  //password-data
  const [registerPassword, setregisterPassword] = useState(null);
  const [registerPasswordIcon, setregisterPasswordIcon] = useState(false);
  const registerPasswordInputRef = useRef("");

  //////firebase-data////
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);
  console.log(usersList);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      console.log(data);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers()

  }, []);

  const allInputs = [
    registerFirstNameInputRef,
    registerLastNameInputRef,
    registerEmailInputRef,
    registerPasswordInputRef,
  ];

  const signUpFormSubmitted = (e) => {
    e.preventDefault();
    if (
      registerFirstName &&
      registerLastName &&
      registerEmail &&
      registerPassword
    ) {
      navigate("/home-page");
    } else {
      allInputs.forEach((e) => {
        if (e.current.value == "") {
          e.current.style.borderBottom = "1px solid red";
          e.current.style.transitionDuration = "0.4s";
        }
      });
    }
  };

  return (
    <motion.form
      onSubmit={signUpFormSubmitted}
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start gap-5 w-full py-10 sm:w-80"
    >
      <div className="relative w-full">
        <motion.input
          ref={registerFirstNameInputRef}
          onChange={(e) => {
            setregisterFirstName(e.target.value);
            e.target.value == ""
              ? setregisterFirstNameIcon(false)
              : setregisterFirstNameIcon(true);
            registerFirstNameInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          value={registerFirstName}
          type="text"
          placeholder="First Name"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setregisterFirstName("");
            setregisterFirstNameIcon(false);
            registerFirstNameInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          className={
            registerFirstNameIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0"
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="relative w-full mt-5">
        <motion.input
          ref={registerLastNameInputRef}
          onChange={(e) => {
            setregisterLastName(e.target.value);
            e.target.value == ""
              ? setregisterLastNameIcon(false)
              : setregisterLastNameIcon(true);
            registerLastNameInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          value={registerLastName}
          type="text"
          placeholder="Last Name"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setregisterLastName("");
            setregisterLastNameIcon(false);
            registerLastNameInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          className={
            registerLastNameIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0"
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="relative w-full mt-5">
        <motion.input
          ref={registerEmailInputRef}
          onChange={(e) => {
            setregisterEmail(e.target.value);
            e.target.value == ""
              ? setregisterEmailIcon(false)
              : setregisterEmailIcon(true);
            registerEmailInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          value={registerEmail}
          type="text"
          placeholder="Email"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setregisterEmail("");
            setregisterEmailIcon(false);
            registerEmailInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          className={
            registerEmailIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0"
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="relative w-full mt-5">
        <motion.input
          ref={registerPasswordInputRef}
          onChange={(e) => {
            setregisterPassword(e.target.value);
            e.target.value == ""
              ? setregisterPasswordIcon(false)
              : setregisterPasswordIcon(true);
            registerPasswordInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          value={registerPassword}
          type="text"
          placeholder="Password"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setregisterPassword("");
            setregisterPasswordIcon(false);
            registerPasswordInputRef.current.style.borderBottom =
              "1px solid #D8D8D8";
          }}
          className={
            registerPasswordIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0"
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input type="checkbox" id="remember-password" />
        <label htmlFor="remember-password">Remember me</label>
      </div>
      <button id="btn-border-dark" className="w-full py-1 md:mt-10">
        REGISTER
      </button>
    </motion.form>
  );
}

export default Register;
