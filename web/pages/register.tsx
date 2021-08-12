import {
  Text,
  Input,
  Button,
  Link as CLink,
  StatGroupProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Home from "../layouts/Home";
import patterns from "../utils/patterns";

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

  const onSubmit: SubmitHandler<SubmitForm> = (data) => console.log(data);

  return (
    <Home>
      <Fragment>
        <Input
          color="white"
          placeholder="Email"
          borderColor={errors?.email ? "red" : "initial"}
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
          <Text mt={2} color="red.300">
            {errors.email.message}
          </Text>
        )}
        <Input
          color="white"
          placeholder="Password"
          mt={5}
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
          <Text mt={2} wordBreak="break-word" color="red.300">
            {errors.password.message}
          </Text>
        )}

        <Input
          color="white"
          placeholder="Confirm Password"
          mt={5}
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            validate: (value) => value === getValues("password"),
          })}
        />

        {errors.confirmPassword && (
          <Text mt={2} wordBreak="break-word" color="red.300">
            {errors.confirmPassword.message || "Password does not match"}
          </Text>
        )}

        <Button
          onClick={handleSubmit(onSubmit)}
          bg="blue.300"
          color="white"
          mt={5}
          mb={10}
          w="100%"
        >
          Register
        </Button>
        <Link href="/">
          <CLink color="blue.100">{"< Back to login"}</CLink>
        </Link>
      </Fragment>
    </Home>
  );
};

export default Register;
