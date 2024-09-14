import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { api } from "../../utils";
import useRequest from "../../hooks/useRequest";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "./CreatePlaylist";
import { useState } from "react";
import { TbDots } from "react-icons/tb";

export const MusicDropdown = ({ audio }) => {
  const { activePlaylist, currentTab } = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const handleAddtoPlaylist = (playlist) => {
    api.post("/playlist/addToPlaylist", { ...audio, playlist }).then((res) => {
      console.log(res.data);
    });
  };
  const handleRemoveFromPlaylist = (track) => {
    api
      .delete("/playlist/deleteFromPlaylist", {
        params: {
          name: activePlaylist.active,
          path: track.path,
        },
      })
      .then((res) => {
        console.log("removed", res.data);
      });
  };
  return (
    <>
      <Button
        bg={"none"}
        _hover={{ bg: "none" }}
        color={"white"}
        onClick={(e) => {
          console.log(e);
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      >
        <Icon as={TbDots} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
        <ModalOverlay bg={"none"} p={0} m={0}>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x - 200}
            m={0}
            width={"200px"}
          >
            <ModalBody p={"12px"} fontSize={"14px"}>
              <Box p={"6px"}>
                <Text>add to queue</Text>
              </Box>
              <Box p={"6px"}>
                <PlaylistMenu handleAddToPlaylist={handleAddtoPlaylist} />
              </Box>
              {currentTab === "playlist" && (
                <Box p={"6px"}>
                  <Text onClick={() => handleRemoveFromPlaylist(audio)}>
                    remove from this playlist
                  </Text>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

const PlaylistMenu = ({ handleAddToPlaylist }) => {
  const [playlists] = useRequest();

  const { onOpen } = useDisclosure();

  const handleOpen = () => {
    playlists.request("/playlist/getPlaylists", "GET");
    onOpen();
  };
  return (
    <>
      <Menu>
        <MenuButton onClick={handleOpen}>add to playlist</MenuButton>
        <MenuList>
          <CreatePlaylist />
          {playlists.response &&
            playlists.response.map((item) => (
              <MenuItem key={item} onClick={() => handleAddToPlaylist(item)}>
                {item}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  );
};
