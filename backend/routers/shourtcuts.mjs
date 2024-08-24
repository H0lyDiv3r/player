import express from "express";
import { shortcutController } from "../controllers/shortcutController.mjs";
const router = express.Router();

router.get("/getShortcuts", shortcutController.getShortcuts);
router.post("/addShortcut", shortcutController.addShortcut);
router.delete("/deleteShortcut", shortcutController.deleteShortcut);

export default router;
