import React, { useRef, useContext } from "react";
import "./player.css";
import { Box, Button, Icon, Image, Input, Text } from "@chakra-ui/react";
import Controls from "./Controls";
import TimeLine from "./TimeLine";

import { PlayerContext } from "./PlayerContextProvider";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useEffect } from "react";
import colors from "../../themes/colors";
import { FaPlay } from "react-icons/fa6";
import { WalkmanButton } from "../bottons";
import PlaybackRateControl from "./PlaybackRateControl";
import VolumeControl from "./VolumeControl";
// import { GlobalContext } from '@/app/providers/GlobalProvider'

export default function Player() {
  const {
    handleTimeline,
    handleSetPlayerValues,
    handlePosition,
    handlePause,
    handleLoaded,
    loaded,
  } = useContext(PlayerContext);
  const { currentTrack, queue, handleNextPrev, loop } =
    useContext(GlobalContext);

  const audioRef = useRef(null);

  const handleLoad = (ref) => {
    handleSetPlayerValues(ref);
    handlePosition(0, ref);
  };
  useEffect(() => {
    console.log("loding loading loadlong", audioRef.current);
  }, [loaded]);

  return (
    <>
      <Box
        bg={"brand.600"}
        boxShadow={`
          inset -2px -2px 5px 2px ${colors.brand[900]},
          inset 3px 3px 5px ${colors.brand[100]}`}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
        px={"24px"}
        mx={"24px"}
        borderRadius={"12px"}
        width={"600px"}
        height={"200px"}
        overflow={"hidden"}
        display={"flex"}
      >
        <Box display={"none"}>
          <audio
            controls
            ref={audioRef}
            onPlaying={() => handleTimeline(audioRef)}
            src={
              currentTrack ? `http://localhost:3000${currentTrack["path"]}` : ""
            }
            loop={loop == 2}
            onLoadedData={() => handleSetPlayerValues(audioRef)}
            onEnded={() => handleNextPrev("next")}
            onEmptied={() => handleLoaded(false)}
          >
            "your browser doesnt support the element"
          </audio>
        </Box>

        {/* Left */}
        <Box width={"15%"}>
          <PlaybackRateControl ref={audioRef} />
        </Box>

        {/* center   */}
        <Box width={"70%"} mx={"5%"}>
          {/* screen */}
          <Box
            bg={"transparent"}
            bgImg={"linear-gradient(145deg,brand.700,brand.500)"}
            boxShadow={`inset -2px -2px 5px  ${colors.brand[200]},inset 1px 1px 5px ${colors.brand[900]}`}
            width={"100%"}
            height={"fit-content"}
            mx={"auto"}
            px={"6px"}
            paddingBottom={"6px"}
            borderBottomRadius={"12px"}
          >
            <Box
              bg={"neutral.dark.600"}
              height={"130px"}
              mx={"auto"}
              p={"6px"}
              borderBottomRadius={"12px"}
            >
              <Box fontSize={"12px"} fontWeight={300}>
                {currentTrack && currentTrack.name}
              </Box>
              <Box bg={"white"} height={"60%"} mx={"auto"} my={"6px"}>
                <Box
                  bg={"black"}
                  width={"60%"}
                  height={"100%"}
                  margin={"auto"}
                ></Box>
              </Box>

              <Box width={"60%"} mx={"auto"}>
                <TimeLine ref={audioRef} />
              </Box>
            </Box>
          </Box>

          {/* controls  */}
          <Box>
            <Controls ref={audioRef} />
          </Box>
        </Box>

        {/* right */}
        <Box width={"15%"} display={"flex"} alignItems={"center"}>
          <VolumeControl ref={audioRef} />
        </Box>
      </Box>
    </>
  );
}
// <Box width={"100%"}></Box>

// <Controls ref={audioRef} />
// <Box
//   bg={"transparent"}
//   bgImage={"linear-gradient(145deg,brand.700,brand.500)"}
//   boxShadow={`inset -1px -1px 5px ${colors.brand[400]},inset 1px 1px 5px ${colors.brand[900]}`}
//   width={"fit-content"}
//   height={"fit-content"}
//   p={"6px"}
//   borderRadius={"40px"}
// >
//   <Button
//     className={"3d"}
//     height={"50px"}
//     width={"50px"}
//     bg={"transparent"}
//     borderRadius={"40px"}
//     bgImage={`linear-gradient(180deg,brand.500,brand.500)`}
//     boxShadow={`inset 0px 0px 1px 1px ${colors.brand[900]},
//         inset -2px -2px 3px 2px ${colors.brand[700]},
//         inset 3px 3px 2px ${colors.brand[100]}`}
//     _hover={{
//       bgImage: `linear-gradient(180deg,brand.500,brand.500)`,
//       boxShadow: `inset 0px 0px 1px 1px ${colors.brand[800]},
//         inset -2px -2px 3px 2px ${colors.brand[700]},
//         inset 3px 3px 2px ${colors.brand[100]}`,
//     }}
//     _active={{
//       bgImage: `linear-gradient(180deg,brand.500,brand.500)`,
//       boxShadow: `inset 0px 0px 1px 2px ${colors.brand[900]},
//         inset -2px -2px 3px 2px ${colors.brand[700]},
//         inset 3px 3px 2px ${colors.brand[100]}`,
//     }}
//   >
//     <Icon as={FaPlay} color={"neutral.dark.500"} />
//   </Button>
// </Box>
