import { Artist, Collection, Nft } from "@prisma/client";
import { GetServerSideProps } from "next";

import Banner from "@common/components/Banner";
import FlexLayout from "@common/components/FlexLayout";
import Navbar from "@common/components/Navbar";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";
import NFTCardProps from "@common/types/NFTCardProps";
import { NavbarPage } from "@common/types/NavbarProps";
import baseURL from "@common/utils/baseURL";

import parseNFTDropData from "@modules/dataParsing/components/parseNFTArtistCollectionData";
import StarProfileMainContent from "@modules/starProfile/components/StarProfileMainContent";
import StarProfileSidebar from "@modules/starProfile/components/StarProfileSidebar";
import StarProfilePageProps from "@modules/starProfile/types/StarProfilePageProps";

import concertPic from "/public/images/artist-concert.jpg";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const artist = context.params?.artist;
  const req = await fetch(`${baseURL}/api/artist/${artist}`);
  const data = await req.json();

  // Base Collection type does not include the NFT array due to some prisma BS.
  // Thus we need to create an array of the enhanced type to include the collection
  // Itself + all the NFTs associated with it.x
  const enhancedCollections: EnhancedCollectionNFTCardType[] = data.collections.map(
    (collection: { nfts: Nft[]; artist: Artist } & Collection) => {
      const transformedNFTs: NFTCardProps[] = [];
      collection.nfts.forEach((nft: Nft) => {
        const nftCard = parseNFTDropData(nft, data, collection);
        transformedNFTs.push(nftCard);
      });
      return {
        collection: collection,
        nfts: transformedNFTs,
      };
    }
  );
  return {
    props: {
      artist: data,
      collections: data.collections,
      nftCollections: enhancedCollections,
      followers: data._count.followers,
    },
  };
};

const StarProfilePage = ({
  artist,
  followers,
  collections,
  nftCollections,
}: StarProfilePageProps) => (
  <FlexLayout direction="col">
    <Navbar page={NavbarPage.Artist} background />
    <Banner
      height="h-64"
      imageSrc={concertPic}
      imageAlt="Singer standing on a stage at a concert in front of an audience."
      imageOrigin="center"
    ></Banner>
    <FlexLayout direction="row" className="">
      <StarProfileSidebar
        followers={followers}
        collections={collections}
        {...artist}
      />
      <StarProfileMainContent artist={artist} collections={nftCollections} />
    </FlexLayout>
  </FlexLayout>
);

export default StarProfilePage;
