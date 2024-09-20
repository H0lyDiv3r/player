import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";

export const CreatePlaylist = ({ action }) => {
  const [playlistName, SetPlaylistName] = useState("");
  const handleChange = (e) => {
    SetPlaylistName(e.target.value);
  };

  return (
    <>
      <Menu placement="auto" onClose={() => SetPlaylistName("")}>
        <MenuButton
          minWidth={"100%"}
          fontSize={"14px"}
          fontWeight={400}
          bg={"brand.500"}
          borderRadius={"6px"}
          color={"white"}
          py={"6px"}
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
                borderRadius={"6px"}
                border={"none"}
                bg={"neutral.dark.700"}
                placeholder="playlist name"
                _placeholder={{ color: "neutral.dark.200" }}
                value={playlistName}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Box>
          <MenuItem
            onClick={() => action(playlistName)}
            isDisabled={playlistName < 2}
            bg={"brand.500"}
            justifyContent={"center"}
            borderRadius={"6px"}
            fontSize={"14px"}
          >
            create
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
