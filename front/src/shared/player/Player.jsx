import React, { useRef, useContext } from "react";
import "./player.css";
import { Box, Icon, Image, Text } from "@chakra-ui/react";
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
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { api } from "../../utils";
import { useShowToast } from "../../hooks/useShowToast";

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
  const [favorite, setFavorite] = useState(true);
  const [showToast] = useShowToast();
  const audioRef = useRef(null);

  const handleLoad = (ref) => {
    handleSetPlayerValues(ref);
    handlePosition(0, ref);
  };
  const handleSetFavorite = () => {
    if (favorite) {
      api
        .delete("/playlist/deleteFromPlaylist", {
          params: {
            name: "favorites",
            path: currentTrack.path,
          },
        })
        .then((res) => {
          showToast("success", "removed from playlist");
          setFavorite(false);
          // handleSetActivePlaylist(activePlaylist.active);
        })
        .catch(() => {
          showToast("success", "failed to remove");
        });
    } else {
      api
        .post("/playlist/addToPlaylist", {
          ...currentTrack,
          playlist: "favorites",
        })
        .then(() => {
          showToast("success", "added to playlist");
          setFavorite(true);
        })
        .catch(() => {
          showToast("error", "failed to add to playlist");
        });
    }
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
    if (currentTrack) {
      api
        .get("/playlist/inFav", {
          params: {
            path: currentTrack.path,
          },
        })
        .then((res) => {
          setFavorite(res.data);
        });
    }
  }, [loaded]);

  return (
    <Box
      bg={"none"}
      bgImage={"./musicLine.svg"}
      bgSize={"cover"}
      bgPos={"left"}
      width={"100%"}
      height={"100%"}
      display={"flex"}
    >
      <Box
        bg={"rgba(0,0,0,0)"}
        backdropFilter={"auto"}
        backdropBlur={"1px"}
        width={"100%"}
        height={"100%"}
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
            borderRadius={"4px"}
            overflow={"hidden"}
          >
            <Image
              src={
                currentTrackImage
                  ? `data:image/jpeg;base64,${currentTrackImage}`
                  : "./trackImage.svg"
              }
              width={"100%"}
              height={"100%"}
              fit={"cover"}
            />
          </Box>
          <Box
            height={"60px"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            overflow={"hidden"}
            mr={"6px"}
          >
            <Box>
              <Text fontSize={"12px"} whiteSpace={"nowrap"}>
                {currentTrack
                  ? currentTrack.title || currentTrack.name || "unknown"
                  : "unknown"}
              </Text>
              <Text fontSize={"10px"} color={"neutral.dark.300"}>
                {currentTrack ? currentTrack.artist || "unknown" : "unknown"}
              </Text>
            </Box>
            <Box display={"flex"}>
              <Icon
                onClick={handleSetFavorite}
                as={favorite ? TbHeartFilled : TbHeart}
                boxSize={4}
                color={favorite ? "secondary.500" : "neutral.dark.500"}
              />
            </Box>
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
          overflow={"hidden"}
        >
          <PlaybackRateControl ref={audioRef} />
          <VolumeControl ref={audioRef} />
        </Box>
      </Box>
    </Box>
  );
}
