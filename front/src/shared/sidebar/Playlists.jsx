import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlay, FaRecordVinyl } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { api } from "../../utils";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "../dropdowns/CreatePlaylist";
import colors from "../../themes/colors";
import { DefaultButton } from "../bottons";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import { BsCassetteFill } from "react-icons/bs";

export const Playlists = () => {
  const [playlists] = useRequest();
  const { handleSetActivePlaylist, activePlaylist } = useContext(GlobalContext);
  const handleDeletePlaylist = (playlist) => {
    api
      .delete("/playlist/deletePlaylist", {
        params: {
          name: playlist,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    console.log("deleting");
  };

  useEffect(() => {
    playlists.request("/playlist/getPlaylists", "GET");
  }, []);
  useEffect(() => {
    if (!activePlaylist.name === "") {
      api
        .get("/playlist/getPlaylist", {
          params: {
            name: activePlaylist.name,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [activePlaylist]);
  return (
    <Grid
      templateRows={"repeat(12,1fr)"}
      fontSize={"14px"}
      fontWeight={400}
      color={"neutral.dark.100"}
    >
      <GridItem rowSpan={2}>
        <CreatePlaylist />
      </GridItem>
      <GridItem rowSpan={10}>
        <Box mt={"12px"}>
          {playlists.response &&
            playlists.response.map((playlist) => (
              <Box
                key={playlist}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box
                  onClick={() => handleSetActivePlaylist(playlist)}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Icon as={BsCassetteFill} mr={"12px"} />
                  <Text>{playlist}</Text>
                </Box>
                <ConfirmationMoadal
                  action={() => handleDeletePlaylist(playlist)}
                />
              </Box>
            ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

const ConfirmationMoadal = ({ action }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  return (
    <>
      <Icon
        as={TbDots}
        boxSize={4}
        onClick={(e) => {
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x}
            m={0}
            fontSize={"14px"}
            width={"350px"}
          >
            <ModalBody p={"12px"}>
              <Icon as={IoClose} onClick={() => onClose()} />
              <Box textAlign={"center"}>
                are you sure you want to delete this playlist?
              </Box>
              <DefaultButton size={"sm"} action={action}>
                delete
              </DefaultButton>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
