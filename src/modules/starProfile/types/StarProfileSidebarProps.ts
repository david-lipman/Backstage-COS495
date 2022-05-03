import { Artist, Collection } from "@prisma/client";

type StarProfileSidebarProps = {
  followers: number;
  collections: Array<Collection>;
} & Artist;

export default StarProfileSidebarProps;
