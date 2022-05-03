import FlexLayout from "./FlexLayout";

const Footer = () => (
  <div className="px-12 bg-dark-gray">
    <hr className="text-white" />
    <FlexLayout
      direction="row"
      className="relative justify-between py-4 text-white gap-y-16"
    >
      <div></div>
      <div>Backstage &copy; 2022</div>
      <div>
        <a href="mailto:team@getbackstage.xyz" className="font-bold underline">
          team@getbackstage.xyz
        </a>
      </div>
    </FlexLayout>
  </div>
);

export default Footer;
