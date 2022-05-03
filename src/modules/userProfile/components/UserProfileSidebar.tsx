import Image from "next/image";
import Link from "next/link";

import FlexLayout from "@common/components/FlexLayout";
import baseUrl from "@common/utils/baseURL";

const UserProfileSidebar = ({
  username,
  profilePhoto,
  profileInfo,
  isArtist,
  artistId,
}: {
  username: string;
  profilePhoto: string;
  profileInfo: string;
  isArtist: boolean;
  artistId: number;
}) => (
  <FlexLayout
    direction="col"
    className="relative flex-shrink-0 gap-8 p-12 border-r border-black w-96"
  >
    <div className="relative mx-auto w-52 h-52">
      <Image
        className="rounded-full"
        src={profilePhoto}
        layout="fill"
        objectFit="cover"
        alt=""
      />
    </div>
    <div className="mt-2 text-3xl font-light">{username}</div>
    {isArtist ? (
      <div className="hidden my-auto cursor-pointer md:inline">
        <Link href={`${baseUrl}/star/${artistId}`} passHref>
          <button className="px-4 py-2 text-sm inline-flex items-center rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Artist Profile
          </button>
        </Link>
      </div>
    ) : (
      <div></div>
    )}
    <hr className="theme-underline-border" />
    <h2 className="subtitle-small">Bio</h2>
    <p>{profileInfo}</p>
  </FlexLayout>
);

export default UserProfileSidebar;
