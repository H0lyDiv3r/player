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
import { FaArrowLeft, FaFolder } from "react-icons/fa6";
import { BsFileEarmarkMusicFill } from "react-icons/bs";

export const DirNavigator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dir, setDir] = useState([{ name: "lala", type: "dir" }]);
  const { filePath, url, handleAddPath, handlePopPath, handleSetCurrentTrack } =
    useContext(GlobalContext);
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
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={0} bg={"none"} />
        <ModalContent
          minWidth={"600px"}
          maxWidth={"700px"}
          height={"95%"}
          bg={"trans.100"}
          backdropFilter={"auto"}
          backdropBlur={"12px"}
          borderColor={"neutral.700"}
          borderStyle={"solid"}
          borderWidth={"1px"}
          my={"1%"}
        >
          {/* <ModalCloseButton /> */}
          <ModalBody
            color={"neutral.300"}
            height={"100%"}
            display={"flex"}
            flexDir={"column"}
          >
            {/* <Box width={"100%"} p={"12px"} bg={"red"}></Box> */}
            <Box
              width={"100%"}
              px={"12px"}
              py={"24px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box>
                <Image src={"./folder3.svg"} width={"100px"} />
              </Box>
              <Box>
                <Image src={"./folder3.svg"} width={"100px"} />
              </Box>
              <Box>
                <Image src={"./folder3.svg"} width={"100px"} />
              </Box>
              <Box>
                <Image src={"./folder3.svg"} width={"100px"} />
              </Box>
            </Box>
            <Box my={"12px"} display={"flex"} alignItems={"center"}>
              <Icon as={FaArrowLeft} onClick={() => handlePopPath()} />
              <Box display={"flex"}>
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
                    borderRadius={"4px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Icon as={BsFileEarmarkMusicFill} mr={"8px"} />
                    <Text onClick={() => handleSetCurrentTrack(item.name)}>
                      {item.name}
                    </Text>
                  </Box>
                ) : (
                  <Box
                    key={idx}
                    p={"6px"}
                    // bg={"trans.200"}
                    borderRadius={"4px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Icon as={FaFolder} mr={"8px"} />
                    <Text onClick={() => handleAddPath(item.name)}>
                      {item.name}
                    </Text>
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
