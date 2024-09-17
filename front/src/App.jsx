import { Button } from "@chakra-ui/react";
import { Layout } from "./scenes/layout";
import { ToastContext, ToastProvider } from "./shared/toast/ToastProvider";
import { useContext } from "react";

function App() {
  const { handleAddToast } = useContext(ToastContext);
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
    <>
      <Layout />
      <Button
        onClick={() =>
          handleAddToast({ status: "error", message: "wwwwww", delay: 5000 })
        }
      >
        Add toast
      </Button>
    </>
  );
}

export default App;
