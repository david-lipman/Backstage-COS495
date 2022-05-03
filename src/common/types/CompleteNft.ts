import { Nft, Artist, Collection } from "@prisma/client";

type CompleteNFT = Nft & {
  artist: Artist;
  collection: Collection;
};

export default CompleteNFT;
