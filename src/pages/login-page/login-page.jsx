//hooks
import React, { useState } from "react";
//components
import Register from "./register";
import SignIn from "./sign-in";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
//additonal
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  //uselocation-hook
  const location = useLocation();

  const [loginToggle, setLoginToggle] = useState(
    location.pathname == "/login"
      ? "signIn"
      : location.pathname == "/login/login/register"
      ? "register"
      : ""      
  );
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center w-full min-h-screen gap-10">
      <h4 className="font-bold text-xl mt-40 md:text-2xl">My account</h4>
      <div className="relative flex items-center w-full p-1 bg-gray1 rounded-lg overflow-hidden sm:w-80">
        <div
          onClick={() => {
            setLoginToggle("signIn");
            navigate("/login");
          }}
          className="relative z-20 flex items-center justify-center py-1 w-1/2"
        >
          <h6>sign in</h6>
        </div>
        <div
          onClick={() => {
            setLoginToggle("register");
            navigate("login/register");
          }}
          className="relative z-20 flex items-center justify-center py-1 w-1/2"
        >
          <h6>Register</h6>
        </div>
        <div
          id="loginToggle"
          className={
            loginToggle == "signIn"
              ? "absolute top-1/2 -translate-y-1/2 left-1 w-1/2 h-[80%] bg-[white] rounded-lg"
              : "absolute top-1/2 -translate-y-1/2 right-1 w-1/2 h-[80%] bg-[white] rounded-lg"
          }
        ></div>
      </div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="login/register" element={<Register />} />
      </Routes>
    </section>
  );
}

export default LoginPage;
