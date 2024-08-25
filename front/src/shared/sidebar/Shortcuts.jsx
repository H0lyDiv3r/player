import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { Box, Icon, Text } from "@chakra-ui/react";
import { TbFolderSymlink } from "react-icons/tb";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";

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
            </Box>
          ))}
      </Box>
    </>
  );
};
