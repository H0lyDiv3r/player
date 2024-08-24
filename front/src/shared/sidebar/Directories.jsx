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

export const Directories = () => {
  const [dirs] = useRequest();
  const [subDirs] = useRequest();
  const [activeDir, setActiveDir] = useState(null);
  const [activeUrl, setActiveUrl] = useState({ active: "", url: [] });
  const { handleSetQueue, handleSetActiveList } = useContext(GlobalContext);

  const handleSetActiveDir = (dir) => {
    if (activeDir) {
      setActiveDir(null);
      setActiveUrl({ active: "", url: [] });
    } else {
      setActiveDir(dir);
      setActiveUrl({ ...activeUrl, url: [...activeUrl.url, dir] });
    }
  };

  const handleSetActiveUrl = (dir) => {
    // setActiveUrl((url) => console.log(url));
    console.log(activeUrl, dir);
    if (dir.isExpandable) {
      setActiveUrl({
        ...activeUrl,
        url: [...activeUrl.url, dir.name],
      });
    } else {
      setActiveUrl({
        ...activeUrl,
        active: dir.name,
      });
    }
  };
  const handlePopActiveUrl = () => {
    if (activeUrl.url.length > 1) {
      setActiveUrl({
        ...activeUrl,
        active: "",
        url: activeUrl.url.slice(0, activeUrl.url.length - 1),
      });
    }
  };

  useEffect(() => {
    dirs.request("/dir/getDirs", "GET", { url: "" });
  }, []);

  useEffect(() => {
    let url = "/";

    activeUrl.url.map((item) => (url = path.join(url, item)));
    subDirs.request("/dir/getDirs", "GET", {
      url: path.join(url, "/"),
    });
  }, [activeUrl.url]);
  useEffect(() => {
    let url = "/";

    activeUrl.url.map((item) => (url = path.join(url, item)));

    api
      .get("/dir/getFromDir", {
        params: {
          dir: path.join(url, activeUrl.active, "/"),
        },
      })
      .then((res) => {
        handleSetActiveList({
          list: res.data,
          url: activeUrl.url,
          active: activeUrl.active,
          type: "directory",
        });
      });
  }, [activeUrl.active, activeUrl.url]);
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
          {activeUrl.url.map((item, idx) => (
            <Text key={idx}>{item}/</Text>
          ))}
        </Box>
      </Box>
      <Box height={"300px"}>
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
                height={"100%"}
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
                      onClick={() => handleSetActiveUrl(item)}
                    >
                      <Icon as={FaFolder} mr={"6px"} />
                      <Text>{item.name.slice(0, 20)}</Text>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};