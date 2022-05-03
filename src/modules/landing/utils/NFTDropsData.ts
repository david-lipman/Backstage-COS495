import brickPic from "/public/images/AHJ_Bricks_Narrow.jpg";
import guitarPic from "/public/images/AHJ_Guitar.jpg";
import jacketPic from "/public/images/AHJ_Jacket.jpg";
import riverPic from "/public/images/AHJ_Riverside.jpg";

import NFTTier from "@common/types/NFTTier";

const NFTDropsData = [
  {
    artistName: "Anson Jones",
    NFTName: "Melody",
    NFTImage: guitarPic,
    collectionName: "Anson Jones - Breakout",
    price: 0.2,
    totalIssued: 5,
    availableCount: 0,
    tier: NFTTier.DIAMOND,
    etherScanLink:
      "https://ropsten.etherscan.io/tx/0x380cfd1c63ec118c43ff5f49dfee90d509892619a6ede137a72018d74df94625",
    benefits: [
      "Access to Discord community",
      "Personalized commemoration",
      "Invitation to IG lives",
      "IG follow and shoutout",
      "VIP lounge access",
    ],
  },
  {
    artistName: "Anson Jones",
    NFTName: "Insight",
    NFTImage: jacketPic,
    collectionName: "Anson Jones - Breakout",
    price: 0.1,
    totalIssued: 20,
    availableCount: 0,
    tier: NFTTier.GOLD,
    etherScanLink:
      "https://ropsten.etherscan.io/tx/0xf332bbd87b67a7c45a108fd2583389c2b1905ed276022ddb0afa02224c416fbf",
    benefits: [
      "Access to Discord community",
      "Personalized commemoration",
      "Invitation to IG lives",
    ],
  },
  {
    artistName: "Anson Jones",
    NFTName: "Spontaneity",
    NFTImage: riverPic,
    collectionName: "Anson Jones - Breakout",
    price: 0.05,
    totalIssued: 50,
    availableCount: 0,
    tier: NFTTier.SILVER,
    etherScanLink:
      "https://ropsten.etherscan.io/tx/0xc4bd1584e8d4f8e8fc3765f0beac53b6dfdf886dc58f3f51c5ec403eff5ff99a",
    benefits: ["Access to Discord community", "Personalized commemoration"],
  },
  {
    artistName: "Anson Jones",
    NFTName: "Perception",
    NFTImage: brickPic,
    collectionName: "Anson Jones - Breakout",
    price: 0.025,
    totalIssued: 100,
    availableCount: 0,
    tier: NFTTier.BRONZE,
    etherScanLink:
      "https://ropsten.etherscan.io/tx/0xb9c1328c6f0375a9e7f56a931f3e27d5f88fefff6ca4bbf99de73db14cb31fbb",
    benefits: ["Access to Discord community"],
  },
];

export default NFTDropsData;
