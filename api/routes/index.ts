import express from "express";
import photoAlbumRouter from "./photoAlbum";
import authRouter from "./auth";

const router = express.Router();

router.use("/photo-album", photoAlbumRouter);
router.use("/admin", authRouter);

export default router;
