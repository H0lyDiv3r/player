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
import { FaHome } from "react-icons/fa";
import { TbFolderSymlink, TbHomeFilled, TbPlaylist } from "react-icons/tb";

export const Sidebar = () => {
  const [tab, setTab] = useState("playlist");
  const handleSetTab = (active) => {
    setTab(active);
  };
  return (
    <Grid height={"100%"} templateRows={"repeat(12,1fr)"} fontSize={"12px"}>
      <GridItem rowSpan={3}>
        <Box py={"6px"}>
          <Text>Name and logo</Text>
        </Box>

        <Box
          fontSize={"12px"}
          bg={"gray"}
          borderRadius={"6px"}
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          width={"100%"}
          p={"4px"}
        >
          <Box
            onClick={() => handleSetTab("directory")}
            bg={tab === "directory" ? "blue" : "none"}
            py={"6px"}
            borderRadius={"6px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon as={TbHomeFilled} boxSize={5} />
          </Box>
          <Box
            onClick={() => handleSetTab("playlist")}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            py={"6px"}
            bg={tab === "playlist" ? "blue" : "none"}
            borderRadius={"6px"}
          >
            <Icon as={TbPlaylist} boxSize={5} />
          </Box>
          <Box
            py={"6px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={tab === "shortcuts" ? "blue" : "none"}
            borderRadius={"6px"}
          >
            <Icon as={TbFolderSymlink} boxSize={5} />
          </Box>
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
