import * as fs from "fs/promises";
import * as path from "node:path";
import express from "express";
import cors from "cors";
import { isString } from "util";

const app = express();
const root = "";
const files = "./files/";
const directoryFile = "dir.json";
const extensions = [".mp3", ".wav", ".ogg", ".aac", ".m4a", ".webm"];

app.use(express.static("/"));
app.use(cors());

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
  let directory = JSON.parse(data);
  await scanDir(dirPath, directory);
  fs.writeFile(jsonFilePath, JSON.stringify(directory)).catch((error) => error);
  res.send(directory);
});
app.get("/getFromDir", async (req, res) => {
  const dirPath = path.join(root, req.query.dir || "");
  const jsonFilePath = path.join(files, directoryFile);
  let data = await fs.readFile(jsonFilePath, "utf8");
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
      console.log(songs);
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

// const dir = "/";
// const files = fs.readdirSync(dir);

// for (const file of files) {
//   console.log(fs.statSync(dir + file).isDirectory());
//   if (fs.statSync(dir + file).isFile()) {
//     console.log(path.resolve(dir + file));
//   }
// }
