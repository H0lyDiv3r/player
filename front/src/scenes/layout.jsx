import { Box, Button, Text } from "@chakra-ui/react";
import Player from "../shared/player/Player";
import PlayerContextProvider from "../shared/player/PlayerContextProvider";
import { GlobalContext } from "../store/GlobalContextProvider";
import { useContext } from "react";
import { Sidebar } from "../shared/sidebar";
import { Playlists } from "../shared/sidebar/Playlists";
import { MusicDropdown } from "../shared/dropdowns/MusicDropdown";
import { FixedSizeList as List } from "react-window";
import { useState } from "react";
import { useEffect } from "react";

export const Layout = () => {
  const {
    queue,
    activeList,
    activePlaylist,
    handleSetCurrentTrack,
    currentTab,
  } = useContext(GlobalContext);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    console.log("active list", activeList);
    console.log("queueueueueq", queue);
    console.log("plaplaplaplaplaplap", activePlaylist);
  }, [activeList, queue]);
  return (
    <Box
      bg={"rgba(100,100,100,0.2)"}
      w={"100%"}
      h={"100vh"}
      pos={"absolute"}
      backdropFilter={"auto"}
      backdropBlur={"6px"}
      display={"flex"}
    >
      <Sidebar />
      <Box width={"100%"} minW={"500px"} overflow={"scroll"} color={"white"}>
        <Box color={"white"}>{activePlaylist.active}</Box>
        <Box height={"400px"} overflow={"scroll"}>
          {currentTab === "directory" ? (
            <List
              itemCount={activeList.list.length}
              itemSize={25}
              height={500}
              width={"100%"}
            >
              {({ index, style }) => {
                return (
                  <Box
                    style={style}
                    key={index}
                    display={"flex"}
                    _hover={{ bg: "trans.200" }}
                  >
                    <Text
                      onClick={() => handleSetCurrentTrack(index)}
                      width={"full"}
                    >
                      {activeList.list[index].name}
                    </Text>
                    <MusicDropdown audio={activeList.list[index]} />
                  </Box>
                );
              }}
            </List>
          ) : (
            // <>
            //   {activeList.list &&
            //     activeList.list.slice(0, 10).map((item, idx) => (

            //     ))}
            // </>
            <List
              itemCount={activePlaylist.list.length}
              itemSize={25}
              height={500}
              width={"100%"}
            >
              {({ index, style }) => {
                return (
                  <Box
                    style={style}
                    key={index}
                    display={"flex"}
                    _hover={{ bg: "trans.200" }}
                  >
                    <Text
                      onClick={() => handleSetCurrentTrack(index)}
                      width={"full"}
                    >
                      {activePlaylist.list[index].name}
                    </Text>
                    <MusicDropdown audio={activePlaylist.list[index]} />
                  </Box>
                );
              }}
            </List>
            // <>
            //   {activePlaylist.list &&
            //     activePlaylist.list.map((item, idx) => (
            //       <Box key={idx} onClick={() => handleSetCurrentTrack(idx)}>
            //         <Text>{item.name}</Text>
            //       </Box>
            //     ))}
            // </>
          )}
        </Box>
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </Box>
    </Box>
  );
};
