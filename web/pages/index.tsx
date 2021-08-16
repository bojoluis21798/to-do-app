import React, { ReactElement } from "react";
import Landing from "../domain/Landing/Layout";
import LoginForm from "../domain/Landing/LoginForm";

const Login = () => {
  return <LoginForm />;
};

Login.getLayout = (page: ReactElement) => {
  return <Landing>{page}</Landing>;
};

export default Login;
