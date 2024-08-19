import * as fs from "fs/promises";
import * as path from "node:path";

export const scanDir = async (url, dir) => {
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

export const hasDirs = (obj) => {
  let keys = Object.keys(obj);
  for (const item of keys) {
    if (typeof obj[item] === "object") {
      return true;
    }
  }
  return false;
};

export const getAllAudio = async (dir, store) => {
  let songs = store;
  try {
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
  } catch (error) {
    return songs;
  }
};

export const fileType = {
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
      const checks = files.map(async (file) => {
        const fullPath = path.join(dir, file.name);
        if (await fileType.isMusicFile(fullPath)) {
          return true;
        }

        if (await fileType.isDir(file.path)) {
          return await fileType.containsMusicFileOrDir(
            path.join(fullPath, "/"),
          );
        }
        return false;
      });

      const results = await Promise.all(checks);
      return results.includes(true);
    }
  },
};
