import Image from "next/image";

import BackstageLogo from "/public/images/backstage-logo.svg";

import FlexLayout from "@common/components/FlexLayout";

import RegisterArtistForm from "@modules/admin/registerArtistForm";

const RegisterArtist = () => {
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
      <h1 className="theme-underline-text title-big">Register as an Artist</h1>
      <RegisterArtistForm></RegisterArtistForm>
    </FlexLayout>
  );
};

export default RegisterArtist;
