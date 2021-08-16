import React, { ReactElement } from "react";
import Landing from "../domain/Landing/Layout";
import RegisterForm from "../domain/Landing/RegisterForm";

const Register = () => {
  return <RegisterForm />;
};

Register.getLayout = (page: ReactElement) => {
  return <Landing>{page}</Landing>;
};

export default Register;
