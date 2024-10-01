import express from "express";
import * as path from "node:path";
import { shortcutsFile, files } from "../utils/globalVars.mjs";
import { createFile, fileType } from "../utils/file.mjs";
import * as fs from "fs/promises";

export const shortcutController = {
  getShortcuts: async (req, res, next) => {
    try {
      const shortcutPath = path.join(files, shortcutsFile);
      if (!(await fileType.checkFileHealth(shortcutPath))) {
        await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
      }
      const data = await fs.readFile(shortcutPath);
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let shortcuts = JSON.parse(data)["shortcuts"];
      return res.status(200).send(shortcuts);
    } catch (error) {
      next(error);
    }
  },
  addShortcut: async (req, res, next) => {
    try {
      const shortcutPath = path.join(files, shortcutsFile);
      if (!(await fileType.checkFileHealth(shortcutPath))) {
        await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
      }
      const data = await fs.readFile(shortcutPath);
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let shortcuts = JSON.parse(data)["shortcuts"];
      if (shortcuts.some((item) => item.name === req.body.name)) {
        return res.status(409).json({ message: "shortcut already exists" });
      }
      shortcuts.push({
        name: req.body.name,
        path: req.body.path,
        active: req.body.active,
      });

      await createFile("shortcuts", JSON.stringify({ shortcuts }));
      return res.status(200).send(shortcuts);
    } catch (error) {
      next(error);
    }
  },
  deleteShortcut: async (req, res, next) => {
    try {
      const shortcutPath = path.join(files, shortcutsFile);
      if (!(await fileType.checkFileHealth(shortcutPath))) {
        await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
      }
      const data = await fs.readFile(shortcutPath);
      if (!data) {
        return res.status(500).json({ message: "failed to read data" });
      }
      let shortcuts = JSON.parse(data)["shortcuts"];
      let newShortcuts = shortcuts.filter(
        (item) => item.name != req.query.name,
      );

      await createFile(
        "shortcuts",
        JSON.stringify({ shortcuts: newShortcuts }),
      );

      return res.status(200).send(newShortcuts);
    } catch (error) {
      next(error);
    }
  },
};
