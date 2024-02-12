import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  label?: string;
}

export const TextInput: React.FC<Props> = ({ id, register, placeholder, label }) => {
  return (
    <Box>
      <Text mb="8px">{label}</Text>
      <Input type="text" {...register(id)} placeholder={placeholder} />
    </Box>
  )
};