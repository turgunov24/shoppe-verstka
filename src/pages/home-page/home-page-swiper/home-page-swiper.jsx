import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./home-page-swiper.css";

// import required modules
import { Pagination } from "swiper";

export default function HomePageSwiper({ data }) {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        id="home-page-swiper"
        className="rounded-lg overflow-hidden h-96 md:h-[50vh] md:mt-28 lg:h-[70vh]"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <img src={item.image} className="object-cover w-full h-full duration-1000" />
            <div className="text-start absolute top-0 left-0 flex flex-col items-start justify-end gap-3 w-full h-full z-10 py-7 px-4 md:justify-center md:gap-5">
              <span className="text-2xl md:text-3xl">
                {item.title.split(" ", 3).map((i) => i)}
              </span>
              <span className="md:text-xl">$ {item.price}</span>
              <button
                id="btn-white"
                className="py-1 px-5 duration-300 cursor-pointer md:py-2 md:px-7 md:mt-5"
              >
                Order Product
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
