import { Box, Icon, Input } from "@chakra-ui/react";
import React, { forwardRef, useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import "./volume.css";
import colors from "../../themes/colors";

const VolumeControl = forwardRef(function VolumeControl(props, ref) {
  const { handleVolume, volume, muted, handleMute } = useContext(PlayerContext);
  const width = 100;
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      bg={"transparent"}
      borderRadius={"20px"}
    >
      <Icon
        as={muted ? FaVolumeXmark : FaVolumeLow}
        onClick={() => handleMute(ref)}
        marginRight={"6px"}
      />
      <Box
        pos={"relative"}
        // bg={"blue"}
        height={"20px"}
        width={width}
        borderRadius={"20px"}
        py={"10px"}
      >
        <Box
          bg={"transparent"}
          bgImg={"linear-gradient(145deg,brand.800,brand.700)"}
          boxShadow={`inset 1px 1px 1px ${colors.brand[900]},inset -1px -1px 1px ${colors.brand[400]} `}
          width={`${width}px`}
          height={"5px"}
          position={"absolute"}
          top={"35%"}
          borderRadius={"5px"}
        ></Box>
        <Box
          height={"20px"}
          width={"30px"}
          bg={"transparent"}
          bgImg={"linear-gradient(145deg,brand.400,brand.600)"}
          boxShadow={`inset -2px -2px 3px 1px ${colors.brand[700]},
            inset 2px 2px 2px ${colors.brand[100]}, 1px 1px 3px ${colors.neutral.dark[500]}`}
          borderRadius={"10px"}
          pos={"absolute"}
          left={`${(volume / 100) * (width - 30)}px`}
          top={"0%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            height={"50%"}
            width={"10%"}
            boxShadow={`inset 1px 1px 1px ${colors.brand[700]},inset -1px -1px 1px ${colors.brand[400]} `}
            borderRadius={"1px"}
            mx={"1px"}
          ></Box>
          <Box
            height={"50%"}
            width={"10%"}
            boxShadow={`inset 1px 1px 1px ${colors.brand[700]},inset -1px -1px 1px ${colors.brand[400]} `}
            borderRadius={"1px"}
            mx={"1px"}
          ></Box>
        </Box>
        <Box
          bg={"transparent"}
          height={"10px"}
          borderRadius={"2px"}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          width={width}
          className="volume"
          pos={"absolute"}
          top={"25%"}
        >
          <Input
            type="range"
            onChange={(e) => handleVolume(e, ref)}
            value={volume}
            max={100}
            min={0}
          />
        </Box>
      </Box>
    </Box>
  );
});

export default VolumeControl;
