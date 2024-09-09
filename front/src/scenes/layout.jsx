import { Box, Text } from "@chakra-ui/react";
import Player from "../shared/player/Player";
import PlayerContextProvider from "../shared/player/PlayerContextProvider";
import { GlobalContext } from "../store/GlobalContextProvider";
import { useContext } from "react";
import { Sidebar } from "../shared/sidebar";
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
      fontSize={"14px"}
    >
      <Sidebar />
      <Box
        width={"100%"}
        minW={"500px"}
        color={"white"}
        display={"grid"}
        gridTemplateRows={"30px 1fr 200px"}
      >
        <Box color={"white"}>{activePlaylist.active}</Box>
        <Box overflow={"scroll"} my={"12px"}>
          {currentTab === "directory" ? (
            <List
              itemCount={activeList.list.length}
              itemSize={40}
              height={400}
              width={"100%"}
            >
              {({ index, style }) => {
                return (
                  <Box
                    style={style}
                    key={index}
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ bg: "trans.200" }}
                    onMouseOver={() => setSelected(index)}
                    onMouseLeave={() => setSelected(null)}
                  >
                    <Box
                      width={"full"}
                      onClick={() => handleSetCurrentTrack(index)}
                    >
                      <Text fontSize={"12px"} my={0}>
                        {activeList.list[index].title ||
                          activeList.list[index].name}
                      </Text>
                      <Text fontSize={"11px"}>
                        {activeList.list[index].artist || "unknown"}
                      </Text>
                    </Box>
                    {selected === index && (
                      <MusicDropdown audio={activeList.list[index]} />
                    )}
                  </Box>
                );
              }}
            </List>
          ) : (
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
                    onMouseOver={() => setSelected(index)}
                    onMouseLeave={() => setSelected(null)}
                  >
                    <Text
                      onClick={() => handleSetCurrentTrack(index)}
                      width={"full"}
                    >
                      {activePlaylist.list[index].title ||
                        activePlaylist.list[index].name}
                    </Text>
                    {selected === index && (
                      <MusicDropdown audio={activePlaylist.list[index]} />
                    )}
                  </Box>
                );
              }}
            </List>
          )}
        </Box>
        <Box height={"200px"}>
          <PlayerContextProvider>
            <Player />
          </PlayerContextProvider>
        </Box>
      </Box>
    </Box>
  );
};
