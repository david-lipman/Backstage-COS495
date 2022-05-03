import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import CompleteNFT from "@common/types/CompleteNft";
import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";
import { httpGetMethodString } from "@common/utils/httpMethodString";

import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";
import prisma from "@modules/prisma/utils/client";

// GET: Return the User with a given username.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user: UserArtistResponse | null = await getDbUserFromProtectedRequest(
      req,
      res
    );
    if (user === null) {
      res.status(500).end();
      return;
    }
    // Add the NFTs from that user.
    const nfts: CompleteNFT[] = await prisma.nft.findMany({
      where: {
        owner: {
          email: user.email,
        },
      },
      include: { artist: true, collection: true, owner: true },
    });
    const userAndNfts = { user: user, nfts: nfts };
    res.status(200).json(userAndNfts);
  } catch (err) {
    res.status(500).end();
  }
};

export default withApiAuthRequired(
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === httpGetMethodString()) {
      handleGetRequest(req, res);
    }
  }
);
