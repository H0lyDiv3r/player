import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DefaultButton } from "../bottons";
import { api } from "../../utils";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import path from "path-browserify";

export const AddShortcut = ({ vals }) => {
  const [shortcutName, handleSetShortcutName] = useState("");
  const { activeList } = useContext(GlobalContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const handleChange = (e) => {
    handleSetShortcutName(e.target.value);
  };
  const handleCreateShortcut = (val) => {
    let url = "/";
    if (val.isExpandable) {
      activeList.url.map((item) => (url = path.join(url, item)));
      api
        .post("/shortcut/addShortcut", {
          name: shortcutName,
          path: path.jpin(url, val.name, "/"),
          active: "",
        })
        .then((res) => console.log(res));
      console.log(path.join(url, val.name, "/"));
    } else {
      activeList.url.map((item) => (url = path.join(url, item)));
      api
        .post("/shortcut/addShortcut", {
          name: shortcutName,
          path: path.join(url, "/"),
          active: val.name,
        })
        .then((res) => console.log(res));
    }
  };
  return (
    <>
      <Button
        onClick={(e) => {
          setModalPosition({ x: e.pageX, y: e.pageY });
          onOpen();
        }}
      >
        lala
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent
            pos={"absolute"}
            top={modalPosition.y}
            left={modalPosition.x}
            m={0}
            width={"250px"}
          >
            <Box p={"12px"}>
              <FormControl my={"12px"}>
                <FormLabel fontSize={"12px"}>Shortcut Name</FormLabel>
                <Input
                  size={"sm"}
                  value={shortcutName}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <DefaultButton
                size={"sm"}
                action={() => handleCreateShortcut(vals)}
                disabled
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
