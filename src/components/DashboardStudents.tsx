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
import {
  EyeIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pb } from "../services/pocketbase";
import { User, UserList } from "../types/user";
import CustomSpinner from "./CustomSpinner";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import StudentInfoModal from "./StudentInfoModal";

const DashboardStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const { studentId } = useParams();
  const studentInfoModalDisclosure = useDisclosure();
  const [filteredStudents, setFilteredStudents] = useState<UserList>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const { status, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: () =>
      pb
        .collection("users")
        .getList<User>(undefined, undefined, { filter: 'role = "estudiante"' }), // TODO use paginated fetch
    onSuccess: (data) => setFilteredStudents(data.items),
  });
  if (status === "error") {
    if (error instanceof Error) {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      );
    } else {
      //this else prevents component to return undefined
      return <div>some error</div>; //TODO handle alll errors
    }
  } else if (status === "loading") {
    return <CustomSpinner />;
  } else {
    const indexOfLastRecord = currentPage * recordsPerPage; // TODO use paginated fetch
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentListOfStudents = isFiltered
      ? filteredStudents
      : data.items.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
      <>
        {studentId && (
          <StudentInfoModal
            {...studentInfoModalDisclosure}
            isOpen={true}
            studentId={studentId}
          />
        )}
        <div className="mx-9 mb-6 flex flex-1 flex-col">
          <h1 className="my-6 text-8 font-bold text-cool-grey-700">
            Estudiantes
          </h1>
          <div className="flex flex-row">
            <SearchBar
              searchBarValue={searchBarValue}
              setSearchBarValue={setSearchBarValue}
              setFilteredStudents={setFilteredStudents}
              setIsFiltered={setIsFiltered}
              students={data.items}
            />

            <div>
              <Link to="add">
                <Button
                  bgColor="light-blue-vivid-500"
                  textColor="cool-grey-050"
                  _hover={{ bgColor: "light-blue-vivid-800" }}
                  variant="solid"
                >
                  Crear nuevo
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
                  <Th textColor="cool-grey-100">Nombre</Th>
                  <Th textColor="cool-grey-100">Correo</Th>
                  <Th textColor="cool-grey-100">Telefono</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentListOfStudents.map((student) => {
                  return (
                    <Tr key={student.id} fontSize="2" textColor="cool-grey-700">
                      <Td px="3">
                        <div>
                          <Link to={`${student.id}/edit`}>
                            <Tooltip label="Editar">
                              <Button
                                variant="ghost"
                                _hover={{ bgColor: "cool-grey-100" }}
                              >
                                <PencilSquareIcon className="w-5 fill-light-blue-vivid-900" />
                              </Button>
                            </Tooltip>
                          </Link>
                          <Link to={`${student.id}`}>
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
                      <Td>
                        {student.firstName +
                          " " +
                          student.secondName +
                          " " +
                          student.surname +
                          " " +
                          student.secondSurName}
                      </Td>
                      <Td>{student.email}</Td>
                      <Td>{student.phone}</Td>
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
  }
};

export default DashboardStudents;
