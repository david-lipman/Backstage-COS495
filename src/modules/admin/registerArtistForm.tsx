import { useUser } from "@auth0/nextjs-auth0";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";

import FlexLayout from "@common/components/FlexLayout";
import CompleteNFT from "@common/types/CompleteNft";
import { createArtist, fetchUser } from "@common/utils/api";
import baseUrl from "@common/utils/baseURL";

import { uploadFileRequest } from "@modules/fileHosting/utils/uploadFileRequest";
import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";

const RegisterArtistForm = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    // Upload image file to AWS
    setLoading(true);
    const finalData = data;
    if (data.profilePic) {
      const fileRequest = new FormData();
      fileRequest.append("profile", data.profilePic[0]);
      const newURL = await uploadFileRequest(fileRequest);
      finalData["profilePhoto"] = newURL.imageUrl as string;
      delete finalData.profilePic;
    }

    const fullName: string = finalData.name;
    const bioInfo: string = finalData.bio;
    const profileHeader: string = finalData["profilePhoto"];
    const twitter: string = finalData.twitter;
    // const instagram: string = finalData.instagram;
    // const spotify: string = finalData.spotify;
    const benefits: string = finalData.benefits;
    // const promoSong: string = finalData.promoSong;
    const collectionName: string = finalData.collection;

    // Submit artist registration.
    // Fetch User object to see if there's an associated artist
    const userAndNfts: {
      user: UserArtistResponse;
      nfts: CompleteNFT[];
    } = await fetchUser();
    const userId = userAndNfts.user.id;

    // Create artist first.
    await createArtist(
      userId,
      fullName,
      bioInfo,
      twitter,
      "",
      "",
      benefits,
      "",
      collectionName,
      profileHeader
    );
    setLoading(false);
    Router.push(`${baseUrl}/user`);
  };

  if (loading) {
    return <BounceLoader size="10vh" color="#485ed1" />;
  } else {
    return user !== undefined ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 text-3xl font-light">Name</div>
        <input
          type="text"
          placeholder="  e.g. Olivia Rodrigo"
          {...register("name")}
          className="block w-full text-dark-gray border-gray-300 rounded py-2"
          required
        />
        <div className="mt-2 text-3xl font-light">Profile Photo</div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          placeholder="Select a file from your computer"
          {...register("profilePic")}
          required
        />
        <div className="mt-2 text-3xl font-light">Bio</div>
        <input
          type="text"
          placeholder="  e.g. A rising star"
          {...register("bio")}
          className="block w-full text-dark-gray border-gray-300 rounded py-2"
          required
        />
        <div className="mt-2 text-3xl font-light">Twitter</div>
        <input
          type="text"
          placeholder="  e.g. @oliviarodrigo"
          {...register("twitter")}
          className="block w-full text-dark-gray border-gray-300 rounded py-2"
        />
        <div className="mt-2 text-3xl font-light">
          NFT Benefits (comma separated)
        </div>
        <input
          type="text"
          placeholder="  e.g. Exclusive Discord channel, Discounted merch"
          {...register("benefits")}
          className="block w-full text-dark-gray border-gray-300 rounded py-2"
        />
        <div className="mt-2 text-3xl font-light">NFT Collection Name</div>
        <input
          type="text"
          placeholder="  e.g. Sour"
          {...register("collection")}
          className="block w-full text-dark-gray border-gray-300 rounded py-2"
        />
        <br></br>
        <FlexLayout direction="row" className="justify-center">
          <input
            type="submit"
            className="px-4 py-2 text-sm inline-flex items-center rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          />
        </FlexLayout>
        <br></br>
      </form>
    ) : (
      <div>Please sign in with auth0 before registering as an Artist</div>
    );
  }
};

export default RegisterArtistForm;
