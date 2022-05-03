import { NextApiRequest, NextApiResponse } from "next";

import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";
import {
  httpGetMethodString,
  httpPostMethodString,
} from "@common/utils/httpMethodString";

import prisma from "@modules/prisma/utils/client";

// GET: Return the Artist with a given username.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query as { userId: string };
  console.log(`/api/artist/${userId}: incoming GET request`);
  try {
    // Since artist is a superset of user, we search for a user,
    // and access its reference to the artist to include artist fields.
    const artistUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        artist: {
          include: {
            collections: { include: { nfts: true } },
            _count: { select: { followers: true } },
          },
        },
      },
    });

    if (artistUser?.artist === null) {
      res.status(404).end();
    }
    console.log(
      `Artist ${artistUser} successfully queried from the Artist table`
    );
    res.status(200).json(artistUser?.artist);
  } catch (err) {
    console.log(`Error in GET /api/artist/${userId}: ${err}`);
    res.status(500).end();
  }
};

// POST: Add a new Artist object to add to the database.
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // The artist MUST be signed in as a user to create an artist object.
  const { userId } = req.query as { userId: string };
  const user = await getDbUserFromProtectedRequest(req, res);
  if (!user) {
    res.status(401).end();
    return;
  }
  console.log(`/api/artist/${userId}: incoming POST request`);
  try {
    const newArtist = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        artist: {
          create: {
            fullName: req.body.fullName ? req.body.fullName : user.fullName,
            bioInfo: req.body.bioInfo,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            spotify: req.body.spotify,
            benefits: req.body.benefits,
            promoSong: req.body.promoSong ? req.body.promoSong : "",
            profileHeader: req.body.profileHeader,
          },
        },
      },
      include: {
        artist: true,
      },
    });

    // Add new collection upon artist creation
    const newCollection = await prisma.collection.create({
      data: {
        artistId: newArtist.id,
        collectionName: String(req.body.collectionName),
      },
    });

    // Updarte artist object with default collection id
    await prisma.artist.update({
      where: { id: newArtist.id },
      data: {
        defaultCollectionId: newCollection.id,
      },
    });
    console.log(`Entry ${newArtist} successfully updated Artist in table`);
    res.status(200).send(newArtist);
  } catch (err) {
    console.log(`Error in POST /api/artist: ${err}`);
    res.status(500).end();
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === httpGetMethodString()) {
    handleGetRequest(req, res);
  } else if (req.method === httpPostMethodString()) {
    handlePostRequest(req, res);
  }
};

export default handler;
