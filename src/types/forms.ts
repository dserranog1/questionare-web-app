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

export type Options = {
  value: string;
  label: string;
}[];
