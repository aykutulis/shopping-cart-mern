import multer from 'multer';
import path from 'path';

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __dirrname = path.resolve();
    cb(null, path.join(__dirrname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    req.savedImage = `image_${Date.now()}.${extension}`;

    cb(null, req.savedImage);
  },
});

// FileFilter
const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  if (!allowedMimeTypes.includes(file.mimetype)) return cb(new Error('Please provide a valid image file'), false);

  return cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

export { imageUpload };
