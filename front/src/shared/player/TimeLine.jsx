import { Box, Text, Input } from "@chakra-ui/react";
import { forwardRef, useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";
// import { GlobalContext } from '@/app/providers/GlobalProvider'

const TimeLine = forwardRef(function TimeLine(props, ref) {
  const { position, handlePosition, length, loaded } =
    useContext(PlayerContext);
  // const { currentEpisode } = useContext(GlobalContext);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      my={"12px"}
      color={"neutral.200"}
    >
      <Box display={"flex"} fontSize={"12px"} fontWeight={300} minW={"50px"}>
        {Math.floor(position) / 3600 < 10 && <Text>0</Text>}
        <Text>{Math.floor(position / 3600)}</Text>
        <Text>:</Text>
        {(Math.floor(position) / 60) % 60 < 10 && <Text>0</Text>}
        <Text>{Math.floor((position / 60) % 60)}</Text>
        <Text>:</Text>
        {Math.floor(position) % 60 < 10 && <Text>0</Text>}
        <Text>{Math.floor(position % 60)}</Text>
      </Box>
      <Box
        bg={"neutral.400"}
        height={"4px"}
        mx={"4px"}
        display={"flex"}
        overflow={"hidden"}
        width={"100%"}
        position={"relative"}
        borderRadius={"2px"}
      >
        <Input
          type="range"
          onChange={(e) => handlePosition(e.target.value, ref)}
          // value={50}
          value={position}
          // max={currentEpisode.audioLength}
          max={100}
          min={0}
          // disabled={!loaded}
          position={"absolute"}
        />
      </Box>
      <Box display={"flex"} fontSize={"12px"} fontWeight={300} minW={"50px"}>
        {Math.floor(length) / 3600 < 10 && <Text>0</Text>}
        <Text>{Math.floor(length / 3600)}</Text>
        <Text>:</Text>
        {(Math.floor(length) / 60) % 60 < 10 && <Text>0</Text>}
        <Text>{Math.floor((length / 60) % 60)}</Text>
        <Text>:</Text>
        {Math.floor(length % 60) < 10 && <Text>0</Text>}
        <Text>{Math.floor(length % 60)}</Text>
      </Box>
    </Box>
  );
});

export default TimeLine;
