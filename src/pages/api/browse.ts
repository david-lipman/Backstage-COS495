import { NextApiRequest, NextApiResponse } from "next";

import ArtistCardProps from "@common/types/ArtistCardProps";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";
import NFTCardProps from "@common/types/NFTCardProps";
import { httpGetMethodString } from "@common/utils/httpMethodString";

import BrowseSearchType from "@modules/browse/types/BrowseSearchType";
import parseArtistData from "@modules/dataParsing/components/parseArtistData";
import parseNFTDropData from "@modules/dataParsing/components/parseNFTArtistCollectionData";
import {
  UserArtistResponse,
  UserArtist,
} from "@modules/prisma/types/ArtistTypes";
import prisma from "@modules/prisma/utils/client";
import { isArtist } from "@modules/prisma/utils/isArtist";

// Default number of NFTs / Collections / Artists shown with empty search-string.
const NFT_DEFAULT = 30;
const COLLECTION_DEFAULT = 5;
const ARTIST_DEFAULT = 20;

const performNFTSearch = async (text: string) => {
  console.log(`/api/browse: incoming NFT request`);
  let nfts = [];
  if (text) {
    nfts = await prisma.nft.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text,
              mode: "insensitive",
            },
          },
          { artist: { fullName: { contains: text, mode: "insensitive" } } },
        ],
      },
      include: {
        collection: true,
        artist: true,
      },
    });
  } else {
    nfts = await prisma.nft.findMany({
      take: NFT_DEFAULT,
      include: {
        collection: true,
        artist: true,
      },
    });
  }

  const transformedNFts: NFTCardProps[] = [];
  nfts.map((nft) => {
    transformedNFts.push(parseNFTDropData(nft, nft.artist, nft.collection));
  });

  return transformedNFts;
};

const performCollectionSearch = async (text: string) => {
  console.log(`/api/browse: incoming Collection request`);
  let collections = [];
  if (text) {
    collections = await prisma.collection.findMany({
      where: {
        collectionName: {
          contains: text,
          mode: "insensitive",
        },
      },
      include: {
        nfts: true,
        artist: true,
      },
    });
  } else {
    collections = await prisma.collection.findMany({
      take: COLLECTION_DEFAULT,
      include: {
        nfts: true,
        artist: true,
      },
    });
  }

  const transformedCollections: EnhancedCollectionNFTCardType[] =
    collections.map((collection) => {
      const nftCards = collection.nfts.map((nft) =>
        parseNFTDropData(nft, collection.artist, collection)
      );
      return { collection: collection, nfts: nftCards };
    });

  return transformedCollections;
};

const performArtistSearch = async (text: string) => {
  console.log(`/api/browse: incoming Artist request`);
  let responseArtists: UserArtistResponse[] = [];
  if (text) {
    responseArtists = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: { contains: text, mode: "insensitive" },
          },
          { artist: { fullName: { contains: text, mode: "insensitive" } } },
        ],
      },
      include: {
        artist: true,
      },
    });
  } else {
    responseArtists = await prisma.user.findMany({
      take: ARTIST_DEFAULT,
      include: {
        artist: true,
      },
    });
  }

  // Filter out non-artists.
  const artists: UserArtist[] = [];
  responseArtists.forEach((responseArtist) => {
    if (isArtist(responseArtist)) {
      artists.push(<UserArtist>responseArtist);
    }
  });

  const transformedArtists: ArtistCardProps[] = [];
  artists.map((artist) => {
    transformedArtists.push(parseArtistData(artist));
  });
  return transformedArtists;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === httpGetMethodString()) {
    try {
      const { type, text } = req.query as { type: string; text: string };

      console.log(`Search for ${type} with entry ${text}`);
      const typeNum = Number(type);
      switch (typeNum) {
        case BrowseSearchType.NFT: {
          res.status(200).json(await performNFTSearch(text));
          break;
        }
        case BrowseSearchType.Collection: {
          res.status(200).json(await performCollectionSearch(text));
          break;
        }
        case BrowseSearchType.Artist: {
          res.status(200).json(await performArtistSearch(text));
          break;
        }
        default: {
          console.log(`Invalid search type in /api/browse`);
          res.status(400).end();
        }
      }
    } catch (err) {
      console.log(`Error in GET /api/browse: ${err}`);
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
};

export default handler;
