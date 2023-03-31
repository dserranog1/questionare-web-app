import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pb } from "../services/pocketbase";
import { Question, QuestionList } from "../types/questions";
import CustomSpinner from "./ui/CustomSpinner";
import ErrorPage from "./ErrorPage";
import Pagination from "./ui/Pagination";
import QuestionInfoModal from "./ui/QuestionInfoModal";
import SearchBar from "./ui/SearchBar";

const filterQuestionsFn = (question: Question, query: string): boolean => {
  return question.title.toLowerCase().includes(query.toLowerCase());
};

const DashboardQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const { questionId } = useParams();
  const questionInfoModalDisclosure = useDisclosure();
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionList>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const { status, error, data } = useQuery({
    queryKey: ["questions"],
    queryFn: () => pb.collection("questions").getList<Question>(), // TODO use paginated fetch
    onSuccess: (data) => setFilteredQuestions(data.items),
  });
  if (status === "error") {
    return <ErrorPage error={error} />;
  }
  if (status === "loading") {
    return <CustomSpinner />;
  }
  const indexOfLastRecord = currentPage * recordsPerPage; // TODO use paginated fetch
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentListOfQuestions = isFiltered
    ? filteredQuestions
    : data.items.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <>
      {questionId && (
        <QuestionInfoModal
          {...questionInfoModalDisclosure}
          isOpen={true}
          questionId={questionId}
        />
      )}
      <div className="mx-9 mb-6 flex flex-1 flex-col">
        <h1 className="my-6 text-8 font-bold text-cool-grey-700">Preguntas</h1>
        <div className="flex flex-row">
          <SearchBar<Question>
            searchBarValue={searchBarValue}
            setSearchBarValue={setSearchBarValue}
            setFilteredData={setFilteredQuestions}
            setIsFiltered={setIsFiltered}
            data={data.items}
            filterFn={filterQuestionsFn}
          />

          <div>
            <Link to="add">
              <Button
                bgColor="light-blue-vivid-500"
                textColor="cool-grey-050"
                _hover={{ bgColor: "light-blue-vivid-800" }}
                variant="solid"
              >
                Crear nueva
              </Button>
            </Link>
          </div>
        </div>
        <TableContainer
          boxShadow="0 10px 20px rgba(0, 0, 0, 0.15)"
          border="1px"
          borderColor="cool-grey-200"
        >
          <Table bgColor="cool-grey-200" size="lg" variant="striped">
            <Thead border="2px" borderColor="cool-grey-200">
              <Tr bgColor="light-blue-vivid-600">
                <Th textColor="cool-grey-100" px="5">
                  Acciones
                </Th>
                <Th textColor="cool-grey-100">Título</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentListOfQuestions.map((question) => {
                return (
                  <Tr key={question.id} fontSize="2" textColor="cool-grey-700">
                    <Td px="3">
                      <div>
                        <Link to={`${question.id}/edit`}>
                          <Tooltip label="Editar">
                            <Button
                              variant="ghost"
                              _hover={{ bgColor: "cool-grey-100" }}
                            >
                              <PencilSquareIcon className="w-5 fill-light-blue-vivid-900" />
                            </Button>
                          </Tooltip>
                        </Link>
                        <Link to={`${question.id}`}>
                          <Tooltip label="Ver">
                            <Button
                              variant="ghost"
                              _hover={{ bgColor: "cool-grey-100" }}
                            >
                              <EyeIcon className="w-5 fill-light-blue-vivid-900" />
                            </Button>
                          </Tooltip>
                        </Link>
                      </div>
                    </Td>
                    <Td>{question.title}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {!isFiltered && (
          <Pagination
            nPages={Math.ceil(data.items.length / recordsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default DashboardQuestions;
