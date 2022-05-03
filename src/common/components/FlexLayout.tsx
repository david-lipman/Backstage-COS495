import { FC } from "react";

import FlexLayoutProps from "../types/FlexLayoutProps";

const FlexLayout: FC<FlexLayoutProps> = ({
  direction,
  children,
  className,
}) => (
  <div className={`flex flex-${direction} ${className ?? ""}`}>{children}</div>
);
export default FlexLayout;
