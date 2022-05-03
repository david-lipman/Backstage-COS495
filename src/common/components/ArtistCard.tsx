import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import FlexLayout from "@common/components/FlexLayout";
import ArtistCardProps from "@common/types/ArtistCardProps";
import baseUrl from "@common/utils/baseURL";

const ArtistCardBorder = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg">
      <div className="flex flex-col justify-between flex-shrink-0 p-4 border-8 rounded-lg w-72 border-dark-gray ">
        {children}
      </div>
    </div>
  );
};

const ArtistCard = ({ name, profileHeader, userId }: ArtistCardProps) => {
  return (
    <ArtistCardBorder>
      <Link href={`${baseUrl}/star/${userId}`} passHref>
        <div className="rounded-md hover:cursor-pointer">
          <FlexLayout direction="col" className="justify-around my-2">
            <Image
              src={profileHeader}
              objectFit="contain"
              className="overflow-hidden rounded"
              alt="Cover photo."
              height="1000"
              width="1000"
            />
            <a className="font-light text-lg mb-[-8px]">{name}</a>
          </FlexLayout>
        </div>
      </Link>
    </ArtistCardBorder>
  );
};

export default ArtistCard;
