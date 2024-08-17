"use client";
import { Box, Icon, Button, Spinner, Spacer, Text } from "@chakra-ui/react";
import { forwardRef, useContext, useRef } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaShuffle,
} from "react-icons/fa6";
import {
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbArrowsShuffle,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { PlayerContext } from "./PlayerContextProvider";
import VolumeControl from "./VolumeControl";
import PlaybackRateControl from "./PlaybackRateControl";
import { IconButton } from "../bottons";
import { GlobalContext } from "../../store/GlobalContextProvider";

const Controls = forwardRef(function Controls(props, ref) {
  const { handlePlay, paused, loaded, handleFastForward } =
    useContext(PlayerContext);
  const { handleNextPrev, handleShuffle, shuffle, handleLoop, loop } =
    useContext(GlobalContext);
  const loopVals = [TbRepeatOff, TbRepeat, TbRepeatOnce];
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
          icon={loopVals[loop]}
          action={() => handleLoop()}
          color={"neutral.400"}
          bg={"none"}
          size={5}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={TbPlayerTrackPrevFilled}
          action={() => handleNextPrev("prev")}
          color={"neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={paused ? TbPlayerPlayFilled : TbPlayerPauseFilled}
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
          icon={TbPlayerTrackNextFilled}
          action={() => handleNextPrev("next")}
          color={"neutral.400"}
          bg={"none"}
          _hover={{ bg: "none" }}
        />
        <IconButton
          icon={TbArrowsShuffle}
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
