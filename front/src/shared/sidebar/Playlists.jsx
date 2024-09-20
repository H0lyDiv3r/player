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
import { TbDots, TbTrashFilled } from "react-icons/tb";
import { BsCassetteFill } from "react-icons/bs";
import { useShowToast } from "../../hooks/useShowToast";

export const Playlists = () => {
  const [playlistsReq] = useRequest();
  const [showToast] = useShowToast();
  const [playlists, setPlaylists] = useState([]);
  const { handleSetActivePlaylist, activePlaylist } = useContext(GlobalContext);
  const handleDeletePlaylist = (playlist) => {
    api
      .delete("/playlist/deletePlaylist", {
        params: {
          name: playlist,
        },
      })
      .then((res) => {
        setPlaylists(res.data);
        showToast("success", "deleted playlist");
      })
      .catch(() => {
        showToast("error", "failed to delete a playlist");
      });
  };
  const handleCreatePlaylist = (playlistName) => {
    api
      .post("/playlist/createPlaylist", { name: playlistName })
      .then((res) => {
        showToast("success", "created playlist");
        setPlaylists(res.data);
      })
      .catch(() => {
        showToast("error", "failed to create playlist");
      });
    console.log("hanele", playlistName);
  };
  useEffect(() => {
    playlistsReq.request("/playlist/getPlaylists", "GET").then((res) => {
      setPlaylists(res.data);
      console.log("i am here showing dara", res.data);
    });
  }, []);
  useEffect(() => {
    api
      .get("/playlist/getPlaylist", {
        params: {
          name: activePlaylist.name,
        },
      })
      .then((res) => {
        console.log("i said laaaaaaaaaaaaaaaaand ho", res.data);
      });
  }, [activePlaylist]);
  return (
    <Grid
      templateRows={"repeat(12,1fr)"}
      fontSize={"14px"}
      fontWeight={400}
      color={"neutral.dark.100"}
      height={"100%"}
    >
      <GridItem rowSpan={1}>
        <CreatePlaylist action={handleCreatePlaylist} />
      </GridItem>
      <GridItem rowSpan={11}>
        <Box height={"100%"} overflow={"scroll"} mt={"12px"}>
          {playlists &&
            playlists.map((playlist) => (
              <Box
                key={playlist}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                borderRadius={"4px"}
                justifyContent={"space-between"}
                _hover={{ bg: "neutral.dark.700" }}
                p={"6px"}
              >
                <Box
                  width={"100%"}
                  height={"100%"}
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
        as={TbTrashFilled}
        _hover={{ cursor: "pointer" }}
        boxSize={4}
        onClick={(e) => {
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"none"}>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x}
            m={0}
            bg={"neutral.dark.700"}
            color={"neutral.dark.200"}
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
