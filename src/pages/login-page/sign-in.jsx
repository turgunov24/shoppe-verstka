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

function SignIn({ setIsLogged }) {
  //email-data
  const [signInEmail, setSignInEmail] = useState(null);
  const [signInEmailIcon, setSignInEmailIcon] = useState(false);
  const signInEmailRef = useRef("");
  //password-data
  const [signInPassword, setSignInPassword] = useState(null);
  const [signInPasswordIcon, setSignInPasswordIcon] = useState(false);
  const signInPasswordRef = useRef("");
  //navigate-hook
  const navigate = useNavigate();

  //////////////firebase-data////////////////
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);

  /////////////get-users-data///////////
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  ////////////////////form-submit-function//////////////
  const signInFormSubmitted = (e) => {
    e.preventDefault();
    if (signInEmail && signInPassword) {
      usersList.forEach((user) => {
        if (user.email == signInEmail && user.password == signInPassword) {
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
          setIsLogged(true)
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
            signInPasswordRef.current.style.borderBottom = "1px solid #D8D8D8";
          }}
          value={signInPassword}
          type="number"
          placeholder="Password"
          className="border-b border-[#D8D8D8] outline-none w-full py-1"
        />
        <button
          onClick={() => {
            setSignInPassword("");
            setSignInPasswordIcon(false);
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
        <input type="checkbox" id="remember-password" />
        <label htmlFor="remember-password">Remember me</label>
      </div>
      <button id="btn-border-dark" className="w-full py-1 md:mt-10">
        SIGN IN
      </button>
      <Link to="/forgotten" className="w-full text-center text-sm">
        Have you forgotten your password?
      </Link>
    </motion.form>
  );
}

export default SignIn;
