import { Box, Text } from "@chakra-ui/react";
import Player from "./shared/player/Player";
import PlayerContextProvider from "./shared/player/PlayerContextProvider";
import { Layout } from "./scenes/layout";

function App() {
  return (
    // <Box
    //   bg={"rgba(0,0,0,0.5)"}
    //   w={"100%"}
    //   h={"100vh"}
    //   pos={"absolute"}
    //   backdropFilter={"auto"}
    //   backdropBlur={"12px"}
    //   display={"flex"}
    //   justifyContent={"center"}
    // >
    //   {/* <audio
    //     controls
    //     src="http://localhost:3000//home/yuri/Downloads/Telegram Desktop/The Wind - Cat Stevens.m4a"
    //   ></audio> */}
    //   <Box width={"40%"}>
    //     <PlayerContextProvider>
    //       <Player />
    //     </PlayerContextProvider>
    //   </Box>
    // </Box>
    <Layout />
  );
}

export default App;
