import React, { forwardRef, useContext, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Text,
  Icon,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaTimes } from "react-icons/fa";

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
        <Box>
          <Menu closeOnSelect={true}>
            {speed.map((val) => (
              <Box key={val.id}>
                {playbackRate == val.value && (
                  <MenuButton
                    minWidth={"70px"}
                    fontSize={"12px"}
                    fontWeight={400}
                    // bg={"brand.500"}
                    bgImage={"linear-gradient(120deg,brand.500,brand.600)"}
                    borderRadius={"6px"}
                    color={"white"}
                    py={"6px"}
                  >
                    {val.name}
                  </MenuButton>
                )}
              </Box>
            ))}

            <MenuList
              bg={"neutral.200"}
              minW={0}
              width={"70px"}
              p={"4px"}
              fontSize={"12px"}
              fontWeight={400}
            >
              {speed.map((val) => (
                <MenuItem
                  key={val.id}
                  id={val.id}
                  onClick={() => handlePlaybackRate(val.value, ref)}
                  bg={val.value == playbackRate && "brand.500"}
                  color={val.value == playbackRate && "neutral.200"}
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
