import { Box, Divider, Icon, Text } from "@chakra-ui/react";
import { Directories } from "./Directories";
import { Playlists } from "./Playlists";

export const Sidebar = () => {
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
        <Playlists />
      </Box>
    </Box>
  );
};
