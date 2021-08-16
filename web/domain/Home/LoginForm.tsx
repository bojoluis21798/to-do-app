import Link from "next/link";
import { Text, Flex, Input, Link as CLink } from "@chakra-ui/react";
import Button from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import useService from "../../hooks/useService";
import AuthService from "../../service/auth";
import patterns from "../../utils/patterns";
import { useState } from "react";

type SubmitForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<string>();

  const { requestStatus, fetch } = useService(AuthService.login);

  const onSubmit: SubmitHandler<SubmitForm> = async (data) => {
    try {
      await fetch(data);
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

      <Button status={requestStatus} type="submit" mt={5} mb={0} w="100%">
        Login
      </Button>
      {error && (
        <Text variant="error" mb={5}>
          {error}
        </Text>
      )}
      <Link href="/register" replace>
        <CLink color="blue.100">Create an account </CLink>
      </Link>
    </Flex>
  );
};

export default LoginForm;
