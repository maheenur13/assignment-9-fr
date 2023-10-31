"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AntdRegistry from "./AntdRegistry";
import { SessionProvider } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  useEffect(() => {
    // You can now use the current URL
    NProgress.start();
  }, [pathname]);

  useEffect(() => {
    NProgress.done();
    // You can now use the current URL
  }, [searchParams]);
  return (
    <Provider store={store}>
      <AntdRegistry>
        <SessionProvider>{children}</SessionProvider>
      </AntdRegistry>
    </Provider>
  );
};

export default Providers;
