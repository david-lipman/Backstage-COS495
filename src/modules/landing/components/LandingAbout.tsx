import Image from "next/image";

import buyPic from "/public/images/buy.jpg";
import createPic from "/public/images/create.jpg";
import winPic from "/public/images/win.jpg";

import FlexLayout from "@common/components/FlexLayout";

type AboutBoxProps = {
  text: string;
  img?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  description?: string;
};

const AboutBox = ({ text, img, description }: AboutBoxProps) => (
  <FlexLayout direction="col" className="items-center justify-end w-80">
    <FlexLayout
      direction="col"
      className="items-center justify-end rounded-lg h-80 w-80"
    >
      <Image
        src={img}
        objectFit="fill"
        className="overflow-hidden rounded-lg"
        alt="NFT image"
      />
    </FlexLayout>
    <div className="mt-2 text-3xl font-light">{text}</div>
    <p className="mb-5 text-sm font-light">{description}</p>
  </FlexLayout>
);

const LandingAbout = () => (
  <div
    id="about"
    className="flex flex-col items-center p-12 text-center text-white bg-dark-gray gap-y-16"
  >
    <h1 className="theme-underline-text title-big">
      What&apos;s it all about?
    </h1>
    <FlexLayout
      direction="col"
      className="gap-16 md:flex-row place-content-center"
    >
      <AboutBox
        text="Stars Create"
        img={createPic}
        description="Stars mint NFT collections that share their story with their fans and act as fundraising tools"
      />
      <AboutBox
        text="Fans Buy"
        img={buyPic}
        description="Fans buy NFTs that serve as access tokens to private star-led communities and unique benefits"
      />
      <AboutBox
        text="Everyone Wins"
        img={winPic}
        description="When a star makes it big, fans' NFTs rise in value and everyone wins from the star's success"
      />
    </FlexLayout>
    <p className="mt-[-2.5rem]">
      By letting fans buy into their favorite artists&apos; success, they can
      help the creators they love succeed while sharing in that success.
    </p>
  </div>
);

export default LandingAbout;
