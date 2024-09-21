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
      const trackName = `${import.meta.env.VITE_BASE_URL}${currentTrack.path}`;

      jsmediatags.read(trackName, {
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
      });
    }
    console.log("loding loading loadlong", currentTrack);
  }, [loaded]);

  return (
    <>
      <Box
        bg={"none"}
        width={"100%"}
        height={"100%"}
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
          maxWidth={"30%"}
          minW={"30%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          color={"neutral.dark.100"}
        >
          <Box
            minWidth={"60px"}
            maxW={"60px"}
            height={"60px"}
            bg={"white"}
            mx={"6px"}
          >
            <Image
              src={`data:image/jpeg;base64,${currentTrackImage}`}
              width={"100%"}
              height={"100%"}
              fit={"cover"}
            />
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            overflow={"hidden"}
            mr={"6px"}
          >
            <Text fontSize={"12px"} whiteSpace={"nowrap"}>
              {currentTrack ? currentTrack.title || currentTrack.name : ""}
            </Text>
            <Text fontSize={"10px"} color={"neutral.dark.300"}>
              {currentTrack ? currentTrack.artist || "unknown" : ""}
            </Text>
          </Box>
        </Box>

        {/* center   */}
        <Box
          width={"40%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Controls ref={audioRef} />
          <TimeLine ref={audioRef} />
        </Box>

        {/* right */}
        <Box
          width={"30%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          px={"6px"}
        >
          <PlaybackRateControl ref={audioRef} />
          <VolumeControl ref={audioRef} />
        </Box>
      </Box>
    </>
  );
}
