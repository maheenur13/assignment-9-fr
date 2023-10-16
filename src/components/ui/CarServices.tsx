"use client";
import { useGetAllServiceQuery } from "@/redux/api/service.api";
import { Spin } from "antd";
import React, { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CarServices: FC = () => {
  const query = {
    type: "CAR",
  };
  const { data, isLoading } = useGetAllServiceQuery(
    { ...query },
    {
      pollingInterval: 30000,
    }
  );

  let content = null;
  if (!isLoading && data?.services) {
    content = (
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          centerInsufficientSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper mx-auto py-3"
        >
          {data &&
            data?.services?.map((service) => (
              <SwiperSlide
                key={service.id}
                className="h-80 bg-blue-100 p-8 rounded shadow-md"
              >
                {service.title}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
  } else if (isLoading) {
    content = <Spin spinning={isLoading}>loading</Spin>;
  } else {
    content = <h5>No Data found</h5>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center mb-2 text-slate-600 font-semibold">
        For Your Car Service
      </h2>
      {content}
    </div>
  );
};

export default CarServices;
