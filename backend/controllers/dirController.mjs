import { directoryFile, root, files } from "../utils/globalVars.mjs";
import * as fs from "fs/promises";
import * as path from "node:path";

export const dirControllers = {
  dir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    let directory = [];
    if (await fileType.isMusicFile(dirPath)) {
      res.send(dirPath);
    } else {
      try {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        for (const file of files) {
          const fullPath = path.join(dirPath + file.name);
          if (await fileType.isMusicFile(dirPath)) {
            continue;
          }
          if (file.isSymbolicLink()) {
            continue;
          }
          if (!(await fileType.checkHealth(fullPath))) {
            continue;
          }
          if (await fileType.isDir(fullPath)) {
            directory.push(file);
          }
        }
        res.send(directory);
      } catch (error) {
        res.status(500).json({ message: "error" });
      }
    }
  },
  addDir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    const jsonFilePath = path.join(files, directoryFile);
    let data = await fs.readFile(jsonFilePath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    let directory = JSON.parse(data);
    await scanDir(dirPath, directory);
    fs.writeFile(jsonFilePath, JSON.stringify(directory)).catch(
      (error) => error,
    );
    console.log("im here", dirPath);
    res.send(directory);
  },
  getDirs: async (req, res) => {
    const chain = req.query.url
      ? req.query.url.split("/").slice(1).slice(0, -1)
      : [];
    const jsonFilePath = path.join(files, directoryFile);
    let data = await fs.readFile(jsonFilePath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    //
    let directory = JSON.parse(data);
    for (const item of chain) {
      directory = directory[item];
    }
    let list = [];
    for (const item of Object.keys(directory)) {
      if (typeof directory[item] === "object") {
        list.push({ name: item, isExpandable: hasDirs(directory[item]) });
      }
    }
    res.send(list);
  },
  getFromDir: async (req, res) => {
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
  },
};
