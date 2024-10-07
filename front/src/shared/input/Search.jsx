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
import { SearchMoadal } from "../dropdowns/SearchResults";

export const Search = ({ action }) => {
  const [phrase, setPhrase] = useState("");
  return (
    <>
      <FormControl _focus={{ border: "none", outline: "none" }} maxW={"200px"}>
        <FormLabel display={"none"}>Search</FormLabel>
        <InputGroup display={"flex"} alignItems={"center"} size={"sm"}>
          <InputRightElement _hover={{ cursor: "pointer" }}>
            {/* <Icon as={TbSearch} /> */}
            <SearchMoadal phrase={phrase} />
          </InputRightElement>
          <Input
            size={"sm"}
            borderRadius={"4px"}
            bg={"neutral.dark.800"}
            border={"none"}
            value={phrase}
            onChange={(e) => {
              e.preventDefault();
              setPhrase(e.target.value);
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
