import { User } from "@prisma/client";

import SelectOptionsType from "@common/types/SelectOptionsType";

import { ArtistAndCollection } from "@modules/prisma/types/ArtistTypes";

export const parseArtistSearchOptions = (
  artists: ArtistAndCollection[]
): SelectOptionsType => {
  const artistOptions: SelectOptionsType = [];
  artists.forEach((artist) => {
    artistOptions.push({ value: String(artist.id), label: artist.fullName });
  });
  return artistOptions;
};

export const parseUserSearchOptions = (users: User[]): SelectOptionsType => {
  const artistOptions: SelectOptionsType = [];
  users.forEach((user) => {
    artistOptions.push({ value: String(user.id), label: user.fullName });
  });
  return artistOptions;
};
