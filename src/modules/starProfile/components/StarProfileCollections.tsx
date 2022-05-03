import CollectionGallery from "@common/components/CollectionGallery";
import FlexLayout from "@common/components/FlexLayout";
import EnhancedCollectionNFTCardType from "@common/types/EnhancedCollectionNFTCardType";

const StarProfileCollections = ({
  collections,
}: {
  collections: EnhancedCollectionNFTCardType[];
}) => (
  <FlexLayout direction="col" className="gap-8 my-12">
    {collections.map((collectionEntry, i) => (
      <>
        <FlexLayout direction="col" className="gap-y-4" key={i}>
          <h2 className="mx-12 title-small">
            {collectionEntry.collection.collectionName}
          </h2>
          <CollectionGallery NFTs={collectionEntry.nfts} />
        </FlexLayout>
        {i !== collections.length - 1 ? (
          <hr className="mx-8 border-dark-gray" />
        ) : null}
      </>
    ))}
  </FlexLayout>
);

export default StarProfileCollections;
