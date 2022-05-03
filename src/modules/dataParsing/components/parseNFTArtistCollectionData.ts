import { Nft, Tier, Collection, Artist } from "@prisma/client";

import NFTCardProps from "@common/types/NFTCardProps";
import NFTTier from "@common/types/NFTTier";

/* Function to map Tier enum to NFTTier object */
const tierMap = (tier: Tier): NFTTier => {
  if (tier == "PLATINUM") {
    return NFTTier.DIAMOND;
  }
  if (tier == "GOLD") {
    return NFTTier.GOLD;
  }
  if (tier == "SILVER") {
    return NFTTier.SILVER;
  } else {
    return NFTTier.BRONZE;
  }
};

/* Function to parse comma separated string of benefits into array of benefits */
const parseBenefits = (benefits: string): string[] => {
  return benefits.split(",");
};

const parseNFTDropData = (
  nft: Nft,
  artist: Artist,
  collection: Collection
): NFTCardProps => {
  return {
    id: nft.id,
    artistName: artist.fullName,
    artistProfileHeader: artist.profileHeader,
    NFTName: nft.title,
    NFTImage: nft.img,
    collectionName: collection.collectionName,
    price: nft.price,
    tier: tierMap(nft.tier),
    etherScanLink: nft.contractAddress,
    benefits: parseBenefits(artist.benefits),
    pinataUrl: nft.pinataUrl,
    ownerId: nft.ownerId,
  };
};

export default parseNFTDropData;
