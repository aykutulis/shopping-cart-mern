const multer = require('multer');
const path = require('path');

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, '/uploads'));
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
