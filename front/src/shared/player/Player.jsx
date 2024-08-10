import React, { useRef, useContext } from "react";
import "./player.css";
import { Box, Button, Icon, Image, Input, Text } from "@chakra-ui/react";
import Controls from "./Controls";
import TimeLine from "./TimeLine";

import { PlayerContext } from "./PlayerContextProvider";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useEffect } from "react";
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
  const { currentTrack } = useContext(GlobalContext);
  // const {currentEpisode} = useContext(GlobalContext)

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
        display={"flex"}
        bg={"transparent"}
        bgGradient={
          "linear-gradient(135deg,rgba(255,255,255,0.2),rgba(100,100,100,0.2))"
        }
        backdropFilter={"auto"}
        backdropBlur={"10px"}
        width={"500px"}
        padding={"24px"}
        mx={"24px"}
        borderRadius={"12px"}
        color={"rose.500"}
        borderColor={"trans.100"}
        borderWidth={"1px"}
        borderStyle={"solid"}
        boxShadow={"md"}
      >
        <Box display={"none"}>
          <audio
            controls
            ref={audioRef}
            onPlaying={() => handleTimeline(audioRef)}
            src={`http://localhost:3000/${currentTrack}`}
            onLoadedData={() => handleSetPlayerValues(audioRef)}
            onEnded={() => handlePause(audioRef)}
            onEmptied={() => handleLoaded(false)}
          >
            "your browser doesnt support the element"
          </audio>
        </Box>

        <Box width={"100%"}>
          <Controls ref={audioRef} />
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TimeLine ref={audioRef} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
