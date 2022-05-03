import NFTTier from "./NFTTier";

export type NFTCardChildProps = {
  id: number;
  artistName: string;
  artistProfileHeader: string;
  NFTName: string;
  NFTImage: string; // AWS link to hosted image
  collectionName: string;
  price: number;
  tier: NFTTier;
  etherScanLink: string;
  benefits: string[];
  pinataUrl: string | null;
  ownerId: number;
  flipFunction: () => void;
};

export type NFTCardBorderProps = {
  front: boolean;
  flipFunction: () => void;
};

// In practice, I think eventually we should be passing in a NFT ID of some sort, and then
// fetch this data from the backend
type NFTCardProps = {
  id: number;
  artistName: string;
  artistProfileHeader: string;
  NFTName: string;
  NFTImage: string; // AWS link to hosted image
  collectionName: string;
  price: number;
  tier: NFTTier;
  className?: string;
  etherScanLink: string;
  benefits: string[];
  ownerId: number;
  pinataUrl: string | null;
};

export default NFTCardProps;
