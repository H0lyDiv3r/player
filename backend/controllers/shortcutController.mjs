import express from "express";
import * as path from "node:path";
import { shortcutsFile, files } from "../utils/globalVars.mjs";
import { createFile, fileType } from "../utils/file.mjs";
import * as fs from "fs/promises";

export const shortcutController = {
  getShortcuts: async (req, res) => {
    const shortcutPath = path.join(files, shortcutsFile);
    if (!(await fileType.checkFileHealth(shortcutsFile))) {
      await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
    }
    const data = await fs.readFile(shortcutPath);
    if (!data) {
      return res.status(500).json({ message: "failed to read data" });
    }
    let shortcuts = JSON.parse(data)["shortcuts"];
    res.send(shortcuts);
  },
  addShortcut: async (req, res) => {
    const shortcutPath = path.join(files, shortcutsFile);
    if (!(await fileType.checkFileHealth(shortcutsFile))) {
      await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
    }
    const data = await fs.readFile(shortcutPath);
    if (!data) {
      return res.status(500).json({ message: "failed to read data" });
    }
    let shortcuts = JSON.parse(data)["shortcuts"];
    if (shortcuts.some((item) => item.name === req.body.name)) {
      return res.status(403).json({ message: "shortcut already exists" });
    }
    shortcuts.push({
      name: req.body.name,
      path: req.body.path,
    });
    await fs.writeFile(shortcutPath, JSON.stringify({ shortcuts }));
    res.send(shortcuts);
  },
  deleteShortcut: async (req, res) => {
    const shortcutPath = path.join(files, shortcutsFile);
    if (!(await fileType.checkFileHealth(shortcutsFile))) {
      await createFile("shortcuts", JSON.stringify({ shortcuts: [] }));
    }
    const data = await fs.readFile(shortcutPath);
    if (!data) {
      return res.status(500).json({ message: "failed to read data" });
    }
    let shortcuts = JSON.parse(data)["shortcuts"];
    let newShortcuts = shortcuts.filter((item) => item.name != req.query.name);
    await fs.writeFile(
      shortcutPath,
      JSON.stringify({ shortcuts: newShortcuts }),
    );
    res.send(newShortcuts);
  },
};
