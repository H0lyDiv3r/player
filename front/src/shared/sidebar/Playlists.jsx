import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FaRecordVinyl } from "react-icons/fa";
import { api } from "../../utils";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "../dropdowns/CreatePlaylist";

export const Playlists = () => {
  const [playlists] = useRequest();
  const { handleSetActivePlaylist, activePlaylist } = useContext(GlobalContext);
  const handleDeletePlaylist = (playlist) => {
    api
      .delete("/playlist/deletePlaylist", {
        params: {
          name: playlist,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    console.log("deleting");
  };

  useEffect(() => {
    playlists.request("/playlist/getPlaylists", "GET");
  }, []);
  useEffect(() => {
    if (!activePlaylist.name === "") {
      api
        .get("/playlist/getPlaylist", {
          params: {
            name: activePlaylist.name,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [activePlaylist]);
  return (
    <Box fontSize={"14px"} fontWeight={400} color={"neutral.dark.100"}>
      <Text>Your Playlists</Text>
      <Box borderRadius={"12px"} py={"12px"} bg={"trans.200"}>
        <CreatePlaylist />
        <Box mt={"12px"}>
          {playlists.response &&
            playlists.response.map((playlist) => (
              <Box
                key={playlist}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box
                  onClick={() => handleSetActivePlaylist(playlist)}
                  display={"flex"}
                >
                  <Icon as={FaRecordVinyl} mr={"6px"} />
                  <Text>{playlist}</Text>
                </Box>
                <Button onClick={() => handleDeletePlaylist(playlist)}>
                  delete
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
