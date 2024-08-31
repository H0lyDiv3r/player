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
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { WalkmanButton } from "../bottons";
import { FaCaretUp, FaChevronDown } from "react-icons/fa6";
import colors from "../../themes/colors";

const speed = {
  0.5: {
    id: 0,
    name: "slow",
    value: 0.5,
  },
  1: {
    id: 1,
    name: "normal",
    value: 1,
  },
  1.5: {
    id: 3,
    name: "fast",
    value: 1.5,
  },
  2: {
    id: 4,
    name: "faster",
    value: 2,
  },
};

const PlaybackRateControl = forwardRef(
  function PlaybackRateControl(props, ref) {
    const { handlePlaybackRate, playbackRate } = useContext(PlayerContext);
    return (
      <>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          my={"6px"}
        >
          <Box>Speed</Box>
          <WalkmanButton
            height={20}
            width={30}
            direction={"up"}
            depth={"2px"}
            action={() =>
              handlePlaybackRate(Math.min(playbackRate + 0.5, 2), ref)
            }
          >
            <Icon as={FaCaretUp} />
          </WalkmanButton>
          <Box
            width={"60px"}
            height={"30px"}
            bgImg={"linear-gradient(145deg,brand.700,brand.500)"}
            boxShadow={`inset -2px -2px 5px  ${colors.brand[200]},inset 1px 1px 5px ${colors.brand[900]}`}
            p={"2px"}
            borderRadius={"6px"}
            overflow={"hidden"}
            my={"6px"}
          >
            <Box
              bg={"neutral.dark.500"}
              overflow={"hidden"}
              width={"100%"}
              height={"100%"}
              fontSize={"12px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"6px"}
            >
              {speed[playbackRate].name}
            </Box>
          </Box>
          <WalkmanButton
            height={20}
            width={30}
            direction={"down"}
            depth={"2px"}
            action={() =>
              handlePlaybackRate(Math.max(playbackRate - 0.5, 0.5), ref)
            }
          >
            <Icon as={FaCaretDown} />
          </WalkmanButton>
        </Box>
      </>
    );
  },
);

export default PlaybackRateControl;
// <Menu closeOnSelect={true}>
//   {speed.map((val) => (
//     <Box key={val.id}>
//       {playbackRate == val.value && (
//         <MenuButton
//           minWidth={"70px"}
//           fontSize={"12px"}
//           fontWeight={400}
//           // bg={"brand.500"}
//           bgImage={"linear-gradient(120deg,brand.500,brand.600)"}
//           borderRadius={"6px"}
//           color={"white"}
//           py={"6px"}
//         >
//           {val.name}
//         </MenuButton>
//       )}
//     </Box>
//   ))}

//   <MenuList
//     bg={"neutral.200"}
//     minW={0}
//     width={"70px"}
//     p={"4px"}
//     fontSize={"12px"}
//     fontWeight={400}
//   >
//     {speed.map((val) => (
//       <MenuItem
//         key={val.id}
//         id={val.id}
//         onClick={() => handlePlaybackRate(val.value, ref)}
//         bg={val.value == playbackRate && "brand.500"}
//         color={val.value == playbackRate && "neutral.200"}
//         borderRadius={"8px"}
//         display={"flex"}
//         justifyContent={"center"}
//       >
//         {val.name}
//       </MenuItem>
//     ))}
//   </MenuList>
// </Menu>
