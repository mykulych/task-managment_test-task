import { Center, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => <Center>
  <Text fontWeight="700" fontSize="2xl">{message}</Text>
</Center>
