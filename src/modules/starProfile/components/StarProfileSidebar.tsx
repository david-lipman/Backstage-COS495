import Link from "next/link";
import { useState, useEffect } from "react";

import FlexLayout from "@common/components/FlexLayout";
import { fetchUser } from "@common/utils/api";
import baseUrl from "@common/utils/baseURL";

import StarProfileSidebarProps from "@modules/starProfile/types/StarProfileSidebarProps";

const StarProfileSidebar = ({
  followers,
  collections,
  fullName,
  twitter,
  bioInfo,
  benefits,
  userId,
}: StarProfileSidebarProps) => {
  const [activeUserId, setActiveUserId] = useState(0);

  useEffect(() => {
    const renderUser = async () => {
      const userAndNfts = await fetchUser();
      const user = userAndNfts.user;

      if (user) {
        setActiveUserId(user.id);
      }
    };
    renderUser();
  }, []);

  return (
    <FlexLayout
      direction="col"
      className="flex-shrink-0 gap-8 p-12 text-white w-96 bg-dark-gray"
    >
      <h1 className="title-big">{fullName}</h1>
      <h2 className="subtitle-small">
        {twitter !== "" ? twitter : "No Twitter Found"}
      </h2>
      {activeUserId === userId ? (
        <div className="hidden my-auto cursor-pointer md:inline">
          <Link href={`${baseUrl}/admin`} passHref>
            <button className="px-4 py-2 text-sm inline-flex items-center rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Mint NFTs
            </button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      <hr className="theme-underline-border" />
      <FlexLayout direction="row" className="justify-between">
        <FlexLayout direction="col" className="items-center">
          <h1 className="title-small">{collections?.length}</h1>
          <h2 className="subtitle-small">Collections</h2>
        </FlexLayout>
        <FlexLayout direction="col" className="items-center">
          <h1 className="title-small">{followers}</h1>
          <h2 className="subtitle-small">Fans</h2>
        </FlexLayout>
      </FlexLayout>
      <hr className="theme-underline-border" />
      <h2 className="subtitle-small">Bio</h2>
      <p>{bioInfo}</p>
      <hr className="theme-underline-border" />
      <h2 className="subtitle-small">Benefits</h2>
      <p>{benefits}</p>
      <hr className="theme-underline-border" />
      <h2 className="subtitle-small">Community</h2>
      <FlexLayout direction="row" className="gap-4">
        <div className="w-16 h-16 border border-white rounded-md"></div>
        <div className="w-16 h-16 border border-white rounded-md"></div>
        <div className="w-16 h-16 border border-white rounded-md"></div>
      </FlexLayout>
    </FlexLayout>
  );
};

export default StarProfileSidebar;
