import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Player from "../shared/player/Player";
import PlayerContextProvider from "../shared/player/PlayerContextProvider";
import { GlobalContext } from "../store/GlobalContextProvider";
import { useContext } from "react";
import { Sidebar } from "../shared/sidebar";
import { MusicFromDirectoryList } from "../shared/lists/MusicFromDirectoryList";
import { useRef } from "react";
import { MusicFromPlaylist } from "../shared/lists/MusicFromPlaylist";
import { LeftBar } from "../shared/leftbar";
import { Search } from "../shared/input/Search";

export const Layout = () => {
  const { activeList, activePlaylist, currentTab } = useContext(GlobalContext);

  const containerRef = useRef(null);

  return (
    <Box bg={"neutral.dark.900"} overflow={"hidden"} color={"white"}>
      <Grid
        bg={"rgba(0,0,0,0.5)"}
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
          gridTemplateColumns={"300px 1fr 300px"}
        >
          <Box px={"12px"} pt={"12px"} overflow={"auto"}>
            <Sidebar />
          </Box>
          <Box minW={"500px"} color={"white"} display={"grid"} height={"100%"}>
            <Box display={"grid"} gridTemplateRows={"50px 1fr"}>
              <Box
                px={"12px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                color={"neutral.dark.400"}
              >
                <Text fontSize={"16px"} marginY={"auto"}>
                  {currentTab === "playlist"
                    ? activePlaylist.active
                    : "Directory"}
                </Text>
                <Search />
              </Box>
              <Box px={"12px"} overflow={"auto"} height={"100%"}>
                {currentTab === "directory" ? (
                  <MusicFromDirectoryList list={activeList.list} />
                ) : (
                  <MusicFromPlaylist list={activePlaylist.list} />
                )}
              </Box>
            </Box>
          </Box>
          <Box pt={"12px"} px={"12px"} maxHeight={"100%"} overflow={"hidden"}>
            <LeftBar />
          </Box>
        </GridItem>
        <GridItem rowSpan={2}>
          <PlayerContextProvider>
            <Player />
          </PlayerContextProvider>
        </GridItem>
      </Grid>
    </Box>
  );
};
