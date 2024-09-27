import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { MusicDropdown } from "../dropdowns/MusicDropdown";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

export const MusicFromPlaylist = ({ list = [] }) => {
  const { handleSetCurrentTrack, currentTrack } = useContext(GlobalContext);
  const [selected, setSelected] = useState(null);
  const heightRef = useRef();

  // useEffect(() => {
  //   if (ref.current.offsetHeight) {
  //     setHeight(() => ref.current.offsetHeight);
  //   }
  // }, []);
  return (
    <Grid templateRows={"repeat(12,1fr)"} height={"100%"}>
      <GridItem rowSpan={1}>
        <Box
          display={"grid"}
          gridTemplateColumns={"10fr 2fr"}
          alignItems={"center"}
          height={"32px"}
          fontSize={"14px"}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"40px 6fr 5fr"}
            gap={"24px"}
          >
            <Text>#</Text>
            <Text>Title</Text>
            <Text>Album</Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem rowSpan={11}>
        <Box ref={heightRef} height={"100%"}>
          <List
            itemCount={list.length}
            itemSize={42}
            height={heightRef.current ? heightRef.current.offsetHeight : 200}
            width={"100%"}
          >
            {({ index, style }) => {
              return (
                <Box
                  style={style}
                  key={index}
                  display={"grid"}
                  gridTemplateColumns={"10fr 2fr"}
                  _hover={{ bg: "neutral.dark.800" }}
                  borderRadius={"6px"}
                  px={"6px"}
                  onMouseOver={() => setSelected(index)}
                  onMouseLeave={() => setSelected(null)}
                >
                  <Box
                    width={"full"}
                    display={"grid"}
                    gap={"24px"}
                    alignItems={"center"}
                    gridTemplateColumns={"40px 6fr 5fr"}
                    onClick={() => handleSetCurrentTrack(index)}
                    fontSize={"12px"}
                    color={
                      list[index].path ===
                      (currentTrack && currentTrack["path"])
                        ? "brand.500"
                        : "neutral.dark.200"
                    }
                  >
                    <Box>
                      <Text>{index + 1}</Text>
                    </Box>
                    <Box overflow={"hidden"}>
                      <Text my={0} fontWeight={500} whiteSpace={"nowrap"}>
                        {list[index].title || list[index].name}
                      </Text>
                      <Text color={"gray"} whiteSpace={"nowrap"}>
                        {list[index].artist || "unknown"}
                      </Text>
                    </Box>
                    <Box overflow={"hidden"}>
                      <Text whiteSpace={"nowrap"}>
                        {list[index].album || "unknown"}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    {selected === index && (
                      <MusicDropdown audio={list[index]} />
                    )}
                  </Box>
                </Box>
              );
            }}
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
};
