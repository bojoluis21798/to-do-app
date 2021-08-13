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

        <Button onClick={handleSubmit(onSubmit)} mt={5} mb={10} size="contain">
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
