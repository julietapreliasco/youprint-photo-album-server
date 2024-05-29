import express from "express";
import {
  createPhotoAlbum,
  deletePhotoAlbum,
  getPhotoAlbums,
  updatePhotoAlbum,
} from "../controllers/photoAlbum";

const router = express.Router();

router.route("/").get(getPhotoAlbums).post(createPhotoAlbum);
router
  .route("/:id")
  .get(getPhotoAlbums)
  .delete(deletePhotoAlbum)
  .put(updatePhotoAlbum);

export default router;
