//hooks
import React from "react";
import { useNavigate } from "react-router-dom";
//additional
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { motion } from "framer-motion";

function ErrorPage() {
  //useNavigate-hook
  const navigate = useNavigate();
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center gap-5 w-full min-h-screen"
    >
      <h4 className="text-2xl font-bold">404 ERROR</h4>
      <p className="w-full text-center">
        This page not Found; <br />
        back to home and start again
      </p>
      <button
        onClick={() => navigate("/home-page")}
        id="btn-dark"
        className="py-2 px-7"
      >
        HOMEPAGE
      </button>
    </motion.section>
  );
}

export default ErrorPage;
