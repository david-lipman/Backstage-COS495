import { User, Artist, Collection } from "@prisma/client";

export type UserArtist = User & { artist: Artist };

export type UserArtistResponse = User & { artist: Artist | null };

export type ArtistAndCollection = Artist & { collections: Collection[] };
