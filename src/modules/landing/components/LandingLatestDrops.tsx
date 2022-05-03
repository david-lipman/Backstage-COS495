import CollectionGallery from "@common/components/CollectionGallery";
import NFTCardProps from "@common/types/NFTCardProps";

const LandingLatestDrops = ({ NFTs }: { NFTs: NFTCardProps[] }) => {
  return (
    <div
      id="browse"
      className="flex flex-col flex-grow-0 pr-0 my-12 bg-white text-dark-gray gap-y-16"
    >
      <h1 className="px-12 theme-underline-text title-big">Sneak Peak</h1>
      <CollectionGallery NFTs={NFTs} />
    </div>
  );
};

export default LandingLatestDrops;
