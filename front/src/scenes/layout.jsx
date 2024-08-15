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
  const { queue, handleSetCurrentTrack } = useContext(GlobalContext);
  useEffect(() => {
    console.log(queue);
  }, [queue]);
  return (
    <Box
      bg={"rgba(0,0,0,0.2)"}
      w={"100%"}
      h={"100vh"}
      pos={"absolute"}
      backdropFilter={"auto"}
      backdropBlur={"8px"}
      display={"flex"}
    >
      <Sidebar />
      <Box width={"100%"} minW={"500px"} overflow={"scroll"}>
        {queue &&
          queue.map((item, idx) => (
            <Box key={idx} onClick={() => handleSetCurrentTrack(item.path)}>
              <Text>{item.name}</Text>
            </Box>
          ))}
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </Box>
      <Box
        width={"300px"}
        minW={"300px"}
        bg={"rgba(255,255,255,0.6)"}
        backdropFilter={"auto"}
        backdropBlur={"6px"}
        p={"18px"}
      >
        <Playlists />
      </Box>
    </Box>
  );
};
