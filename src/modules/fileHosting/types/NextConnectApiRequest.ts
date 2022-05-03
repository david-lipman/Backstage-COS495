import { NextApiRequest } from "next";

export interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
