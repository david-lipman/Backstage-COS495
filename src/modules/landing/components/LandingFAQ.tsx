import FlexLayout from "@common/components/FlexLayout";

const faqItems = [
  {
    question: "What is Backstage?",
    answer: (
      <p>
        Backstage lets fans support their favorite stars and share in their
        success by buying NFT tokens and participating in star-led communities.
      </p>
    ),
  },
  {
    question: "When I buy a star's NFT, what do I get?",
    answer: (
      <p>
        Each NFT has its own set of unique benefits chosen by the star
        themselves. All NFTs come with access to that star&apos;s private
        Discord, but other potential benefits include access to exclusive
        merchandise, first notification when event tickets drop, and
        personalized content from the star!
      </p>
    ),
  },
  {
    question: "What makes Backstage unique?",
    answer: (
      <p>
        Backstage is focused on helping early-stage stars build their brand from
        the ground up. We&apos;re the only platform in the business of actually
        getting stars discovered by agents, talent scouts, and industry veterans
        that can take their career to the next level. For you as a fan, this
        means supporting your favorite stars on Backstage gets them one step
        closer to hitting it big.
      </p>
    ),
  },
  {
    question: "How does Backstage let me share in the success of my stars?",
    answer: (
      <p>
        Each NFT minted through Backstage is ordered, which means if you buy an
        NFT for an artist and they become wildly successful, the value of your
        NFT will skyrocket!
      </p>
    ),
  },
  {
    question: "When will Backstage go live?",
    answer: <p>Backstage will launch to users in early summer 2022.</p>,
  },
  {
    question: "How can I keep in touch?",
    answer: (
      <p>
        Get on our mailing list with the form at the top of the page, or email
        us at{" "}
        <a href="mailto:team@getbackstage.xyz" className="underline">
          team@getbackstage.xyz
        </a>
        .
      </p>
    ),
  },
];

const LandingFAQ = () => {
  return (
    <div
      id="faq"
      className="relative flex flex-col p-12 text-white bg-dark-gray gap-y-16"
    >
      <FlexLayout
        direction="col"
        className="max-w-6xl gap-16 mx-auto md:flex-row place-content-center"
      >
        <h2 className="w-full mr-8 leading-9 md:w-1/3 theme-underline-text title-big">
          FAQs
        </h2>
        <dl className="w-h md:w-2/3">
          {faqItems.map((faqItem, i) => (
            <div key={i}>
              <dt className="mb-4">
                <div className="mt-2 text-3xl font-light">
                  {faqItem.question}
                </div>
              </dt>
              <dd className="mb-16">
                <p className="mb-5 font-light">{faqItem.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </FlexLayout>
    </div>
  );
};

export default LandingFAQ;
