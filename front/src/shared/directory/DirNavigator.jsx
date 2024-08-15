import {
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaFolder, FaFolderPlus } from "react-icons/fa6";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import { ButtonIcon } from "../bottons";
import { FaFolderOpen } from "react-icons/fa";

export const DirNavigator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dir, setDir] = useState([{ name: "lala", type: "dir" }]);
  const {
    filePath,
    url,
    handleAddPath,
    handlePopPath,
    handleSetCurrentTrack,
    handleSetPath,
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log("Fetcing");
    axios
      .get("http://localhost:3000", {
        params: {
          dir: filePath,
        },
      })
      .then((res) => {
        setDir(res.data);
      });
  }, [filePath]);
  return (
    <>
      <ButtonIcon icon={FaFolderPlus} onClick={onOpen}>
        Add Directory
      </ButtonIcon>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={0} bg={"none"} />
        <ModalContent
          minWidth={"600px"}
          maxWidth={"700px"}
          height={"95%"}
          bg={"transparent"}
          bgImage={
            "linear-gradient(150deg,rgba(255,255,255,0.2),rgba(0,0,0,0.2))"
          }
          backdropFilter={"auto"}
          backdropBlur={"12px"}
          borderColor={"neutral.700"}
          borderStyle={"solid"}
          borderWidth={"1px"}
          my={"1%"}
          py={"12px"}
          borderRadius={"12px"}
        >
          {/* <ModalCloseButton /> */}
          <ModalBody
            color={"neutral.300"}
            height={"100%"}
            display={"flex"}
            flexDir={"column"}
          >
            <Box width={"100%"} p={"6px"}>
              <Text>Files</Text>
            </Box>
            <Box
              width={"100%"}
              px={"12px"}
              py={"24px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box onClick={() => handleSetPath(["home", "yuri", "Desktop"])}>
                <Image src={"./folder3.svg"} width={"80px"} />
                <Text>Desktop</Text>
              </Box>
              <Box onClick={() => handleSetPath(["home", "yuri", "Music"])}>
                <Image src={"./folder3.svg"} width={"80px"} />
                <Text>Music</Text>
              </Box>
              <Box onClick={() => handleSetPath(["home", "yuri", "Videos"])}>
                <Image src={"./folder3.svg"} width={"80px"} />
                <Text>Videos</Text>
              </Box>
              <Box onClick={() => handleSetPath(["home", "yuri", "Downloads"])}>
                <Image src={"./folder3.svg"} width={"80px"} />
                <Text>Downloads</Text>
              </Box>
            </Box>
            <Box
              my={"12px"}
              display={"flex"}
              alignItems={"center"}
              // borderY={`solid 1px white`}
              py={"6px"}
              bg={"trans.100"}
              borderRadius={"4px"}
            >
              <Icon
                as={FaArrowLeft}
                onClick={() => handlePopPath()}
                _hover={{ cursor: "pointer" }}
                mx={"8px"}
              />
              <Box
                display={"flex"}
                width={"100%"}
                flexWrap={"nowrap"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                <Text>root:/</Text>
                {url.map((item, idx) => (
                  <Text key={idx}>{item}/</Text>
                ))}
              </Box>
            </Box>
            <Box overflow={"scroll"} height={"100%"}>
              {dir.map((item, idx) =>
                item.type === "file" ? (
                  <Box
                    key={idx}
                    p={"6px"}
                    // bg={"trans.200"}
                    onClick={() => handleSetCurrentTrack(item.name)}
                    borderRadius={"4px"}
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ cursor: "pointer", bg: "brand.500" }}
                  >
                    <Icon as={BsFileEarmarkMusicFill} mr={"8px"} />
                    <Text>{item.name}</Text>
                  </Box>
                ) : (
                  <Box
                    key={idx}
                    p={"6px"}
                    // bg={"trans.200"}
                    onClick={() => handleAddPath(item.name)}
                    borderRadius={"4px"}
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ cursor: "pointer", bg: "trans.100" }}
                  >
                    <Icon as={FaFolder} mr={"8px"} />
                    <Text>{item.name}</Text>
                  </Box>
                ),
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
