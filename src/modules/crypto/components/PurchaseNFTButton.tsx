import { useUser } from "@auth0/nextjs-auth0";
import { Dialog } from "@headlessui/react";
import { useMetaMask } from "metamask-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ButtonMedium } from "@common/components/Button";
import { CustomModal } from "@common/components/CustomModal";
import FlexLayout from "@common/components/FlexLayout";
import { updateNft } from "@common/utils/api";

import etherScan from "/public/images/etherscan.png";

import { ConnectMetaMaskButton } from "@modules/crypto/components/ConnectMetaMaskButton";
import { mintNFT } from "@modules/crypto/interact";
import { PurchaseNFTProps } from "@modules/crypto/types/PurchaseNFTProps";

export const PurchaseNFTButton = ({
  id,
  price,
  NFTName,
  NFTImage,
  artistName,
  pinataUrl,
}: PurchaseNFTProps) => {
  const { status } = useMetaMask();
  const [showModal, setShowModal] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [etherScanLink, setEtherScanLink] = useState("");
  const isConnected: boolean = status === "connected";

  if (!isPurchased) {
    return (
      <>
        <CustomModal display={setShowModal} showModal={showModal}>
          {isConnected ? (
            <PurchaseNFTModal
              id={id}
              price={price}
              NFTName={NFTName}
              NFTImage={NFTImage}
              artistName={artistName}
              pinataUrl={pinataUrl}
              setIsPurchased={setIsPurchased}
              setEtherScanLink={setEtherScanLink}
            />
          ) : (
            // <ButtonMedium onClick={connect}>Connect MetaMask 🦊</ButtonMedium>
            <ConnectMetaMaskButton />
          )}
        </CustomModal>
        <ButtonMedium className="font-light" onClick={() => setShowModal(true)}>
          Purchase NFT
        </ButtonMedium>
      </>
    );
  } else {
    return (
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
    );
  }
};

export const PurchaseNFTModal = ({
  id,
  price,
  NFTName,
  NFTImage,
  artistName,
  pinataUrl,
  setIsPurchased,
  setEtherScanLink,
}: PurchaseNFTProps) => {
  const { user } = useUser();
  const isSignedIn: boolean = user !== null && user !== undefined;

  if (!isSignedIn) {
    return (
      <FlexLayout direction="col">
        <Dialog.Title>Please sign in to purchase NFTs</Dialog.Title>
        <Link href="/api/auth/login" passHref>
          <a>
            <ButtonMedium className="font-light">Sign In</ButtonMedium>
          </a>
        </Link>
      </FlexLayout>
    );
  } else {
    return (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-2 text-3xl font-light">Purchase NFT</div>
          <p className="mb-5 text-sm font-light">
            Are you sure you want to purchase this NFT for {price} ETH?
          </p>
          <div className="flex flex-col rounded-lg justify-center flex-shrink-0 p-4 border-4 border-dark-gray">
            <div className="rounded-md">
              <Image
                src={NFTImage}
                objectFit="contain"
                className="overflow-hidden rounded"
                alt="NFT image."
                height="200"
                width="200"
              />
            </div>
            <div className="font-light text-md mb-[-8px]">{artistName}</div>
            <div className="text-lg font-bold">{NFTName} </div>
            <br></br>
            <ButtonMedium
              className="text-center flex flex-col"
              onClick={async () => {
                await handlePurchaseNFT(
                  id,
                  NFTImage,
                  NFTName,
                  price,
                  pinataUrl,
                  setEtherScanLink
                );
                //@ts-ignore
                setIsPurchased(true);
              }}
            >
              Purchase NFT for {price} ETH
            </ButtonMedium>
          </div>
        </div>
      </>
    );
  }
};

const handlePurchaseNFT = async (
  id: number,
  NFTImage: string,
  NFTName: string,
  price: number,
  pinataUrl: string | null,
  setEtherScanLink: any
) => {
  // First mint the NFT
  const { success, status, tokenHash, etherScanLink } = await mintNFT(
    NFTImage,
    NFTName,
    "A dope Backstage NFT",
    price,
    pinataUrl
  );
  console.log(NFTImage);
  console.log(`Success: ${success}`);
  console.log(`Status: ${status}`);

  // Second add the NFT to the User object in the DB if the purchase succeeded
  if (success) {
    console.log("YUHHHHH");
    if (etherScanLink) {
      updateNft(id, tokenHash, etherScanLink);
      setEtherScanLink(etherScanLink);
    }
  }
};

// Check that Metamask wallet is connected. Return an error message if it's not.
// Receive ETH from the User and transfer the NFT to their wallet.
// If the crypto code passes, then we should call a backend endpoint purchaseNFT that:
// Adds the NFT to the User object's list of NFTs in the database.
// Sets isPurchased field in the NFT schema to true.
// On the explore page, we should only display unpurchased NFTs (first sale).
