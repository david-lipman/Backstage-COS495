import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

import { CustomErrorCode, CustomError } from "../models/customError";

const respondError = (
  res: NextApiResponse,
  code: CustomErrorCode,
  param: string
) => {
  const err = new CustomError(code, param);
  res.status(err.httpCode).end(err.message);
};

export const httpResourceNotFound = (res: NextApiResponse, id: string) => {
  respondError(res, CustomErrorCode.ResourceNotFound, id);
};

export const httpInvalidEmail = (res: NextApiResponse, email: string) => {
  respondError(res, CustomErrorCode.InvalidEmail, email);
};

export const httpInvalidContractAddress = (
  res: NextApiResponse,
  addr: string
) => {
  respondError(res, CustomErrorCode.InvalidContractAddress, addr);
};

export const httpInvalidTokenId = (res: NextApiResponse, tokenId: string) => {
  respondError(res, CustomErrorCode.InvalidTokenId, tokenId);
};

export const httpInvalidDate = (res: NextApiResponse, date: string) => {
  respondError(res, CustomErrorCode.InvalidDate, date);
};

export const httpInvalidPermissions = (
  res: NextApiResponse,
  userType: string
) => {
  respondError(res, CustomErrorCode.InvalidPermissions, userType);
};

export const httpPastDate = (res: NextApiResponse, date: string) => {
  respondError(res, CustomErrorCode.PastDate, date);
};

export const httpDuplicateEmail = (res: NextApiResponse, email: string) => {
  respondError(res, CustomErrorCode.DuplicateEmail, email);
};

export const httpDuplicateWallet = (
  res: NextApiResponse,
  publicKey: string
) => {
  respondError(res, CustomErrorCode.DuplicateWallet, publicKey);
};

export const httpDuplicateUsername = (
  res: NextApiResponse,
  username: string
) => {
  respondError(res, CustomErrorCode.DuplicateUsername, username);
};

export const httpDuplicateTokenId = (res: NextApiResponse, tokenId: string) => {
  respondError(res, CustomErrorCode.DuplicateTokenId, tokenId);
};

// Function to throw error if username or email field
// is duplicated when inserting artist or user into the database
export const httpDuplicateUsernameOrEmail = (
  res: NextApiResponse,
  err: Prisma.PrismaClientKnownRequestError,
  username: string,
  email: string
) => {
  const duplicateField: string = err.message.split("`")[3];
  if (duplicateField == "username") {
    httpDuplicateUsername(res, username);
  } else if (duplicateField == "email") {
    httpDuplicateEmail(res, email);
  } else {
    res.status(500).end();
  }
};
