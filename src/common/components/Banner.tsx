import Image from "next/image";
import { FC } from "react";

import BannerProps from "../types/BannerProps";

const Banner: FC<BannerProps> = ({
  height,
  imageSrc,
  imageOrigin,
  imageAlt,
  children,
}) => (
  <div
    className={`relative items-center flex-shrink-0 ${height} overflow-hidden`}
  >
    <Image
      src={imageSrc}
      layout="fill"
      className={`flex-shrink-0 object-cover object-${imageOrigin} overflow-hidden -z-10`}
      alt={imageAlt}
      priority
    />
    {children}
  </div>
);

export default Banner;
