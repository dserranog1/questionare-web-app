export interface Student {
  id: number;
  firstName: string;
  secondName: string;
  surname: string;
  secondSurName: string;
  typeDocument: 1 | 2 | 3;
  documentNumber: number;
  email: string;
  phone: string;
}

export type StudentList = Student[];
