import * as fs from "fs/promises";
import * as path from "node:path";
import express from "express";
import cors from "cors";
import net from "net";
import { config } from "dotenv";

import dirRoutes from "./routers/dir.mjs";
import playlistRoutes from "./routers/playlist.mjs";
import shortcutRoutes from "./routers/shourtcuts.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";
import { fileURLToPath } from "url";
import { getPort } from "get-port-please";

// Get the filename from import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

const app = express();

config();
app.use(cors());
app.use("/", express.static("/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.use("/dir", dirRoutes);
app.use("/playlist", playlistRoutes);
app.use("/shortcut", shortcutRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(errorHandler);
const server = app.listen(process.env.PORT, () => {
  // process.env.VITE_BASE_URL = `http://localhost:${server.address().port}`;
  console.log(`running!: open app at http://localhost:${process.env.PORT}`);
});
