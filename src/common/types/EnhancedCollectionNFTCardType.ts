import { Collection } from "@prisma/client";

import NFTCardProps from "@common/types/NFTCardProps";

type EnhancedCollectionNFTCardType = {
  collection: Collection;
  nfts: NFTCardProps[];
};

export default EnhancedCollectionNFTCardType;
