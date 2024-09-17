import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Directories } from "./Directories";
import { Playlists } from "./Playlists";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { TbFolderSymlink, TbHome, TbPlaylist } from "react-icons/tb";

export const Sidebar = () => {
  const [tab, setTab] = useState("playlist");
  const handleSetTab = (active) => {
    setTab(active);
  };
  return (
    <Grid
      height={"100%"}
      templateRows={"repeat(12,1fr)"}
      gap={"12px"}
      fontSize={"12px"}
    >
      <GridItem rowSpan={3} bg={"none"}>
        <Box py={"6px"}>
          <Text>Name and logo</Text>
        </Box>
        <Box
          fontSize={"12px"}
          bg={"neutral.dark.800"}
          borderRadius={"6px"}
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          width={"100%"}
          p={"4px"}
        >
          <Box
            onClick={() => handleSetTab("directory")}
            bg={tab === "directory" ? "neutral.dark.200" : "none"}
            color={
              tab === "directory" ? "neutral.dark.800" : "neutral.dark.200"
            }
            py={"6px"}
            borderRadius={"6px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon as={TbHome} boxSize={5} />
          </Box>
          <Box
            onClick={() => handleSetTab("playlist")}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            py={"6px"}
            bg={tab === "playlist" ? "neutral.dark.200" : "none"}
            color={tab === "playlist" ? "neutral.dark.800" : "neutral.dark.200"}
            borderRadius={"6px"}
          >
            <Icon as={TbPlaylist} boxSize={5} />
          </Box>
          <Box
            py={"6px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={tab === "shortcuts" ? "neutral.dark.200" : "none"}
            color={
              tab === "shortcuts" ? "neutral.dark.800" : "neutral.dark.200"
            }
            borderRadius={"6px"}
          >
            <Icon as={TbFolderSymlink} boxSize={5} />
          </Box>
        </Box>
      </GridItem>
      <GridItem
        rowSpan={9}
        bg={"neutral.dark.800"}
        p={"12px"}
        borderRadius={"12px"}
      >
        <Box height={"100%"}>
          {tab === "directory" ? <Directories /> : <Playlists />}
        </Box>
      </GridItem>
    </Grid>
  );
};
