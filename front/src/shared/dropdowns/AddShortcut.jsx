import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DefaultButton } from "../bottons";
import { api } from "../../utils";
import React, { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import path from "path-browserify";
import { TbFolderPlus } from "react-icons/tb";
import { useShowToast } from "../../hooks/useShowToast";
import { useCallback } from "react";
import colors from "../../themes/colors";

export const AddShortcut = React.memo(function AddShortcut({ vals }) {
  const [shortcutName, handleSetShortcutName] = useState("");
  const { activeList } = useContext(GlobalContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [showToast] = useShowToast();
  const handleChange = (e) => {
    handleSetShortcutName(e.target.value);
  };
  const handleCreateShortcut = useCallback(
    (val) => {
      let url = "/";
      if (val.isExpandable) {
        activeList.url.map((item) => (url = path.join(url, item)));
        api
          .post("/shortcut/addShortcut", {
            name: shortcutName,
            path: path.join(url, val.name, "/"),
            active: "",
          })
          .then((res) => {
            showToast("success", "added shortcut");
          })
          .catch(() => {
            showToast("error", "failed to delete");
          });
      } else {
        activeList.url.map((item) => (url = path.join(url, item)));
        api
          .post("/shortcut/addShortcut", {
            name: shortcutName,
            path: path.join(url, "/"),
            active: val.name,
          })
          .then((res) => {
            showToast("success", "added shortcut");
          })
          .catch((error) => {
            showToast("error", "failed to create shortcut");
          });
      }
    },
    [activeList.url, shortcutName, showToast],
  );
  return (
    <>
      <Icon
        as={TbFolderPlus}
        boxSize={4}
        _hover={{ cursor: "pointer" }}
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
            bg={"neutral.dark.800"}
            m={0}
            width={"250px"}
            color={"neutral.dark.100"}
            border={`1px solid ${colors.neutral.dark[600]}`}
          >
            <Box p={"12px"}>
              <FormControl my={"12px"}>
                <FormLabel fontSize={"12px"}>Shortcut Name</FormLabel>
                <Input
                  size={"sm"}
                  bg={"neutral.dark.700"}
                  border={"none"}
                  borderRadius={"4px"}
                  color={"neutral.dark.100"}
                  _placeholder={{ color: "neutral.dark.200" }}
                  placeholder="shortcut name"
                  value={shortcutName}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <DefaultButton
                size={"sm"}
                action={() => {
                  handleCreateShortcut(vals);
                  onClose();
                }}
                isDisabled={shortcutName.length < 2}
              >
                create
              </DefaultButton>
            </Box>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
