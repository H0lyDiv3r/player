import express from "express";
import { playlistControllers } from "../controllers/playlistController.mjs";
const router = express.Router();

router.get("/getPlaylists", playlistControllers.getPlaylists);
router.get("createPlaylist", playlistControllers.createPlaylist);
router.post("/deletePlaylist", playlistControllers.deletePlaylist);
router.get("/getPlaylist", playlistControllers.getPlaylist);
router.post("addToPlaylist", playlistControllers.addToPlaylist);
router.delete("deleteFromPlaylist", playlistControllers.deleteFromPlaylist);

export default router;
