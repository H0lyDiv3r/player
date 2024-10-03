import { Spinner, Box, Text } from "@chakra-ui/react";
import { easeIn, easeOut, easeInOut, motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import colors from "../../themes/colors";

export default function SpinLoader() {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"21px"}
      flexDirection={"column"}
    >
      <Spinner
        width={"60px"}
        height={"60px"}
        borderWidth={"7px"}
        borderStyle={"solid"}
        borderTopColor={"sudoBlue.500"}
        borderRightColor={"sudoBlue.500"}
        boxShadow={"md"}
        background={"cotton"}
      />
      <Box fontSize={"14px"} fontWeight={500} color={"sudoGray.200"}>
        <Text>{`Loading...`}</Text>
      </Box>
    </Box>
  );
}

export const DotLoader = () => {
  const MotionBox = motion(Box);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        width={"100px"}
        height={"40px"}
        padding={"7px"}
        borderRadius={"30px"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          display={"flex"}
          height={"100%"}
          width={"60%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <MotionBox
            initial={{ height: "10px" }}
            animate={{ height: "30px" }}
            transition={{
              delay: 0,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: easeInOut,
            }}
            width={"8px"}
            borderRadius={"5px"}
            bg={"secondary.500"}
          ></MotionBox>

          <MotionBox
            initial={{ height: "10px" }}
            animate={{ height: "30px" }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: easeIn,
            }}
            width={"8px"}
            borderRadius={"5px"}
            bg={"secondary.500"}
          ></MotionBox>
          <MotionBox
            initial={{ height: "10px" }}
            animate={{ height: "30px" }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: easeOut,
            }}
            width={"8px"}
            borderRadius={"5px"}
            bg={"secondary.500"}
          ></MotionBox>
          <MotionBox
            initial={{ height: "10px" }}
            animate={{ height: "30px" }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: easeInOut,
            }}
            width={"8px"}
            borderRadius={"5px"}
            bg={"secondary.500"}
          ></MotionBox>
        </Box>
      </Box>
    </Box>
  );
};
