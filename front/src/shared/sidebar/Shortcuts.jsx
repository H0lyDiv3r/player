import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { TbFolderSymlink } from "react-icons/tb";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { api } from "../../utils";

export const Shortcuts = () => {
  const { handleSetActiveList, activeList } = useContext(GlobalContext);
  const [shortcuts] = useRequest();

  const handleSetShortcut = (vals) => {
    handleSetActiveList({
      ...activeList,
      url: vals.path.split("/").slice(1, -1),
      active: vals.active,
    });
  };
  const handleDeleteShortcut = (name) => {
    api.delete("/shortcut/deleteShortcut", {
      params: {
        name,
      },
    });
  };
  useEffect(() => {
    shortcuts.request("/shortcut/getShortcuts", "GET").then((res) => {
      console.log("short short short", res.data);
    });
  }, []);
  return (
    <>
      <Box>
        {shortcuts.response &&
          shortcuts.response.map((item) => (
            <Box fontSize={"14px"} key={item.name}>
              <Box display={"flex"} alignItems={"center"}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  onClick={() =>
                    handleSetShortcut({
                      path: item.path,
                      active: item.active,
                    })
                  }
                >
                  <Icon as={TbFolderSymlink} />
                  <Text>{item.name}</Text>
                </Box>
                <Button onClick={() => handleDeleteShortcut(item.name)}>
                  delete
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};
