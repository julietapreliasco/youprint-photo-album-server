import PhotoAlbumModel from '../models/photoAlbum';

export const createPhotoAlbum = async (req: any, res: any) => {
  try {
    const { photos, client } = req.body;

    if (!photos || !client.phone) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newPhotoAlbum = new PhotoAlbumModel({
      photos,
      client,
      createdAt: new Date(),
    });

    await newPhotoAlbum.save();
    const url = `${req.protocol}://${req.get('host')}/photo-album/${newPhotoAlbum._id}`;

    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const getPhotoAlbums = async (req:any, res:any) => {
  try {
    if (req.params.id) {
      const photoAlbum = await PhotoAlbumModel.findById(req.params.id);
      if (!photoAlbum) {
        return res.status(404).json({ error: 'Álbum de fotos no encontrado' });
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
      return res.status(404).json({ error: 'Álbum de fotos no encontrado' });
    }
    await PhotoAlbumModel.deleteOne({ _id: photoAlbumId });
    res.status(200).json({ message: 'Álbum de fotos eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
