import { Box, Button, Divider, Icon, Text } from "@chakra-ui/react";
import { Directories } from "./Directories";
import { Playlists } from "./Playlists";
import { useState } from "react";

export const Sidebar = () => {
  const [tab, setTab] = useState("playlist");
  const handleSetTab = (active) => {
    setTab(active);
  };
  return (
    <Box
      width={"300px"}
      minW={"300px"}
      bg={"rgba(255,255,255,1)"}
      backdropFilter={"auto"}
      backdropBlur={"6px"}
      p={"12px"}
      height={"100%"}
      fontSize={"12px"}
    >
      <Box py={"24px"}>
        <Text>Name and logo</Text>
      </Box>
      <Divider />
      <Box my={"24px"}>
        <Box>
          <Button onClick={() => handleSetTab("directory")}>dir</Button>
          <Button onClick={() => handleSetTab("playlist")}>pl</Button>
        </Box>
        {tab === "directory" ? <Directories /> : <Playlists />}
      </Box>
    </Box>
  );
};
