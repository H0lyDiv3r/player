import express from "express";
import { dirControllers } from "../controllers/dirController.mjs";
const router = express.Router();

router.get("/", dirControllers.dir);

router.get("/addDir", dirControllers.addDir);

router.get("/getDirs", dirControllers.getDirs);

router.get("/getFromDir", dirControllers.getFromDir);

export default router;
