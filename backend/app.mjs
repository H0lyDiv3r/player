import * as fs from "fs/promises";
import * as path from "node:path";
import express from "express";
import cors from "cors";

const app = express();
const root = "";
const extensions = [".mp3", ".wav", ".ogg", ".aac", ".m4a", ".webm"];

app.use(express.static("/"));
app.use(cors());

app.get("/", async (req, res) => {
  console.log(req.query);
  const dirPath = path.join(root, req.query.dir || "");
  let directory = [];
  if (await fileType.isMusicFile(dirPath)) {
    res.send(dirPath);
  } else {
    try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      // console.log(files);
      for (const file of files) {
        const fullPath = path.join(dirPath + file.name);
        if (file.isSymbolicLink()) {
          continue;
        }
        if (!(await fileType.checkHealth(fullPath))) {
          continue;
        }
        console.log(await fileType.checkHealth(fullPath));
        if (
          (await fileType.isMusicFile(fullPath)) ||
          (await fileType.isDir(fullPath))
        ) {
          directory.push({
            name: file.name,
            type: (await fileType.isDir(fullPath)) ? "dir" : "file",
          });
        }
      }
      res.send(directory);
    } catch (error) {
      res.status(500).json({ message: "error" });
    }
  }
});

///
const fileType = {
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
};

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// const dir = "/";
// const files = fs.readdirSync(dir);

// for (const file of files) {
//   console.log(fs.statSync(dir + file).isDirectory());
//   if (fs.statSync(dir + file).isFile()) {
//     console.log(path.resolve(dir + file));
//   }
// }
