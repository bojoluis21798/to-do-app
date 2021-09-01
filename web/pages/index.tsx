import React, { ReactElement } from "react";
import Landing from "../domain/Landing/Layout";
import LoginForm from "../domain/Landing/LoginForm";
import handleServerSideFetch from "../service/handleServerSideFetch";

const Login = () => {
  return <LoginForm />;
};

export const getServerSideProps = handleServerSideFetch(async (service) => {
  try {
    await service.get("/auth/check-cookie");

    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
});

Login.getLayout = (page: ReactElement) => {
  return <Landing>{page}</Landing>;
};

export default Login;
