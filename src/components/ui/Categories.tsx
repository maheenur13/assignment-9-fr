"use client";

import { useGetAllCategoryQuery } from "@/redux/api/servicecategory.api";
import { Spin } from "antd";
import { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Categories: FC = () => {
  const query: any = {};
  const { data, isLoading, isSuccess } = useGetAllCategoryQuery(
    { ...query },
    {
      pollingInterval: 30000,
    }
  );

  let content = null;
  if (!isLoading && isSuccess) {
    content = (
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={false}
        style={{ maxWidth: "800px" }}
        centerInsufficientSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mx-auto py-3"
      >
        {data?.categories?.length > 0 ? (
          data?.categories?.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={(e) => console.log(e)}
              className="p-3 cursor-pointer h-32 bg-blue-100 rounded shadow-md border-2 flex justify-center items-center"
            >
              <h3 className="text-blue-500 font-light text-sm">
                {item.categoryName}
              </h3>
            </SwiperSlide>
          ))
        ) : (
          <h6 className="text-center text-slate-500 font-normal text-sm">
            No category found
          </h6>
        )}
      </Swiper>
    );
  }

  return (
    <div>
      <h2 className="text-center mt-8 text-slate-600 font-semibold">
        Service Categories
      </h2>
      <Spin spinning={isLoading}>
        <div className="py-2">{content}</div>
      </Spin>
    </div>
  );
};

export default Categories;
