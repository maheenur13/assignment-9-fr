"use client";
import { FC } from "react";
import CartPage from "../Cart";
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
        <Promotional title="upcoming features" />
        <Services title="Services For Your car" query={{ type: "CAR" }} />
        <Promotional title="upcoming features" />
        <Services title="Services For Your Bike" query={{ type: "BIKE" }} />
      </div>
      <CartPage />
    </div>
  );
};

export default HomePage;
