import React, { FC } from "react";

type PropsType = {
  title: string;
  color?: string;
};

const Promotional: FC<PropsType> = ({ color, title }) => {
  return (
    <div className="p-20 bg-gray-800 rounded-md text-white">
      <h2 className="text-white text-center">{title}</h2>
    </div>
  );
};

export default Promotional;
