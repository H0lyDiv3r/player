import {
  Box,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import React, { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { DotLoader } from "../loading";
import { FixedSizeList as List } from "react-window";
import { useRef } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useContext } from "react";
import { MusicDropdown } from "./MusicDropdown";
import { useState } from "react";

export const SearchMoadal = React.memo(function SearchModal({ phrase }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleSetTrack, currentTrack } = useContext(GlobalContext);
  const [search] = useRequest();

  const [selected, setSelected] = useState("");
  const heightRef = useRef(null);
  const handleSearch = (phrase) => {
    if (phrase !== "") {
      search.request("/dir/search", "GET", { search: phrase });
    }
  };
  useEffect(() => {
    if (isOpen) {
      handleSearch(phrase);
    }
  }, [isOpen]);
  return (
    <>
      <Icon
        as={TbSearch}
        _hover={{ cursor: "pointer" }}
        boxSize={4}
        onClick={() => {
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"none"} backdropFilter={"auto"} backdropBlur={"1px"}>
          <ModalContent
            m={0}
            bg={"neutral.dark.800"}
            color={"neutral.dark.200"}
            fontSize={"14px"}
            minWidth={"500px"}
            height={"500px"}
            my={"auto"}
          >
            <ModalBody
              px={"12px"}
              py={"24px"}
              display={"flex"}
              flexDir={"column"}
            >
              <Icon as={IoClose} onClick={() => onClose()} my={"5px"} />
              <Box>showing results for {phrase}</Box>
              <Box height={"100%"}>
                {search.loading && (
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    height={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <DotLoader />
                    <Box textAlign={"center"} color={"neutral.dark.300"}>
                      <Text fontSize={"1.25rem"} fontWeight={500}>
                        HOLD ON THERE!!
                      </Text>
                      <Text
                        fontSize={"1rem"}
                        fontWeight={400}
                        color={"neutral.dark.400"}
                      >
                        Searching for your music
                      </Text>
                    </Box>
                  </Box>
                )}
                {search.response && (
                  <Box ref={heightRef} height={"100%"}>
                    <List
                      className="scroll"
                      itemCount={search.response.length}
                      itemSize={45}
                      height={
                        heightRef.current ? heightRef.current.offsetHeight : 300
                      }
                      width={"100%"}
                    >
                      {({ index, style }) => {
                        return (
                          <Box
                            style={style}
                            key={index}
                            display={"grid"}
                            gridTemplateColumns={"10fr 2fr"}
                            _hover={{ bg: "neutral.dark.700" }}
                            borderRadius={"6px"}
                            px={"6px"}
                            onMouseOver={() => setSelected(index)}
                            onMouseLeave={() => setSelected(null)}
                          >
                            <Box
                              width={"full"}
                              display={"grid"}
                              gap={"24px"}
                              alignItems={"center"}
                              gridTemplateColumns={"40px 6fr 5fr"}
                              onClick={() =>
                                handleSetTrack(search.response[index])
                              }
                              fontSize={"12px"}
                              color={
                                search.response[index].path ===
                                (currentTrack && currentTrack["path"])
                                  ? "brand.500"
                                  : "neutral.dark.400"
                              }
                            >
                              <Box>
                                <Text>{index + 1}</Text>
                              </Box>
                              <Box overflow={"hidden"}>
                                <Text
                                  my={0}
                                  fontWeight={500}
                                  whiteSpace={"nowrap"}
                                >
                                  {search.response[index].title ||
                                    search.response[index].name}
                                </Text>
                                <Text
                                  whiteSpace={"nowrap"}
                                  color={
                                    search.response[index].path ===
                                    (currentTrack && currentTrack["path"])
                                      ? "brand.500"
                                      : "neutral.dark.400"
                                  }
                                >
                                  {search.response[index].artist || "unknown"}
                                </Text>
                              </Box>
                              <Box overflow={"hidden"}>
                                <Text whiteSpace={"nowrap"}>
                                  {search.response[index].album || "unknown"}
                                </Text>
                              </Box>
                            </Box>
                            <Box>
                              {selected === index && (
                                <MusicDropdown audio={search.response[index]} />
                              )}
                            </Box>
                          </Box>
                        );
                      }}
                    </List>
                  </Box>
                )}
              </Box>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
