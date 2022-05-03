import { SearchIcon } from "@heroicons/react/solid";

import FlexLayout from "@common/components/FlexLayout";

import BrowseSearchBarProps from "@modules/browse/types/BrowseSearchBarProps";
import SearchType from "@modules/browse/types/BrowseSearchType";

const SearchTypeButtons = ({
  searchType,
  setType,
}: {
  searchType: SearchType;
  setType: (value: SearchType) => void;
}) => {
  const styleType = (type: SearchType) => {
    return (
      (searchType === type
        ? "bg-purple-500 text-white "
        : "bg-white text-dark-gray ") +
      "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none"
    );
  };
  return (
    <span className="relative z-0 inline-flex">
      <button
        type="button"
        onClick={() => setType(SearchType.NFT)}
        className={styleType(SearchType.NFT) + " rounded-l-lg"}
      >
        NFTs
      </button>
      <button
        type="button"
        onClick={() => setType(SearchType.Collection)}
        className={styleType(SearchType.Collection)}
      >
        Collections
      </button>
      <button
        type="button"
        onClick={() => {
          setType(SearchType.Artist);
        }}
        className={styleType(SearchType.Artist) + " rounded-r-lg"}
      >
        Artists
      </button>
    </span>
  );
};

const BrowseSearchBar = ({
  setText,
  setType,
  searchText,
  searchType,
}: BrowseSearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <FlexLayout
      direction="col"
      className="w-3/5 absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] mx-auto"
    >
      <FlexLayout direction="row" className="my-2">
        <div className="flex items-center w-full text-gray-400 bg-white border rounded-lg focus-within:text-gray-600">
          <div className="items-center px-2 pointer-events-none grow-0">
            <SearchIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full h-full py-2 pr-3 placeholder-gray-500 border-transparent rounded-r-lg grow text-dark-gray focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search"
            type="text"
            name="search"
            value={searchText}
            onChange={handleChange}
          />
        </div>
      </FlexLayout>
      <SearchTypeButtons setType={setType} searchType={searchType} />
    </FlexLayout>
  );
};

export default BrowseSearchBar;
