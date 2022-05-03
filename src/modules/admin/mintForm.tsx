import { FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { Tier } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";

import { CustomModal } from "@common/components/CustomModal";
import FlexLayout from "@common/components/FlexLayout";
import { createNft } from "@common/utils/api";
import baseUrl from "@common/utils/baseURL";

import { pinFiletoIPFS } from "@modules/crypto/pinata.js";
import { uploadNftRequest } from "@modules/fileHosting/utils/uploadFileRequest";
import { UserArtistResponse } from "@modules/prisma/types/ArtistTypes";

const MintForm = ({
  userArtist,
}: {
  userArtist: UserArtistResponse | null;
}) => {
  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [artistName, setArtistName] = useState("");
  const [nftName, setNftName] = useState("");

  const onSubmit = async (data: any) => {
    if (userArtist === null || userArtist.artist === null) {
      return;
    }
    // Upload image file to AWS
    setLoading(true);
    const finalData = data;
    if (data.photoUpload) {
      const fileRequest = new FormData();
      fileRequest.append("profile", data.photoUpload[0]);
      console.log(data.photoUpload[0]);
      const newURL = await uploadNftRequest(fileRequest);
      finalData["profilePhoto"] = newURL.imageUrl as string;
      // delete finalData.photoUpload;
    }
    const img: string = finalData.profilePhoto;
    setImageUrl(img);

    // Set tokenId to random string
    const tokenId: string =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const title: string = finalData.name;
    setNftName(title);
    const artistId = userArtist.artist.id;
    setArtistName(userArtist.artist.fullName);
    const price = Number(finalData.price);
    const collectionId = Number(userArtist.artist.defaultCollectionId);
    const tier: Tier = finalData.tier;
    const contractAddress = "";

    // Upload Image file to Pinata
    const pinataAssetResponse = await pinFiletoIPFS(
      data.photoUpload[0],
      data.photoUpload[0].name
    );

    if (pinataAssetResponse.success) {
      // get Pinata asset URL
      const pinataUrl: string = pinataAssetResponse.assetURL;

      // Upload NFT to database
      createNft(
        img,
        tokenId,
        title,
        artistId,
        price,
        collectionId,
        tier,
        contractAddress,
        pinataUrl
      );
      reset({
        photoUpload: null,
        name: "",
        description: "",
        price: 0,
        tier: Tier.PLATINUM,
      });
      setLoading(false);
      setMintSuccess(true);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto my-auto lg:col-span-9">
        <BounceLoader size="10vh" color="#485ed1" />
      </div>
    );
  } else {
    return (
      <FlexLayout direction="col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 text-3xl font-light">Asset Image</div>
          <input
            type="file"
            placeholder="Select a file from your computer"
            accept="image/png, image/gif, image/jpeg"
            {...register("photoUpload")}
            required
          />
          <div className="mt-2 text-3xl font-light">Name</div>
          <input
            type="text"
            placeholder="  e.g. Lil Nas X - MONTERO"
            {...register("name")}
            className="block w-full text-dark-gray border-gray-300 rounded py-2"
            required
          />
          <div className="mt-2 text-3xl font-light">Description</div>
          <input
            type="text"
            placeholder="  e.g. Lil Nas X's 1st NFT"
            {...register("description")}
            className="block w-full text-dark-gray border-gray-300 rounded py-2"
            required
          />
          <div className="mt-2 text-3xl font-light">Price (in ETH)</div>
          <input
            type="number"
            step="0.001"
            placeholder="  e.g. 0.5 (in ETH)"
            {...register("price")}
            className="block w-full text-dark-gray border-gray-300 rounded py-2"
            required
          />
          <div className="mt-2 text-3xl font-light">Tier</div>
          <FormLabel id="tier" hidden>
            Tier
          </FormLabel>
          <RadioGroup
            id="tier"
            aria-labelledby="tier"
            defaultValue={Tier.PLATINUM}
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              {...register("tier")}
              value={Tier.BRONZE}
              control={<Radio />}
              label="Bronze"
            />
            <FormControlLabel
              {...register("tier")}
              value={Tier.SILVER}
              control={<Radio />}
              label="Silver"
            />
            <FormControlLabel
              {...register("tier")}
              value={Tier.GOLD}
              control={<Radio />}
              label="Gold"
            />
            <FormControlLabel
              {...register("tier")}
              value={Tier.PLATINUM}
              control={<Radio />}
              label="Platinum"
            />
          </RadioGroup>
          <br></br>
          <FlexLayout direction="row" className="justify-center">
            <CustomModal display={setMintSuccess} showModal={mintSuccess}>
              <div className="flex flex-col justify-center items-center">
                <div className="mt-2 text-3xl font-light">
                  Your NFT was successfully minted!
                </div>
                <br></br>
                <div className="flex flex-col rounded-lg justify-center flex-shrink-0 p-4 border-4 border-dark-gray">
                  <div className="rounded-md">
                    <Image
                      src={imageUrl}
                      objectFit="contain"
                      className="overflow-hidden rounded"
                      alt="NFT image."
                      height="200"
                      width="200"
                    />
                  </div>
                  <div className="font-light text-md mb-[-8px]">
                    {artistName}
                  </div>
                  <div className="text-lg font-bold">{nftName} </div>
                  <br></br>
                </div>
                <div className="mt-2 text-3xl font-light">
                  Check it out on the{" "}
                  {
                    <a href={`${baseUrl}/browse`}>
                      <span className="text-blue-600/100 underline">
                        browse page
                      </span>
                    </a>
                  }
                </div>
                <br></br>
              </div>
            </CustomModal>
            <FlexLayout direction="row" className="justify-center gap-8">
              <input
                type="submit"
                className="px-4 py-2 text-sm inline-flex items-center rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              />
              {/* <a href={`${baseUrl}/user`}>
                <ReplyIcon className="h-6 w-6"></ReplyIcon>
              </a> */}
            </FlexLayout>
          </FlexLayout>
        </form>
      </FlexLayout>
    );
  }
};

export default MintForm;
