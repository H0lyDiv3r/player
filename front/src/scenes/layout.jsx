import { Box, Button, Text } from "@chakra-ui/react";
import Player from "../shared/player/Player";
import PlayerContextProvider from "../shared/player/PlayerContextProvider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../store/GlobalContextProvider";
import { useContext } from "react";
import { DirNavigator } from "../shared/directory/DirNavigator";
import { Sidebar } from "../shared/sidebar";
import { Playlists } from "../shared/sidebar/Playlists";

export const Layout = () => {
  const { queue, activeList, handleSetCurrentTrack } =
    useContext(GlobalContext);
  useEffect(() => {
    console.log("active list", activeList);
    console.log("queueueueueq", queue);
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
      <Box width={"100%"} minW={"500px"} overflow={"scroll"}>
        <Box height={"400px"} overflow={"scroll"}>
          {activeList &&
            activeList.map((item, idx) => (
              <Box key={idx} onClick={() => handleSetCurrentTrack(idx)}>
                <Text>{item.name}</Text>
              </Box>
            ))}
        </Box>
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </Box>
    </Box>
  );
};
