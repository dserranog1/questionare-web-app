import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FC } from "react";
import { UserList } from "../types/user";

interface Props {
  searchBarValue: string;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredStudents: React.Dispatch<React.SetStateAction<UserList>>;
  students: UserList;
}

const SearchBar: FC<Props> = ({
  searchBarValue,
  setSearchBarValue,
  setIsFiltered,
  setFilteredStudents,
  students,
}) => {
  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsFiltered(false);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          (
            student.firstName +
            " " +
            student.secondName +
            " " +
            student.surname +
            " " +
            student.secondSurName
          )
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
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
};

export default SearchBar;
