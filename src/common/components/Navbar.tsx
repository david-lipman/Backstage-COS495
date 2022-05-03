import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useMetaMask } from "metamask-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import ScrollTo from "react-scroll-into-view";

import backstageLogo from "/public/images/backstage-logo.svg";

import FlexLayout from "./FlexLayout";

import { ButtonMedium } from "@common/components/Button";
import { NavbarProps, NavbarPage } from "@common/types/NavbarProps";
import { fetchUser } from "@common/utils/api";
import baseUrl from "@common/utils/baseURL";

const ProfileDropdown = ({ user }: { user: UserProfile }) => {
  const getLinkStyle = (active: boolean) =>
    `${active ? "bg-gray-100 " : ""}block px-4 py-2 text-sm text-white`;
  const { status, connect } = useMetaMask();

  const connectMetaMaskButton = (active: boolean) => {
    return (
      <Link href="#">
        <a onClick={connect} className={getLinkStyle(active)}>
          Connect Wallet 🦊
        </a>
      </Link>
    );
  };

  const metaMaskConnectedButton = (active: boolean) => {
    return (
      <Link href="#">
        <a className={getLinkStyle(active)}>Wallet Connected! 🦊</a>
      </Link>
    );
  };

  return (
    <Menu as="div" className="relative z-10 ml-3">
      <div>
        <Menu.Button className="static flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          {user.picture != undefined ? (
            <Image
              className="w-10 h-10 rounded-full"
              referrerPolicy="no-referrer"
              src={user.picture}
              width="50"
              height="50"
              alt=""
            />
          ) : null}
          <ChevronDownIcon className="absolute bottom-[-2px] right-[-2px] h-4 w-4" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-purple-500 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link href="/user">
                <a className={getLinkStyle(active)}>Profile</a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) =>
              status == "connected"
                ? metaMaskConnectedButton(active)
                : connectMetaMaskButton(active)
            }
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href="/api/auth/logout" passHref>
                <a className={getLinkStyle(active)}>Sign out</a>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Navbar = ({ className, darkText, background, page }: NavbarProps) => {
  const { user } = useUser();
  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    const renderUser = async () => {
      const userAndNfts = await fetchUser();
      if (userAndNfts.user) {
        setIsArtist(Boolean(userAndNfts.user.artist));
      }
    };
    renderUser();
  }, []);

  const leftContent = (
    <>
      {page === NavbarPage.Landing ? (
        <div className="hidden my-auto cursor-pointer md:inline">
          <ScrollTo selector={"#about"}>
            <button className="my-auto font-light text-medium">About</button>
          </ScrollTo>
        </div>
      ) : (
        <div></div>
      )}
      {page !== NavbarPage.Browse ? (
        <div className="hidden my-auto cursor-pointer md:inline">
          <Link href={`${baseUrl}/browse`} passHref>
            <button className="my-auto font-light text-medium">Browse</button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {!isArtist ? (
        <div className="hidden my-auto cursor-pointer md:inline">
          <Link href={`${baseUrl}/register-artist`} passHref>
            <button className="my-auto font-light text-medium">
              Register Artist
            </button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {page === NavbarPage.Landing ? (
        <div className="hidden my-auto cursor-pointer md:inline">
          <ScrollTo selector={"#faq"}>
            <button className="my-auto font-light text-medium">FAQs</button>
          </ScrollTo>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );

  const rightContent = (
    <FlexLayout
      direction="row"
      className="z-10 justify-end p-4 my-auto gap-x-6"
    >
      {user ? (
        <ProfileDropdown user={user} />
      ) : (
        <Link href="/api/auth/login" passHref>
          <a>
            <ButtonMedium className="font-light">Sign In</ButtonMedium>
          </a>
        </Link>
      )}
    </FlexLayout>
  );

  const backgroundClass = background
    ? darkText
      ? "bg-white"
      : "bg-dark-gray"
    : "";

  return (
    <nav className={`${backgroundClass} flex justify-between ${className}`}>
      <FlexLayout
        direction="row"
        className={`p-4 justify-start gap-x-6 z-10 ${
          darkText ? "text-black" : "text-white"
        } my-auto`}
      >
        <FlexLayout direction="row">
          <Link href={baseUrl} passHref>
            <Image
              src={backstageLogo}
              width={60}
              height={60}
              alt="Backstage logo."
            />
          </Link>
          <h1 className="my-auto text-4xl font-bold">Backstage</h1>
        </FlexLayout>
        {leftContent}
      </FlexLayout>
      {rightContent}
    </nav>
  );
};

export default Navbar;
