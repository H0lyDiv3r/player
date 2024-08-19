import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import {
  Box,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaRecordVinyl } from "react-icons/fa";
import { DefaultButton } from "../bottons";
import { useState } from "react";
import { api } from "../../utils";

export const Playlists = () => {
  const [loadingPlaylists, playlists, errorPlaylists, requestPlaylists] =
    useRequest();
  const [playlistName, handleSetPlaylistName] = useState("");
  const handleCreatePlaylist = () => {
    api
      .post("/playlist/createPlaylist", { name: playlistName })
      .then((res) => console.log(res));
    console.log("hanele", playlistName);
  };
  const handleChange = (e) => {
    handleSetPlaylistName(e.target.value);
  };
  useEffect(() => {
    requestPlaylists("/playlist/getPlaylists", "GET");
  }, []);
  return (
    <Box fontSize={"14px"} fontWeight={400} color={"neutral.light.800"}>
      <Text>Your Playlists</Text>
      <Box borderRadius={"12px"} py={"12px"} bg={"trans.200"}>
        <CreatePlaylist
          playlistName={playlistName}
          handleChange={handleChange}
          handleCreatePlaylist={handleCreatePlaylist}
        />
        <Box mt={"12px"}>
          {playlists &&
            playlists.map((playlist) => (
              <Box key={playlist} display={"flex"} alignItems={"center"}>
                <Icon as={FaRecordVinyl} mr={"6px"} />
                <Text>{playlist}</Text>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
export const CreatePlaylist = ({
  playlistName,
  handleChange,
  handleCreatePlaylist,
}) => {
  return (
    <>
      <Menu placement={"bottom"} matchWidth>
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
          width={"100%"}
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
