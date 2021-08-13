import { Text, Input, Button, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Home from "../layouts/Home";
import patterns from "../utils/patterns";

type SubmitForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<SubmitForm> = (data) => console.log(data);

  console.log(errors);

  return (
    <Home>
      <Fragment>
        <Input
          variant={errors.email && "error"}
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: patterns.email,
              message: "Invalid email",
            },
          })}
        />

        {errors.email && (
          <Text mt={2} variant="error">
            {errors.email.message}
          </Text>
        )}

        <Input
          mt={5}
          variant={errors.password && "error"}
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value: patterns.password,
              message:
                "Must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
            },
          })}
        />

        {errors.password && (
          <Text variant="error" mt={2}>
            {errors.password.message}
          </Text>
        )}

        <Button onClick={handleSubmit(onSubmit)} mt={5} mb={10} w="100%">
          Login
        </Button>
        <Link href="/register">
          <CLink color="blue.100">Create an account </CLink>
        </Link>
      </Fragment>
    </Home>
  );
};

export default Login;
