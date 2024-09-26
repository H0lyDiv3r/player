import React, { forwardRef, useContext, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Icon,
} from "@chakra-ui/react";
import { PlayerContext } from "./PlayerContextProvider";
import { IoSpeedometer } from "react-icons/io5";
const speed = [
  {
    id: 0,
    name: "slow",
    value: 0.5,
  },
  {
    id: 1,
    name: "normal",
    value: 1,
  },
  {
    id: 3,
    name: "fast",
    value: 1.5,
  },
  {
    id: 4,
    name: "faster",
    value: 2,
  },
];

const PlaybackRateControl = forwardRef(
  function PlaybackRateControl(props, ref) {
    const { handlePlaybackRate, playbackRate } = useContext(PlayerContext);
    return (
      <>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          mx={"12px"}
          color={"neutral.dark.200"}
        >
          <Menu closeOnSelect={false}>
            {speed.map((val) => (
              <Box key={val.id}>
                {playbackRate == val.value && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    minW={"50px"}
                    py={"6px"}
                  >
                    <Icon as={IoSpeedometer} boxSize={4} />
                    <MenuButton
                      minW={"50px"}
                      fontSize={"12px"}
                      fontWeight={400}
                      display={"flex"}
                    >
                      {val.name}
                    </MenuButton>
                  </Box>
                )}
              </Box>
            ))}

            <MenuList
              bg={"neutral.dark.800"}
              border={"none"}
              minW={0}
              width={"70px"}
              p={"4px"}
              fontSize={"12px"}
              fontWeight={400}
              color={"neutral.dark.200"}
            >
              {speed.map((val) => (
                <MenuItem
                  key={val.id}
                  id={val.id}
                  onClick={() => handlePlaybackRate(val.value, ref)}
                  bg={val.value == playbackRate && "brand.500"}
                  color={val.value == playbackRate && "neutral.dark.800"}
                  borderRadius={"8px"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {val.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </>
    );
  },
);

export default PlaybackRateControl;
