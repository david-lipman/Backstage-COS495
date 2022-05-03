import Image from "next/image";
import { useEffect, useState } from "react";

import FlexLayout from "@common/components/FlexLayout";
import { fetchUser } from "@common/utils/api";

import MintForm from "@modules/admin/mintForm";
import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";

import BackstageLogo from "/public/images/backstage-logo.svg";

const Admin = () => {
  const [userArtist, setUserArtist] = useState<UserArtistResponse | null>(null);
  const [isArtist, setIsArtist] = useState(true);

  useEffect(() => {
    const checkArtist = async () => {
      const userAndNfts = await fetchUser();
      setIsArtist(Boolean(userAndNfts.user.artist));
      setUserArtist(userAndNfts.user);
    };
    checkArtist();
  }, []);

  return (
    <FlexLayout
      direction="col"
      className="items-center justify-center h-screen gap-8 text-white bg-dark-gray"
    >
      <Image
        src={BackstageLogo}
        width={128}
        height={128}
        alt="Backstage logo."
      />
      {isArtist ? (
        <div>
          <h1 className="theme-underline-text title-big">Mint your NFT</h1>
          <br></br>
          <MintForm userArtist={userArtist}></MintForm>
        </div>
      ) : (
        <div>Only artists are allowed to mint NFTs. Register first.</div>
      )}
    </FlexLayout>
  );
};

export default Admin;
