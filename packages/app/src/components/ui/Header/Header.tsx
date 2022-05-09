import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  useDisclosure,
  FlexProps,
  OmitCommonProps,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
export const Header = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof FlexProps
    > &
    FlexProps & { as?: "div" | undefined }
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Chakra UI PoC
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <NavLink to={"/"}>
          <Text>Home</Text>{" "}
        </NavLink>
        <NavLink to={"/posts"}>
          <Text>Posts</Text>{" "}
        </NavLink>
        <NavLink to={"/users"}>
          <Text>Users</Text>{" "}
        </NavLink>
      </Stack>

      {/* <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        >
          Create account
        </Button>
      </Box> */}
    </Flex>
  );
};
