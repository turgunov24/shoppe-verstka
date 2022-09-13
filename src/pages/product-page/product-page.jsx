//hooks
import React, { useState } from "react";
import { useSelector } from "react-redux";
//icons
import { GiShare } from "react-icons/gi";
import { AiTwotoneStar } from "react-icons/ai";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//addtional
import "./product-page.css";
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import ProductPageSwiper from "./product-page-swiper/product-page-swiper";

function ProductPage() {
  //useselector-hook
  const selectedProduct = useSelector((state) => state.getAllData.selectedData);
  console.log(selectedProduct);
  //rating-yellow
  const [allRatingCounts, setAllRatingCounts] = useState([]);
  for (let i = 0; i < Math.floor(selectedProduct[0].rating.rate); i++) {
    allRatingCounts.push(`${i}`);
  }
  //rating-black
  const [residueRatingCounts, setResidueRatingCounts] = useState([]);
  if (5 - Math.floor(selectedProduct[0].rating.rate) == 0) {
    setResidueRatingCounts("EMPTY");
  } else {
    for (let i = 0; i < 5 - Math.floor(selectedProduct[0].rating.rate); i++) {
      residueRatingCounts.push(`${i}`);
    }
  }
  console.log(allRatingCounts);
  console.log(residueRatingCounts);

  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <div className="border flex flex-col gap-5 w-full h-max mt-28 md:flex-row md:h-96">
        <ProductPageSwiper />
        {selectedProduct &&
          selectedProduct.map((product) => (
            <div className="border border-[red] flex flex-col w-full gap-2 sm:w-11/12 md:w-[700px]  md:gap-3">
              <h4 className="text-xl font-bold">
                {product.title.split(" ", 1).join("")}
              </h4>
              <div className="border flex justify-between items-center md:text-lg font-bold">
                <h5>$ {product.price}</h5>
                <h4 className="text-2xl md:hidden">
                  <GiShare />
                </h4>
              </div>
              <div className="hidden md:flex justify-between">
                <div className="flex justify-between items-center">
                  {allRatingCounts.map((icon) => (
                    <h5>
                      <AiTwotoneStar />
                    </h5>
                  ))}
                  {residueRatingCounts != "EMPTY" &&
                    residueRatingCounts.map((icon) => (
                      <h6>
                        <AiTwotoneStar />
                      </h6>
                    ))}
                </div>
                <p className="md:hidden">Rating</p>
                <p className="hidden md:block">1 customer review</p>
              </div>
              <div className="">
                <div className="border flex justify-between">
                  <div className="hidden sm:flex items-center bg-gray1 ">
                    <button className="flex items-center justify-center text-[#707070] h-full px-3">
                      -
                    </button>
                    <div className="flex items-center justify-center text-[#707070] h-full px-2">
                      1
                    </div>
                    <button className="flex items-center justify-center text-[#707070] h-full px-3">
                      +
                    </button>
                  </div>
                  <button id="btn-dark" className="w-full py-1 sm:w-96 md:w-80 md:py-2">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </motion.section>
  );
}

export default ProductPage;
