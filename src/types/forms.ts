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
  typeDocument: string;
  documentNumber: string;
  phone: string;
}

export type Options = {
  value: string;
  label: string;
}[];
