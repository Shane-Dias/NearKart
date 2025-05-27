import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB for shopLogo
  const MAX_ID_SIZE = 5 * 1024 * 1024; // 5MB for governmentId

  // Check file type first
  const isFileTypeValid =
    (file.fieldname === "shopLogo" && file.mimetype.startsWith("image/")) ||
    (file.fieldname === "governmentId" &&
      (file.mimetype === "application/pdf" ||
        file.mimetype.startsWith("image/")));

  if (!isFileTypeValid) {
    return cb(new Error("Invalid file type. Only images/PDFs allowed."), false);
  }

  // Check field-specific size limit
  if (file.fieldname === "shopLogo" && file.size > MAX_LOGO_SIZE) {
    return cb(new Error("Logo size exceeds 2MB limit."), false);
  }

  if (file.fieldname === "governmentId" && file.size > MAX_ID_SIZE) {
    return cb(new Error("Government ID size exceeds 5MB limit."), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Global fallback (5MB)
    files: 2,
  },
});

export default upload;
