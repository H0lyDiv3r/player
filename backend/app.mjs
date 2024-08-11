import * as fs from "fs/promises";
import * as path from "node:path";
import express from "express";
import cors from "cors";
import { isString } from "util";

const app = express();
const root = "";
const files = "./files/";
const directoryFile = "dir.json";
const playlistFile = "playlists.json";
const extensions = [".mp3", ".wav", ".ogg", ".aac", ".m4a", ".webm"];

app.use(express.static("/"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const dirPath = path.join(root, req.query.dir || "");
  let directory = [];
  if (await fileType.isMusicFile(dirPath)) {
    res.send(dirPath);
  } else {
    try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(dirPath + file.name);
        if (file.isSymbolicLink()) {
          continue;
        }
        if (!(await fileType.checkHealth(fullPath))) {
          continue;
        }
        if (
          (await fileType.isMusicFile(fullPath)) ||
          (await fileType.isDir(fullPath))
        ) {
          directory.push({
            name: file.name,
            type: (await fileType.isDir(fullPath)) ? "dir" : "file",
          });
        }
      }
      res.send(directory);
    } catch (error) {
      res.status(500).json({ message: "error" });
    }
  }
});

app.get("/addDir", async (req, res) => {
  const dirPath = path.join(root, req.query.dir || "");
  const jsonFilePath = path.join(files, directoryFile);
  let data = await fs.readFile(jsonFilePath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }
  let directory = JSON.parse(data);
  await scanDir(dirPath, directory);
  fs.writeFile(jsonFilePath, JSON.stringify(directory)).catch((error) => error);
  res.send(directory);
});
app.get("/getFromDir", async (req, res) => {
  const dirPath = path.join(root, req.query.dir || "");
  const jsonFilePath = path.join(files, directoryFile);
  let data = await fs.readFile(jsonFilePath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }
  //
  const chain = dirPath.split("/").slice(1).slice(0, -1);
  let directory = JSON.parse(data);
  for (let i = 0; i < chain.length; i++) {
    directory = directory[chain[i]];
  }
  let songs = [];
  getAllAudio(directory, songs);
  res.send(songs);
});

app.post("/createPlaylist", async (req, res) => {
  const playlistPath = path.join(files, playlistFile);
  // await fs.writeFile(playlistPath, JSON.stringify({}));
  if (!(await fileType.checkFileHealth(playlistPath))) {
    await fs
      .writeFile(playlistPath, JSON.stringify({}))
      .catch(() => res.status(500).json({ message: "failed to write" }));
  }
  let data = await fs.readFile(playlistPath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }

  if (Object.keys(JSON.parse(data)).includes(req.body.name)) {
    res.status(500).json({ message: "already exists" });
  }
  let playlists = JSON.parse(data);
  playlists[req.body.name] = [];
  await fs.writeFile(playlistPath, JSON.stringify(playlists));
  res.send();
});

app.delete("/deletePlaylist", async (req, res) => {
  const playlistPath = path.join(files, playlistFile);
  // await fs.writeFile(playlistPath, JSON.stringify({}));
  if (!(await fileType.checkFileHealth(playlistPath))) {
    res.status(400).json({ message: "you dont have any playlists" });
  }
  let data = await fs.readFile(playlistPath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }

  if (!Object.keys(JSON.parse(data)).includes(req.body.name)) {
    res.status(400).json({ message: "playlist doenst exist" });
  }
  let playlists = JSON.parse(data);
  delete playlists[req.body.name];
  await fs.writeFile(playlistPath, JSON.stringify(playlists));
  res.send();
});

app.get("/getPlaylist", async (req, res) => {
  const playlistPath = path.join(files, playlistFile);
  // await fs.writeFile(playlistPath, JSON.stringify({}));
  if (!(await fileType.checkFileHealth(playlistPath))) {
    res.status(400).json({ message: "you dont have any playlists" });
  }
  let data = await fs.readFile(playlistPath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }
  let playlist = JSON.parse(data)[req.body.name];
  res.send(playlist);
});
app.post("/addToPlaylist", async (req, res) => {
  const playlistPath = path.join(files, playlistFile);
  // await fs.writeFile(playlistPath, JSON.stringify({}));
  if (!(await fileType.checkFileHealth(playlistPath))) {
    res.status(500).json({ message: "cant write" });
    // await fs
    //   .writeFile(playlistPath, JSON.stringify([]))
    //   .catch(() => res.status(500).json({ message: "failed to write" }));
  }
  let data = await fs.readFile(playlistPath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }
  let playlists = JSON.parse(data);
  if (!playlists[req.body.playlist]) {
    res.status(500).json({ message: "Playlist doenst exist" });
  }
  let target = playlists[req.body.playlist];
  target.push({
    id: new Date().valueOf(),
    name: req.body.name,
    path: req.body.path,
    type: req.body.type,
  });
  await fs.writeFile(playlistPath, JSON.stringify(playlists));
  res.send();
});

app.delete("/deleteFromPlaylist", async (req, res) => {
  const playlistPath = path.join(files, playlistFile);
  // await fs.writeFile(playlistPath, JSON.stringify({}));
  if (!(await fileType.checkFileHealth(playlistPath))) {
    res.status(500).json({ message: "cant write" });
    // await fs
    //   .writeFile(playlistPath, JSON.stringify([]))
    //   .catch(() => res.status(500).json({ message: "failed to write" }));
  }
  let data = await fs.readFile(playlistPath, "utf8");
  if (!data) {
    res.status(500).json({ message: "failed to read data" });
  }
  let playlists = JSON.parse(data);
  playlists[req.body.name] = playlists[req.body.name].filter(
    (item) => item.id != req.body.id,
  );
  await fs.writeFile(playlistPath, JSON.stringify(playlists));
  res.send();
});

///

const scanDir = async (url, dir) => {
  const files = await fs.readdir(url, { withFileTypes: true });
  let current = dir;
  for (const file of files) {
    const fullPath = path.join(url, file.name);
    if (file.isSymbolicLink()) {
      continue;
    }
    if (!(await fileType.checkHealth(fullPath))) {
      continue;
    }

    const chain = url.split("/").slice(1).slice(0, -1);
    if (
      (await fileType.isDir(fullPath)) &&
      (await fileType.containsMusicFileOrDir(fullPath))
    ) {
      let tempCurrent = current;
      for (let i = 0; i < chain.length; i++) {
        tempCurrent[chain[i]] = tempCurrent[chain[i]] || {};
        tempCurrent = tempCurrent[chain[i]];
      }
      tempCurrent[file.name] = {};
      await scanDir(path.join(fullPath + "/"), dir);
    }
    if (await fileType.isMusicFile(fullPath)) {
      let tempCurrent = current;

      for (let i = 0; i < chain.length; i++) {
        tempCurrent[chain[i]] = tempCurrent[chain[i]] || {};
        tempCurrent = tempCurrent[chain[i]];
      }
      tempCurrent[file.name] = file.path;
    }
  }
};
const getAllAudio = async (dir, store) => {
  let songs = store;
  for (const item of Object.keys(dir)) {
    if (typeof dir[item] === "string") {
      songs.push({
        name: item,
        path: path.join(dir[item], item),
        type: "file",
      });
    } else {
      getAllAudio(dir[item], songs);
    }
  }
  return songs;
};
const fileType = {
  isMusicFile: async (dir) => {
    return fs
      .stat(dir)
      .then((res) => res.isFile() && extensions.includes(path.extname(dir)))
      .catch((error) => false);
  },
  isDir: async (dir) => {
    return fs
      .stat(dir)
      .then((res) => res.isDirectory())
      .catch((error) => false);
  },
  checkHealth: async (dir) => {
    return fs
      .access(dir, fs.constants.R_OK)
      .then(() => true)
      .catch(() => false);
  },
  checkFileHealth: async (dir) => {
    return fs
      .access(dir, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  },
  containsMusicFileOrDir: async (dir) => {
    if (await fileType.isDir(dir)) {
      const files = await fs.readdir(dir, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (await fileType.isDir(fullPath)) {
          fileType.containsMusicFileOrDir(path.join(fullPath, "/"));
        }
        if (await fileType.isMusicFile(fullPath)) {
          return true;
        }
      }
      return false;
    }
  },
};

app.listen(3000, () => {
  console.log("listening on port 3000");
});
