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
  dir: async (req, res, next) => {
    try {
      const dirPath = path.join(root, req.query.dir || "");
      let directory = [];

      if (!(await fileType.checkReadPermission(dirPath))) {
        return res
          .status(401)
          .json({ message: "you are not allowed to read this directory" });
      }

      if (await fileType.isMusicFile(dirPath)) {
        return res
          .status(400)
          .json({ message: "you sent a music file not a directory" });
      }
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
      return res.status(200).send(directory);
    } catch (error) {
      next(error);
    }
  },
  addDir: async (req, res, next) => {
    try {
      const dirPath = path.join(root, req.query.dir || "");
      const jsonFilePath = path.join(files, directoryFile);

      if (!(await fileType.checkFileHealth(jsonFilePath))) {
        await createFile("dir", JSON.stringify({}));
      }
      let data = await fs.readFile(jsonFilePath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let directory = JSON.parse(data);

      scanDir(dirPath, directory)
        .then(async () => {
          await createFile("dir", JSON.stringify(directory));
          return res.status(200).send(directory);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
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
  getDirs: async (req, res, next) => {
    try {
      const chain = req.query.url
        ? req.query.url.split("/").slice(1).slice(0, -1)
        : [];
      const jsonFilePath = path.join(files, directoryFile);
      if (!(await fileType.checkFileHealth(jsonFilePath))) {
        await createFile("dir", JSON.stringify({}));
      }
      let data = await fs.readFile(jsonFilePath, "utf8");
      if (!data) {
        return res.status(404).json({ message: "failed to read data" });
      }
      //
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
      return res.status(200).send(list);
    } catch (err) {
      next(err);
    }
  },
  getFromDir: async (req, res, next) => {
    try {
      const dirPath = path.join(root, req.query.dir || "");
      const jsonFilePath = path.join(files, directoryFile);
      if (!(await fileType.checkFileHealth(jsonFilePath))) {
        await createFile("dir", JSON.stringify({}));
      }
      let data = await fs.readFile(jsonFilePath, "utf8");
      if (!data) {
        return res.status(404).json({ message: "failed to read data" });
      }
      //
      const chain = dirPath.split("/").slice(1).slice(0, -1);
      let directory = JSON.parse(data);
      for (let i = 0; i < chain.length; i++) {
        directory = directory[chain[i]];
      }
      let songs = [];
      await getAllAudio(directory, songs);
      return res.status(200).json({ songs });
    } catch (error) {
      next(error);
    }
  },
};
