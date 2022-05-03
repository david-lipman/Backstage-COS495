import { Prisma, User, Artist } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import exclude from "@common/utils/excludeFields";
import getDbUserFromProtectedRequest from "@common/utils/getUserFromProtectedRequest";
import {
  httpGetMethodString,
  httpPostMethodString,
} from "@common/utils/httpMethodString";

import { httpDuplicateUsernameOrEmail } from "@modules/errorHandling/utils/httpCustomError";
import prisma from "@modules/prisma/utils/client";

// GET: Return the User with a given username.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/user/me: incoming GET request`);
  const user = await getDbUserFromProtectedRequest(req, res);
  console.log(user);
  try {
    res.status(200).json(user);
  } catch (err) {
    console.log(`Error in GET /api/user/me: ${err}`);
    res.status(500).end();
  }
};

// POST: Update a user object in the db.
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/user/me: incoming POST request`);

  const user = await getDbUserFromProtectedRequest(req, res);
  if (!user) {
    res.status(400).end();
    return;
  }

  try {
    // If there are fields to change / update
    if (req.body) {
      const updatedEntry = await prisma.user.update({
        where: { id: user.id },
        data: {
          // If you don't exclude artist object it'll try to set null /
          // get mad, b/c of funky interaction between how nextjs treats it as undefined
          // and the DB wants 'null'
          ...exclude(req.body as Partial<User & { artist: Artist }>, "artist"),
        },
      });
      console.log(`Entry ${updatedEntry} successfully updated User in table`);
      res.status(200).json(updatedEntry);
      return;
    }
    res.status(200).json(user); // If no updates made.
  } catch (err) {
    console.log(`Error in POST /api/user: ${err}`);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      httpDuplicateUsernameOrEmail(res, err, user.username, user.email);
    }
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
