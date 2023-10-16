"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AntdRegistry from "./AntdRegistry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <StyledComponentsRegistry> */}
      <AntdRegistry>{children}</AntdRegistry>
      {/* </StyledComponentsRegistry> */}
    </Provider>
  );
};

export default Providers;
