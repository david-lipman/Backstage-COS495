import path from "path";

import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

import { s3 } from "./awsSetup";

// URL of our content-delivery network
const CLOUD_FRONT_URL = "https://d17iuxf4c4gu6d.cloudfront.net";

const AWS_S3_BUCKET_NAME = "backstage-static-assets";
const DISK_OUTPUT_DIR = "./public/uploads";
const PROFILE_DIR = "profile";
const NFT_DIR = "nfts";

const profilePath = (req: Request, file: Express.Multer.File): string => {
  const username = String(req.query["username"]);
  const filename = String(file.originalname);
  const destPath: string = path.join(
    PROFILE_DIR,
    username + path.extname(filename)
  );
  return destPath;
};

const nftPath = (req: Request, file: Express.Multer.File): string => {
  const filename = String(file.originalname);
  const destPath: string = path.join(NFT_DIR, filename);
  return destPath;
};

type DestinationCallback = (error: Error | null, destination: string) => void;

// The following functions return a multer.Storage object which we pass to multer.
export const multerProfileDiskStorage = multer.diskStorage({
  destination: DISK_OUTPUT_DIR,
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    const destPath = profilePath(req, file);

    // Pass url to the next function.
    const url = path.join(DISK_OUTPUT_DIR, destPath);
    req.query["uploadedUrl"] = url;

    return cb(null, destPath);
  },
});

export const multerAwsStorage = multerS3({
  s3: s3,
  bucket: AWS_S3_BUCKET_NAME,
  // Allow multer to find the Content/mime type of the file and set it on the storage side.
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    const destPath = profilePath(req, file);

    // Pass url to the next function.
    const url = path.join(CLOUD_FRONT_URL, destPath);
    req.query["uploadedUrl"] = url;

    return cb(null, destPath);
  },
});

export const multerAwsNFTStorage = multerS3({
  s3: s3,
  bucket: AWS_S3_BUCKET_NAME,
  // Allow multer to find the Content/mime type of the file and set it on the storage side.
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    const destPath = nftPath(req, file);

    // Pass url to the next function.
    const url = path.join(CLOUD_FRONT_URL, destPath);
    req.query["uploadedUrl"] = url;

    return cb(null, destPath);
  },
});
