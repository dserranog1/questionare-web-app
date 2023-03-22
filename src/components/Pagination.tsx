import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface Props {
  nPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<Props> = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  return (
    <div className="mt-5 flex flex-row items-center justify-center">
      <Button
        border="1px"
        borderColor="cool-grey-200"
        roundedRight="1"
        size="sm"
        onClick={() => {
          if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        <ChevronLeftIcon className="w-3 fill-cool-grey-600" />
      </Button>
      {pageNumbers.map((num) => {
        return (
          <Button
            size="sm"
            rounded=""
            border="1px"
            borderColor="cool-grey-200"
            fontWeight="medium"
            fontSize="2"
            textColor="cool-grey-500"
            isActive={num === currentPage ? true : false}
            key={num}
            onClick={() => {
              setCurrentPage(num);
            }}
          >
            {num}
          </Button>
        );
      })}
      <Button
        roundedLeft="1"
        border="1px"
        borderColor="cool-grey-200"
        size="sm"
        onClick={() => {
          if (currentPage !== nPages) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        <ChevronRightIcon className="w-3" />
      </Button>
    </div>
  );
};

export default Pagination;
