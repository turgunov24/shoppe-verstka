import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./home-page-category-swiper.css";

// import required modules
import { Pagination } from "swiper";

export default function HomepageCategorySwiper({ data,categoryName }) {
  const [categoryArray, setCategoryArray] = useState(
    data.map((category) => category.category)
  );
  const uniqueCategory = [...new Set(categoryArray)];
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        id="home-page-category-swiper"
        className=" w-full h-12 mt-28 md:hidden"
      >
        {uniqueCategory.map((category) => (
          <SwiperSlide key={category.id} onClick={() => categoryName(category)} className="border border-[#D8D8D8] flex items-center justify-center rounded-md">
            {category}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
