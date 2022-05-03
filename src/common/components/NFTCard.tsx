import { ReplyIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { FC, useState } from "react";
import ReactCardFlip from "react-card-flip";

import etherScan from "/public/images/etherscan.png";

import NFTCardProps, {
  NFTCardBorderProps,
  NFTCardChildProps,
} from "../types/NFTCardProps";
import getNFTTierColor from "../utils/getNFTTierColor";

import FlexLayout from "./FlexLayout";

import { PurchaseNFTButton } from "@modules/crypto/components/PurchaseNFTButton";

const NFTCardBorder: FC<NFTCardBorderProps> = ({
  children,
  front,
  flipFunction,
}) => {
  return (
    <div className="rounded-lg">
      <div
        className={`flex flex-col rounded-lg justify-between flex-shrink-0 w-72 p-4 border-8 border-dark-gray ${
          front ? "cursor-pointer" : ""
        }`}
        onClick={front ? flipFunction : undefined}
      >
        {children}
      </div>
    </div>
  );
};

const NFTFrontCard = ({
  artistName,
  NFTName,
  NFTImage,
  collectionName,
  price,
  tier,
  flipFunction,
}: NFTCardChildProps) => {
  const tierColor = getNFTTierColor(tier);

  return (
    <NFTCardBorder flipFunction={flipFunction} front>
      <>
        <div className="rounded-md">
          <Image
            src={NFTImage}
            objectFit="contain"
            className="overflow-hidden rounded"
            alt="NFT image."
            height="1000"
            width="1000"
          />
        </div>
        <FlexLayout direction="col" className="justify-around my-2">
          <div className="font-light text-md mb-[-8px]">{artistName}</div>
          <div className="text-lg font-bold">{NFTName} </div>
          <div className="font-light text-sm mt-[-8px]">{collectionName}</div>
        </FlexLayout>
        <div className="font-light text-dark-gray">
          <hr className={`border-8 ${tierColor}`} />
          <FlexLayout direction="row" className="justify-between">
            <div>
              <span>Price: </span>
              <span>{price + " ETH"}</span>
            </div>
          </FlexLayout>
        </div>
      </>
    </NFTCardBorder>
  );
};

const NFTBackCard = ({
  id,
  benefits,
  etherScanLink,
  price,
  NFTName,
  NFTImage,
  artistName,
  /* NFTName, */
  pinataUrl,
  ownerId,
  flipFunction,
}: NFTCardChildProps) => {
  return (
    <NFTCardBorder flipFunction={flipFunction} front={false}>
      <>
        <div className="justify-start">
          <div className="flex flex-row pb-1 place-content-between">
            <div className="text-2xl text-underline">Benefits</div>
            <ReplyIcon
              className="w-6 h-6 my-auto cursor-pointer"
              onClick={flipFunction}
            />
          </div>
          <ul
            role="list"
            className="text-lg font-light divide-y divide-dark-gray"
          >
            {benefits.map((curBen, i) => (
              <li className="mb-2" key={i}>
                {curBen}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 p-2 mx-auto border border-purple-700 rounded-md cursor-pointer">
          <FlexLayout direction="col" className="items-center">
            <a>
              {ownerId === 1 ? (
                <PurchaseNFTButton
                  id={id}
                  price={price}
                  NFTName={NFTName}
                  NFTImage={NFTImage}
                  artistName={artistName}
                  pinataUrl={pinataUrl}
                />
              ) : (
                <FlexLayout direction="col">
                  <span>Purchased:</span>
                  <a href={etherScanLink}>
                    <Image
                      src={etherScan}
                      className="overflow-hidden rounded"
                      alt="Etherscan button."
                    />
                  </a>
                </FlexLayout>
              )}
            </a>
          </FlexLayout>
        </div>
      </>
    </NFTCardBorder>
  );
};

const NFTCard = (data: NFTCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <NFTFrontCard {...data} flipFunction={flip} />
        <NFTBackCard {...data} flipFunction={flip} />
      </ReactCardFlip>
    </div>
  );
};

export default NFTCard;
