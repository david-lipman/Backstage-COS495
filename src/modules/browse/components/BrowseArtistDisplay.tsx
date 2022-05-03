import ArtistCard from "@common/components/ArtistCard";
import FlexLayout from "@common/components/FlexLayout";
import ArtistCardProps from "@common/types/ArtistCardProps";

const BrowseArtistDisplay = ({ artists }: { artists: ArtistCardProps[] }) => (
  <FlexLayout direction="row" className="justify-center px-12 mt-12">
    <div className="grid gap-12 grid-cols-responsive">
      {artists?.map((data, i) => (
        <ArtistCard {...data} key={i} />
      ))}
    </div>
  </FlexLayout>
);

export default BrowseArtistDisplay;
