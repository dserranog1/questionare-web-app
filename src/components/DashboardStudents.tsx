import {
  Button,
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
import { StudentList } from "../types/student";
import { client } from "../untypeable/client";
import CustomSpinner from "./CustomSpinner";
import Pagination from "./Pagination";

const documentTypes = {
  1: "Tarjeta de identidad",
  2: "Cédula de ciudadanía",
  3: "Cédula de extranjería",
};

const DashboardStudents = () => {
  let students: StudentList = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["students"],
    queryFn: () => client("/api/v1/user/getUsers", "GET"),
  });
  if (typeof data == "undefined") {
    students = [];
  } else if (data.state) {
    students = data.students;
  }
  if (isError) {
    if (error instanceof Error) {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      );
    }
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(students.length / recordsPerPage);
  return (
    <div className="mx-auto w-fit bg-cool-grey-050">
      <TableContainer
        maxH="3xl"
        overflowY="auto"
        boxShadow="0 10px 20px rgba(0, 0, 0, 0.15)"
        border="1px"
        borderColor="cool-grey-200"
      >
        <div className="flex flex-row justify-between p-4">
          <h1 className="text-6 font-bold">Estudiantes</h1>
          <div>
            <Button
              bgColor="light-blue-vivid-500"
              textColor="cool-grey-050"
              _hover={{ bgColor: "light-blue-vivid-800" }}
              variant="solid"
            >
              Crear nuevo
            </Button>
          </div>
        </div>
        <Table bgColor="cool-grey-200" size="lg" variant="striped">
          <Thead border="2px" borderColor="cool-grey-200">
            <Tr bgColor="light-blue-vivid-600">
              <Th textColor="cool-grey-100">Nombre</Th>
              <Th textColor="cool-grey-100">Tipo de documento</Th>
              <Th textColor="cool-grey-100" isNumeric>
                Número de documento
              </Th>
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
                  <Td>
                    {
                      documentTypes[
                        student.typeDocument as keyof typeof documentTypes
                      ]
                    }
                  </Td>
                  <Td>{student.documentNumber}</Td>
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
};

export default DashboardStudents;
