import { Collection, Nft, User, Tier, Artist } from "@prisma/client";

import ArtistCardProps from "@common/types/ArtistCardProps";
import CompleteNFT from "@common/types/CompleteNft";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";
import NFTCardProps from "@common/types/NFTCardProps";
import baseUrl from "@common/utils/baseURL";

import BrowseSearchType from "@modules/browse/types/BrowseSearchType";
import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";

export const addUserToWaitingList = async (email: string): Promise<string> => {
  const response: Response = await fetch("/api/waiting-list", {
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const responseBody: string = await response.json();
  return responseBody;
};

export const fetchMe = async (): Promise<User> => {
  const response: Response = await fetch(`${baseUrl}/api/user/me`, {
    method: "GET",
  });
  const responseBody: Promise<User> = response.json();
  return responseBody;
};

export const updateMe = async (changes: Partial<User>): Promise<User> => {
  const response: Response = await fetch(`/api/user/me`, {
    body: JSON.stringify({
      ...changes,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response.json();
};

export const createNft = async (
  img: string,
  tokenId: string,
  title: string,
  artistId: number,
  price: number,
  collectionId: number,
  tier: Tier,
  contractAddress: string,
  pinataUrl: string
): Promise<Nft> => {
  const response: Response = await fetch("/api/nft", {
    body: JSON.stringify({
      img,
      tokenId,
      title,
      artistId,
      price,
      collectionId,
      tier,
      contractAddress,
      pinataUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const responseBody: Promise<Nft> = await response.json();
  return responseBody;
};

export const fetchNft = async (id: string): Promise<CompleteNFT> => {
  const response: Response = await fetch(`${baseUrl}/api/nft?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const responseBody: Promise<CompleteNFT> = response.json();
  return responseBody;
};

export const updateNft = async (
  id: number,
  tokenId: string,
  contractAddress: string
): Promise<Nft> => {
  const response: Response = await fetch("/api/nft", {
    body: JSON.stringify({
      id,
      tokenId,
      contractAddress,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
  const responseBody: Promise<Nft> = await response.json();
  return responseBody;
};

export const createArtist = async (
  userId: number,
  fullName: string,
  bioInfo: string,
  twitter: string,
  instagram: string,
  spotify: string,
  benefits: string,
  promoSong: string,
  collectionName: string,
  profileHeader: string
): Promise<UserArtistResponse> => {
  const response: Response = await fetch(`/api/artist/${userId}`, {
    body: JSON.stringify({
      fullName,
      bioInfo,
      twitter,
      instagram,
      spotify,
      benefits,
      promoSong,
      collectionName,
      profileHeader,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const responseBody: Promise<UserArtistResponse> = await response.json();
  return responseBody;
};

export const fetchArtist = async (username: string): Promise<Artist> => {
  const response: Response = await fetch(`${baseUrl}/api/artist/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const responseBody: Promise<Artist> = response.json();
  return responseBody;
};

export const createCollection = async (
  artistId: number,
  collectionName: string
): Promise<Collection> => {
  const response: Response = await fetch(
    `${baseUrl}/api/collection?id=${artistId}`,
    {
      body: JSON.stringify({
        artistId,
        collectionName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  const responseBody: Promise<Collection> = response.json();
  return responseBody;
};

export const fetchCollection = async (id: string): Promise<Collection> => {
  const response: Response = await fetch(`${baseUrl}/api/collection?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const responseBody: Promise<Collection> = response.json();
  return responseBody;
};

export const fetchBrowseQuery = async (
  searchType: BrowseSearchType,
  searchText: string
): Promise<
  NFTCardProps[] | EnhancedCollectionNFTCardType[] | ArtistCardProps[]
> => {
  const response: Response = await fetch(
    `${baseUrl}/api/browse?type=${searchType}&text=${searchText}`
  );
  const responseBody: Promise<
    NFTCardProps[] | EnhancedCollectionNFTCardType[] | ArtistCardProps[]
  > = await response.json();
  return responseBody;
};

export const fetchArtistsQuery = async (
  searchText: string
): Promise<ArtistCardProps[]> => {
  const response: Response = await fetch(
    `${baseUrl}/api/browse?type=${BrowseSearchType.Artist}&text=${searchText}`
  );
  const responseBody: Promise<ArtistCardProps[]> = await response.json();
  return responseBody;
};

export const fetchUser = async () => {
  const response: Response = await fetch(`${baseUrl}/api/user`);

  const responseBody: Promise<{
    user: UserArtistResponse;
    nfts: CompleteNFT[];
  }> = await response.json();
  return responseBody;
};
