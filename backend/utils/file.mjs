import * as fs from "fs/promises";
import * as path from "node:path";
import { files, extensions, fileArrayNameInDir } from "./globalVars.mjs";

import * as jsMediaTags from "jsmediatags";

export const scanDir = async (url, dir) => {
  const files = await fs.readdir(url, { withFileTypes: true });
  let current = dir;

  const chain = url.split("/").slice(1).slice(0, -1);
  let fileArray = current;
  for (let i = 0; i < chain.length; i++) {
    if (fileArray[chain[i]]) {
      fileArray = fileArray[chain[i]];
    }
  }
  fileArray[fileArrayNameInDir] = [];

  for (const file of files) {
    const fullPath = path.join(url, file.name);
    if (file.isSymbolicLink()) {
      continue;
    }
    if (!(await fileType.checkFileHealth(fullPath))) {
      continue;
    }

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

      await new Promise((resolve, reject) => {
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
            resolve();
          },
          onError: (error) => {
            resolve();
          },
        });
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
  try {
    for (const item of Object.keys(dir)) {
      if (item === fileArrayNameInDir || dir[item] instanceof Array) {
        songs.push(...dir[item]);
      } else {
        await getAllAudio(dir[item], songs);
      }
    }
  } catch (error) {
    return songs;
  }
};

export const getSongs = async (string, store, dir) => {
  let songs = store;
  try {
    for (const item of Object.keys(dir)) {
      if (item === fileArrayNameInDir || dir[item] instanceof Array) {
        songs.push(
          ...dir[item].filter((song) => {
            return (
              (Boolean(song.name) &&
                song.name.toLowerCase().replaceAll(" ", "").includes(string)) ||
              (Boolean(song.title) &&
                song.title
                  .toLowerCase()
                  .replaceAll(" ", "")
                  .includes(string)) ||
              (Boolean(song.artist) &&
                song.artist.toLowerCase().replaceAll(" ", "").includes(string))
            );
          }),
        );
      } else {
        await getSongs(string, songs, dir[item]);
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
  checkReadPermission: async (dir) => {
    return fs
      .access(dir, fs.constants.R_OK)
      .then(() => true)
      .catch(() => false);
  },
  checkWritePermission: async (dir) => {
    return fs
      .access(dir, fs.constants.W_OK)
      .then(() => true)
      .catch(() => false);
  },
  changeFilePermission: async (dir, code) => {
    return fs
      .chmod(dir, code)
      .then(() => true)
      .catch((error) => error);
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
  let title = `${name}${new Date().valueOf()}.tmp`;
  const file = path.join(url, title);
  //check if files folder exist
  if (!(await fileType.checkFileHealth(url))) {
    try {
      await fs.mkdir(url, { recursive: false });
    } catch (error) {
      return false;
    }
  }

  try {
    await fs.writeFile(file, content);
    await fs.rename(file, path.join(files, `${name}${extension}`));
    return true;
  } catch (error) {
    return false;
  }
};
