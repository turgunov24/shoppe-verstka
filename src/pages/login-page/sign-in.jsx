//hooks
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

//icons
import { AiFillCloseCircle } from "react-icons/ai";
//additional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { dataBase } from "../../data/firebase/firebase-setup";
import { collection, getDocs } from "firebase/firestore";
import { Checkbox } from "@mui/material";

function SignIn({ setIsLogged }) {
  //email-data
  const [signInEmail, setSignInEmail] = useState(null);
  const [signInEmailIcon, setSignInEmailIcon] = useState(false);
  const signInEmailRef = useRef("");
  //password-data
  const [signInPassword, setSignInPassword] = useState(null);
  const [signInPasswordIcon, setSignInPasswordIcon] = useState(false);
  const signInPasswordRef = useRef("");

  //input-refs
  const signInInputRefs = [signInEmailRef, signInPasswordRef];
  //navigate-hook
  const navigate = useNavigate();

  //////////////firebase-data////////////////
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);
  const [isChecking, setIsChecking] = useState("SIGN IN");

  useEffect(() => {
    const getUsers = async () => {
      setIsChecking("WAITING FOR CONNECT");
      const data = await getDocs(usersCollection);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsChecking("CHECKING");
    };
    getUsers();
  }, []);
  useEffect(() => {
    usersList && setIsChecking("SIGN IN");
  }, [usersList]);

  ////////////////////form-submit-function//////////////
  const signInFormSubmitted = (e) => {
    e.preventDefault();
    if (signInEmail && signInPassword) {
      setIsChecking("SEARCHING...");
      usersList.forEach((user) => {
        if (user.email == signInEmail && user.password == signInPassword) {
          setIsChecking("SUCCESS");

          setTimeout(() => {
            navigate("/home-page");

            localStorage.setItem(
              "user",
              JSON.stringify(
                usersList.find(
                  (user) =>
                    user.email == signInEmail && user.password == signInPassword
                )
              )
            );
          }, 1000);
        } else {
          setTimeout(() => {
            setIsChecking("NOT DEFINED");
          }, 1500);
        }
      });
    } else {
      signInInputRefs.forEach((input) => {
        if (input.current.value == "") {
          input.current.style.borderBottom = "1px solid red";
        }
      });
    }
  };

  return (
    <motion.form
      onSubmit={signInFormSubmitted}
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start gap-5 w-full py-10 sm:w-80"
    >
      <div className="relative w-full">
        <input
          ref={signInEmailRef}
          onChange={(e) => {
            setSignInEmail(e.target.value);
            e.target.value == ""
              ? setSignInEmailIcon(false)
              : setSignInEmailIcon(true);
            isChecking == "NOT DEFINED" && setIsChecking("SIGN IN");
            signInEmailRef.current.style.borderBottom = "1px solid #D8D8D8";
          }}
          value={signInEmail}
          type="email"
          placeholder="Email"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setSignInEmail("");
            setSignInEmailIcon(false);
            isChecking == "NOT DEFINED" && setIsChecking("SIGN IN");
          }}
          className={
            signInEmailIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0 "
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="relative w-full mt-5">
        <input
          ref={signInPasswordRef}
          onChange={(e) => {
            setSignInPassword(e.target.value);
            e.target.value == ""
              ? setSignInPasswordIcon(false)
              : setSignInPasswordIcon(true);
              isChecking == "NOT DEFINED" && setIsChecking("SIGN IN");
            signInPasswordRef.current.style.borderBottom = "1px solid #D8D8D8";
          }}
          value={signInPassword}
          type="password"
          placeholder="Password"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setSignInPassword("");
            setSignInPasswordIcon(false);
            isChecking == "NOT DEFINED" && setIsChecking("SIGN IN");
          }}
          className={
            signInPasswordIcon
              ? "absolute top-1/2 -translate-y-1/2 right-0 "
              : "hidden"
          }
        >
          <p>
            <AiFillCloseCircle />
          </p>
        </button>
      </div>
      <div className="flex gap-2 items-center">
        {/* <input type="checkbox" id="remember-password" /> */}
        <Checkbox
          // {...label}
          color="default"
          id="remember-password"
        />
        <label htmlFor="remember-password">Remember me</label>
      </div>
      <button id="btn-border-dark" className="w-full py-1 md:mt-10">
        {isChecking}
      </button>
      <Link to="/forgotten" className="w-full text-center text-sm">
        Have you forgotten your password?
      </Link>
    </motion.form>
  );
}

export default SignIn;
