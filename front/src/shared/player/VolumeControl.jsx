import { Box, Icon, Input } from "@chakra-ui/react";
import React, { forwardRef, useContext } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";

const VolumeControl = forwardRef(function VolumeControl(props, ref) {
  const { handleVolume, volume, muted, handleMute } = useContext(PlayerContext);
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Icon
        as={muted ? FaVolumeXmark : FaVolumeLow}
        onClick={() => handleMute(ref)}
        marginRight={"6px"}
      />
      <Box
        bg={"white"}
        height={"4px"}
        borderRadius={"2px"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
        width={"60px"}
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
  );
});

export default VolumeControl;
