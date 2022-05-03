import { User, Artist } from "@prisma/client";

// isArtist returns true if user is an artist, or false otherwise.
export const isArtist = (
  user: User & {
    artist: Artist | null;
  }
): boolean => {
  return Boolean(user.artist);
};
