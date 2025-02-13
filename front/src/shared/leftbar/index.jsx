import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { FixedSizeList as List } from "react-window";

export const LeftBar = React.memo(function LeftBar() {
  const { queue, currentTrack } = useContext(GlobalContext);

  const heightRef = useRef(null);
  return (
    <Grid
      height={"100%"}
      templateRows={"30px 1fr"}
      gap={"12px"}
      fontSize={"12px"}
      color={"neutral.dark.200"}
    >
      <GridItem>
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
          className="scroll"
          height={"100%"}
          overflowY={"auto"}
          display={"flex"}
          flexDir={"column"}
        >
          {queue.list.length < 1 ? (
            <>
              <Box
                height={"100%"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"neutral.dark.500"}
              >
                <Text
                  fontSize={"1.25rem"}
                  fontWeight={500}
                  color={"neutral.dark.300"}
                >
                  WHOOPS!
                </Text>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  my={"12px"}
                >
                  <Image src={"./noMusic.svg"} width={"150px"} />
                </Box>
                <Box>
                  <Text fontSize={"0.8rem"} my={"8px"}>
                    you need to play some music.
                  </Text>
                </Box>
              </Box>
            </>
          ) : (
            <Box ref={heightRef} height={"100%"}>
              <List
                className="scroll"
                itemCount={queue.list.length}
                itemSize={42}
                height={
                  heightRef.current ? heightRef.current.offsetHeight : 100
                }
                width={"100%"}
              >
                {({ index, style }) => {
                  return (
                    <>
                      <Box
                        style={style}
                        key={index}
                        p={"6px"}
                        borderRadius={"6px"}
                        my={"2px"}
                        display={"flex"}
                        _hover={{ bg: "neutral.dark.600" }}
                        color={
                          queue.list[index].path ===
                          (currentTrack && currentTrack["path"])
                            ? "brand.500"
                            : "neutral.dark.200"
                        }
                      >
                        <Text mr={"12px"}>{index + 1}</Text>
                        <Text>{queue.list[index].name.slice(0, 25)}</Text>
                      </Box>
                    </>
                  );
                }}
              </List>
            </Box>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
});
