/**
 * This file is for seeding the database upon a reset of the schema.
 * If mandatory fields have been added to or removed from the User, Artist, Collection, or NFT tables,
 * review the seed script and update these modified fields accordingly.
 * To run the Prisma seed script, run "yarn prisma db seed"
 */

import { PrismaClient, Tier } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        username: "anson-jones",
        fullName: "Anson Jones",
        email: `anson@princeton.edu`,
        profileInfo: "AnsonIsCool",
        profilePhoto: "https://d17iuxf4c4gu6d.cloudfront.net/default_pfp.png",
      },
      {
        username: "shere-khan",
        fullName: "Shere Khan",
        email: `shere@princeton.edu`,
        profileInfo: "ShereKhanYo",
        profilePhoto: "https://d17iuxf4c4gu6d.cloudfront.net/default_pfp.png",
      },
      {
        username: "adam-ziff",
        fullName: "DJ Ziff",
        email: `adam@princeton.edu`,
        profileInfo: "DJ ZIFF",
        profilePhoto: "https://d17iuxf4c4gu6d.cloudfront.net/default_pfp.png",
      },
      {
        username: "two-friends-music",
        fullName: "Two Friends",
        email: `twofriends@gmail.com`,
        profileInfo: "Two Friends Music",
        profilePhoto: "https://d17iuxf4c4gu6d.cloudfront.net/default_pfp.png",
      },
    ],
  });

  await prisma.artist.createMany({
    data: [
      {
        fullName: "Anson Jones",
        bioInfo:
          "Anson Jones is an NYC-based singer, songwriter, and composer. Her background is in jazz, but her music traverses rock, RnB, folk, and everything in between. She has won 6 Downbeat Magazine Student Music Awards through Junior High and High School in both Jazz and Pop/Rock Blues solo categories, has played in showcases like the New York Songwriter’s Circle and the 5PM Concert Series, sung a set with Nicole Zuraitis at the 2020 Litchfield Jazz Festival, and this year she is taking part in the Women in Jazz Organization mentorship program with Vanisha Gould. Anson is studying music with a focus on composition at Princeton University with minors in architecture, cognitive science and computer science, and when not making music, she is pursuing her love of design and visual arts.",
        profileHeader: "https://d17iuxf4c4gu6d.cloudfront.net/AHJ_Jacket.jpg",
        twitter: "@Anson-Jones",
        instagram: "@ansonjonesmusic",
        spotify:
          "https://open.spotify.com/artist/3xT97ey0BVfOXbVwm17s0s?si=UFYb2mbdRBq2Az61JNo_XQ",
        benefits:
          "Access to exclusive Discord community, Instagram follow, Exclusive AMA",
        promoSong:
          "https://open.spotify.com/track/5pJJtlDTJS8yyXwyIwkFC2?si=c95a7a438e4d4dba",
        userId: 1,
        defaultCollectionId: 1,
      },
      {
        fullName: "Shere Khan",
        bioInfo:
          "Shere Khan is, first and foremost, a family. We are co-ed a cappella group who connect, grow, and share through pop and contemporary music. Our members are involved in a wide range of extracurricular activities and academic disciplines but we all share a deep love and passion for music and for one another. We have travelled and performed across the globe, recently going to Puerto Rico, the Bahamas, and Panama. We are committed to creating a caring, inclusive, and fun environment in the rehearsal room and beyond.",
        profileHeader: "https://d17iuxf4c4gu6d.cloudfront.net/SKLogo.jpg",
        twitter: "@sherekhanprinceton",
        instagram: "@sherekhanprinceton",
        spotify:
          "https://open.spotify.com/artist/4klum4zs6ZKuSCNpkEnm4G?si=1CscySGTTqy4WvdGAKn9gw",
        benefits:
          "Discord access, Early merch drops, Shoutout at our next sing",
        promoSong:
          "https://open.spotify.com/track/5uBnYkTxGRMpHhiLkZv9WD?si=f5025dcbfb3c4fea",
        userId: 2,
        defaultCollectionId: 2,
      },
      {
        fullName: "DJ Ziff",
        bioInfo: "DJ Ziff is the Creator of Cove Creek mix",
        profileHeader: "https://d17iuxf4c4gu6d.cloudfront.net/dj_ziff.jpeg",
        twitter: "@dj-ziff",
        instagram: "@dj.ziff",
        spotify:
          "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x?si=zLLasEYOSgep2Fxmn2t89A",
        benefits:
          "Shoutout in the next cove creek, Dinner with me, Exclusive groupme",
        promoSong:
          "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x?si=zLLasEYOSgep2Fxmn2t89A",
        userId: 3,
        defaultCollectionId: 3,
      },
      {
        fullName: "Two Friends",
        bioInfo: "Two Friends are the iconic duo behind the big booty mixes",
        profileHeader: "https://d17iuxf4c4gu6d.cloudfront.net/two_friends.jpeg",
        twitter: "@twofriends",
        instagram: "@twofriends",
        spotify:
          "https://open.spotify.com/user/twofriendsofficial?si=55a08f082ffb4a03",
        benefits:
          "Exclusive Merch drops, Early access to the next big booty mix",
        promoSong:
          "https://open.spotify.com/episode/4sAlXfwIjLQAXvJdIe2Qed?si=1480c3da0be74637",
        userId: 4,
        defaultCollectionId: 4,
      },
    ],
  });

  await prisma.collection.createMany({
    data: [
      {
        artistId: 1,
        collectionName: "Breakout",
        description: "Anson Jones' first exclusive NFT Offering",
      },
      {
        artistId: 2,
        collectionName: "Blair Arch",
        description: "All of Shere Khan's classic Princeton Songs",
      },
      {
        artistId: 3,
        collectionName: "Cove Creek",
        description: "All the DJ Ziff classics",
      },
      {
        artistId: 4,
        collectionName: "Three Friends",
        description: "Two friends in collaboration with Kanye West",
      },
    ],
  });

  await prisma.nft.createMany({
    data: [
      {
        contractAddress:
          "https://ropsten.etherscan.io/tx/0x380cfd1c63ec118c43ff5f49dfee90d509892619a6ede137a72018d74df94625",
        tokenId: "1",
        collectionId: 1,
        tier: Tier.PLATINUM,
        serialNum: 1,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/AHJ_Guitar.jpg",
        title: "Melody",
        price: 0.5,
        artistId: 1,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmQ8hUGoRcd6m1MuK6cmUjxa6SeY56uF6o2KfWzUk7v44w",
      },
      {
        contractAddress:
          "https://ropsten.etherscan.io/tx/0xf332bbd87b67a7c45a108fd2583389c2b1905ed276022ddb0afa02224c416fbf",
        tokenId: "2",
        collectionId: 1,
        tier: Tier.GOLD,
        serialNum: 2,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/AHJ_Jacket.jpg",
        title: "Insight",
        price: 0.25,
        artistId: 1,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmX5tiGAHmTQdqfYxdSBV73s2qYtA2QPLyCELEK7wwjzjn",
      },
      {
        contractAddress:
          "https://ropsten.etherscan.io/tx/0xc4bd1584e8d4f8e8fc3765f0beac53b6dfdf886dc58f3f51c5ec403eff5ff99a",
        tokenId: "3",
        collectionId: 1,
        tier: Tier.SILVER,
        serialNum: 3,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/AHJ_Riverside.jpg",
        title: "Spontaneity",
        price: 0.1,
        artistId: 1,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/Qmc1x2ng54y5DPhzAGtcQavjbkDmKpSyz4qkpPmnhopN5j",
      },
      {
        contractAddress:
          "https://ropsten.etherscan.io/tx/0xb9c1328c6f0375a9e7f56a931f3e27d5f88fefff6ca4bbf99de73db14cb31fbb",
        tokenId: "4",
        collectionId: 1,
        tier: Tier.BRONZE,
        serialNum: 4,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/AHJ_Bricks_Narrow.jpg",
        title: "Perception",
        price: 0.05,
        artistId: 1,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmU2cDW8QRsoBvQ18Q9rqBN112FbcVGdejK2GS9gAG4AJQ",
      },
      {
        contractAddress: "",
        tokenId: "5",
        collectionId: 2,
        tier: Tier.PLATINUM,
        serialNum: 1,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/fine_hall.jpeg",
        title: "Fine Hall",
        price: 0.4,
        artistId: 2,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/fine_hall_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "6",
        collectionId: 2,
        tier: Tier.GOLD,
        serialNum: 2,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/nassau_hall.jpeg",
        title: "Nassau Hall",
        price: 0.2,
        artistId: 2,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/nassau_hall_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "7",
        collectionId: 2,
        tier: Tier.SILVER,
        serialNum: 3,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/friend_center.jpg",
        title: "Friend Center",
        price: 0.05,
        artistId: 2,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/friend_center_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "8",
        collectionId: 2,
        tier: Tier.BRONZE,
        serialNum: 4,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/first_college.jpeg",
        title: "First College",
        price: 0.02,
        artistId: 2,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/first_college_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "9",
        collectionId: 3,
        tier: Tier.BRONZE,
        serialNum: 1,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/DJ_Ziff_3.png",
        title: "Cove Creek Mix 1",
        price: 0.005,
        artistId: 3,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/DJ_Ziff_3_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "10",
        collectionId: 3,
        tier: Tier.PLATINUM,
        serialNum: 2,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/DJ_Ziff_1.jpeg",
        title: "Cove Creek Mixtape",
        price: 1,
        artistId: 3,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/DJ_Ziff_1_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "11",
        collectionId: 3,
        tier: Tier.GOLD,
        serialNum: 2,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/DJ_Ziff_2.jpeg",
        title: "Cove Creek - Redemption",
        price: 0.6,
        artistId: 3,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/DJ_Ziff_2_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "12",
        collectionId: 4,
        tier: Tier.PLATINUM,
        serialNum: 1,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/DJ_Ziff_4.jpeg",
        title: "Electric City",
        price: 0.2,
        artistId: 4,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/DJ_Ziff_4_metadata.json",
      },
      {
        contractAddress: "",
        tokenId: "13",
        collectionId: 4,
        tier: Tier.GOLD,
        serialNum: 1,
        img: "https://d17iuxf4c4gu6d.cloudfront.net/two_friends.jpeg",
        title: "Beet Drop",
        price: 0.35,
        artistId: 4,
        ownerId: 1,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/QmdqwbGHtgGueRtS1tXWf9qgVg2bF8kPijuPU7VRzof2Zq/two_friends_metadata.json",
      },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
