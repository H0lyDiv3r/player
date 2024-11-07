import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { ButtonIcon, DefaultButton } from "../bottons";
import colors from "../../themes/colors";
import { TbFolderPlus, TbPlaylistAdd } from "react-icons/tb";

export const CreatePlaylist = ({ action }) => {
  const [playlistName, SetPlaylistName] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);
  const handleChange = (e) => {
    SetPlaylistName(e.target.value);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <ButtonIcon
        icon={TbPlaylistAdd}
        size={5}
        action={(e) => {
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      >
        create
      </ButtonIcon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"none"}>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x}
            bg={"neutral.dark.800"}
            m={0}
            width={"250px"}
            color={"neutral.dark.100"}
            border={`1px solid ${colors.neutral.dark[600]}`}
          >
            <Box p={"12px"}>
              <FormControl my={"12px"}>
                <FormLabel fontSize={"12px"}>Playlist Name</FormLabel>
                <Input
                  size={"sm"}
                  bg={"neutral.dark.700"}
                  border={"none"}
                  borderRadius={"4px"}
                  color={"neutral.dark.100"}
                  _placeholder={{ color: "neutral.dark.200" }}
                  placeholder="playlist name"
                  value={playlistName}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <DefaultButton
                action={() => {
                  action(playlistName);
                  onClose();
                }}
                isDisabled={playlistName < 2}
                size={"sm"}
              >
                create
              </DefaultButton>
            </Box>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
