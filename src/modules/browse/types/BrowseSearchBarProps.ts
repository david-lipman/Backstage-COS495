import BrowseSearchType from "./BrowseSearchType";

type BrowseSearchBarProps = {
  setType: (newType: BrowseSearchType) => void;
  setText: (newText: string) => void;
  searchText: string | undefined;
  searchType: BrowseSearchType;
};

export default BrowseSearchBarProps;
