//hooks
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./product-page-swiper.css";

// import required modules
import { Scrollbar } from "swiper";
//additional

export default function ProductPageSwiper() {
  const selectedProduct = useSelector((state) => state.getAllData.selectedData);
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="product-page-swiper w-full h-72 mr-auto md:min-h-[400px]"
      >
        {selectedProduct &&
          selectedProduct.map((product) => (
            <SwiperSlide className="h-full">
              <img
                src={product.image}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        {selectedProduct &&
          selectedProduct.map((product) => (
            <SwiperSlide className="h-full">
              <img
                src={product.image}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
