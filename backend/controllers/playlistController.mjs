import { files, playlistFile } from "../utils/globalVars.mjs";
import * as fs from "fs/promises";
import * as path from "node:path";

import { createFile, fileType } from "../utils/file.mjs";
import * as jsMediaTags from "jsmediatags";

export const playlistControllers = {
  getPlaylists: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        await createFile("playlists", JSON.stringify({ favorites: [] }));
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let playlists = JSON.parse(data);
      return res.status(200).send(Object.keys(playlists));
    } catch (error) {
      next(error);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        await createFile("playlists", JSON.stringify({ favorites: [] }));
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let playlist = JSON.parse(data)[req.query.name];
      return res.status(200).send(playlist);
    } catch (error) {
      next(error);
    }
  },
  createPlaylist: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        await createFile("playlists", JSON.stringify({ favorites: [] }));
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }

      if (Object.keys(JSON.parse(data)).includes(req.body.name)) {
        return res.status(409).json({ message: "already exists" });
      }
      let playlists = JSON.parse(data);
      playlists[req.body.name] = [];

      await createFile("playlists", JSON.stringify(playlists));
      return res.status(200).send(Object.keys(playlists));
    } catch (error) {
      next(error);
    }
  },
  addToPlaylist: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        return res.status(500).json({ message: "cant write to playlist" });
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let playlists = JSON.parse(data);
      if (!playlists[req.body.playlist]) {
        return res.status(404).json({ message: "Playlist doenst exist" });
      }
      let target = playlists[req.body.playlist];

      if (target.some((obj) => obj["path"] === req.body.path)) {
        return res.status(409).json({ message: "already in playlist" });
      }
      delete req.body.playlist;
      target.push(req.body);

      await createFile("playlists", JSON.stringify(playlists));
      return res.status(200).send(target);
    } catch (error) {
      next(error);
    }
  },
  deleteFromPlaylist: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        return res.status(500).json({ message: "cant write" });
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let playlists = JSON.parse(data);
      playlists[req.query.name] = playlists[req.query.name].filter(
        (item) => item.path != req.query.path,
      );

      await createFile("playlists", JSON.stringify(playlists));
      return res.status(200).send(playlists);
    } catch (error) {
      next(error);
    }
  },
  deletePlaylist: async (req, res, next) => {
    try {
      const playlistPath = path.join(files, playlistFile);
      if (!(await fileType.checkFileHealth(playlistPath))) {
        return res.status(404).json({ message: "you dont have any playlists" });
      }
      let data = await fs.readFile(playlistPath, "utf8");
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }

      if (!Object.keys(JSON.parse(data)).includes(req.query.name)) {
        return res.status(404).json({ message: "playlist doenst exist" });
      }
      let playlists = JSON.parse(data);
      delete playlists[req.query.name];

      await createFile("playlists", JSON.stringify(playlists));
      // await fs.writeFile(playlistPath, JSON.stringify(playlists));
      return res.status(200).send(Object.keys(playlists));
    } catch (error) {
      next(error);
    }
  },
};
