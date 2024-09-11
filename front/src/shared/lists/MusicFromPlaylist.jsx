import { useContext, useEffect } from "react";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { MusicDropdown } from "../dropdowns/MusicDropdown";
import { Box, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

export const MusicFromPlaylist = forwardRef(function MusicFromPlaylist(
  { list = [] },
  ref,
) {
  const { handleSetCurrentTrack } = useContext(GlobalContext);
  const [selected, setSelected] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current.offsetHeight) {
      setHeight(() => ref.current.offsetHeight);
    }
  }, []);
  return (
    <>
      <List
        itemCount={list.length}
        itemSize={40}
        height={height}
        width={"100%"}
      >
        {({ index, style }) => {
          return (
            <Box
              style={style}
              key={index}
              display={"grid"}
              gridTemplateColumns={"10fr 2fr"}
              _hover={{ bg: "trans.200" }}
              onMouseOver={() => setSelected(index)}
              onMouseLeave={() => setSelected(null)}
            >
              <Box
                width={"full"}
                display={"grid"}
                gridTemplateColumns={"40px 6fr 5fr"}
                onClick={() => handleSetCurrentTrack(index)}
                fontSize={"12px"}
              >
                <Box>
                  <Text>{index + 1}</Text>
                </Box>
                <Box>
                  <Text my={0} fontWeight={500}>
                    {list[index].title || list[index].name}
                  </Text>
                  <Text>{list[index].artist || "unknown"}</Text>
                </Box>
                <Box>
                  <Text>{list[index].album || "unknown"}</Text>
                </Box>
              </Box>
              <Box>
                {selected === index && <MusicDropdown audio={list[index]} />}
              </Box>
            </Box>
          );
        }}
      </List>
    </>
  );
});
