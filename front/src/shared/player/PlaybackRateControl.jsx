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
                    bg={"neutral.700"}
                    borderWidth={"1px"}
                    borderColor={"neutral.600"}
                    borderStyle={"solid"}
                    borderRadius={"4px"}
                    py={"4px"}
                  >
                    {val.name}
                  </MenuButton>
                )}
              </Box>
            ))}

            <MenuList
              bg={"neutral.800"}
              minW={0}
              width={"70px"}
              p={0}
              fontSize={"12px"}
              fontWeight={400}
            >
              {speed.map((val) => (
                <MenuItem
                  key={val.id}
                  id={val.id}
                  onClick={() => handlePlaybackRate(val.value, ref)}
                  bg={val.value == playbackRate && "neutral.300"}
                  color={val.value == playbackRate && "neutral.700"}
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
