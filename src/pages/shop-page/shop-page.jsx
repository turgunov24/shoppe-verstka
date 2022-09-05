//hooks
import React, { useState } from "react";
import { useSelector } from "react-redux";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ShopPageFilter from "../../components/shop-page-filter/shop-page-filter";

//addtional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { navLinks } from "../../data/navbar-data/navLinks";

function ShopPage() {
  //all-data
  const products = useSelector(data => data.getAllData.data)
  





  //shop-page-filter-component-toggle
  const [shopPageFilterToggle, setShopPageFilterToggle] = useState(false);
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 w-full min-h-screen"
    >
      <Navbar />
      <h4 className="mt-32 text-lg font-bold md:hidden">Shop</h4>
      <h4 className="hidden md:block mt-32 text-2xl font-bold">
        Shop The Latest
      </h4>
      <div className="flex items-center justify-start gap-3 md:hidden">
        <h5 className="text-lg -rotate-90">
          {navLinks.icons.find((icon) => icon.name == "filterIcon").icon}
        </h5>
        <h5 onClick={() => setShopPageFilterToggle(!shopPageFilterToggle)}>
          Filters
        </h5>
      </div>
      <div className="flex flex-col flex-grow md:flex-row">
        <ShopPageFilter shopPageFilterToggle={shopPageFilterToggle} />
        <div className="flex gap-5 flex-grow flex-wrap py-5 border md:py-0 md:px-5 ">
          asd
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default ShopPage;
