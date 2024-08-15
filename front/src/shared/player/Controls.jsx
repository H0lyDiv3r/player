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
import { IconButton } from "../bottons";
import { GlobalContext } from "../../store/GlobalContextProvider";

const Controls = forwardRef(function Controls(props, ref) {
  const { handlePlay, paused, loaded, handleFastForward } =
    useContext(PlayerContext);
  const { handleNextPrev, handleShuffle, shuffle } = useContext(GlobalContext);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"neutral.400"}
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
        <IconButton
          icon={FaRepeat}
          action={() => handleFastForward(ref)}
          color={"neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={FaBackward}
          action={() => handleNextPrev("prev")}
          color={"neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={paused ? FaPlay : FaPause}
          action={() => handlePlay(ref)}
          size={5}
          isDisabled={!loaded}
          color={"neutral.800"}
          bg={"neutral.300"}
          borderRadius={"32px"}
          height={"40px"}
          width={"40px"}
          _hover={{ bg: "trans.200" }}
        />
        <IconButton
          icon={FaForward}
          action={() => handleNextPrev("next")}
          color={"neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={FaShuffle}
          action={() => handleShuffle()}
          color={shuffle ? "red" : "neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
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
