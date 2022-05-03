import ArtistCardProps from "@common/types/ArtistCardProps";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";
import NFTCardProps from "@common/types/NFTCardProps";

// Helper function to check if type of search result is NFTCardProps[]
export const isNFTResults = (
  searchResults:
    | Array<NFTCardProps>
    | Array<ArtistCardProps>
    | Array<EnhancedCollectionNFTCardType>
): searchResults is Array<NFTCardProps> => {
  if (searchResults.length === 0) {
    return true;
  }
  return (searchResults as Array<NFTCardProps>)[0].NFTName !== undefined;
};

// Helper function to check if type of search result is EnhancedCollectionNFTCardType[]
export const isCollectionResults = (
  searchResults:
    | Array<NFTCardProps>
    | Array<ArtistCardProps>
    | Array<EnhancedCollectionNFTCardType>
): searchResults is Array<EnhancedCollectionNFTCardType> => {
  if (searchResults.length === 0) {
    return true;
  }
  return (
    (searchResults as Array<EnhancedCollectionNFTCardType>)[0].collection !==
    undefined
  );
};

// Helper function to check if type of search result is ArtistCardProps[]
export const isArtistResults = (
  searchResults:
    | Array<NFTCardProps>
    | Array<ArtistCardProps>
    | Array<EnhancedCollectionNFTCardType>
): searchResults is Array<ArtistCardProps> => {
  if (searchResults.length === 0) {
    return true;
  }
  return (searchResults as Array<ArtistCardProps>)[0].userId !== undefined;
};
