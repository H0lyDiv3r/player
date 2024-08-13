import { Box, Button, Text } from "@chakra-ui/react";
import Player from "../shared/player/Player";
import PlayerContextProvider from "../shared/player/PlayerContextProvider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../store/GlobalContextProvider";
import { useContext } from "react";
import { DirNavigator } from "../shared/directory/DirNavigator";
import { Sidebar } from "../shared/sidebar";

export const Layout = () => {
  return (
    <Box
      bg={"rgba(0,0,0,0.2)"}
      w={"100%"}
      h={"100vh"}
      pos={"absolute"}
      backdropFilter={"auto"}
      backdropBlur={"1px"}
      display={"flex"}
    >
      <Sidebar />
      <Box width={"100%"} minW={"500px"}>
        <PlayerContextProvider>
          <Player />
        </PlayerContextProvider>
      </Box>
      {/* <Box minWidth={"300px"} width={"300px"} bg={"red"} h={"100%"}></Box> */}
    </Box>
  );
};
