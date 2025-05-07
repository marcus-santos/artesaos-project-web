"use client";
import CategoryCard from "./CategoryCard";
import categories from "@/db-mock/categories.json";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CategoriesSlider() {
  return (
    <div className="sm:w-[100vw] sm:px-12 lg:px-50">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={8}
        slidesPerGroup={4}
        breakpointsBase={"window"}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onPaginationShow={(swiper) => console.log(swiper)}
        pagination={{
          clickable: true,
          type: "custom",
          renderCustom: function (swiper, current, total) {
            // Custom pagination
            let html =
              "<div class='flex w-full absolute top-0'><div class='mx-auto flex bg-gray-200'>";
            for (let i = 0; i < total; i++) {
              if (i === current - 1) {
                html += `<div class="w-8 h-1 bg-gray-400 rounded-full"></div>`;
              } else {
                html += `<div class="w-8 h-1"></div>`;
              }
            }
            html += "</div></div>";
            return html;
          },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <CategoryCard name={cat.name} img={cat.img} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev pr-10"></div>
        <div className="swiper-button-next pl-10"></div>
      </Swiper>
    </div>
  );
}

export default CategoriesSlider;
