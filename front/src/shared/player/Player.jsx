import React, { useRef, useContext } from "react";
import "./player.css";
import { Box, Button, Icon, Image, Input, Text } from "@chakra-ui/react";
import Controls from "./Controls";
import TimeLine from "./TimeLine";

import { PlayerContext } from "./PlayerContextProvider";
import { GlobalContext } from "../../store/GlobalContextProvider";
// import { GlobalContext } from '@/app/providers/GlobalProvider'

export default function Player() {
  const {
    handleTimeline,
    handleSetPlayerValues,
    handlePosition,
    handlePause,
    handleLoaded,
  } = useContext(PlayerContext);
  const { currentTrack } = useContext(GlobalContext);
  // const {currentEpisode} = useContext(GlobalContext)

  const audioRef = useRef(null);

  const buffer = () => {
    // if(audioRef.current.duration!=audioRef.current.currentTime){
    //     setBuffered((audioRef.current.buffered.end( audioRef.current.buffered.length - 1 )/audioRef.current.duration)*100)
    // }
  };
  const handleLoad = (ref) => {
    handleSetPlayerValues(ref);
    handlePosition(0, ref);
  };

  return (
    <>
      <Box
        display={"flex"}
        bg={"neutral.800"}
        width={"500px"}
        padding={"24px"}
        mx={"24px"}
        borderRadius={"12px"}
        color={"rose.500"}
      >
        <Box display={"none"}>
          <audio
            controls
            ref={audioRef}
            onPlaying={() => handleTimeline(audioRef)}
            onProgress={buffer}
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
