import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
import colors from "../../themes/colors";

export const SearchMoadal = React.memo(function SearchModal() {
  const [phrase, setPhrase] = useState("");
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
  return (
    <>
      <Box
        p={"5px"}
        bg={"neutral.dark.200"}
        width={"30px"}
        height={"30px"}
        borderRadius={"20px"}
        color={"neutral.dark.900"}
        _hover={{
          cursor: "pointer",
          bg: "none",
          color: "neutral.dark.200",
          border: `1px ${colors.neutral.dark[200]} solid`,
        }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={() => {
          onOpen();
        }}
      >
        <Icon as={TbSearch} boxSize={4} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"none"} backdropFilter={"auto"} backdropBlur={"1px"}>
          <ModalContent
            m={0}
            bg={"rgba(200,200,200,0.3)"}
            backdropFilter={"auto"}
            backdropBlur={"2px"}
            color={"neutral.dark.200"}
            fontSize={"14px"}
            minWidth={"50%"}
            h={"90%"}
            my={"auto"}
            p={"10px"}
          >
            <ModalBody display={"flex"} flexDir={"column"} m={0} p={0}>
              <Box width={"100%"}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("submitting");
                    handleSearch(phrase);
                  }}
                >
                  <FormControl
                    _focus={{ border: "none", outline: "none" }}
                    width={"100%"}
                  >
                    <FormLabel display={"none"}>Search</FormLabel>
                    <InputGroup display={"flex"} alignItems={"center"}>
                      <InputRightElement
                        _hover={{ cursor: "pointer" }}
                        onClick={() => handleSearch(phrase)}
                      >
                        <Icon as={TbSearch} />
                      </InputRightElement>
                      <Input
                        size={"md"}
                        borderRadius={"4px"}
                        bg={"neutral.dark.800"}
                        border={"none"}
                        value={phrase}
                        onChange={(e) => {
                          e.preventDefault();
                          setPhrase(e.target.value);
                        }}
                        placeholder={"search for music..."}
                        focusBorderColor="transparent"
                        _focus={{
                          border: `1px solid ${colors.neutral.dark[600]}`,
                        }}
                        _placeholder={{ color: "neutral.dark.200" }}
                        outline={"transparent"}
                      />
                    </InputGroup>
                  </FormControl>
                </form>
              </Box>
              <Box
                bg={"neutral.dark.800"}
                height={"100%"}
                mt={"12px"}
                borderRadius={"6px"}
                p={"12px"}
              >
                <Box h={"10%"}>
                  <Text fontSize={"1em"}> Looking For: {phrase}</Text>
                </Box>
                <Divider />
                <Box h={"90%"}>
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
                  {search.response && search.response.length > 0 && (
                    <Box ref={heightRef} height={"100%"}>
                      <List
                        className="scroll"
                        itemCount={search.response.length}
                        itemSize={45}
                        height={
                          heightRef.current
                            ? heightRef.current.offsetHeight
                            : 400
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
                                  <MusicDropdown
                                    audio={search.response[index]}
                                  />
                                )}
                              </Box>
                            </Box>
                          );
                        }}
                      </List>
                    </Box>
                  )}
                  {(!search.response || search.response.length < 1) && (
                    <Box
                      height={"100%"}
                      display={"flex"}
                      flexDir={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      color={"neutral.dark.500"}
                    >
                      <Text
                        fontSize={"1.25rem"}
                        fontWeight={500}
                        color={"neutral.dark.300"}
                        textTransform={"uppercase"}
                      >
                        We Cant Find {phrase}!
                      </Text>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        my={"12px"}
                      >
                        <Image src={"./noMusic.svg"} width={"150px"} />
                      </Box>
                      <Text fontSize={"1rem"}>
                        please check your input and search again!!
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
