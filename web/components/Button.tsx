import { CheckIcon } from "@chakra-ui/icons";
import {
  ButtonProps as CButtonProps,
  Icon,
  Button as CButton,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import RequestStatus from "../types/RequestStatus";

type ButtonProps = CButtonProps & {
  status?: RequestStatus;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  variant,
  status,
  children,
}) => {
  return (
    <CButton
      variant={status === "success" ? "success" : variant || ""}
      type="submit"
      mt={5}
      mb={10}
      w="100%"
    >
      {status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        <Icon as={CheckIcon} />
      ) : (
        children
      )}
    </CButton>
  );
};

export default Button;
