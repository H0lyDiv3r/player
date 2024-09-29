import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";

export const LeftBar = () => {
  const { queue, currentTrack } = useContext(GlobalContext);

  useEffect(() => {
    console.log("laaaaaaaaaaaand hooooo", queue);
  }, []);
  return (
    <Grid
      height={"100%"}
      templateRows={"repeat(12,1fr)"}
      gap={"12px"}
      fontSize={"12px"}
      color={"neutral.dark.200"}
    >
      <GridItem rowSpan={1}>
        <Text fontSize={"16px"}>Queue</Text>
      </GridItem>
      <GridItem
        rowSpan={11}
        bg={"neutral.dark.800"}
        width={"100%"}
        p={"12px"}
        borderRadius={"12px"}
      >
        <Box
          height={"100%"}
          overflowY={"scroll"}
          display={"flex"}
          flexDir={"column"}
        >
          {queue.list.map((item, idx) => (
            <Box
              key={idx}
              p={"6px"}
              borderRadius={"6px"}
              my={"2px"}
              display={"flex"}
              _hover={{ bg: "neutral.dark.600" }}
              color={
                item.path === (currentTrack && currentTrack["path"])
                  ? "brand.500"
                  : "neutral.dark.200"
              }
            >
              <Text mr={"12px"}>{idx + 1}</Text>
              <Text>{item.name.slice(0, 30)}</Text>
            </Box>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};
