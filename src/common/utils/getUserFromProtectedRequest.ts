import { getSession, Claims } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import { httpInvalidEmail } from "@modules/errorHandling/utils/httpCustomError";
import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";
import prisma from "@modules/prisma/utils/client";
import { validEmail } from "@modules/prisma/utils/emailValidation";

// Given a req and a res, will return the DB user object associated with the request. If no
// db user exists, it will create it. If no user is found on the request, then it will give a 401 unauthorized response.
const getDbUserFromProtectedRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<UserArtistResponse | null> => {
  const session = getSession(req, res);

  // Obtain the session user, or send an error response.
  const user: Claims | undefined = session?.user;
  if (!user) {
    res.status(401).end();
    return null;
  }
  // Obtain the user from the database.
  const userObject = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      artist: true,
    },
  });
  if (userObject) {
    return userObject;
  }
  // If no user exists in the database, create it.
  const email: string = user.email;
  if (!validEmail(email)) {
    httpInvalidEmail(res, email);
  }
  // if no username is provided, use the email as the username.
  const username = user.nickname ? user.nickname : email;
  const newUser = await prisma.user.create({
    data: {
      email: email,
      username: username,
      fullName: user.name,
      profilePhoto: user.picture,
      profileInfo: "",
    },
    include: { artist: true },
  });
  return newUser;
};

export default getDbUserFromProtectedRequest;
