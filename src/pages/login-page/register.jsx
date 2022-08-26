import React, { useState } from "react";

//icons
import { AiFillCloseCircle } from "react-icons/ai";

function Register() {
  //first-name-data
  const [registerFirstName, setregisterFirstName] = useState(null);
  const [registerFirstNameIcon, setregisterFirstNameIcon] = useState(false);
  //last-name-data
  const [registerLastName, setregisterLastName] = useState(null);
  const [registerLastNameIcon, setregisterLastNameIcon] = useState(false);
  //email-data
  const [registerEmail, setregisterEmail] = useState(null);
  const [registerEmailIcon, setregisterEmailIcon] = useState(false);
  //password-data
  const [registerPassword, setregisterPassword] = useState(null);
  const [registerPasswordIcon, setregisterPasswordIcon] = useState(false);

  return (
    <div className="flex flex-col items-start gap-5 w-full py-10 sm:w-80">
      <div className="relative w-full">
        <input
          onChange={(e) => {
            setregisterFirstName(e.target.value);
            e.target.value == ""
              ? setregisterFirstNameIcon(false)
              : setregisterFirstNameIcon(true);
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
        <input
          onChange={(e) => {
            setregisterLastName(e.target.value);
            e.target.value == ""
              ? setregisterLastNameIcon(false)
              : setregisterLastNameIcon(true);
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
        <input
          onChange={(e) => {
            setregisterEmail(e.target.value);
            e.target.value == ""
              ? setregisterEmailIcon(false)
              : setregisterEmailIcon(true);
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
        <input
          onChange={(e) => {
            setregisterPassword(e.target.value);
            e.target.value == ""
              ? setregisterPasswordIcon(false)
              : setregisterPasswordIcon(true);
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
    </div>
  );
}

export default Register;
