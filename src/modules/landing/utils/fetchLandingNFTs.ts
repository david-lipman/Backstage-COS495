import {
  LANDING_PAGE_ARTIST_USERNAMES,
  LANDING_PAGE_NFT_COUNT,
} from "./LandingPageConstants";

import CompleteNFT from "@common/types/CompleteNft";
import NFTCardProps from "@common/types/NFTCardProps";

import parseNFTDropData from "@modules/dataParsing/components/parseNFTArtistCollectionData";
import prisma from "@modules/prisma/utils/client";

const fetchLandingNFTs = async (): Promise<NFTCardProps[]> => {
  try {
    const nfts: CompleteNFT[] = await prisma.nft.findMany({
      where: {
        artist: {
          user: {
            username: { in: LANDING_PAGE_ARTIST_USERNAMES },
          },
        },
      },
      include: { artist: true, collection: true },
      take: LANDING_PAGE_NFT_COUNT,
    });

    const drops: NFTCardProps[] = [];
    nfts.forEach((nft) => {
      drops.push(parseNFTDropData(nft, nft.artist, nft.collection));
    });
    return drops;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchLandingNFTs;
