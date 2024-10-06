import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import colors from "../../themes/colors";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";

export const Search = ({ action }) => {
  const [string, setString] = useState("");
  return (
    <>
      <FormControl _focus={{ border: "none", outline: "none" }} maxW={"200px"}>
        <FormLabel display={"none"}>Search</FormLabel>
        <InputGroup display={"flex"} alignItems={"center"} size={"sm"}>
          <InputRightElement _hover={{ cursor: "pointer" }} onClick={action}>
            <Icon as={TbSearch} />
          </InputRightElement>
          <Input
            size={"sm"}
            borderRadius={"4px"}
            bg={"neutral.dark.800"}
            border={"none"}
            value={string}
            onChange={(e) => {
              e.preventDefault();
              setString(e.target.value);
            }}
            placeholder={"search for music..."}
            focusBorderColor="none"
            _focus={{ border: `1px solid ${colors.neutral.dark[500]}` }}
            _placeholder={{ color: "neutral.dark.200" }}
          />
        </InputGroup>
      </FormControl>
    </>
  );
};
