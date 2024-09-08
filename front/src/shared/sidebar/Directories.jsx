import { Box, Divider, Icon, Text } from "@chakra-ui/react";
import { DirNavigator } from "../directory/DirNavigator";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaFolder,
} from "react-icons/fa6";
import { useState } from "react";
import path from "path-browserify";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { api } from "../../utils";
import { Shortcuts } from "./Shortcuts";
import { AddShortcut } from "../dropdowns/AddShortcut";

export const Directories = () => {
  const [dirs] = useRequest();
  const [subDirs] = useRequest();
  const [selected, setSelected] = useState();
  const { handleSetActiveList, handleSetActiveDir, activeDir, activeList } =
    useContext(GlobalContext);

  const handleSetActiveUrl = (dir) => {
    if (dir.isExpandable) {
      handleSetActiveList({
        ...activeList,
        url: [...activeList.url, dir.name],
        active: "",
      });
    } else {
      handleSetActiveList({
        ...activeList,
        active: dir.name,
      });
    }
  };
  const handlePopActiveUrl = () => {
    if (activeList.url.length > 1) {
      handleSetActiveList({
        ...activeList,
        active: "",
        url: activeList.url.slice(0, activeList.url.length - 1),
      });
    }
  };

  useEffect(() => {
    dirs.request("/dir/getDirs", "GET", { url: "" });
  }, []);

  useEffect(() => {
    let url = "/";

    activeList.url.map((item) => (url = path.join(url, item)));
    subDirs.request("/dir/getDirs", "GET", {
      url: path.join(url, "/"),
    });
  }, [activeList.url]);
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
    <Box my={"18px"}>
      <DirNavigator />
      <Box
        display={"flex"}
        width={"100%"}
        flexWrap={"nowrap"}
        whiteSpace={"nowrap"}
        alignItems={"center"}
      >
        <Icon
          as={FaArrowLeft}
          onClick={() => handlePopActiveUrl()}
          _hover={{ cursor: "pointer" }}
          mr={"8px"}
        />
        <Box
          overflow={"scroll"}
          display={"flex"}
          flexWrap={"nowrap"}
          py={"12px"}
        >
          <Text>root:/</Text>
          {activeList.url.map((item, idx) => (
            <Text key={idx}>{item}/</Text>
          ))}
        </Box>
      </Box>
      <Box height={"200px"}>
        {dirs.response &&
          dirs.response.map((dir, idx) => (
            <Box key={idx} height={"100%"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                onClick={() => handleSetActiveDir(dir.name)}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Icon as={FaFolder} mr={"6px"} />
                  <Text>{dir.name}</Text>
                </Box>
                <Icon
                  as={dir.name != activeDir ? FaChevronDown : FaChevronUp}
                  mr={"6px"}
                />
              </Box>
              <Box
                display={dir.name == activeDir ? "flex" : "none"}
                flexDir={"column"}
                height={"60%"}
                overflow={"scroll"}
                p={"12px"}
                borderRadius={"12px"}
              >
                {subDirs.response &&
                  subDirs.response.map((item, idx) => (
                    <Box
                      key={idx}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      onMouseOver={() => setSelected(idx)}
                      onMouseLeave={() => setSelected(null)}
                    >
                      <Box
                        onClick={() => handleSetActiveUrl(item)}
                        display={"flex"}
                      >
                        <Icon as={FaFolder} mr={"6px"} />
                        <Text>{item.name.slice(0, 30)}</Text>
                      </Box>
                      {selected === idx && <AddShortcut vals={item} />}
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
      </Box>
      <Box>
        <Shortcuts />
      </Box>
    </Box>
  );
};
