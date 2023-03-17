import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { StudentList } from "../types/student";
import { client } from "../untypeable/client";

const documentTypes = {
  1: "Tarjeta de identidad",
  2: "Cédula de ciudadanía",
  3: "Cédula de extranjería",
};

const DashboardStudents = () => {
  let students: StudentList = [];
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["students"],
    queryFn: () => client("/api/v1/user/getUsers", "GET"),
  });
  if (typeof data == "undefined") {
    students = [];
  } else if (data.state) {
    students = data.students;
  }
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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
  return (
    <div className="mx-auto w-4/5 bg-white">
      <TableContainer maxH="3xl" overflowY="auto">
        <Table variant="simple">
          <TableCaption>Estudiantes</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Tipo de documento</Th>
              <Th isNumeric>Número de documento</Th>
              <Th>Correo</Th>
              <Th>Telefono</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => {
              return (
                <Tr key={student.id}>
                  <Td>
                    {student.firstName +
                      student.secondName +
                      student.surname +
                      student.secondSurName}
                  </Td>
                  <Td>
                    {
                      documentTypes[
                        student.documentNumber as keyof typeof documentTypes
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
    </div>
  );
};

export default DashboardStudents;
