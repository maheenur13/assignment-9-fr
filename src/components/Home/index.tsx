import { FC } from "react";
import TopBanner from "../ui/TopBanner";
import Categories from "../ui/Categories";
import Services from "../ui/Services";
import Promotional from "../ui/Promotional";
import { Divider } from "antd";

const HomePage: FC = () => {
  return (
    <div>
      <TopBanner />
      <div className="container mx-auto px-2">
        <Categories />
        <Divider />
        <Services title="All Services" />
        <Promotional title="Banner for ads" />
        <Services
          title="Services For Your car"
          query={{ vehicleType: "CAR" }}
        />
        <Promotional title="Banner for ads" />
        <Services
          title="Services For Your Bike"
          query={{ vehicleType: "BIKE" }}
        />
        <Services title="Recently Viewed" />
      </div>
    </div>
  );
};

export default HomePage;
