import { Box, Icon, Input, Text } from "@chakra-ui/react";
import React, { forwardRef, memo, useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import "./volume.css";

const VolumeControl = forwardRef(function VolumeControl(props, ref) {
  const { handleVolume, volume, muted, handleMute } = useContext(PlayerContext);
  return (
    <Box display={"flex"} alignItems={"center"} color={"neutral.dark.200"}>
      <Icon
        as={muted ? FaVolumeXmark : FaVolumeLow}
        onClick={() => handleMute(ref)}
        marginRight={"2px"}
        boxSize={4}
      />
      <Box
        className="volume"
        height={"3px"}
        mx={"2px"}
        display={"flex"}
        overflow={"hidden"}
        width={"100px"}
        borderRadius={"4px"}
        bg={"neutral.dark.800"}
        pos={"relative"}
      >
        <Input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => handleVolume(e, ref)}
          top={0}
        />
      </Box>
    </Box>
  );
});

export default memo(VolumeControl);
