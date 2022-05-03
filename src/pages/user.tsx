import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";


import FlexLayout from "@common/components/FlexLayout";
import Navbar from "@common/components/Navbar";
import NFTCardProps from "@common/types/NFTCardProps";
import { NavbarPage } from "@common/types/NavbarProps";
import { fetchUser } from "@common/utils/api";

import BrowseNFTDisplay from "@modules/browse/components/BrowseNFTDisplay";
import parseNFTDropData from "@modules/dataParsing/components/parseNFTArtistCollectionData";
import UserProfileSidebar from "@modules/userProfile/components/UserProfileSidebar";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [drops, setNfts] = useState<NFTCardProps[]>([]);
  const [isArtist, setIsArtist] = useState(false);
  const [artistId, setArtistId] = useState(0);

  useEffect(() => {
    const renderUser = async () => {
      const userAndNfts = await fetchUser();
      const user = userAndNfts.user;
      const nfts = userAndNfts.nfts;

      const drops: NFTCardProps[] = [];
      if (user) {
        nfts.forEach((nft) => {
          drops.push(parseNFTDropData(nft, nft.artist, nft.collection));
        });
        if (user.artist) {
          setArtistId(user?.artist.id);
        }
      }
      setIsArtist(Boolean(user.artist));
      setUser(user);
      setNfts(drops);
    };
    renderUser();
  }, []);

  return (
    <FlexLayout direction="col">
      <Navbar page={NavbarPage.User} background />
      {user !== null ? (
        <FlexLayout direction="row" className="">
          <UserProfileSidebar
            username={user.username}
            profileInfo={user.profileInfo}
            profilePhoto={user.profilePhoto}
            isArtist={isArtist}
            artistId={artistId}
          />
          <FlexLayout direction="col" className="flex-grow min-w-0 p-8">
            <h1 className="subtitle-big theme-underline-text">Tokens</h1>
            <BrowseNFTDisplay NFTs={drops} />
          </FlexLayout>
        </FlexLayout>
      ) : (
        <div className={`relative items-center flex-shrink-0 overflow-hidden`}>
          <FlexLayout
            direction="col"
            className="items-center w-full gap-20 px-8 mx-auto my-24 text-center text-white md:px-0 md:w-2/3 lg:my-64 drop-shadow-md"
          >
            <ClipLoader></ClipLoader>
          </FlexLayout>
        </div>
      )}
    </FlexLayout>
  );
};

export default UserPage;
