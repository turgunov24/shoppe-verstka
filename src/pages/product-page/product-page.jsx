//hooks
import React from "react";
//addtional
import "./product-page.css";
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";

function ProductPage() {
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen border "
    >
     <h4> product page</h4>
    </motion.section>
  );
}

export default ProductPage;
