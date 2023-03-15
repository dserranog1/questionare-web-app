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

export type LoginResponse = LoginOK | LoginFail;
