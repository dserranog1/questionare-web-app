import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";
import { Student } from "../types/student";

const studentFactory = Factory.extend<Student>({
  id: (n) => n,
  firstName: () => faker.name.firstName(),
  secondName: () => faker.name.firstName(),
  surname: () => faker.name.lastName(),
  secondSurName: () => faker.name.lastName(),
  documentNumber: () => faker.datatype.number({ min: 100000, max: 9999999 }),
  email: () => faker.internet.email(),
  phone: () => faker.phone.number(),
  typeDocument: 1,
});

export const factories = {
  student: studentFactory,
};
