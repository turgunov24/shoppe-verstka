//hooks
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//pages
import HomePageSwiper from "./home-page-swiper/home-page-swiper";
import HomepageCategorySwiper from "./home-page-category-swiper/home-page-category-swiper";
//componenets
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//additional
import "./home-page.css";
import { navLinks } from "../../data/navbar-data/navLinks";
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { actions } from "../../data/redux/reducers/allData";
   
  console.log(localStorage.getItem("user"));


function HomePage() {
  //selector-hook
  const products = useSelector((data) => data.getAllData.data);
  //dispatch-hook
  const dispatch = useDispatch();
  //navigate-hook
  const navigate = useNavigate();
  //dispatch-hook
  // const dispatch = useDispatch(getData());
  //filter-data
  const [viewAll, setViewAll] = useState("View all");


  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <HomepageCategorySwiper data={products} categoryName={setViewAll} />
      <HomePageSwiper data={products} />
      <div className="flex items-center justify-between w-full py-2">
        <h4 className="font-bold md:text-xl">Shop The Latest</h4>
        <h5
          onClick={() =>
            setViewAll(viewAll == "View some" ? "View all" : "View some")
          }
        >
          {viewAll == "View some" ? "View some" : "View all"}
        </h5>
      </div>
      <div className="flex flex-wrap items-start w-full gap-3 md:gap-10">
        {viewAll == "View some"
          ? products.map((product, index) => (
              <motion.div
                variants={introAnimation}
                initial="hidden"
                animate="visible"
                key={index}
                className="flex flex-col items-start gap-2 w-40 sm:w-52 md:w-64"
              >
                <div
                  id="relative-home-page-card"
                  className="relative w-full h-40 overflow-hidden sm:h-48 md:h-56 lg:h-60"
                >
                  <img
                    src={product.image}
                    className="w-full h-full object-cover rounded-md "
                  />
                  <div
                    id="absolute-home-page-card"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4"
                  >
                    <h6 className="text-lg ">{navLinks.icons[0].shopIcon}</h6>
                    <h6 className="text-lg ">
                      {navLinks.icons[navLinks.icons.length - 1].eyeIcon}
                    </h6>
                    <h6 className="text-lg ">
                      {navLinks.icons[navLinks.icons.length - 2].heartIcon}
                    </h6>
                  </div>
                </div>
                <h6
                  onClick={() => {
                    navigate("/product-page");
                    dispatch(actions.selectedProduct(product.id))
                  }}
                  className="text-lg font-bold"
                >
                  {product.title.split(" ", 1).map((title) => title)}
                </h6>
                <h5
                  onClick={() => {
                    navigate("/product-page");
                    dispatch(actions.selectedProduct(product.id))
                  }}
                  className="text-sm"
                >
                  $ {product.price}
                </h5>
              </motion.div>
            ))
          : viewAll == "View all"
          ? products.slice(0, 7).map((product, index) => (
              <motion.div
                variants={introAnimation}
                initial="hidden"
                animate="visible"
                key={index}
                className="flex flex-col items-start gap-2 w-40 sm:w-52 md:w-64"
              >
                <div
                  id="relative-home-page-card"
                  className="relative w-full h-40 overflow-hidden sm:h-48 md:h-56 lg:h-60"
                >
                  <img
                    src={product.image}
                    className="w-full h-full object-cover rounded-md "
                  />
                  <div
                    id="absolute-home-page-card"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4"
                  >
                    <h6 className="text-lg ">{navLinks.icons.find(icon => icon.name == "shopIcon").icon}</h6>
                    <h6 className="text-lg ">
                      {navLinks.icons.find(icon => icon.name == "eyeIcon").icon}
                    </h6>
                    <h6 className="text-lg ">
                      {navLinks.icons.find(icon => icon.name == "heartIcon").icon}
                    </h6>
                  </div>
                </div>
                <h6
                  onClick={() => {
                    navigate("/product-page");
                    dispatch(actions.selectedProduct(product.id))
                  }}
                  className="text-lg font-bold"
                >
                  {product.title.split(" ", 1).map((title) => title)}
                </h6>
                <h5
                  onClick={() => {
                    navigate("/product-page");
                    dispatch(actions.selectedProduct(product.id))
                  }}
                  className="text-sm"
                >
                  $ {product.price}
                </h5>
              </motion.div>
            ))
          : products
              .filter((product) => product.category == viewAll)
              .map((product, index) => (
                <motion.div
                  variants={introAnimation}
                  initial="hidden"
                  animate="visible"
                  key={index}
                  className="flex flex-col items-start gap-2 w-40 sm:w-52 md:w-64"
                >
                  <div
                    id="relative-home-page-card"
                    className="relative w-full h-40 overflow-hidden sm:h-48 md:h-56 lg:h-60"
                  >
                    <img
                      src={product.image}
                      className="w-full h-full object-cover rounded-md "
                    />
                    <div
                      id="absolute-home-page-card"
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4"
                    >
                      <h6 className="text-lg ">{navLinks.icons[0].shopIcon}</h6>
                      <h6 className="text-lg ">
                        {navLinks.icons[navLinks.icons.length - 1].eyeIcon}
                      </h6>
                      <h6 className="text-lg ">
                        {navLinks.icons[navLinks.icons.length - 2].heartIcon}
                      </h6>
                    </div>
                  </div>
                  <h6
                    onClick={() => {
                      navigate("/product-page");
                      dispatch(actions.selectedProduct(product.id))
                    }}
                    className="text-lg font-bold"
                  >
                    {product.title.split(" ", 1).map((title) => title)}
                  </h6>
                  <h5
                    onClick={() => {
                      navigate("/product-page");
                      dispatch(actions.selectedProduct(product.id))
                    }}
                    className="text-sm"
                  >
                    $ {product.price}
                  </h5>
                </motion.div>
              ))}
      </div>
      <Footer />
    </motion.section>
  );
}

export default HomePage;
