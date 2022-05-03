import { CheckIcon, MailIcon } from "@heroicons/react/solid";
import { useState } from "react";

import concertPic from "/public/images/artist-concert.jpg";

import Banner from "@common/components/Banner";
import FlexLayout from "@common/components/FlexLayout";
import Navbar from "@common/components/Navbar";
import { NavbarPage } from "@common/types/NavbarProps";

const addUserToWaitingList = async (email: string) => {
  await fetch("/api/waiting-list", {
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

const EmailCollection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <FlexLayout direction="row">
      {emailSubmitted ? (
        <span className="flex-shrink-0 w-40 text-lg">
          We&apos;ll keep in touch!
        </span>
      ) : (
        <FlexLayout
          direction="row"
          className="mt-1 border border-purple-700 rounded-md shadow-sm w-96"
        >
          <FlexLayout
            direction="row"
            className="relative items-stretch flex-grow flex-shrink-0"
          >
            <FlexLayout
              direction="row"
              className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <MailIcon className="w-5 h-5 text-dark-gray" aria-hidden="true" />
            </FlexLayout>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full pl-12 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 text-dark-gray rounded-l-md sm:text-sm"
              placeholder="Keep me updated"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FlexLayout>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 bg-purple-500 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => {
              addUserToWaitingList(email);
              setEmailSubmitted(true);
            }}
          >
            <CheckIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span>Submit</span>
          </button>
        </FlexLayout>
      )}
    </FlexLayout>
  );
};

const LandingBanner = () => (
  <Banner
    height="min-h-screen"
    imageSrc={concertPic}
    imageAlt="Singer standing on a stage at a concert in front of an audience."
    imageOrigin="center"
  >
    <Navbar page={NavbarPage.Landing} />
    <FlexLayout
      direction="col"
      className="items-center w-full gap-20 px-8 mx-auto my-24 text-center text-white md:px-0 md:w-2/3 lg:my-64 drop-shadow-md"
    >
      <h1 className="title-big">Be the first to discover a star</h1>
      <div>
        <EmailCollection />
      </div>
    </FlexLayout>
  </Banner>
);

export default LandingBanner;
