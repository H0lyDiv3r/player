import {
  Box,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaFolder, FaFolderPlus } from "react-icons/fa6";
import { ButtonIcon, DefaultButton } from "../bottons";
import { api } from "../../utils";
import path from "path-browserify";
import { useShowToast } from "../../hooks/useShowToast";
import useRequest from "../../hooks/useRequest";
import { DotLoader } from "../loading";

export const DirNavigator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dir, setDir] = useState([{ name: "", type: "dir" }]);
  const [scan] = useRequest();
  const [toBeScanned, setToBeScanned] = useState("");
  const [showToast] = useShowToast();
  const { filePath, url, handleAddPath, handlePopPath, handleSetPath } =
    useContext(GlobalContext);

  const handleScan = async (folder) => {
    console.log("scannig", path.join(filePath, folder));
    scan
      .request(`dir/addDir`, "GET", {
        dir: path.join(filePath, folder, "/"),
      })
      .then((res) => {
        showToast("success", "added directory");
        handleCloseNavigator();
      });
  };
  const handleCloseNavigator = () => {
    handleSetPath([]);
    setToBeScanned("");
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      api
        .get(`/dir`, {
          params: {
            dir: filePath,
          },
        })
        .then((res) => {
          console.log(res, import.meta.env);
          setDir(res.data);
        });
    }
  }, [filePath]);
  return (
    <>
      <ButtonIcon icon={FaFolderPlus} onClick={onOpen}>
        Add Directory
      </ButtonIcon>

      <Modal isOpen={isOpen} onClose={handleCloseNavigator}>
        <ModalOverlay p={0} bg={"none"} />
        <ModalContent
          minWidth={"600px"}
          maxWidth={"700px"}
          height={"95%"}
          bg={"neutral.dark.800"}
          fontSize={"14px"}
          my={"1%"}
          py={"12px"}
          borderRadius={"12px"}
        >
          {/* <ModalCloseButton /> */}
          <ModalBody
            color={"neutral.dark.300"}
            height={"100%"}
            display={"flex"}
            flexDir={"column"}
          >
            {scan.loading && (
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
                    Scaning your directory
                  </Text>
                </Box>
              </Box>
            )}
            {!scan.loading && (
              <>
                <Box
                  my={"6px"}
                  display={"flex"}
                  alignItems={"center"}
                  py={"6px"}
                  bg={"neutral.dark.700"}
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
                <Box overflow={"auto"} height={"100%"} my={"4px"}>
                  {dir.map((item, idx) => (
                    <Box
                      key={idx}
                      p={"8px"}
                      borderRadius={"4px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      _hover={{
                        cursor: "pointer",
                        color: "brand.500",
                        bg: "neutral.dark.700",
                      }}
                      bg={toBeScanned === item.name && "neutral.dark.700"}
                    >
                      <Box
                        onDoubleClick={() => handleAddPath(item.name)}
                        onClick={() => setToBeScanned(item.name)}
                        display={"flex"}
                        alignItems={"center"}
                        width={"full"}
                      >
                        <Icon as={FaFolder} mr={"8px"} />
                        <Text>{item.name}</Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box mt={"4px"}>
                  <DefaultButton
                    color={"neutral.dark.800"}
                    action={() => handleScan(toBeScanned)}
                    isDisabled={toBeScanned === ""}
                  >
                    scan
                  </DefaultButton>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// <DefaultButton onClick={handleScan}>scan</DefaultButton>
