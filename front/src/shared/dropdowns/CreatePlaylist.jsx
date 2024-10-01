import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { DefaultButton } from "../bottons";

export const CreatePlaylist = ({ action }) => {
  const [playlistName, SetPlaylistName] = useState("");
  const inputRef = useRef(null);
  const handleChange = (e) => {
    SetPlaylistName(e.target.value);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <Menu
        placement="auto"
        onClose={() => SetPlaylistName("")}
        initialFocusRef={inputRef}
      >
        <MenuButton
          minWidth={"100%"}
          fontSize={"14px"}
          fontWeight={400}
          bg={"brand.500"}
          borderRadius={"6px"}
          color={"neutral.dark.800"}
          _hover={{ bg: "brand.600" }}
          py={"8px"}
        >
          Create Playlist
        </MenuButton>
        <MenuList
          bg={"neutral.dark.800"}
          border={"none"}
          fontSize={"12px"}
          fontWeight={400}
          p={"12px"}
          color={"neutral.dark.200"}
        >
          <Box>
            <FormControl my={"12px"}>
              <FormLabel fontSize={"12px"}>Playlist Name</FormLabel>
              <Input
                size={"sm"}
                ref={inputRef}
                borderRadius={"6px"}
                border={"none"}
                bg={"neutral.dark.700"}
                placeholder="playlist name"
                _placeholder={{ color: "neutral.dark.200" }}
                value={playlistName}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <DefaultButton
              action={() => action(playlistName)}
              isDisabled={playlistName < 2}
              size={"sm"}
            >
              create
            </DefaultButton>
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};
