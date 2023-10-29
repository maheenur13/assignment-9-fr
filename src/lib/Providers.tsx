"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AntdRegistry from "./AntdRegistry";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <SessionProvider>{children}</SessionProvider>
      </AntdRegistry>
    </Provider>
  );
};

export default Providers;
