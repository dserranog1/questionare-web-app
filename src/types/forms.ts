import { AnswerList } from "./questions";

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  surname: string;
  secondSurName: string;
  typeDocument: 1 | 2 | 3 | "";
  documentNumber: number | "";
  phone: number | "";
}

export interface RegisterQuestionValues {
  title: string;
  answers: AnswerList;
}

export type Option = { value: number; label: string };

export type Options = Option[];
