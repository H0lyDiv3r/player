import {
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
import { DefaultButton } from "../bottons";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFolder,
  FaRecordVinyl,
} from "react-icons/fa6";
import { useState } from "react";
import path from "path-browserify";

export const Sidebar = () => {
  const [loadingPlaylists, playlists, errorPlaylists, requestPlaylists] =
    useRequest();
  const [loadingDirs, dirs, errorDirs, requestDirs] = useRequest();
  const [loadingSubDirs, subDirs, errorSubDirs, requestSubDirs] = useRequest();
  const [loadingFromDir, fromDir, errorFromDir, requestFromDir] = useRequest();
  const [activeDir, setActiveDir] = useState(null);
  const [activeUrl, setActiveUrl] = useState({ active: "", url: "" });

  const handleSetActiveDir = (dir) => {
    if (activeDir) {
      setActiveDir(null);
      setActiveUrl({ active: "", url: "" });
    } else {
      setActiveDir(dir);
      setActiveUrl({ ...activeUrl, url: path.join("/", dir, "/") });
    }
  };

  const handleSetActiveUrl = (dir) => {
    // setActiveUrl((url) => console.log(url));
    console.log(activeUrl, dir);
    if (dir.isExpandable) {
      setActiveUrl({
        ...activeUrl,
        url: path.join(activeUrl.url, dir.name),
      });
    } else {
      setActiveUrl({
        ...activeUrl,
        active: dir.name,
      });
    }
  };

  useEffect(() => {
    requestPlaylists("http://localhost:3000/getPlaylists", "GET");
    requestDirs("http://localhost:3000/getDirs", "GET", { url: "" });
    console.log("lalallalal", dirs);
  }, []);

  useEffect(() => {
    requestSubDirs("http://localhost:3000/getDirs", "GET", {
      url: path.join(activeUrl.url, "/"),
    });
    console.log("dirs", subDirs);
  }, [activeUrl.url]);
  useEffect(() => {
    requestFromDir("http://localhost:3000/getFromDir", "GET", {
      dir: path.join(activeUrl.url, activeUrl.active, "/"),
    });
    console.log(
      "from dir",
      fromDir,
      path.join(activeUrl.url, activeUrl.active, "/"),
    );
  }, [activeUrl.active, activeUrl.url]);
  return (
    <Box
      width={"400px"}
      bg={"rgba(255,255,255,0.6)"}
      backdropFilter={"auto"}
      backdropBlur={"3px"}
      p={"18px"}
    >
      <Box py={"24px"}>
        <Text>Name and logo</Text>
      </Box>
      <Divider />
      <Box my={"24px"}>
        <Box my={"18px"}>
          <DirNavigator />
          lala{activeUrl.url}
          <Box height={"200px"}>
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
                    bg={"neutral.300"}
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
        <Box fontSize={"14px"} fontWeight={400} color={"neutral.800"}>
          <Text>Your Playlists</Text>
          <Box borderRadius={"12px"} py={"12px"} bg={"trans.200"}>
            <CreatePlaylist />
            <Box mt={"12px"}>
              {playlists &&
                Object.keys(playlists).map((playlist) => (
                  <Box key={playlist} display={"flex"} alignItems={"center"}>
                    <Icon as={FaRecordVinyl} mr={"6px"} />
                    <Text>{playlist}</Text>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const CreatePlaylist = () => {
  const { onToggle, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Menu placement={"bottom"} matchWidth>
        <MenuButton
          minWidth={"100%"}
          fontSize={"14px"}
          fontWeight={400}
          bg={"brand.400"}
          borderRadius={"6px"}
          color={"white"}
          py={"6px"}
        >
          Create Playlist
        </MenuButton>
        <MenuList
          width={"100%"}
          fontSize={"12px"}
          fontWeight={400}
          p={"12px"}
          color={"neutral.800"}
        >
          <Box>
            <FormControl my={"12px"}>
              <FormLabel fontSize={"12px"}>Playlist Name</FormLabel>
              <Input size={"sm"} />
            </FormControl>
            <DefaultButton size={"sm"}>create</DefaultButton>
          </Box>
        </MenuList>
      </Menu>
    </>
  );
};
