import { Dispatch, SetStateAction } from "react";

export type PurchaseNFTProps = {
  id: number;
  price: number;
  NFTName: string;
  NFTImage: string;
  artistName: string;
  pinataUrl: string | null;
  setIsPurchased?: Dispatch<SetStateAction<boolean>>;
  setEtherScanLink?: Dispatch<SetStateAction<string>>;
};
