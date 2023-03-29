import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface Props<T> {
  searchBarValue: string;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData: React.Dispatch<React.SetStateAction<T[]>>;
  data: T[];
  filterFn: (item: T, query: string) => boolean;
}

function SearchBar<T>({
  searchBarValue,
  setSearchBarValue,
  setIsFiltered,
  setFilteredData,
  data,
  filterFn,
}: Props<T>) {
  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsFiltered(false);
    } else {
      setFilteredData(data.filter((item) => filterFn(item, e.target.value)));
      setIsFiltered(true);
    }
    setSearchBarValue(e.target.value);
  };
  return (
    <InputGroup>
      <Input
        value={searchBarValue}
        onChange={handleSearchBarChange}
        type="text"
        bgColor="cool-grey-050"
        placeholder="Escribe un nombre para filtrar"
      ></Input>
      <InputRightElement>
        <button
          onClick={() => {
            setSearchBarValue("");
            setIsFiltered(false);
          }}
        >
          <XMarkIcon className="w-5" />
        </button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;
