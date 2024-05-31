import express from "express";
import {
  createPhotoAlbum,
  deletePhotoAlbum,
  getPhotoAlbums,
  updatePhotoAlbum,
} from "../controllers/photoAlbum";
import validateRequest from "../middleware/validations";
import {
  createPhotoAlbumSchema,
  updatePhotoAlbumSchema,
} from "../validations/photoAlbumSchema";

const router = express.Router();

router
  .route("/")
  .get(getPhotoAlbums)
  .post(validateRequest(createPhotoAlbumSchema), createPhotoAlbum);

router
  .route("/:id")
  .get(getPhotoAlbums)
  .delete(deletePhotoAlbum)
  .put(validateRequest(updatePhotoAlbumSchema), updatePhotoAlbum);

export default router;
