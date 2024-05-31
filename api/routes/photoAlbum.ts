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
  .put(validateRequest(updatePhotoAlbumSchema), updatePhotoAlbum);

export default router;
