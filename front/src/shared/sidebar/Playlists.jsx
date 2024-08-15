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

export const Playlists = () => {
  const [loadingPlaylists, playlists, errorPlaylists, requestPlaylists] =
    useRequest();
  useEffect(() => {
    requestPlaylists("http://localhost:3000/getPlaylists", "GET");
  }, []);
  return (
    <Box fontSize={"14px"} fontWeight={400} color={"neutral.800"}>
      <Text>Your Playlists</Text>
      <Box borderRadius={"12px"} py={"12px"} bg={"trans.200"}>
        <CreatePlaylist />
        <Box mt={"12px"}>
          {playlists &&
            Object.keys(playlists).map((playlist) => (
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
export const CreatePlaylist = () => {
  return (
    <>
      <Menu placement={"bottom"} matchWidth>
        <MenuButton
          minWidth={"100%"}
          fontSize={"14px"}
          fontWeight={400}
          bg={"brand.400"}
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
              <Input size={"sm"} />
            </FormControl>
            <DefaultButton size={"sm"}>create</DefaultButton>
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};
