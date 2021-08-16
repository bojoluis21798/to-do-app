import { Text, Flex, Input, Link as CLink } from "@chakra-ui/react";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthService from "../../service/auth";
import patterns from "../../utils/patterns";
import useService from "../../hooks/useService";

type SubmitForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [error, setError] = useState<string>();

  const { requestStatus, fetch } = useService(AuthService.register);

  const onSubmit: SubmitHandler<SubmitForm> = async ({
    confirmPassword,
    ...payload
  }) => {
    try {
      await fetch(payload);

      router.replace("/");
    } catch (error) {
      if (error.response.status >= 400) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
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
        mt={5}
        size="contain"
        status={requestStatus}
      >
        Register
      </Button>
      {error && <Text variant="error">{error}</Text>}
      <Link href="/" replace>
        <CLink mt={10} color="blue.100">
          {"< Back to login"}
        </CLink>
      </Link>
    </Flex>
  );
};

export default RegisterForm;
