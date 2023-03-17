import { StudentList } from "./student";
import { User } from "./user";

interface APIOK {
  state: true;
  message: string;
}

export interface APIFail {
  state: false;
  message: string;
}

export interface LoginOK extends User, APIOK {}

export interface StudentsOK extends APIOK {
  students: StudentList;
}
export interface StudentsFail extends StudentList, APIFail {}

export type LoginResponse = LoginOK | APIFail;
export type StudentsResponse = StudentsOK | APIFail;
