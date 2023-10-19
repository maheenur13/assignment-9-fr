"use client";
import { useGetAllServiceQuery } from "@/redux/api/service.api";
import { Spin } from "antd";
import React, { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard from "./ServiceCard";
import { useRouter } from "next/navigation";

type PropsType = {
  query?: { [key: string]: string };
  title: string;
};

const Services: FC<PropsType> = ({ query = {}, title }) => {
  const router = useRouter();
  const newQuery = { ...query };
  const { data, isLoading } = useGetAllServiceQuery(
    { ...newQuery },
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
            540: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 35,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1400: {
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
                className="cursor-pointer"
                onClick={() => router.push(`/service/${service.id}`)}
              >
                <ServiceCard service={service} type={query?.vehicleType} />
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
    <div className=" mt-12 mb-8">
      <h2 className="text-center mb-2 text-slate-600 font-semibold">{title}</h2>
      {content}
    </div>
  );
};

export default Services;
