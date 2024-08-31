import { Box, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import colors from "../../themes/colors";
import React, { useEffect } from "react";
import { useContext } from "react";
import { PlayerContext } from "../player/PlayerContextProvider";
import { useRef } from "react";

export const Cassette = React.memo(function cassette({ paused }) {
  const MotionBox = motion(Box);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      width={"100%"}
      height={"100%"}
      bgImage={`linear-gradient(
        45deg,
        #999 5%,
        #fff 10%,
        #ccc 30%,
        #ddd 50%,
        #ccc 70%,
        #fff 80%,
        #999 95%
      )`}
      pos={"relative"}
    >
      <MotionBox
        bg={"transparent"}
        p={"0px"}
        initial={{ rotateZ: 180 }}
        animate={{ rotateZ: paused ? 180 : 360 + 180 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        height={"fit-content"}
        width={"150px"}
        borderRadius={"100px"}
        pos={"absolute"}
        right={"60%"}
        top={"-50%"}
        boxShadow={"0px 0px 5px black"}
        overflow={"hidden"}
      >
        <Image src={"/cassette.jpg"} width={"100%"} fit={"contain"} />
      </MotionBox>
      <MotionBox
        bg={"transparent"}
        p={"0px"}
        initial={{ rotateZ: 180 }}
        animate={{ rotateZ: paused ? 180 : 180 + 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        height={"fit-content"}
        width={"150px"}
        borderRadius={"100px"}
        pos={"absolute"}
        left={"60%"}
        top={"-50%"}
        boxShadow={"0px 0px 5px black"}
        overflow={"hidden"}
      >
        <Image src={"/cassette.jpg"} width={"100%"} fit={"cover"} />
      </MotionBox>

      <Box
        bgImage={
          "linear-gradient(145deg,rgba(0,0,0,0.6) 10%,rgba(155,155,155,0.2) 30%,rgba(0,0,0,0.3))"
        }
        boxShadow={`inset 2px 2px 3px ${colors.neutral.dark[100]},inset -2px -2px 3px ${colors.neutral.dark[800]}`}
        backdropFilter={"auto"}
        backdropBlur={"1px"}
        width={"100%"}
        height={"100%"}
        pos={"absolute"}
        borderRadius={"6px"}
      ></Box>
    </Box>
  );
});
