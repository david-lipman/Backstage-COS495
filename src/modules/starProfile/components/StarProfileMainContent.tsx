import { Artist } from "@prisma/client";
import { useState } from "react";

import StarProfileMainContentTab from "../types/StarProfileMainContentTab";

import StarProfileCollections from "./StarProfileCollections";
import StarProfileStory from "./StarProfileStory";

import FlexLayout from "@common/components/FlexLayout";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";

const StarProfileMainContent = ({
  artist,
  collections,
}: {
  collections: EnhancedCollectionNFTCardType[];
  artist: Artist;
}) => {
  const [tab, setTab] = useState<StarProfileMainContentTab>(
    StarProfileMainContentTab.STORY
  );

  const tabData = [
    { text: "My Story", value: StarProfileMainContentTab.STORY },
    { text: "Collections", value: StarProfileMainContentTab.COLLECTIONS },
  ];

  let mainContent = null;
  switch (tab) {
    case StarProfileMainContentTab.STORY:
      mainContent = <StarProfileStory {...artist} />;
      break;
    case StarProfileMainContentTab.COLLECTIONS:
      mainContent = <StarProfileCollections collections={collections} />;
      break;
  }

  return (
    <FlexLayout direction="col" className="flex-grow min-w-0 bg-white">
      <FlexLayout
        direction="row"
        className="justify-around gap-2 p-2 text-center border-b border-dark-gray"
      >
        {tabData.map(({ text, value }) => {
          return (
            <button
              className={`box-content flex-grow py-6 rounded-lg hover:bg-gray-100`}
              key={value}
              onClick={() => setTab(value)}
            >
              <h2
                className={`subtitle-small ${
                  tab === value ? "theme-underline-text" : ""
                }`}
              >
                {text}
              </h2>
            </button>
          );
        })}
      </FlexLayout>
      {mainContent}
    </FlexLayout>
  );
};

export default StarProfileMainContent;
