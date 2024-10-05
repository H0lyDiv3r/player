import {
  Box,
  Button,
  Icon,
  IconButton,
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
import {
  TbDots,
  TbHeartMinus,
  TbHeartPlus,
  TbPlaylistAdd,
} from "react-icons/tb";
import { MdOutlineAddToQueue, MdOutlineQueue } from "react-icons/md";
import { useShowToast } from "../../hooks/useShowToast";

export const MusicDropdown = ({ audio }) => {
  const { activePlaylist, currentTab, handleSetActivePlaylist } =
    useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showToast] = useShowToast();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const handleAddtoPlaylist = (playlist) => {
    api
      .post("/playlist/addToPlaylist", { ...audio, playlist })
      .then((res) => {
        showToast("success", "added to playlist");
      })
      .catch(() => {
        showToast("error", "failed to add to playlist");
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
        showToast("success", "removed from playlist");
        handleSetActivePlaylist(activePlaylist.active);
      })
      .catch(() => {
        showToast("success", "failed to remove");
      });
  };
  const handleAddToFavourite = (track) => {
    api
      .post("/playlist/addToPlaylist", { ...track, playlist: "favorites" })
      .then(() => {
        showToast("success", "added to playlist");
      })
      .catch(() => {
        showToast("error", "failed to add to playlist");
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
        <ModalOverlay
          bg={"none"}
          p={0}
          m={0}
          backdropFilter={"auto"}
          backdropBlur={"2px"}
        >
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x - 200}
            m={0}
            width={"200px"}
            bg={"neutral.dark.800"}
            color={"neutral.dark.200"}
          >
            <ModalBody px={"6px"} fontSize={"14px"}>
              <Box
                p={"8px"}
                _hover={{ bg: "neutral.dark.700", cursor: "pointer" }}
                borderRadius={"6px"}
                display={"flex"}
                alignItems={"center"}
              >
                <Icon as={MdOutlineQueue} boxSize={5} mr={"6px"} />
                <Text>Add to Queue</Text>
              </Box>
              <Box
                _hover={{ bg: "neutral.dark.700", cursor: "pointer" }}
                borderRadius={"6px"}
              >
                <PlaylistMenu handleAddToPlaylist={handleAddtoPlaylist} />
              </Box>
              {currentTab === "playlist" && (
                <Box
                  p={"8px"}
                  onClick={() => handleRemoveFromPlaylist(audio)}
                  display={"flex"}
                  alignItems={"center"}
                  _hover={{ cursor: "pointer", bg: "neutral.dark.700" }}
                  borderRadius={"6px"}
                >
                  <Icon as={TbHeartMinus} boxSize={5} mr={"6px"} />
                  <Text>Remove from Playlist</Text>
                </Box>
              )}
              {(activePlaylist.active !== "favorites" ||
                currentTab === "directory") && (
                <Box
                  p={"8px"}
                  _hover={{ bg: "neutral.dark.700", cursor: "pointer" }}
                  borderRadius={"6px"}
                  onClick={() => handleAddToFavourite(audio)}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Icon as={TbHeartPlus} boxSize={5} mr={"6px"} />
                  <Text>Add to Favorites</Text>
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

  const [showToast] = useShowToast();
  const handleCreatePlaylist = (playlistName) => {
    api
      .post("/playlist/createPlaylist", { name: playlistName })
      .then(() => {
        showToast("success", "created playlist");
      })
      .catch(() => {
        showToast("error", "failed to create playlist");
      });
    console.log("hanele", playlistName);
  };
  const { onOpen } = useDisclosure();

  const handleOpen = () => {
    playlists.request("/playlist/getPlaylists", "GET");
    onOpen();
  };
  return (
    <>
      <Menu placement={"auto"}>
        <MenuButton
          onClick={handleOpen}
          p={"8px"}
          height={"100%"}
          width={"full"}
        >
          <Box display={"flex"}>
            <Icon as={TbPlaylistAdd} boxSize={5} mr={"6px"} />
            <Text>Add to Playlist</Text>
          </Box>
        </MenuButton>
        <MenuList bg={"neutral.dark.800"} border={"none"} p={"6px"}>
          <CreatePlaylist action={handleCreatePlaylist} />
          <Box mt={"8px"}>
            {playlists.response &&
              playlists.response.map((item) => (
                <MenuItem
                  px={"8px"}
                  borderRadius={"6px"}
                  key={item}
                  onClick={() => handleAddToPlaylist(item)}
                  bg={"none"}
                  _hover={{ bg: "neutral.dark.700" }}
                >
                  {item}
                </MenuItem>
              ))}
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};
