import { Request } from "express";
import { FileFilterCallback } from "multer";

export const multerFilterImages = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const acceptFile: boolean = ["image/jpeg", "image/png", "image/gif"].includes(
    file.mimetype
  );
  cb(null, acceptFile);
};
