import { useContext, useEffect } from "react";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { MusicDropdown } from "../dropdowns/MusicDropdown";
import { Box, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { api } from "../../utils";
import { Playlists } from "../sidebar/Playlists";
import { useShowToast } from "../../hooks/useShowToast";

export const MusicFromDirectoryList = ({ list = [] }) => {
  const { handleSetCurrentTrack, indexOfCurrentTrack, currentTrack } =
    useContext(GlobalContext);
  const heightRef = useRef();

  // useEffect(() => {
  //   if (ref.current.offsetHeight) {
  //     setHeight(() => ref.current.offsetHeight);
  //   }
  //   console.log(ref.current.offsetHeight);
  // }, []);
  return (
    <Grid templateRows={"repeat(12,1fr)"} height={"100%"}>
      <GridItem rowSpan={1}>
        <Box
          display={"grid"}
          alignItems={"center"}
          gridTemplateColumns={"10fr 2fr"}
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
                <ListItem
                  index={index}
                  style={style}
                  list={list}
                  action={handleSetCurrentTrack}
                  indexOfCurrentTrack={indexOfCurrentTrack}
                  currentTrack={currentTrack}
                />
              );
            }}
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
};

export const ListItem = ({
  index,
  style,
  list = [],
  action,
  indexOfCurrentTrack,
  currentTrack,
}) => {
  const [selected, setSelected] = useState("");

  return (
    <>
      <Box
        style={style}
        key={index}
        display={"grid"}
        gridTemplateColumns={"10fr 2fr"}
        _hover={{ bg: "neutral.dark.800" }}
        px={"6px"}
        onMouseOver={() => setSelected(index)}
        onMouseLeave={() => setSelected(null)}
        borderRadius={"6px"}
      >
        <Box
          width={"full"}
          display={"grid"}
          gap={"24px"}
          gridTemplateColumns={"40px 6fr 5fr"}
          alignItems={"center"}
          onClick={() => action(index)}
          fontSize={"12px"}
          color={
            list[index].path === (currentTrack && currentTrack["path"])
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
            <Text whiteSpace={"nowrap"} color={"gray"}>
              {list[index].artist || "unknown"}
            </Text>
          </Box>
          <Box overflow={"hidden"}>
            <Text whiteSpace={"nowrap"}>{list[index].album || "unknown"}</Text>
          </Box>
        </Box>

        <Box display={"flex"} alignItems={"center"}>
          {selected === index && <MusicDropdown audio={list[index]} />}
        </Box>
      </Box>
    </>
  );
};
