import {
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { pb } from "../services/pocketbase";
import { Options } from "../types/forms";
import { User } from "../types/user";
import CustomSpinner from "./CustomSpinner";
import Pagination from "./Pagination";

export const documentTypes: Options = [
  { value: "1", label: "Tarjeta de identidad" },
  { value: "2", label: "Cédula de ciudadanía" },
  { value: "3", label: "Cédula de extranjería" },
];

const DashboardStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  const { status, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: () =>
      pb
        .collection("users")
        .getList<User>(undefined, undefined, { filter: 'role = "estudiante"' }),
    onSuccess: (data) => console.log(data.items),
  });
  if (status === "error") {
    if (error instanceof Error) {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      );
    }
  } else if (status === "loading") {
    return <CustomSpinner />;
  } else {
    const indexOfLastRecord = currentPage * recordsPerPage; // TODO use paginated fetch
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data?.items.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const nPages = Math.ceil(data.items.length / recordsPerPage);
    return (
      <div className="mx-9 flex flex-1 flex-col">
        <h1 className="my-6 text-8 font-bold text-cool-grey-700">
          Estudiantes
        </h1>
        <div className="flex flex-row">
          <Input
            type="text"
            bgColor="cool-grey-050"
            placeholder="Escribe para filtrar"
          ></Input>
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
                <Th textColor="cool-grey-100">Nombre</Th>
                <Th textColor="cool-grey-100">Correo</Th>
                <Th textColor="cool-grey-100">Telefono</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentRecords.map((student) => {
                return (
                  <Tr key={student.id} fontSize="2" textColor="cool-grey-700">
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
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }
};

export default DashboardStudents;
