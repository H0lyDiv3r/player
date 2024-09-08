import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { api } from "../../utils";
import useRequest from "../../hooks/useRequest";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { CreatePlaylist } from "./CreatePlaylist";
import { useState } from "react";

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
        onClick={(e) => {
          console.log(e);
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      >
        open
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
        <ModalOverlay bg={"none"} p={0} m={0}>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x - 300}
            m={0}
            width={"250px"}
          >
            <ModalBody p={0} m={0}>
              <Button>add to queue</Button>
              <PlaylistMenu handleAddToPlaylist={handleAddtoPlaylist} />
              {currentTab === "playlist" && (
                <Button onClick={() => handleRemoveFromPlaylist(audio)}>
                  remove from this playlist
                </Button>
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
