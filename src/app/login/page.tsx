import AuthPage from "@/components/ui/AuthPage";
import React, { FC } from "react";

const Login: FC = () => {
  return (
    <div>
      <AuthPage authType="login" />
    </div>
  );
};

export default Login;
