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
      bg={"neutral.dark.900"}
      w={"100%"}
      height={"100vh"}
      fontSize={"14px"}
      // display={"grid"}
      // gridTemplateRows={"85% 1fr"}
    >
      <Box
        display={"grid"}
        gridTemplateColumns={"300px 1fr"}
        w={"100%"}
        height={"85%"}
        ref={listContainerRef}
      >
        <Box
          height={
            listContainerRef.current
              ? listContainerRef.current.offsetHeight
              : "100%"
          }
          p={"12px"}
        >
          <Sidebar />
        </Box>
        <Box minW={"500px"} color={"white"} display={"grid"}>
          <Box>
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
