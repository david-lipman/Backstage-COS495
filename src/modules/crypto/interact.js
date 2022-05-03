import { pinJSONToIPFS } from "./pinata.js";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contractABI = require("@modules/crypto/contract-abi.json");
// import web3 from "@alch/alchemy-web3";

// require("dotenv").config();
const alchemyKey =
  "https://eth-ropsten.alchemyapi.io/v2/p1XvjMDMoxQ5_OTjZZBY0qhW6Y1le8Ar";
const web3 = createAlchemyWeb3(alchemyKey);

// Mumbai (Polygon)
// const contractAddress = "0x192F7368E49BB46f9533184C4B852AD8Bb5D2948";

// Ropsten
const contractAddress = "0x11e7261d9AD22F41B964c9c36414dB9242896cd1";

export const connectWallet = async () => {
  console.log("Connect Wallet button pressed!");
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "You've successfully connected your MetaMask wallet!",
        address: addressArray[0],
      };
      console.log(addressArray[0]);
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Error: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Your MetaMask wallet is connected!",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Error: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (file, name, description, price, pinataUrl) => {
  //error handling
  if (file === null || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = new Object();
  const pinataContent = new Object();
  pinataContent.name = name;
  pinataContent.image = pinataUrl;
  pinataContent.description = description;
  const pinataMetadata = new Object();
  pinataMetadata.name = name + "-metadata";
  metadata.pinataMetadata = pinataMetadata;
  metadata.pinataContent = pinataContent;

  console.log(pinataUrl);
  console.log(pinataContent);
  console.log(metadata);

  //make pinata call to pin metadata
  const pinataMetaResponse = await pinJSONToIPFS(metadata);
  if (!pinataMetaResponse.success) {
    return {
      success: false,
      status:
        "Something went wrong while uploading your tokenURI. " +
        pinataMetaResponse.message,
    };
  }
  const tokenURI = pinataMetaResponse.metadataURL;

  // First convert price to Wei
  // console.log(price);
  price = web3.utils.toWei(String(price / 1000), "ether");
  console.log(price);
  // price = "0.001";
  // price = web3.utils.toWei(price, "milli");
  // console.log(`Price: ${price}`);

  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  //set up Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI, price)
      .encodeABI(), //make call to NFT smart contract
    value: price, //sends eth to recipient to buy NFT
  };

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "Check out your transaction on Etherscan: https://mumbai.polygonscan.com/tx/" +
        txHash,
      tokenHash: txHash,
      etherScanLink: "https://ropsten.etherscan.io/tx/" + txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};
