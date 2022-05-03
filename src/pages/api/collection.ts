import { Collection } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";
import {
  httpGetMethodString,
  httpPostMethodString,
} from "@common/utils/httpMethodString";

import {
  httpResourceNotFound,
  httpInvalidDate,
  httpPastDate,
  httpInvalidPermissions,
} from "@modules/errorHandling/utils/httpCustomError";
import prisma from "@modules/prisma/utils/client";
import { pastDate, validDate } from "@modules/prisma/utils/dateValidation";
import { isArtist } from "@modules/prisma/utils/isArtist";

// GET: Return the Collection with a given id.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/collection: incoming GET request`);
  try {
    const id = Number(req.query.id);
    const collection: Collection | null = await prisma.collection.findUnique({
      where: { id: id },
    });
    if (collection === null) {
      httpResourceNotFound(res, id.toString());
    }
    console.log(
      `Collection ${collection} successfully queried from the Collection table`
    );
    res.status(200).json(collection);
  } catch (err) {
    console.log(`Error in GET /api/collection: ${err}`);
    res.status(500).end();
  }
};

// POST: Add a new Collection object to the database and return its id.
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/collection: incoming POST request`);

  try {
    const user = await getDbUserFromProtectedRequest(req, res);
    if (!user) {
      httpResourceNotFound(res, "user");
      return;
    }
    if (!isArtist(user)) {
      console.log(`Error in POST /api/collection: non-artist not allowed`);
      httpInvalidPermissions(res, "user");
    }

    const dateStr = req.body.launchDate;
    if (!validDate(dateStr)) {
      httpInvalidDate(res, dateStr);
    }
    const launchDate = new Date(req.body.launchDate);
    if (pastDate(launchDate)) {
      httpPastDate(res, dateStr);
    }
    const createEntry = await prisma.collection.create({
      data: {
        artistId: req.body.artistId,
        collectionName: req.body.collectionName,
      },
    });
    console.log(
      `Entry ${createEntry} successfully added to the Collection table`
    );
    res.status(200).send(createEntry.id);
  } catch (err) {
    console.log(`Error in POST /api/collection: ${err}`);
    res.status(500).end();
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === httpGetMethodString()) {
    handleGetRequest(req, res);
  } else if (req.method === httpPostMethodString()) {
    handlePostRequest(req, res);
  }
};

export default handler;
