import CompleteNFT from "@common/types/CompleteNft";
import SelectOptionsType from "@common/types/SelectOptionsType";

import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";

export type AdminProps = {
  artistOptions: SelectOptionsType;
  collectionMap: Map<string, number>;
  userAndNfts: {
    user: UserArtistResponse;
    nfts: CompleteNFT[];
  };
};

export type RegisterArtistProps = {
  userOptions: SelectOptionsType;
};
