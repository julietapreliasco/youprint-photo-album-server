import express from "express";
import {
  createPhotoAlbum,
  deletePhotoAlbum,
  getPhotoAlbums,
  updatePhotoAlbum,
  updatePhotos,
} from "../controllers/photoAlbum";
import {
  createPhotoAlbumSchema,
  updatePhotoAlbumSchema,
} from "../validations/photoAlbumSchema";
import validateRequest from "../middleware/validations";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getPhotoAlbums)
  .post(validateRequest(createPhotoAlbumSchema), createPhotoAlbum);

router
  .route("/:id")
  .get(getPhotoAlbums)
  .delete(authMiddleware, deletePhotoAlbum)
  .put(validateRequest(updatePhotoAlbumSchema), updatePhotos);

router
  .route("/update/:id")
  .put(validateRequest(updatePhotoAlbumSchema), updatePhotoAlbum);

export default router;
