//hooks
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./product-page-responsive-swiper.css";

// import required modules
import { Pagination } from "swiper";
//additional
import { Swiper, SwiperSlide } from "swiper/react";
import { navLinks } from "../../../data/navbar-data/navLinks";
import { actions } from "../../../data/redux/reducers/allData";

export default function ProductPageResponsiveSwiper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //hooks
  const allProduct = useSelector((state) => state.getAllData.data);
  const selectedProduct = useSelector((state) => state.getAllData.selectedData);

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1150: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="product-page-responsive-swiper"
      >
        {allProduct
          .filter((product) => product.category == selectedProduct[0].category)
          .map((product) => (
            <SwiperSlide
              key={product.id}
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
                  dispatch(actions.selectedProduct(product.id));
                  // window.scrollTo({
                  //   top: 10,
                  // });
                }}
                className="text-lg font-bold"
              >
                {product.title.split(" ", 1).map((title) => title)}
              </h6>
              <h5 className="text-sm">$ {product.price}</h5>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
