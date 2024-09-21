import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
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
  const containerRef = useRef(null);
  useEffect(() => {
    // console.log("active list", activeList);
    // console.log("queueueueueq", queue);
    // console.log("plaplaplaplaplaplap", activePlaylist);
  }, [activeList, queue]);
  return (
    <Grid
      bg={"neutral.dark.900"}
      w={"100%"}
      height={"100vh"}
      fontSize={"14px"}
      templateRows={"repeat(12,1fr)"}
      // display={"grid"}
      // gridTemplateRows={"85% 1fr"}
    >
      <GridItem
        ref={containerRef}
        rowSpan={10}
        overflow={"hidden"}
        display={"grid"}
        gridTemplateColumns={"300px 1fr"}
      >
        <Box px={"12px"} pt={"12px"}>
          <Sidebar />
        </Box>
        <Box
          minW={"500px"}
          color={"white"}
          display={"grid"}
          gridTemplateColumns={"1fr 300px"}
        >
          <Box display={"grid"} gridTemplateRows={"50px 1fr"}>
            <Box>{activePlaylist.active}</Box>
            <Box px={"12px"} overflow={"scroll"} height={"100%"}>
              {currentTab === "directory" ? (
                <MusicFromDirectoryList list={activeList.list} />
              ) : (
                <MusicFromPlaylist list={activePlaylist.list} />
              )}
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </GridItem>
      <GridItem rowSpan={2}>
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </GridItem>
    </Grid>
  );
};
// <Box height={"15%"}>

// </Box>
