import { FC } from "react";

import ButtonProps from "../types/ButtonProps";

const defaultStyling =
  "inline-flex items-center rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500";

export const ButtonExtraSmall: FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${defaultStyling + " " + className} px-2.5 py-1.5 text-xs`}
  >
    {children}
  </button>
);

export const ButtonSmall: FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${
      defaultStyling + " " + className
    } px-3 py-2  text-sm leading-4 font-medium `}
  >
    {children}
  </button>
);

export const ButtonMedium: FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${defaultStyling + " " + className} px-4 py-2 text-sm`}
  >
    {children}
  </button>
);

export const ButtonLarge: FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${defaultStyling + " " + className} px-4 py-2 text-base`}
  >
    {children}
  </button>
);

export const ButtonExtraLarge: FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${defaultStyling + " " + className} px-6 py-3 text-base`}
  >
    {children}
  </button>
);
