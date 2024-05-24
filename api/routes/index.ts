import express from 'express';
import photoAlbumRouter from './photoAlbum';


const router = express.Router();

router.use('/photo-album', photoAlbumRouter);

export default router;