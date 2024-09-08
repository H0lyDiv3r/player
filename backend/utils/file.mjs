import * as fs from "fs/promises";
import * as path from "node:path";
import { files, extensions, fileArrayNameInDir } from "./globalVars.mjs";

import * as jsMediaTags from "jsmediatags";

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

      // const metadata = await parseFile(path.join(file.path, file.name));
      jsMediaTags.read(path.join(file.path, file.name), {
        onSuccess: (tags) => {
          tempCurrent[fileArrayNameInDir] = tempCurrent[fileArrayNameInDir]
            ? [
                ...tempCurrent[fileArrayNameInDir],
                {
                  name: file.name,
                  path: path.join(file.path, file.name),
                  title: tags.tags.title || null,
                  album: tags.tags.album || null,
                  artist: tags.tags.artist || null,
                  genre: tags.tags.genre || null,
                  year: tags.tags.year || null,
                },
              ]
            : [];
        },
        onError: (error) => {},
      });
    }
  }
};

/////////////////////
export const hasDirs = (obj) => {
  let keys = Object.keys(obj);
  for (const item of keys) {
    if (item !== fileArrayNameInDir) {
      return true;
    }
  }
  return false;
};

export const getAllAudio = async (dir, store) => {
  let songs = store;
  // console.log("working here", dir, store);
  try {
    for (const item of Object.keys(dir)) {
      if (item === fileArrayNameInDir || dir[item] instanceof Array) {
        console.log([...dir[item]], dir[item] instanceof Array);
        songs.push(...dir[item]);
      } else {
        await getAllAudio(dir[item], songs);
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

export const createFile = async (
  name,
  content,
  extension = ".json",
  url = files,
) => {
  let title = `${name}${new Date().valueOf()}${extension}`;
  const file = path.join(url, title);
  try {
    await fs.writeFile(file, content);
    await fs.rename(file, path.join(files, `${name}${extension}`));
  } catch (error) {
    res.status(500).json({ message: "failed to write file" });
  }
};
