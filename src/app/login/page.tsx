import AuthPage from "@/components/ui/AuthPage";
import React, { FC } from "react";

type PropsType = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const Login: FC<PropsType> = ({ searchParams }) => {
  return (
    <div>
      <AuthPage authType="login" {...searchParams} />
    </div>
  );
};

export default Login;
