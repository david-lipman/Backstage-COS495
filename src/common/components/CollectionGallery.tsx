import FlexLayout from "@common/components/FlexLayout";
import NFTCard from "@common/components/NFTCard";
import NFTCardProps from "@common/types/NFTCardProps";

const CollectionGallery = ({ NFTs }: { NFTs: NFTCardProps[] }) => (
  <FlexLayout
    direction="row"
    className="items-start gap-12 px-12 overflow-auto scrollbar-hide"
  >
    {NFTs?.map((data, i) => (
      <NFTCard {...data} key={i} />
    ))}
    {/* Maintains spacing for last element*/}
    <div className="flex-shrink-0 w-1 h-1"></div>
  </FlexLayout>
);

export default CollectionGallery;
