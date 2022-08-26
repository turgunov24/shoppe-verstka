import React, { useState } from "react";
import { Link } from "react-router-dom";

//icons
import { AiFillCloseCircle } from "react-icons/ai";

function SignIn() {
  const [signInEmail, setSignInEmail] = useState(null);
  const [signInEmailIcon, setSignInEmailIcon] = useState(false);
  const [signInPassword, setSignInPassword] = useState(null);
  const [signInPasswordIcon, setSignInPasswordIcon] = useState(false);

  return (
    <div className="flex flex-col items-start gap-5 w-full py-10 sm:w-80">
      <div className="relative w-full">
        <input
          onChange={(e) => {
            setSignInEmail(e.target.value);
            e.target.value == ""
              ? setSignInEmailIcon(false)
              : setSignInEmailIcon(true);
          }}
          value={signInEmail}
          type="text"
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
          onChange={(e) => {
            setSignInPassword(e.target.value);
            e.target.value == ""
              ? setSignInPasswordIcon(false)
              : setSignInPasswordIcon(true);
          }}
          value={signInPassword}
          type="text"
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
      <Link to="/forgotten" className="w-full text-center text-sm">Have you forgotten your password?</Link>
    </div>
  );
}

export default SignIn;
