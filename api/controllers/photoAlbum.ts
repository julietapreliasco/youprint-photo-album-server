import { isValidObjectId } from "mongoose";
import PhotoAlbumModel from "../models/photoAlbum";

export const createPhotoAlbum = async (req: any, res: any) => {
  try {
    const { photos, client } = req.body;

    if (!photos || !client.phone) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const newPhotoAlbum = new PhotoAlbumModel({
      photos,
      client,
      createdAt: new Date(),
    });

    await newPhotoAlbum.save();
    const url = `${process.env.APP}/gallery/${newPhotoAlbum._id}`;

    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPhotoAlbums = async (req: any, res: any) => {
  try {
    if (req.params.id) {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "URL inválida" });
      }
      const photoAlbum = await PhotoAlbumModel.findById(req.params.id);
      if (!photoAlbum) {
        return res.status(404).json({ error: "Álbum de fotos no encontrado" });
      }
      res.status(200).json(photoAlbum);
    } else {
      const photoAlbums = await PhotoAlbumModel.find();
      res.status(200).json(photoAlbums);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deletePhotoAlbum = async (req: any, res: any) => {
  try {
    const photoAlbumId = req.params.id;
    const photoAlbum = await PhotoAlbumModel.findById(photoAlbumId);
    if (!photoAlbum) {
      return res.status(404).json({ error: "Álbum de fotos no encontrado" });
    }
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Id inválida" });
    }
    await PhotoAlbumModel.deleteOne({ _id: photoAlbumId });
    res.status(200).json({ message: "Álbum de fotos eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePhotos = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { photos } = req.body;

    const photoAlbum = await PhotoAlbumModel.findById(id);
    if (!photoAlbum) {
      return res.status(404).json({ error: "Álbum de fotos no encontrado" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Id inválida" });
    }

    const existingPhotos = photoAlbum.photos;
    const duplicatePhotos = photos.filter((photo: string) =>
      existingPhotos.includes(photo)
    );

    if (duplicatePhotos.length > 0) {
      return res.status(400).json({
        error: "Una o más fotos ya existen en el álbum",
      });
    }

    photoAlbum.photos = [...photoAlbum.photos, ...photos];
    photoAlbum.updatedAt = new Date();

    await photoAlbum.save();

    res.status(200).json(photoAlbum);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePhotoAlbum = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { photos } = req.body;

    if (!photos) {
      return res
        .status(400)
        .json({ error: "Error, debe especificar un nuevo orden de las fotos" });
    }

    const photoAlbum = await PhotoAlbumModel.findById(id);
    if (!photoAlbum) {
      return res.status(404).json({ error: "Álbum de fotos no encontrado" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Id inválida" });
    }

    photoAlbum.photos = photos;
    photoAlbum.updatedAt = new Date();

    await photoAlbum.save();

    res.status(200).json(photoAlbum);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
