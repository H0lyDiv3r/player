import {
  directoryFile,
  root,
  files,
  fileArrayNameInDir,
} from "../utils/globalVars.mjs";
import * as fs from "fs/promises";
import * as path from "node:path";
import {
  fileType,
  hasDirs,
  scanDir,
  getAllAudio,
  createFile,
} from "../utils/file.mjs";

export const dirControllers = {
  dir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    let directory = [];

    if (!(await fileType.checkReadPermission(dirPath))) {
      return res
        .status(401)
        .json({ message: "you are not allowed to read this directory" });
    }

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
          if (!(await fileType.checkFileHealth(fullPath))) {
            continue;
          }
          if (!(await fileType.checkReadPermission(fullPath))) {
            continue;
          }
          if (await fileType.isDir(fullPath)) {
            directory.push(file);
          }
        }
        res.send(directory);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
      }
    }
  },
  addDir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    const jsonFilePath = path.join(files, directoryFile);

    if (!(await fileType.checkFileHealth(jsonFilePath))) {
      await createFile("dir", JSON.stringify({}));
    }
    let data = await fs.readFile(jsonFilePath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    let directory = JSON.parse(data);

    scanDir(dirPath, directory)
      .then(async () => {
        await createFile("dir", JSON.stringify(directory));
        res.send(directory);
      })
      .catch((error) => {
        res.status(500).json({ message: "failed to scan directory" });
      });
  },
  removeDir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    const jsonFilePath = path.join(files, directoryFile);

    if (!(await fileType.checkFileHealth(jsonFilePath))) {
      await createFile("dir", JSON.stringify({}));
    }
    await createFile("dir", JSON.stringify({}));
    res.send({});
  },
  getDirs: async (req, res) => {
    const chain = req.query.url
      ? req.query.url.split("/").slice(1).slice(0, -1)
      : [];
    const jsonFilePath = path.join(files, directoryFile);
    if (!(await fileType.checkFileHealth(jsonFilePath))) {
      await createFile("dir", JSON.stringify({}));
    }
    let data = await fs.readFile(jsonFilePath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    //
    try {
      let directory = JSON.parse(data);
      for (const item of chain) {
        directory = directory[item];
      }
      let list = [];
      for (const item of Object.keys(directory)) {
        if (item !== fileArrayNameInDir) {
          list.push({ name: item, isExpandable: hasDirs(directory[item]) });
        }
      }
      res.send(list);
    } catch (err) {
      return res.status(500).json({ message: "not working man" });
    }
  },
  getFromDir: async (req, res) => {
    const dirPath = path.join(root, req.query.dir || "");
    const jsonFilePath = path.join(files, directoryFile);
    if (!(await fileType.checkFileHealth(jsonFilePath))) {
      await createFile("dir", JSON.stringify({}));
    }
    //TODO:check and create
    let data = await fs.readFile(jsonFilePath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    //
    // res.send("walalala");
    try {
      const chain = dirPath.split("/").slice(1).slice(0, -1);
      let directory = JSON.parse(data);
      for (let i = 0; i < chain.length; i++) {
        directory = directory[chain[i]];
      }
      let songs = [];
      await getAllAudio(directory, songs);
      res.send(songs);
    } catch (error) {
      res.status(500).json({ message: "not woeking" });
    }
  },
};
