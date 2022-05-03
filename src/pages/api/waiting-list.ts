import { Prisma, WaitingList } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import {
  httpGetMethodString,
  httpPostMethodString,
} from "@common/utils/httpMethodString";

import {
  httpDuplicateEmail,
  httpInvalidEmail,
  httpResourceNotFound,
} from "@modules/errorHandling/utils/httpCustomError";
import prisma from "@modules/prisma/utils/client";
import { validEmail } from "@modules/prisma/utils/emailValidation";

// POST: Receive an email and add it to the waiting list.
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const email: string = req.body.email;
  console.log(`/api/waiting-list: incoming POST request with email: ${email}`);
  try {
    if (!validEmail(email)) {
      httpInvalidEmail(res, email);
    }
    const createEntry = await prisma.waitingList.create({
      data: { email: email },
    });
    console.log(
      `Entry ${createEntry} successfully added to the waiting list table`
    );
    res.status(200).json({ email });
  } catch (err) {
    console.log(`Error in POST /api/waiting-list: ${err}`);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      httpDuplicateEmail(res, email);
    }
    res.status(500).end();
  }
};

// GET: Return all the emails in the waiting list.
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`/api/waiting-list: incoming GET request`);
    const emailObjects:
      | WaitingList[]
      | null = await prisma.waitingList.findMany();
    if (emailObjects === null) {
      httpResourceNotFound(res, "waiting-list");
    }
    const emails: string[] = emailObjects.map((user: WaitingList) => {
      return user.email;
    });
    console.log(
      `Entries ${emails} successfully queried from the waiting list table`
    );
    res.status(200).json(emails);
  } catch (err) {
    console.log(`Error in GET /api/waiting-list: ${err}`);
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
