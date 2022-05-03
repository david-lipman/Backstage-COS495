import NFTTier from "../types/NFTTier";

const getNFTTierColor = (tier: NFTTier) => {
  switch (tier) {
    case NFTTier.BRONZE:
      return "border-bronze";
    case NFTTier.SILVER:
      return "border-silver";
    case NFTTier.GOLD:
      return "border-gold-tier";
    case NFTTier.DIAMOND:
      return "border-diamond";
  }
};

export default getNFTTierColor;
