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
import { MusicFromDirectoryList } from "../shared/lists/MusicFromDirectoryList";
import { useRef } from "react";
import { MusicFromPlaylist } from "../shared/lists/MusicFromPlaylist";

export const Layout = () => {
  const { queue, activeList, activePlaylist, currentTab } =
    useContext(GlobalContext);
  const listContainerRef = useRef(null);
  useEffect(() => {
    // console.log("active list", activeList);
    // console.log("queueueueueq", queue);
    // console.log("plaplaplaplaplaplap", activePlaylist);
  }, [activeList, queue]);
  return (
    <Box
      bg={"rgba(0,0,0,1)"}
      w={"100%"}
      height={"100vh"}
      fontSize={"14px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        display={"grid"}
        gridTemplateColumns={"300px 1fr"}
        w={"100%"}
        height={"85%"}
      >
        <Sidebar />
        <Box width={"100%"} minW={"500px"} color={"white"} display={"grid"}>
          <Box overflow={"scroll"} my={"12px"} ref={listContainerRef}>
            {currentTab === "directory" ? (
              <MusicFromDirectoryList
                list={activeList.list}
                ref={listContainerRef}
              />
            ) : (
              <MusicFromPlaylist
                list={activePlaylist.list}
                ref={listContainerRef}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Box height={"15%"}>
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </Box>
    </Box>
  );
};
