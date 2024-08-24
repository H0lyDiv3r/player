import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { api } from "../../utils";
import useRequest from "../../hooks/useRequest";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "./CreatePlaylist";

export const MusicDropdown = ({ audio }) => {
  const { activePlaylist } = useContext(GlobalContext);
  const handleAddtoPlaylist = (playlist) => {
    api.post("/playlist/addToPlaylist", { ...audio, playlist }).then((res) => {
      console.log(res.data);
    });
  };
  const handleRemoveFromPlaylist = (track) => {
    api
      .delete("/playlist/deleteFromPlaylist", {
        params: {
          name: activePlaylist.active,
          path: track.path,
        },
      })
      .then((res) => {
        console.log("removed", res.data);
      });
  };
  return (
    <>
      <Menu>
        <Box>
          <MenuButton>button</MenuButton>
          <MenuList color={"black"}>
            <MenuItem>add to queue</MenuItem>
            <PlaylistMenu handleAddToPlaylist={handleAddtoPlaylist} />
            <MenuItem onClick={() => handleRemoveFromPlaylist(audio)}>
              remove from playlist
            </MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};

const PlaylistMenu = ({ handleAddToPlaylist }) => {
  const [playlists] = useRequest();

  const { onOpen } = useDisclosure();

  const handleOpen = () => {
    playlists.request("/playlist/getPlaylists", "GET");
    onOpen();
  };
  return (
    <>
      <Menu>
        <MenuButton onClick={handleOpen}>add to playlist</MenuButton>
        <MenuList>
          <CreatePlaylist />
          {playlists.response &&
            playlists.response.map((item) => (
              <MenuItem key={item} onClick={() => handleAddToPlaylist(item)}>
                {item}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  );
};
