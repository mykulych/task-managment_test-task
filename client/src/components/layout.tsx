import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Box px={10} pt={10} pb={20}>
      <Box w="100%" maxW="1440px" mx="auto" >
        {children}
      </Box>
    </Box>
  </>
);

export const Header: React.FC = () => (
  <Box as="header" bg="gray.800" color="white" py={4} px={10}>
    <Box maxW="1440px" mx="auto">
      <Text fontSize="32px">
        Task managment
      </Text>
    </Box>
  </Box>
);
