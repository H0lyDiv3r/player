import { Box, Icon, Input, Text } from "@chakra-ui/react";
import React, { forwardRef, useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import "./volume.css";
import colors from "../../themes/colors";

const VolumeControl = forwardRef(function VolumeControl(props, ref) {
  const { handleVolume, volume, muted, handleMute } = useContext(PlayerContext);
  const height = 100;
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      bg={"transparent"}
      borderRadius={"20px"}
    >
      <Box
        pos={"relative"}
        bg={"brand.700"}
        boxShadow={`inset 1px 1px 1px ${colors.brand[900]},inset -1px -1px 1px ${colors.brand[400]} `}
        width={"20px"}
        height={120}
        borderRadius={"20px"}
        py={"10px"}
      >
        {/* rail */}
        <Box
          bg={"neutral.dark.600"}
          // bgImg={"linear-gradient(145deg,brand.800,brand.700)"}
          boxShadow={`inset 1px 1px 1px ${colors.brand[900]},inset -1px -1px 1px ${colors.brand[400]} `}
          height={`${height}px`}
          width={"5px"}
          position={"absolute"}
          top={"10px"}
          left={"35%"}
          borderRadius={"5px"}
          overflow={"hidden"}
        >
          <Box
            bg={"brand.600"}
            height={`${(volume / 100) * height}px`}
            width={"100%"}
            position={"absolute"}
            bottom={"0px"}
            // left={"35%"}
            borderRadius={"5px"}
          ></Box>
        </Box>

        {/* thumb */}
        <Box
          height={"30px"}
          width={"20px"}
          bg={"transparent"}
          bgImg={"linear-gradient(145deg,brand.400,brand.600)"}
          boxShadow={`inset -2px -2px 3px 1px ${colors.brand[700]},
            inset 2px 2px 2px ${colors.brand[100]}, 1px 1px 3px ${colors.neutral.dark[500]}`}
          borderRadius={"10px"}
          pos={"absolute"}
          bottom={`${(volume / 100) * (height - 10)}px`}
          left={"0%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Box
            height={"10%"}
            width={"50%"}
            boxShadow={`inset 1px 1px 1px ${colors.brand[700]},inset -1px -1px 1px ${colors.brand[400]} `}
            borderRadius={"1px"}
            my={"1px"}
          ></Box>
          <Box
            height={"10%"}
            width={"50%"}
            boxShadow={`inset 1px 1px 1px ${colors.brand[700]},inset -1px -1px 1px ${colors.brand[400]} `}
            borderRadius={"1px"}
            my={"1px"}
          ></Box>
        </Box>
        <Box
          bg={"transparent"}
          // height={width}

          borderRadius={"2px"}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          width={"10px"}
          className="volume"
          pos={"absolute"}
          left={"25%"}
          top={"5%"}
        >
          <Input
            type="range"
            width={"10px"}
            minW={"0px"}
            height={height}
            onChange={(e) => handleVolume(e, ref)}
            value={volume}
            max={100}
            min={0}
            orient={"vertical"}
            border={"none"}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"12px"}
      >
        <Icon
          as={muted ? FaVolumeXmark : FaVolumeLow}
          onClick={() => handleMute(ref)}
          marginRight={"6px"}
        />
        <Text>Volume</Text>
      </Box>
    </Box>
  );
});

export default VolumeControl;
