import { Artist } from "@prisma/client";

import FlexLayout from "@common/components/FlexLayout";

const StarProfileStory = ({ bioInfo }: Artist) => (
  <FlexLayout direction="col" className="m-6">
    <FlexLayout
      direction="col"
      className="gap-4 p-6 text-white rounded-md bg-dark-gray"
    >
      <h1 className="title-small">My Story</h1>
      <p>{bioInfo}</p>
    </FlexLayout>
  </FlexLayout>
);

export default StarProfileStory;
