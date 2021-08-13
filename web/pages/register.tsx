import {
  Text,
  Flex,
  Input,
  Button,
  Link as CLink,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckIcon } from "@chakra-ui/icons";
import Home from "../layouts/Home";
import AuthService from "../service/auth";
import RequestStatus from "../types/RequestStatus";
import patterns from "../utils/patterns";
import sleep from "../utils";

type SubmitForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>();

  const onSubmit: SubmitHandler<SubmitForm> = async ({
    confirmPassword,
    ...payload
  }) => {
    try {
      setRequestStatus("loading");

      await AuthService.register(payload);

      setRequestStatus("success");

      await sleep(500);

      router.replace("/");
    } catch (error) {
      console.log(error);
      setRequestStatus("error");
    }
  };

  return (
    <Home>
      <Flex
        flexDirection="column"
        alignItems="center"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Email"
          variant={errors.email && "error"}
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
          variant={errors.password && "error"}
          placeholder="Password"
          mt={5}
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
          <Text mt={2} variant="error">
            {errors.password.message}
          </Text>
        )}

        <Input
          placeholder="Confirm Password"
          mt={5}
          variant={errors.confirmPassword && "error"}
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            validate: (value) => value === getValues("password"),
          })}
        />

        {errors.confirmPassword && (
          <Text mt={2} variant="error">
            {errors.confirmPassword.message || "Password does not match"}
          </Text>
        )}

        <Button
          type="submit"
          disabled={["success", "loading"].includes(requestStatus || "")}
          variant={requestStatus === "success" ? "success" : "blue"}
          mt={5}
          size="contain"
        >
          {requestStatus === "loading" ? (
            <Spinner />
          ) : requestStatus === "success" ? (
            <Fragment>
              <Icon as={CheckIcon} />
            </Fragment>
          ) : (
            "Register"
          )}
        </Button>
        {requestStatus === "error" && (
          <Text mt={5} variant="error">
            Something went wrong. Please try again
          </Text>
        )}
        <Link href="/" replace>
          <CLink mt={10} color="blue.100">
            {"< Back to login"}
          </CLink>
        </Link>
      </Flex>
    </Home>
  );
};

export default Register;