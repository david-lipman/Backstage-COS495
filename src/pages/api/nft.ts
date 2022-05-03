import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import CompleteNFT from "@common/types/CompleteNft";
import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";
import {
  httpGetMethodString,
  httpPostMethodString,
  httpPatchMethodString,
} from "@common/utils/httpMethodString";

import {
  httpResourceNotFound,
  httpDuplicateTokenId,
  httpInvalidContractAddress,
  httpInvalidTokenId,
} from "@modules/errorHandling/utils/httpCustomError";
import prisma from "@modules/prisma/utils/client";
import { isArtist } from "@modules/prisma/utils/isArtist";

// GET: Return the NFT with a given id.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/nft: incoming GET request`);
  try {
    const id = Number(req.query.id);
    const nft: CompleteNFT | null = await prisma.nft.findUnique({
      where: { id: id },
      include: { artist: true, collection: true },
    });
    if (nft === null) {
      httpResourceNotFound(res, id.toString());
    }
    console.log(`NFT ${nft} successfully queried from the Nft table`);
    res.status(200).json(nft);
  } catch (err) {
    console.log(`Error in GET /api/nft: ${err}`);
    res.status(500).end();
  }
};

// POST: Add a new NFT object to the database and return its id.
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/nft: incoming POST request`);
  try {
    const user = await getDbUserFromProtectedRequest(req, res);
    if (!user) {
      res.status(401).end();
      return;
    }
    if (!isArtist(user)) {
      console.log(`Error in POST /api/nft: non-artist not allowed`);
      res.status(401).end();
      return;
    }

    const createEntry = await prisma.nft.create({
      data: {
        ...req.body,
      },
    });
    console.log(`Entry ${createEntry} successfully added to the Nft table`);
    res.status(200).send(createEntry.id);
  } catch (err) {
    console.log(`Error in POST /api/nft: ${err}`);
    res.status(500).end();
  }
};

// PATCH: Update the Nft's contractAddress, tokenId, and owner when the NFT is minted.
const handlePatchRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log(`/api/nft: incoming PATCH request`);
  const tokenId = String(req.body.tokenId);

  try {
    const user = await getDbUserFromProtectedRequest(req, res);
    if (!user) {
      httpResourceNotFound(res, "user");
      return;
    }
    if (!isArtist(user)) {
      console.log(`Error in PATCH /api/nft: non-artist not allowed`);
      res.status(401).end();
    }

    // Fetch user id from protected request
    const nftId = Number(req.body.id);
    const ownerId: number = user.id;
    const contractAddress = String(req.body.contractAddress);
    if (contractAddress === "") {
      httpInvalidContractAddress(res, contractAddress);
    }
    if (tokenId === "") {
      httpInvalidTokenId(res, tokenId);
    }
    const updateEntry = await prisma.nft.update({
      where: {
        id: nftId,
      },
      data: {
        contractAddress: contractAddress,
        tokenId: tokenId,
        ownerId: ownerId,
        isMinted: true,
      },
    });
    console.log(
      `Entry ${updateEntry} successfully updated in the Nft table with minting data`
    );
    res.status(200).send(updateEntry);
  } catch (err) {
    console.log(`Error in PATCH /api/nft: ${err}`);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      httpDuplicateTokenId(res, tokenId);
    }
    // error for repeated tokenId
    res.status(500).end();
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === httpGetMethodString()) {
    handleGetRequest(req, res);
  } else if (req.method === httpPostMethodString()) {
    handlePostRequest(req, res);
  } else if (req.method === httpPatchMethodString()) {
    handlePatchRequest(req, res);
  }
};

export default handler;
