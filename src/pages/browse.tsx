import { useEffect, useState } from "react";

import Banner from "@common/components/Banner";
import FlexLayout from "@common/components/FlexLayout";
import Navbar from "@common/components/Navbar";

import concertPic from "/public/images/artist-concert.jpg";

import ArtistCardProps from "@common/types/ArtistCardProps";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";
import NFTCardProps from "@common/types/NFTCardProps";
import { NavbarPage } from "@common/types/NavbarProps";
import { fetchBrowseQuery } from "@common/utils/api";

import BrowseArtistDisplay from "@modules/browse/components/BrowseArtistDisplay";
import BrowseNFTDisplay from "@modules/browse/components/BrowseNFTDisplay";
import BrowseSearchBar from "@modules/browse/components/BrowseSearchBar";
import BrowseSearchType from "@modules/browse/types/BrowseSearchType";
import {
  isNFTResults,
  isCollectionResults,
  isArtistResults,
} from "@modules/browse/utils/checkSearchResultType";
import StarProfileCollections from "@modules/starProfile/components/StarProfileCollections";

const BrowsePage = () => {
  const [searchType, setSearchType] = useState<BrowseSearchType>(
    BrowseSearchType.NFT
  );
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    | Array<NFTCardProps>
    | Array<ArtistCardProps>
    | Array<EnhancedCollectionNFTCardType>
  >([]);

  const switchSearchType = (newType: BrowseSearchType) => {
    setSearchType(newType);
  };

  const updateSearchText = (newText: string) => {
    setSearchText(newText); // Ensure always a string.
  };

  useEffect(() => {
    const performSearch = async () => {
      const results = await fetchBrowseQuery(searchType, searchText);
      setSearchResults(results);
    };
    performSearch();
  }, [searchType, searchText]);

  return (
    <FlexLayout direction="col">
      <Navbar page={NavbarPage.Browse} background />
      <Banner
        height="h-64"
        imageSrc={concertPic}
        imageAlt="Singer standing on a stage at a concert in front of an audience."
        imageOrigin="center"
      >
        <BrowseSearchBar
          setText={updateSearchText}
          setType={switchSearchType}
          searchText={searchText}
          searchType={searchType}
        />
      </Banner>
      {searchType == BrowseSearchType.NFT && isNFTResults(searchResults) && (
        <BrowseNFTDisplay NFTs={searchResults} />
      )}
      {searchType == BrowseSearchType.Artist &&
        isArtistResults(searchResults) && (
          <BrowseArtistDisplay artists={searchResults} />
        )}
      {searchType == BrowseSearchType.Collection &&
        isCollectionResults(searchResults) && (
          <StarProfileCollections collections={searchResults} />
        )}
    </FlexLayout>
  );
};

export default BrowsePage;
