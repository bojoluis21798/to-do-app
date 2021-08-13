import {
  Text,
  Input,
  Button,
  Link as CLink,
  Flex,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useService from "../hooks/useService";
import Home from "../layouts/Home";
import AuthService from "../service/auth";
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

  const { requestStatus, fetch } = useService(AuthService.login);

  const onSubmit: SubmitHandler<SubmitForm> = (data) => fetch(data);

  return (
    <Home>
      <Flex
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        alignItems="center"
        as="form"
      >
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
          type="password"
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

        <Button type="submit" mt={5} mb={10} w="100%">
          {requestStatus === "loading" ? (
            <Spinner />
          ) : requestStatus === "success" ? (
            <Icon as={CheckIcon} />
          ) : (
            "Login"
          )}
        </Button>
        {requestStatus === "error" && (
          <Text variant="error">Something went wrong. Please try again</Text>
        )}
        <Link href="/register" replace>
          <CLink color="blue.100">Create an account </CLink>
        </Link>
      </Flex>
    </Home>
  );
};

export default Login;
