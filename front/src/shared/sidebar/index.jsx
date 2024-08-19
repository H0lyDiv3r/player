import {
  background,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DirNavigator } from "../directory/DirNavigator";
import { DefaultButton, IconButton } from "../bottons";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaFolder,
  FaRecordVinyl,
} from "react-icons/fa6";
import { useState } from "react";
import path from "path-browserify";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import axios from "axios";
import { api } from "../../utils";

export const Sidebar = () => {
  const [loadingDirs, dirs, errorDirs, requestDirs] = useRequest();
  const [loadingSubDirs, subDirs, errorSubDirs, requestSubDirs] = useRequest();
  const [loadingFromDir, fromDir, errorFromDir, requestFromDir] = useRequest();
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
    requestDirs("/dir/getDirs", "GET", { url: "" });
  }, []);

  useEffect(() => {
    let url = "/";

    activeUrl.url.map((item) => (url = path.join(url, item)));
    requestSubDirs("/dir/getDirs", "GET", {
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
        });
      });
  }, [activeUrl.active, activeUrl.url]);
  return (
    <Box
      width={"300px"}
      minW={"300px"}
      bg={"rgba(255,255,255,1)"}
      backdropFilter={"auto"}
      backdropBlur={"6px"}
      p={"12px"}
      height={"100%"}
      fontSize={"12px"}
    >
      <Box py={"24px"}>
        <Text>Name and logo</Text>
      </Box>
      <Divider />
      <Box my={"24px"}>
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
            {dirs &&
              dirs.map((dir, idx) => (
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
                    {subDirs &&
                      subDirs.map((item, idx) => (
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
      </Box>
    </Box>
  );
};
