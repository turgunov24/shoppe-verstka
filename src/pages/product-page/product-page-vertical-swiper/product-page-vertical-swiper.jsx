//hooks
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./product-page-vertical-swiper.css";


// import required modules
import { Pagination } from "swiper";
//additional

export default function ProductpageVerticalSwiper() {
    const selectedProduct = useSelector(state => state.getAllData.selectedData);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true
        }}
        direction={"vertical"}
        className="product-page-vertical-swiper hidden md:block  h-[400px]"
      >
        <SwiperSlide className="rounded-md overflow-hidden shadow-md p-1">{selectedProduct.map(product => (
            <img src={product.image} className="w-full h-full object-contain" />
        ))}</SwiperSlide>
        <SwiperSlide className="rounded-md overflow-hidden shadow-md p-1">{selectedProduct.map(product => (
            <img src={product.image} className="w-full h-full object-contain" />
        ))}</SwiperSlide>
        <SwiperSlide className="rounded-md overflow-hidden shadow-md p-1">{selectedProduct.map(product => (
            <img src={product.image} className="w-full h-full object-contain" />
        ))}</SwiperSlide>
        <SwiperSlide className="rounded-md overflow-hidden shadow-md p-1">{selectedProduct.map(product => (
            <img src={product.image} className="w-full h-full object-contain" />
        ))}</SwiperSlide>
        <SwiperSlide className="rounded-md overflow-hidden shadow-md p-1">{selectedProduct.map(product => (
            <img src={product.image} className="w-full h-full object-contain" />
        ))}</SwiperSlide>
      </Swiper>
    </>
  );
}
