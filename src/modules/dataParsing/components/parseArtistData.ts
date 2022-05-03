import ArtistCardProps from "@common/types/ArtistCardProps";

import { UserArtist } from "@modules/prisma/types/ArtistTypes";

const parseArtistData = (user: UserArtist): ArtistCardProps => {
  return {
    name: user.artist.fullName,
    profilePhoto: user.profilePhoto,
    profileHeader: user.artist.profileHeader,
    spotify: user.artist.spotify,
    userId: user.artist.userId,
  };
};

export default parseArtistData;
