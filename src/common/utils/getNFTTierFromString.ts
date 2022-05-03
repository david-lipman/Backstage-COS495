import { Tier } from "@prisma/client";

const getNFTTierFromString = (tier: string) => {
  switch (tier) {
    case "BRONZE":
      return Tier.BRONZE;
    case "SILVER":
      return Tier.SILVER;
    case "GOLD":
      return Tier.GOLD;
    case "PLATINUM":
      return Tier.PLATINUM;
  }

  return Tier.SILVER;
};

export default getNFTTierFromString;
