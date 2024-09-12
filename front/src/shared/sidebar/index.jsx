import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Directories } from "./Directories";
import { Playlists } from "./Playlists";
import { useState } from "react";

export const Sidebar = () => {
  const [tab, setTab] = useState("playlist");
  const handleSetTab = (active) => {
    setTab(active);
  };
  return (
    <Grid
      width={"300px"}
      minW={"300px"}
      height={"100%"}
      templateRows={"repeat(12,1fr)"}
      fontSize={"12px"}
    >
      <GridItem rowSpan={3}>
        <Box py={"6px"}>
          <Text>Name and logo</Text>
        </Box>

        <Box>
          <Button onClick={() => handleSetTab("directory")}>dir</Button>
          <Button onClick={() => handleSetTab("playlist")}>pl</Button>
        </Box>
      </GridItem>
      <GridItem rowSpan={9}>
        <Box height={"100%"}>
          {tab === "directory" ? <Directories /> : <Playlists />}
        </Box>
      </GridItem>
    </Grid>
  );
};
