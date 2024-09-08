import React, { useRef, useContext } from "react";
import "./player.css";
import { Box, Image, Text } from "@chakra-ui/react";
import Controls from "./Controls";
import TimeLine from "./TimeLine";

import { PlayerContext } from "./PlayerContextProvider";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useEffect } from "react";
import colors from "../../themes/colors";
import PlaybackRateControl from "./PlaybackRateControl";
import VolumeControl from "./VolumeControl";
import { motion } from "framer-motion";
import { Cassette } from "../other/cassette";
import { useState } from "react";

export default function Player() {
  const {
    paused,
    handleTimeline,
    handleSetPlayerValues,
    handlePosition,
    handlePause,
    handleLoaded,
    loaded,
  } = useContext(PlayerContext);
  const {
    currentTrack,
    currentTrackImage,
    handleNextPrev,
    loop,
    handleSetCurrentTrackImage,
  } = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);

  const handleLoad = (ref) => {
    handleSetPlayerValues(ref);
    handlePosition(0, ref);
  };

  const MotionBox = motion(Box);
  useEffect(() => {
    if (currentTrack) {
      jsmediatags.read(
        `${import.meta.env.VITE_BASE_URL}/${currentTrack.path}`,
        {
          onSuccess: (tags) => {
            if (tags.tags.picture) {
              let byteCode = tags.tags.picture.data;
              let base64String = btoa(String.fromCharCode(...byteCode));
              handleSetCurrentTrackImage(base64String);
            } else {
              handleSetCurrentTrackImage(null);
            }
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
    console.log("loding loading loadlong", currentTrack);
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
              currentTrack
                ? `http://localhost:3000/${currentTrack["path"]}`
                : ""
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
        <Box
          width={"15%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
        >
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
              <Box
                fontSize={"12px"}
                fontWeight={300}
                height={"16px"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                <Text>{currentTrack ? currentTrack.name : " "}</Text>
              </Box>
              <Box height={"60%"} margin={"auto"} my={"6px"} display={"flex"}>
                <Box bg={"white"} width={"25%"} overflow={"hidden"}>
                  <Image
                    src={`data:image/jpeg;base64,${currentTrackImage}`}
                    width={"100%"}
                    fit={"cover"}
                  />
                </Box>
                <Box
                  bg={"white"}
                  width={"50%"}
                  height={"100%"}
                  pos={"relative"}
                  overflow={"hidden"}
                  borderRadius={"6px"}
                >
                  <Cassette paused={paused} />
                </Box>
                <Box width={"25%"}></Box>
              </Box>

              <Box width={"100%"} mx={"auto"}>
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
        <Box
          width={"15%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
        >
          <VolumeControl ref={audioRef} />
        </Box>
      </Box>
    </>
  );
}
