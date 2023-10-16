"use client";
import { Carousel } from "antd";
import React from "react";

const TopBanner = () => {
  return (
    <Carousel>
      <div className="carousel-container">
        <div className="item-container">
          <h2 className="text-white">Find the best service for your car</h2>
          <h1>Your car&apos;s best solution Provider</h1>
        </div>
      </div>
    </Carousel>
  );
};

export default TopBanner;
