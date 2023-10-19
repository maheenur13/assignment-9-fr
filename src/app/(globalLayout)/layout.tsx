import { AppLayout } from "@/components/layouts";
import React, { FC, ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const GlobalViewLayout: FC<PropsType> = ({ children }) => {
  return (
    <AppLayout>
      <div className="container mx-auto ">{children}</div>
    </AppLayout>
  );
};

export default GlobalViewLayout;
