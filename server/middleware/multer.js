import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    // console.log(file);
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["text/csv"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //// its bytes to kb which is 5mb
});

export default upload;
