import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { api } from "../../utils";
import { DefaultButton } from "../bottons";
import { useState } from "react";

export const CreatePlaylist = () => {
  const [playlistName, handleSetPlaylistName] = useState("");
  const handleChange = (e) => {
    handleSetPlaylistName(e.target.value);
  };
  const handleCreatePlaylist = () => {
    api
      .post("/playlist/createPlaylist", { name: playlistName })
      .then((res) => console.log(res));
    console.log("hanele", playlistName);
  };
  return (
    <>
      <Menu placement="auto">
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
          fontSize={"12px"}
          fontWeight={400}
          p={"12px"}
          color={"neutral.800"}
        >
          <Box>
            <FormControl my={"12px"}>
              <FormLabel fontSize={"12px"}>Playlist Name</FormLabel>
              <Input
                size={"sm"}
                value={playlistName}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <DefaultButton size={"sm"} action={handleCreatePlaylist} disabled>
              create
            </DefaultButton>
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};