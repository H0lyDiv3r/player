import {
  Box,
  Divider,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import path from "path-browserify";
import { useContext, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaFolder,
} from "react-icons/fa6";
import useRequest from "../../hooks/useRequest";
import { GlobalContext } from "../../store/GlobalContextProvider";
import { api } from "../../utils";
import { DirNavigator } from "../directory/DirNavigator";
import { AddShortcut } from "../dropdowns/AddShortcut";

import "./scroll.css";

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
    <Grid
      height={"100%"}
      templateRows={"repeat(12,1fr)"}
      color={"neutral.dark.200"}
    >
      {dirs.response && dirs.response.length > 0 && (
        <>
          <GridItem rowSpan={2}>
            <DirNavigator />
          </GridItem>
          <GridItem rowSpan={1} overflow={"hidden"}>
            <Box
              display={"flex"}
              width={"100%"}
              overflow={"hidden"}
              alignItems={"center"}
              whiteSpace={"nowrap"}
              p={"4px"}
            >
              <Icon
                as={FaArrowLeft}
                onClick={() => handlePopActiveUrl()}
                _hover={{ cursor: "pointer" }}
                mr={"8px"}
              />
              <Box display={"flex"}>
                <Text>root:/</Text>
                {activeList.url.map((item, idx) => (
                  <Text key={idx}>{item}/</Text>
                ))}
              </Box>
            </Box>
          </GridItem>
        </>
      )}

      <GridItem rowSpan={dirs.response && dirs.response.length < 1 ? 12 : 9}>
        <Box overflow={"auto"} height={"100%"} fontSize={"14px"}>
          {dirs.response && (
            <>
              {dirs.response.length < 1 ? (
                <Box
                  height={"100%"}
                  display={"flex"}
                  flexDir={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"neutral.dark.500"}
                >
                  <Text
                    fontSize={"1.25rem"}
                    fontWeight={500}
                    color={"neutral.dark.300"}
                  >
                    WHOOPS!
                  </Text>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    my={"12px"}
                  >
                    <Image src={"./emptyFolder.svg"} width={"150px"} />
                  </Box>
                  <Box>
                    <Text fontSize={"0.8rem"} my={"8px"}>
                      you need to tell us where your music is.
                    </Text>
                    <DirNavigator />
                  </Box>
                </Box>
              ) : (
                dirs.response.map((dir, idx) => (
                  <Box key={idx}>
                    <Box
                      p={"6px"}
                      borderRadius={"4px"}
                      _hover={{ bg: "neutral.dark.700" }}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      height={"10%"}
                      onClick={() => handleSetActiveDir(dir.name)}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Icon as={FaFolder} mr={"12px"} />
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
                      height={"90%"}
                      className="scroll"
                      overflow={"auto"}
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
                            p={"6px"}
                            borderRadius={"4px"}
                            _hover={{ bg: "neutral.dark.700" }}
                          >
                            <Box
                              onClick={() => handleSetActiveUrl(item)}
                              display={"flex"}
                              alignItems={"center"}
                              width={"full"}
                            >
                              <Icon as={FaFolder} mr={"6px"} />
                              <Text whiteSpace={"nowrap"}>
                                {item.name.slice(0, 20)}
                              </Text>
                            </Box>
                            {selected === idx && <AddShortcut vals={item} />}
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))
              )}
            </>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};
