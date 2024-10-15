import net from "net";

export const checkPort = async (port) => {
  const server = net.createServer();
  server
    .listen(port, "localhost")
    .on("error", (err) => console.log("there is an error", err));
};
