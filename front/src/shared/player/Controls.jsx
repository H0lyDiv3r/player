import { Box, Icon, Button, Spinner, Spacer, Text } from "@chakra-ui/react";
import { forwardRef, useContext, useRef } from "react";
import {
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbArrowsShuffle,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbArrowsRight,
} from "react-icons/tb";
import { PlayerContext } from "./PlayerContextProvider";
import VolumeControl from "./VolumeControl";
import PlaybackRateControl from "./PlaybackRateControl";
import { IconButton, WalkmanButton } from "../bottons";
import { GlobalContext } from "../../store/GlobalContextProvider";

const Controls = forwardRef(function Controls(props, ref) {
  const { handlePlay, paused, loaded, handleFastForward } =
    useContext(PlayerContext);
  const { handleNextPrev, handleShuffle, shuffle, handleLoop, loop, queue } =
    useContext(GlobalContext);
  const loopVals = [TbRepeatOff, TbRepeat, TbRepeatOnce];
  return (
    <Box
      width={"100%"}
      display={"flex"}
      my={"4px"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"neutral.400"}
    >
      {/* main */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"50%"}
        px={"18px"}
      >
        <WalkmanButton
          action={() => handleLoop()}
          height={20}
          width={30}
          depth={"2px"}
        >
          <Icon as={loopVals[loop]} boxSize={3} />
        </WalkmanButton>
        <WalkmanButton
          action={() => handleNextPrev("prev")}
          height={20}
          width={30}
          depth={"2px"}
          disabled={queue.list.length < 1}
        >
          <Icon as={TbPlayerTrackPrevFilled} boxSize={3} />
        </WalkmanButton>
        <WalkmanButton
          action={() => handlePlay(ref)}
          height={30}
          width={30}
          disabled={!loaded}
        >
          <Icon
            as={paused ? TbPlayerPlayFilled : TbPlayerPauseFilled}
            boxSize={3}
          />
        </WalkmanButton>

        <WalkmanButton
          action={() => handleNextPrev("next")}
          height={20}
          width={30}
          depth={"2px"}
          disabled={queue.list.length < 1}
        >
          <Icon as={TbPlayerTrackNextFilled} boxSize={3} />
        </WalkmanButton>
        <WalkmanButton
          action={() => handleShuffle()}
          height={20}
          width={30}
          depth={"2px"}
        >
          <Icon as={shuffle ? TbArrowsShuffle : TbArrowsRight} boxSize={3} />
        </WalkmanButton>
      </Box>
    </Box>
  );
});

export default Controls;

// <Box width={"25%"}>
//   <PlaybackRateControl ref={ref} />
// </Box>
// <Box
//   display={"flex"}
//   minWidth={"25%"}
//   justifyContent={"flex-end"}
//   alignItems={"center"}
// >

// </Box>
