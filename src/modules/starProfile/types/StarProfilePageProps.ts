import { Artist, Collection } from "@prisma/client";

import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";

type StarProfilePageProps = {
  collections: Array<Collection>;
  nftCollections: EnhancedCollectionNFTCardType[];
  followers: number;
  artist: Artist;
};

export default StarProfilePageProps;
