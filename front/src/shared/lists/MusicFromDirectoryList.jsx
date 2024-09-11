import { useContext, useEffect } from "react";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { MusicDropdown } from "../dropdowns/MusicDropdown";
import { Box, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

export const MusicFromDirectoryList = forwardRef(
  function MusicFromDirectoryList({ list = [] }, ref) {
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
          itemSize={42}
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
                  gap={"24px"}
                  gridTemplateColumns={"40px 6fr 5fr"}
                  alignItems={"center"}
                  onClick={() => handleSetCurrentTrack(index)}
                  fontSize={"12px"}
                >
                  <Box>
                    <Text>{index + 1}</Text>
                  </Box>
                  <Box overflow={"hidden"}>
                    <Text my={0} fontWeight={500} whiteSpace={"nowrap"}>
                      {list[index].title || list[index].name}
                    </Text>
                    <Text whiteSpace={"nowrap"} color={"gray"}>
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
                  {selected === index && <MusicDropdown audio={list[index]} />}
                </Box>
              </Box>
            );
          }}
        </List>
      </>
    );
  },
);
