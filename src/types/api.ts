import { StudentList } from "./student";
import { User } from "./user";

interface APIOK {
  state: true;
  message: string;
}

interface APIFail {
  state: false;
  message: string;
}

export interface LoginOK extends User, APIOK {}
export interface LoginFail extends User, APIFail {}

export interface StudentsOK extends StudentList, APIOK {}
export interface StudentsFail extends StudentList, APIFail {}

export type LoginResponse = LoginOK | LoginFail;
export type StudentsResponse = StudentsOK | StudentsFail;
