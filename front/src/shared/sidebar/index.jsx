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
import { FaFolder, FaRecordVinyl } from "react-icons/fa6";
import { useState } from "react";
import path from "path-browserify";

export const Sidebar = () => {
  const [loadingPlaylists, playlists, errorPlaylists, requestPlaylists] =
    useRequest();
  const [loadingDirs, dirs, errorDirs, requestDirs] = useRequest();
  const [loadingSubDirs, subDirs, errorSubDirs, requestSubDirs] = useRequest();
  const [activeDir, setActiveDir] = useState(null);
  const [activeUrl, setActiveUrl] = useState("");

  const handleSetActiveDir = (dir) => {
    if (activeDir) {
      setActiveDir(null);
      setActiveUrl("");
    } else {
      setActiveDir(dir);
      setActiveUrl(path.join("/", dir, "/"));
    }
  };

  const handleSetActiveUrl = (dir) => {
    setActiveUrl((url) => path.join(url, dir, "/"));
  };

  useEffect(() => {
    requestPlaylists("http://localhost:3000/getPlaylists", "GET");
    requestDirs("http://localhost:3000/getDirs", "GET", { url: "" });
    console.log("lalallalal", dirs);
  }, []);

  useEffect(() => {
    requestSubDirs("http://localhost:3000/getDirs", "GET", { url: activeUrl });
    console.log("WAawdawdadawdawdad", subDirs);
  }, [activeUrl]);
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
        <Box my={"18px"} height={"300px"}>
          <DirNavigator />
          lala{activeUrl}
          <Box>
            {dirs &&
              dirs.map((dir, idx) => (
                <Box key={idx}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    onClick={() => handleSetActiveDir(dir)}
                  >
                    <Icon as={FaFolder} mr={"6px"} />
                    <Text>{dir}</Text>
                  </Box>
                  {subDirs && (
                    <Box
                      display={dir == [activeDir] ? "flex" : "none"}
                      flexDir={"column"}
                      overflow={"scroll"}
                    >
                      {subDirs.map((item, idx) => (
                        <Box
                          key={idx}
                          display={"flex"}
                          alignItems={"center"}
                          onClick={() => handleSetActiveUrl(item)}
                        >
                          <Icon as={FaFolder} mr={"6px"} />
                          <Text>{item}</Text>
                        </Box>
                      ))}
                    </Box>
                  )}
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
