import * as fs from "fs/promises";
import * as path from "node:path";
import express from "express";
import cors from "cors";

import dirRoutes from "./routers/dir.mjs";
import playlistRoutes from "./routers/playlist.mjs";
import shortcutRoutes from "./routers/shourtcuts.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";

const app = express();

app.use(cors());
app.use("/", express.static("/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dir", dirRoutes);
app.use("/playlist", playlistRoutes);
app.use("/shortcut", shortcutRoutes);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
