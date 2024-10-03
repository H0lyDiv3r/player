import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import {
  TbFolderFilled,
  TbFolderSymlink,
  TbTrash,
  TbTrashFilled,
} from "react-icons/tb";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { api } from "../../utils";
import path from "path-browserify";
import { useShowToast } from "../../hooks/useShowToast";

export const Shortcuts = () => {
  const { handleSetActiveList, activeList } = useContext(GlobalContext);
  const [shortcuts] = useRequest();
  const [showToast] = useShowToast();

  const handleSetShortcut = (vals) => {
    console.log("wwwwawwwwwwwwwwwwwwwwwwwwwwwaaaaaa", vals);
    handleSetActiveList({
      ...activeList,
      url: vals.path.split("/").slice(1, -1),
      active: vals.active,
    });
  };
  const handleDeleteShortcut = (name) => {
    api
      .delete("/shortcut/deleteShortcut", {
        params: {
          name,
        },
      })
      .then(() => {
        showToast("success", "deleted shortcut");
      })
      .catch(() => {
        showToast("error", "failed to delete shortcut");
      });
  };
  useEffect(() => {
    shortcuts.request("/shortcut/getShortcuts", "GET").then((res) => {
      console.log("short short short", res.data);
    });
  }, []);
  useEffect(() => {
    let url = "/";

    activeList.url.map((item) => (url = path.join(url, item)));

    api
      .get("/dir/getFromDir", {
        params: {
          dir: path.join(url, activeList.active, "/"),
        },
      })
      .then((res) => {
        console.log(res);
        handleSetActiveList({
          ...activeList,
          list: res.data,
        });
      });
    console.log("fetching fetingingingi");
  }, [activeList.active, activeList.url]);
  return (
    <>
      <Box color={"neutral.dark.200"} h={"100%"}>
        {shortcuts.response && (
          <>
            {shortcuts.response.length < 1 ? (
              <Box
                height={"100%"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box height={"100px"} width={"100px"} bg={"blue"}>
                  aaa
                </Box>
                <Box>you dont have any shortcuts!!!</Box>
              </Box>
            ) : (
              shortcuts.response.map((item) => (
                <Box
                  key={item.name}
                  display={"flex"}
                  alignItems={"center"}
                  width={"100%"}
                  borderRadius={"4px"}
                  justifyContent={"space-between"}
                  _hover={{ bg: "neutral.dark.700" }}
                  p={"6px"}
                  fontSize={"14px"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    onClick={() =>
                      handleSetShortcut({
                        path: item.path,
                        active: item.active,
                      })
                    }
                  >
                    <Icon as={TbFolderFilled} boxSize={4} mr={"12px"} />
                    <Text>{item.name}</Text>
                  </Box>
                  <Icon
                    as={TbTrashFilled}
                    boxSize={4}
                    onClick={() => handleDeleteShortcut(item.name)}
                  />
                </Box>
              ))
            )}
          </>
        )}
      </Box>
    </>
  );
};
