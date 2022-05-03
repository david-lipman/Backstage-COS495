import FlexLayout from "@common/components/FlexLayout";
import Footer from "@common/components/Footer";
import NFTCardProps from "@common/types/NFTCardProps";

import LandingAbout from "@modules/landing/components/LandingAbout";
import LandingBanner from "@modules/landing/components/LandingBanner";
import LandingFAQ from "@modules/landing/components/LandingFAQ";
import LandingLatestDrops from "@modules/landing/components/LandingLatestDrops";
import fetchLandingNFTs from "@modules/landing/utils/fetchLandingNFTs";

const LandingPage = ({ NFTs }: { NFTs: NFTCardProps[] }) => (
  <FlexLayout direction="col">
    <LandingBanner />
    <LandingAbout />
    <LandingLatestDrops NFTs={NFTs} />
    <LandingFAQ />
    <Footer />
  </FlexLayout>
);

export const getStaticProps = async () => {
  const NFTs: NFTCardProps[] = await fetchLandingNFTs();
  return {
    props: { NFTs }, // will be passed to the page component as props
  };
};

export default LandingPage;
