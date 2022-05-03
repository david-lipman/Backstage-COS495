import multer from "multer";
import { NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";

import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";

import { ApiResponse } from "@modules/fileHosting/types/ApiResponse";
import { NextConnectApiRequest } from "@modules/fileHosting/types/NextConnectApiRequest";
import { multerFilterImages } from "@modules/fileHosting/utils/multerFileFilter";
import {
  multerAwsStorage,
  // multerDiskStorage,
} from "@modules/fileHosting/utils/multerStorage";

type ResponseData = ApiResponse<string[], string>;
const oneMegabyteInBytes = 1000000;

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  fileFilter: multerFilterImages,
  storage: multerAwsStorage,
});

const handler = nextConnect({
  onError(
    err: Error,
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    const errorMessage = `Middleware error: ${err.message}`;
    console.log(errorMessage);
    res.status(501).json({ error: errorMessage });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    const errorMessage = `Method '${req.method}' Not Allowed`;
    console.log(errorMessage);
    res.status(405).json({ error: errorMessage });
  },
});

const authenticate = async (
  req: NextConnectApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  console.log("/api/upload-profile: authenticate");
  const user = await getDbUserFromProtectedRequest(req, res);

  // Pass username to the next middleware.
  if (user) {
    req.query.username = user?.username;
  } else {
    // If user isn't found it's an error.
    res.status(400).end();
  }
  next();
};

const logging = (
  req: NextConnectApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  console.log("/api/upload-profile: incoming request");
  next();
};

// This NextConnect handler enables midleware functions for different purposes.
handler
  .use(logging)
  .use(authenticate)
  .use(upload.single("profile"))
  .post((req: NextConnectApiRequest, res: NextApiResponse) => {
    // The new profile picture should be at artists/profile/username.[ext].
    const url = String(req.query.uploadedUrl);
    console.log(`Profile image uploaded successfully to ${url}`);
    res.status(200).json({ imageUrl: url });
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default handler;
