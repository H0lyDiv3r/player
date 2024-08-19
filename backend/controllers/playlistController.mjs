import { files, playlistFile } from "../utils/globalVars.mjs";
import * as fs from "fs/promises";
import * as path from "node:path";

import { fileType } from "../utils/file.mjs";

export const playlistControllers = {
  getPlaylists: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
    if (!(await fileType.checkFileHealth(playlistPath))) {
      res.status(400).json({ message: "you dont have any playlists" });
    }
    let data = await fs.readFile(playlistPath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    let playlists = JSON.parse(data);
    res.send(Object.keys(playlists));
  },
  getPlaylist: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
    if (!(await fileType.checkFileHealth(playlistPath))) {
      res.status(400).json({ message: "you dont have any playlists" });
    }
    let data = await fs.readFile(playlistPath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    let playlist = JSON.parse(data)[req.body.name];
    res.send(playlist);
  },
  createPlaylist: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
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
  },
  addToPlaylist: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
    if (!(await fileType.checkFileHealth(playlistPath))) {
      res.status(500).json({ message: "cant write" });
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
  },
  deleteFromPlaylist: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
    if (!(await fileType.checkFileHealth(playlistPath))) {
      res.status(500).json({ message: "cant write" });
    }
    let data = await fs.readFile(playlistPath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }
    let playlists = JSON.parse(data);
    playlists[req.query.name] = playlists[req.query.name].filter(
      (item) => item.id != req.query.id,
    );
    await fs.writeFile(playlistPath, JSON.stringify(playlists));
    res.send();
  },
  deletePlaylist: async (req, res) => {
    const playlistPath = path.join(files, playlistFile);
    if (!(await fileType.checkFileHealth(playlistPath))) {
      res.status(400).json({ message: "you dont have any playlists" });
    }
    let data = await fs.readFile(playlistPath, "utf8");
    if (!data) {
      res.status(500).json({ message: "failed to read data" });
    }

    if (!Object.keys(JSON.parse(data)).includes(req.query.name)) {
      res.status(400).json({ message: "playlist doenst exist" });
    }
    let playlists = JSON.parse(data);
    delete playlists[req.query.name];
    await fs.writeFile(playlistPath, JSON.stringify(playlists));
    res.send();
  },
};
