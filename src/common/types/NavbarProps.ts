export const enum NavbarPage {
  Landing,
  Artist,
  User,
  Browse,
  Mint,
  RegisterArtist,
}

export type NavbarProps = {
  darkText?: boolean;
  className?: string;
  page: NavbarPage;
  background?: boolean;
};
