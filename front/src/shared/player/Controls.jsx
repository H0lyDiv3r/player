"use client";
import { Box, Icon, Button, Spinner, Spacer, Text } from "@chakra-ui/react";
import React, { forwardRef, useContext, useRef } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaRepeat,
  FaShuffle,
} from "react-icons/fa6";
import { PlayerContext } from "./PlayerContextProvider";
import VolumeControl from "./VolumeControl";
import PlaybackRateControl from "./PlaybackRateControl";

const Controls = forwardRef(function Controls(props, ref) {
  const { handlePlay, paused, loaded, handleFastForward, handleFastBackward } =
    useContext(PlayerContext);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"neutral.300"}
    >
      <Box width={"25%"}>
        <PlaybackRateControl ref={ref} />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"50%"}
        px={"18px"}
      >
        <Icon as={FaRepeat} onClick={() => handleFastForward(ref)} />
        <Icon as={FaBackward} onClick={() => handleFastBackward(ref)} />
        <Button
          onClick={() => handlePlay(ref)}
          borderRadius={"50%"}
          width={"32px"}
          bg={"neutral.300"}
          color={"neutral.900"}
          isDisabled={!loaded}
        >
          <Icon
            as={paused ? FaPlay : FaPause}
            color={"neutral.800"}
            boxSize={5}
          />
        </Button>
        <Icon as={FaForward} onClick={() => handleFastForward(ref)} />
        <Icon as={FaShuffle} onClick={() => handleFastForward(ref)} />
      </Box>
      <Spacer />
      <Box
        display={"flex"}
        minWidth={"25%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Box>
          <VolumeControl ref={ref} />
        </Box>
        {/*
        <Box marginRight={"15px"}>
          <PlaybackRateControl ref={ref} />
        </Box> */}
      </Box>
    </Box>
  );
});

export default Controls;
