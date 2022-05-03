import FlexLayout from "@common/components/FlexLayout";
import NFTCard from "@common/components/NFTCard";
import NFTCardProps from "@common/types/NFTCardProps";

const BrowseNFTDisplay = ({ NFTs }: { NFTs: NFTCardProps[] }) => (
  <FlexLayout direction="row" className="justify-center px-12 mt-12">
    <div className="grid gap-12 grid-cols-responsive">
      {NFTs?.map((data, i) => (
        <NFTCard {...data} key={i} />
      ))}
    </div>
  </FlexLayout>
);

export default BrowseNFTDisplay;
