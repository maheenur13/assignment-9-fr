"use client";
import { FC } from "react";
import TopBanner from "../ui/TopBanner";
import Categories from "../ui/Categories";
import Services from "../ui/Services";
import Promotional from "../ui/Promotional";

const HomePage: FC = () => {
  return (
    <div>
      <TopBanner />
      <div className="container mx-auto px-2">
        <Categories />
        <Services title="All Services" />
        <Promotional title="Banner for ads" />
        <Services title="Services For Your car" query={{ type: "CAR" }} />
        <Promotional title="Banner for ads" />
        <Services title="Services For Your Bike" query={{ type: "BIKE" }} />
      </div>
    </div>
  );
};

export default HomePage;
