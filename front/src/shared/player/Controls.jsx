import { Badge, Box, Icon } from "@chakra-ui/react";
import { forwardRef, useContext } from "react";
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
import { PlayerButton } from "../bottons";
import { GlobalContext } from "../../store/GlobalContextProvider";
import colors from "../../themes/colors";

const Controls = forwardRef(function Controls(props, ref) {
  const { handlePlay, paused, loaded } = useContext(PlayerContext);
  const { handleNextPrev, handleShuffle, shuffle, handleLoop, loop, queue } =
    useContext(GlobalContext);
  const loopVals = [TbRepeatOff, TbRepeat, TbRepeatOnce];
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"neutral.400"}
      my={"4px"}
    >
      {/* main */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"50%"}
        px={"18px"}
      >
        <PlayerButton
          action={() => handleLoop()}
          color={loop === 0 ? "neutral.dark.300" : "brand.400"}
          _hover={{ bg: "none" }}
        >
          <Icon as={loopVals[loop]} boxSize={4} />
        </PlayerButton>
        <PlayerButton
          action={() => handleNextPrev("prev")}
          isDisabled={queue.list.length < 1}
          color={"neutral.dark.300"}
          _hover={{ bg: "none", color: "neutral.dark.100" }}
        >
          <Icon as={TbPlayerTrackPrevFilled} boxSize={4} />
        </PlayerButton>
        <PlayerButton
          action={() => handlePlay(ref)}
          isDisabled={!loaded}
          color={"neutral.dark.300"}
          border={`1px ${colors.neutral.dark[200]} solid`}
          _hover={{ border: "none", bg: "white", color: "neutral.dark.900" }}
          primary
        >
          <Icon
            as={paused ? TbPlayerPlayFilled : TbPlayerPauseFilled}
            boxSize={4}
          />
        </PlayerButton>

        <PlayerButton
          action={() => handleNextPrev("next")}
          isDisabled={queue.list.length < 1}
          color="neutral.dark.300"
          _hover={{ bg: "none", color: "neutral.dark.100" }}
        >
          <Icon as={TbPlayerTrackNextFilled} boxSize={4} />
        </PlayerButton>
        <PlayerButton
          action={() => handleShuffle()}
          _hover={{ bg: "none" }}
          color={shuffle ? "brand.500" : "neutral.dark.300"}
        >
          <Icon as={shuffle ? TbArrowsShuffle : TbArrowsRight} boxSize={4} />
        </PlayerButton>
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
