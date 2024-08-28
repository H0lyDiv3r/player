import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FaPlay, FaRecordVinyl } from "react-icons/fa";
import { api } from "../../utils";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "../dropdowns/CreatePlaylist";
import colors from "../../themes/colors";

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

      <Button
        className={"3d"}
        height={"50px"}
        width={"50px"}
        bg={"transparent"}
        borderRadius={"40px"}
        // border={"2px #090909 solid"}
        bgImage={`linear-gradient(180deg,brand.500,brand.500)`}
        boxShadow={`inset 0px 0px 0px 1px ${colors.brand[900]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 3px ${colors.brand[100]}`}
        _hover={{
          bgImage: `linear-gradient(180deg,brand.500 30%,brand.500)`,
          boxShadow: `inset 0px 0px 2px 1px ${colors.brand[900]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 2px ${colors.brand[100]}`,
        }}
        _active={{
          bgImage: `linear-gradient(180deg,brand.500 30%,brand.500)`,
          boxShadow: `inset 0px 0px 1px 2px ${colors.brand[800]},
            inset -2px -2px 3px 2px ${colors.brand[700]},
            inset 3px 3px 2px ${colors.brand[100]}`,
        }}
      >
        <Icon as={FaPlay} color={"neutral.dark.500"} />
      </Button>
    </Box>
  );
};

// <Button
//   className={"3d"}
//   height={"80px"}
//   width={"80px"}
//   bg={"transparent"}
//   borderRadius={"40px"}
//   // border={"2px #090909 solid"}
//   bgImage={`linear-gradient(145deg,brand.500 1%,brand.500 99%)`}
//   boxShadow={`inset 0px 0px 1px 1px ${colors.brand[900]},
//     inset -2px -2px 3px 3px ${colors.brand[700]},
//     inset 5px 4px 3px ${colors.brand[100]}`}
//   _hover={{
//     bgImage: `linear-gradient(145deg,brand.500 30%,brand.600)`,
//     boxShadow: `inset 0px 0px 2px 1px ${colors.brand[900]},
//     inset -2px -2px 3px 2px ${colors.brand[700]},
//     inset 3px 3px 2px ${colors.brand[100]}`,
//   }}
//   _active={{
//     bgImage: `linear-gradient(145deg,brand.500 30%,brand.600)`,
//     boxShadow: `inset 0px 0px 1px 2px ${colors.brand[800]},
//     inset -2px -2px 3px 2px ${colors.brand[700]},
//     inset 3px 3px 2px ${colors.brand[100]}`,
//   }}
// ></Button>
